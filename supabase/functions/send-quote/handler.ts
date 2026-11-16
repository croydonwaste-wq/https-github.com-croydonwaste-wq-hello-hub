// Request pipeline for the quote form. Every check runs here on the server, so posting to the
// function directly (curl, scripts, bots) gets exactly the same treatment as the website form.
//
//  1. Method, content type, origin and payload size
//  2. Honeypot             → pretend success, send nothing
//  3. Rate limit (per IP)  → 429
//  4. Cloudflare Turnstile → reject missing / invalid / expired / reused tokens (when configured)
//  5. Field validation     → 400 with the fields to fix
//  6. Duplicate check      → identical enquiry already delivered: success, not emailed twice
//  7. Spam score           → low: deliver · high: hold for review · medium: hold (strict mode, the default)
//                             or deliver flagged / to the review inbox (FORM_STRICT=false)
//
// Pure module (no Deno globals): index.ts wires in the environment; tests call it directly.

import type { Config } from "./config.ts";
import { autoReplyEmail, enquiryEmail, sendEmail, type Attachment } from "./email.ts";
import { classify, normaliseText, scoreQuote, type Risk } from "./spam.ts";
import type { Outcome, Store } from "./store.ts";
import { verifyTurnstile } from "./turnstile.ts";
import { normalise, phoneDigits, validate, type FieldError, type Quote } from "./validate.ts";

export type Deps = {
  fetch: typeof fetch;
  store: Store;
  /** Structured, PII-free log line. */
  log: (entry: Record<string, unknown>) => void;
};

const MAX_ATTACH_BYTES = 10 * 1024 * 1024;
const MAX_FILES = 5;
const TOKEN_FIELD = "cf-turnstile-response";

// ---------- helpers ----------
const enc = new TextEncoder();
const hex = (buf: ArrayBuffer) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
async function hmac(key: string, value: string) {
  const k = await crypto.subtle.importKey("raw", enc.encode(key), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return hex(await crypto.subtle.sign("HMAC", k, enc.encode(value))).slice(0, 40);
}

export function clientIp(req: Request): string {
  const h = req.headers;
  return (h.get("cf-connecting-ip") || h.get("x-real-ip") || (h.get("x-forwarded-for") ?? "").split(",")[0] || "unknown").trim().slice(0, 64);
}

/** Reads the body, giving up as soon as it passes `max` bytes (Content-Length can be absent or wrong). */
async function readLimited(req: Request, max: number): Promise<ArrayBuffer | null> {
  const declared = Number(req.headers.get("content-length") ?? "0");
  if (declared > max) return null;
  if (!req.body) return new ArrayBuffer(0);
  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > max) {
      await reader.cancel().catch(() => {});
      return null;
    }
    chunks.push(value);
  }
  const out = new Uint8Array(total);
  let off = 0;
  for (const c of chunks) {
    out.set(c, off);
    off += c.byteLength;
  }
  return out.buffer as ArrayBuffer;
}

/** True if the file's first bytes look like a common photo format (JPEG, PNG, GIF, WebP, HEIC/HEIF, AVIF). */
async function looksLikeImage(f: File) {
  const b = new Uint8Array(await f.slice(0, 12).arrayBuffer());
  const s = (from: number, to: number) => String.fromCharCode(...b.slice(from, to));
  return (
    (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) ||
    (b[0] === 0x89 && s(1, 4) === "PNG") ||
    s(0, 4) === "GIF8" ||
    (s(0, 4) === "RIFF" && s(8, 12) === "WEBP") ||
    (s(4, 8) === "ftyp" && /^(hei|hev|mif|msf|avi)/.test(s(8, 11)))
  );
}

function toBase64(buf: ArrayBuffer) {
  const bytes = new Uint8Array(buf);
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

async function collectPhotos(form: FormData): Promise<{ attachments: Attachment[]; skipped: number }> {
  const files = form.getAll("attachment").filter((f): f is File => typeof f === "object" && f !== null && "arrayBuffer" in f && (f as File).size > 0);
  const attachments: Attachment[] = [];
  let total = 0;
  let skipped = 0;
  for (const f of files) {
    if (attachments.length >= MAX_FILES || total + f.size > MAX_ATTACH_BYTES || !(await looksLikeImage(f))) {
      skipped++;
      continue;
    }
    total += f.size;
    const name = (f.name || "photo.jpg").replace(/[^\w.\- ]+/g, "_").slice(-80) || "photo.jpg";
    attachments.push({ filename: name, content: toBase64(await f.arrayBuffer()) });
  }
  return { attachments, skipped };
}

// ---------- handler ----------
export function createHandler(cfg: Config, deps: Deps) {
  const allowed = (o: string | null) => {
    if (!o) return false;
    try {
      return cfg.allowedOrigins.test(new URL(o).origin);
    } catch {
      return false;
    }
  };

  return async function handle(req: Request): Promise<Response> {
    const originHeader = req.headers.get("origin");
    const referer = req.headers.get("referer");
    const origin = originHeader && originHeader !== "null" ? originHeader : null;
    const cors: Record<string, string> = {
      "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, accept",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Max-Age": "86400",
      Vary: "Origin",
    };
    if (origin && allowed(origin)) cors["Access-Control-Allow-Origin"] = new URL(origin).origin;

    if (req.method === "OPTIONS") return new Response(null, { status: origin && allowed(origin) ? 204 : 403, headers: cors });

    // Where to send a visitor who posted without JavaScript: back to the site they came from, never elsewhere.
    const site = [origin, referer].find((h) => allowed(h)) ? new URL([origin, referer].find((h) => allowed(h))!).origin : cfg.siteUrl;
    const wantsJson = (req.headers.get("accept") ?? "").includes("application/json");
    const headers = { ...cors, "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" };
    const json = (status: number, body: Record<string, unknown>) => new Response(JSON.stringify(body), { status, headers: { ...headers, "Content-Type": "application/json" } });
    const redirect = (url: string) => new Response(null, { status: 303, headers: { ...headers, Location: url } });
    const ok = () => (wantsJson ? json(200, { success: true }) : redirect(`${site}/thank-you/`));
    const fail = (status: number, code: string, extra: Record<string, unknown> = {}) =>
      wantsJson ? json(status, { success: false, error: code, ...extra }) : redirect(`${site}/contact/?sent=error&code=${encodeURIComponent(code)}`);

    let formKind = "unknown";
    let page = "";
    const record = async (outcome: Outcome, extra: Partial<Parameters<Store["record"]>[0]> = {}) => {
      const entry = { outcome, score: null, reasons: [], form: formKind, page, ipHash: null, contentHash: null, bodyHash: null, payload: null, ...extra };
      deps.log({ event: "quote_form", outcome, score: entry.score, reasons: entry.reasons, form: formKind, page });
      try {
        return await deps.store.record(entry);
      } catch (err) {
        deps.log({ event: "quote_form_store_error", error: String(err).slice(0, 200) });
        return false;
      }
    };

    // 1. Request shape
    if (req.method !== "POST") return wantsJson ? json(405, { success: false, error: "method_not_allowed" }) : redirect(`${site}/contact/`);
    if (origin && !allowed(origin)) {
      await record("rejected_origin");
      return json(403, { success: false, error: "forbidden_origin" });
    }
    const ctype = (req.headers.get("content-type") ?? "").toLowerCase();
    if (!ctype.startsWith("multipart/form-data") && !ctype.startsWith("application/x-www-form-urlencoded")) {
      await record("bad_request", { reasons: ["content_type"] });
      return fail(415, "unsupported_content_type");
    }
    const bytes = await readLimited(req, cfg.maxBodyBytes);
    if (!bytes) {
      await record("too_large");
      return fail(413, "too_large");
    }
    let form: FormData;
    try {
      form = await new Response(bytes, { headers: { "content-type": req.headers.get("content-type")! } }).formData();
    } catch {
      await record("bad_request", { reasons: ["bad_form_data"] });
      return fail(400, "bad_form_data");
    }

    const q: Quote = normalise(form);
    formKind = q.form;
    page = q.page;

    // 2. Honeypot: only bots fill the hidden field. Pretend it worked and send nothing.
    if (String(form.get("_honey") ?? "").trim()) {
      await record("honeypot");
      return ok();
    }

    // 3. Rate limit + duplicate lookup (one round trip to the shared store)
    const ip = clientIp(req);
    const ipHash = await hmac(cfg.hashSalt, `ip:${ip}`);
    const normDetails = normaliseText(q.details);
    const contentHash = await hmac(cfg.hashSalt, `c:${q.email}|${phoneDigits(q.phone)}|${q.postcode}|${q.service}|${normDetails}`);
    const bodyHash = normDetails.length >= 30 ? await hmac(cfg.hashSalt, `b:${normDetails}`) : "";
    const seen = await deps.store.check({
      ipHash,
      contentHash,
      bodyHash: bodyHash || "-",
      shortWindowSec: cfg.rateShortWindowSec,
      longWindowSec: cfg.rateLongWindowSec,
      duplicateWindowSec: cfg.duplicateWindowSec,
      bulkWindowSec: bodyHash ? cfg.bulkWindowSec : 0,
    });
    if (seen.shortCount > cfg.rateShortMax || seen.longCount > cfg.rateLongMax) {
      await record("rate_limited", { ipHash });
      return fail(429, "rate_limited");
    }

    // 4. Cloudflare Turnstile
    let turnstile: "pass" | "fail" | "skipped" = "skipped";
    if (cfg.turnstileMode !== "off") {
      const result = await verifyTurnstile({ secret: cfg.turnstileSecret, token: String(form.get(TOKEN_FIELD) ?? ""), ip: ip === "unknown" ? undefined : ip, hostnames: cfg.turnstileHostnames }, deps.fetch);
      if (result.ok) turnstile = "pass";
      else if (result.reason === "unavailable") {
        // Cloudflare unreachable or misconfigured: don't turn customers away; the other layers still apply.
        deps.log({ event: "turnstile_unavailable", codes: result.codes ?? [] });
      } else if (cfg.turnstileMode === "enforce") {
        await record("turnstile_failed", { reasons: [result.reason], ipHash });
        const code = result.reason === "missing" ? "verification_required" : result.reason === "expired_or_reused" ? "verification_expired" : "verification_failed";
        return fail(403, code);
      } else turnstile = "fail";
    }

    // 5. Validation
    const errors: FieldError[] = validate(q, form);
    if (errors.length) {
      await record("invalid", { reasons: errors, ipHash });
      return fail(400, "invalid_fields", { fields: errors });
    }

    // 6. Same enquiry already delivered (double click, or a retry after a slow response)
    if (seen.duplicate) {
      await record("duplicate", { ipHash, contentHash });
      return ok();
    }

    // 7. Spam score
    const elapsedRaw = Number.parseInt(String(form.get("_elapsed") ?? ""), 10);
    const { score, reasons } = scoreQuote(q, {
      elapsedMs: Number.isFinite(elapsedRaw) && elapsedRaw >= 0 ? elapsedRaw : null,
      hasOriginOrReferer: Boolean(origin || referer),
      turnstile,
      bulkCount: seen.bulkCount,
    }, { strict: cfg.strict });
    const risk: Risk = classify(score, cfg.mediumThreshold, cfg.highThreshold);
    const base = { score, reasons, ipHash, contentHash, bodyHash: bodyHash || null };

    if (!cfg.resendApiKey) {
      deps.log({ event: "config_error", error: "RESEND_API_KEY is not set" });
      return fail(500, "email_not_configured");
    }

    // Likely spam (and, in strict mode, anything suspicious): hold in the review queue instead of
    // the inbox. If the queue can't be saved durably, email it (flagged) so a misjudged genuine
    // enquiry is never lost.
    const hold = risk === "high" || (cfg.strict && risk === "medium");
    if (hold) {
      const durable = await record("quarantined", { ...base, payload: { ...q, files: form.getAll("attachment").length } });
      if (durable) return ok();
      deps.log({ event: "quarantine_not_durable", fallback: "email" });
    }

    const flagged = risk !== "low";
    const toReview = flagged && Boolean(cfg.reviewEmail);
    const { attachments, skipped } = await collectPhotos(form);
    try {
      await sendEmail(
        cfg,
        enquiryEmail(cfg, q, { origin: site, attachments, skipped, flag: flagged ? { score, reasons } : null, to: [toReview ? cfg.reviewEmail : cfg.to], copies: !toReview && !hold }),
        deps.fetch,
      );
    } catch (err) {
      const msg = String(err);
      deps.log({ event: "email_error", error: msg.slice(0, 300) });
      const code = /domain is not verified|not verified/i.test(msg) ? "sender_domain_not_verified"
        : /Resend 40[13]/.test(msg) ? "resend_key_invalid"
        : /Resend 422/.test(msg) ? "resend_rejected"
        : "email_send_failed";
      await record("send_failed", { ...base, reasons: [...reasons, code] });
      return fail(502, code);
    }
    if (!hold) await record(flagged ? "delivered_flagged" : "delivered", base);

    // Auto-reply only for low-risk enquiries, so the form can't be used to message strangers.
    if (!flagged && q.email) {
      try {
        await sendEmail(cfg, autoReplyEmail(cfg, q, attachments.length), deps.fetch);
      } catch (err) {
        deps.log({ event: "autoreply_error", error: String(err).slice(0, 300) });
      }
    }
    return ok();
  };
}
