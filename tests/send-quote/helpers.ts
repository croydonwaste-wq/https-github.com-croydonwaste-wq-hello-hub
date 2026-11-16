// Test helpers: build requests like the website form does, and capture outgoing email.
import { loadConfig, type Config } from "../../supabase/functions/send-quote/config.ts";
import { createHandler } from "../../supabase/functions/send-quote/handler.ts";
import { MemoryStore, type RecordInput, type Store } from "../../supabase/functions/send-quote/store.ts";

/** Behaves like the Supabase database (records are durable), as in production once the migration is applied. */
export class DbLikeStore extends MemoryStore {
  override async record(r: RecordInput) {
    await super.record(r);
    return true;
  }
}

export const SITE = "https://www.watfordrubbishclearance.co.uk";

/** Cloudflare's published dummy secrets: always pass / always fail / always "timeout-or-duplicate". */
export const TS_PASS = "1x0000000000000000000000000000000AA";
export const TS_FAIL = "2x0000000000000000000000000000000AA";
export const TS_SPENT = "3x0000000000000000000000000000000AA";

export const genuine = {
  form: "full",
  page: "/house-clearance/",
  name: "Sarah O'Connor",
  phone: "07700 900123",
  email: "sarah.oconnor@gmail.com",
  postcode: "WD17 1AA",
  service: "House clearance",
  load_size: "Half van load",
  access: "Upstairs – no lift",
  preferred_date: "2026-11-20",
  preferred_time: "Morning",
  details: "Clearing my late mum's 2-bed flat on the second floor. Sofa, beds, wardrobe and about 15 bags. Parking out front.",
  consent: "yes",
  _elapsed: "48000",
};

export type Sent = { to: string[]; cc?: string[]; bcc?: string[]; subject: string; html: string; text: string; reply_to?: string; attachments?: { filename: string }[] };

export function setup(env: Record<string, string> = {}, opts: { store?: Store; siteverify?: "real" | ((body: FormData) => Record<string, unknown>) } = {}) {
  const cfg: Config = loadConfig((k) => ({ RESEND_API_KEY: "re_test", ...env })[k]);
  const sent: Sent[] = [];
  const logs: Record<string, unknown>[] = [];
  const store = opts.store ?? new DbLikeStore();
  const fakeFetch: typeof fetch = async (input, init) => {
    const url = String(input instanceof Request ? input.url : input);
    if (url.startsWith("https://api.resend.com/")) {
      sent.push(JSON.parse(String(init?.body)));
      return new Response(JSON.stringify({ id: "test" }), { status: 200 });
    }
    if (url.includes("challenges.cloudflare.com")) {
      if (opts.siteverify === "real" || !opts.siteverify) return fetch(input, init);
      return new Response(JSON.stringify(opts.siteverify(init!.body as FormData)));
    }
    throw new Error(`unexpected fetch ${url}`);
  };
  const handle = createHandler(cfg, { fetch: fakeFetch, store, log: (e) => logs.push(e) });
  const outcomes = () => logs.filter((l) => l.event === "quote_form").map((l) => l.outcome);
  return { cfg, handle, sent, logs, store, outcomes };
}

export function req(
  fields: Record<string, string>,
  opts: { ip?: string; origin?: string | null; referer?: string | null; json?: boolean; files?: File[]; headers?: Record<string, string>; method?: string } = {},
) {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.set(k, v);
  for (const f of opts.files ?? []) fd.append("attachment", f);
  const headers: Record<string, string> = {
    "cf-connecting-ip": opts.ip ?? "203.0.113.10",
    ...(opts.json === false ? { accept: "text/html" } : { accept: "application/json" }),
    ...opts.headers,
  };
  if (opts.origin !== null) headers.origin = opts.origin ?? SITE;
  if (opts.referer !== null && opts.referer !== undefined) headers.referer = opts.referer;
  return new Request("https://example.supabase.co/functions/v1/send-quote", { method: opts.method ?? "POST", body: opts.method === "GET" ? undefined : fd, headers });
}

export const body = async (r: Response) => (await r.json()) as { success: boolean; error?: string; fields?: string[] };

/** A tiny but valid JPEG header followed by padding. */
export const jpeg = (name = "sofa.jpg", size = 2048) => {
  const b = new Uint8Array(size);
  b.set([0xff, 0xd8, 0xff, 0xe0]);
  return new File([b], name, { type: "image/jpeg" });
};
