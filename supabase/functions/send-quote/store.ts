// Shared state for rate limiting, duplicate detection, the review queue and monitoring.
//
// Production: Supabase Postgres (tables + functions in supabase/migrations/*_form_protection.sql),
// called through PostgREST with the service-role key, so every edge-function instance shares
// the same counters. If the database is unreachable or the migration hasn't been applied yet,
// the handler falls back to a per-instance memory store: protection gets weaker, but genuine
// enquiries are never blocked by a storage problem.
//
// Privacy: IP addresses are stored only as a keyed one-way hash; message text only as a hash.
// Personal details are stored only for enquiries held for review (deleted after 30 days).

export type CheckInput = {
  ipHash: string;
  contentHash: string;
  bodyHash: string;
  shortWindowSec: number;
  longWindowSec: number;
  duplicateWindowSec: number;
  bulkWindowSec: number;
};
export type CheckResult = { shortCount: number; longCount: number; duplicate: boolean; bulkCount: number };

export type Outcome =
  | "delivered"
  | "delivered_flagged"
  | "quarantined"
  | "duplicate"
  | "honeypot"
  | "rate_limited"
  | "turnstile_failed"
  | "invalid"
  | "rejected_origin"
  | "bad_request"
  | "too_large"
  | "send_failed";

export type RecordInput = {
  outcome: Outcome;
  score: number | null;
  reasons: string[];
  form: string;
  page: string;
  ipHash: string | null;
  contentHash: string | null;
  bodyHash: string | null;
  /** Full enquiry, only for submissions held for review. */
  payload: Record<string, unknown> | null;
};

export interface Store {
  /** Counts this attempt against the IP's rate limit and looks up duplicates. */
  check(input: CheckInput): Promise<CheckResult>;
  /** Resolves true if the record was saved durably (shared database), false for memory only. */
  record(input: RecordInput): Promise<boolean>;
}

// ---------- In-memory (per instance; fallback and tests) ----------
export class MemoryStore implements Store {
  hits = new Map<string, number[]>();
  delivered = new Map<string, number>();
  bodies = new Map<string, { ip: string; at: number }[]>();
  events: RecordInput[] = [];
  quarantine: RecordInput[] = [];
  private now: () => number;
  constructor(now: () => number = Date.now) {
    this.now = now;
  }

  check(i: CheckInput): Promise<CheckResult> {
    const now = this.now();
    const keep = Math.max(i.shortWindowSec, i.longWindowSec) * 1000;
    const list = (this.hits.get(i.ipHash) ?? []).filter((t) => now - t < keep);
    list.push(now);
    this.hits.set(i.ipHash, list);
    const at = this.delivered.get(i.contentHash);
    const others = (this.bodies.get(i.bodyHash) ?? []).filter((b) => now - b.at < i.bulkWindowSec * 1000 && b.ip !== i.ipHash);
    // Prevent unbounded growth in a long-lived instance.
    if (this.hits.size > 10_000) this.hits.clear();
    return Promise.resolve({
      shortCount: list.filter((t) => now - t < i.shortWindowSec * 1000).length,
      longCount: list.filter((t) => now - t < i.longWindowSec * 1000).length,
      duplicate: at !== undefined && now - at < i.duplicateWindowSec * 1000,
      bulkCount: new Set(others.map((b) => b.ip)).size,
    });
  }

  record(r: RecordInput): Promise<boolean> {
    const now = this.now();
    this.events.push(r);
    if (this.events.length > 1000) this.events.shift();
    if (r.payload) this.quarantine.push(r);
    if (this.quarantine.length > 200) this.quarantine.shift();
    if (r.contentHash && (r.outcome === "delivered" || r.outcome === "delivered_flagged")) this.delivered.set(r.contentHash, now);
    if (r.bodyHash && r.ipHash && r.score !== null) {
      const list = this.bodies.get(r.bodyHash) ?? [];
      list.push({ ip: r.ipHash, at: now });
      this.bodies.set(r.bodyHash, list.slice(-50));
    }
    if (this.delivered.size > 10_000) this.delivered.clear();
    if (this.bodies.size > 10_000) this.bodies.clear();
    return Promise.resolve(false);
  }
}

// ---------- Supabase Postgres via PostgREST ----------
export class SupabaseStore implements Store {
  private url: string;
  private key: string;
  private fetchFn: typeof fetch;
  constructor(url: string, key: string, fetchFn: typeof fetch = fetch) {
    this.url = url;
    this.key = key;
    this.fetchFn = fetchFn;
  }

  private async rpc<T>(fn: string, args: Record<string, unknown>): Promise<T> {
    const res = await this.fetchFn(`${this.url}/rest/v1/rpc/${fn}`, {
      method: "POST",
      headers: { apikey: this.key, Authorization: `Bearer ${this.key}`, "Content-Type": "application/json" },
      body: JSON.stringify(args),
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) throw new Error(`store ${fn} ${res.status}: ${(await res.text()).slice(0, 200)}`);
    const text = await res.text();
    return (text ? JSON.parse(text) : null) as T;
  }

  async check(i: CheckInput): Promise<CheckResult> {
    const r = await this.rpc<{ short_count: number; long_count: number; duplicate: boolean; bulk_count: number }>("form_guard_check", {
      p_ip_hash: i.ipHash,
      p_content_hash: i.contentHash,
      p_body_hash: i.bodyHash,
      p_short_secs: i.shortWindowSec,
      p_long_secs: i.longWindowSec,
      p_dup_secs: i.duplicateWindowSec,
      p_bulk_secs: i.bulkWindowSec,
    });
    return { shortCount: r.short_count, longCount: r.long_count, duplicate: r.duplicate, bulkCount: r.bulk_count };
  }

  async record(r: RecordInput): Promise<boolean> {
    await this.rpc("form_guard_record", {
      p_outcome: r.outcome,
      p_score: r.score,
      p_reasons: r.reasons,
      p_form: r.form,
      p_page: r.page,
      p_ip_hash: r.ipHash,
      p_content_hash: r.contentHash,
      p_body_hash: r.bodyHash,
      p_payload: r.payload,
    });
    return true;
  }
}

/** Uses the primary store; on any error logs it and uses the memory store instead, so enquiries keep flowing. */
export class FailoverStore implements Store {
  private primary: Store | null;
  private fallback: Store;
  private log: (msg: string) => void;
  constructor(primary: Store | null, fallback: Store, log: (msg: string) => void) {
    this.primary = primary;
    this.fallback = fallback;
    this.log = log;
  }
  private async run<T>(op: (s: Store) => Promise<T>): Promise<T> {
    if (this.primary) {
      try {
        return await op(this.primary);
      } catch (err) {
        this.log(`form store unavailable, using in-memory fallback: ${String(err).slice(0, 200)}`);
      }
    }
    return op(this.fallback);
  }
  check(i: CheckInput) {
    return this.run((s) => s.check(i));
  }
  record(r: RecordInput) {
    return this.run((s) => s.record(r));
  }
}
