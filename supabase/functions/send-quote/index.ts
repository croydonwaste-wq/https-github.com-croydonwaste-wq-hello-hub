// Quote form handler (Supabase Edge Function). Emails each genuine website enquiry through
// Resend, and filters spam on the server before anything reaches the inbox.
// See handler.ts for the pipeline and docs/FORM-SPAM-PROTECTION.md for set-up and tuning.
//
// Secrets / env (Lovable Cloud → Secrets, or `supabase secrets set`):
//   RESEND_API_KEY        required — the "re_…" API key from resend.com/api-keys
//   QUOTE_FROM_EMAIL      optional — sender on your Resend-verified domain
//   QUOTE_TO_EMAIL        optional — where enquiries go
//   QUOTE_CC_EMAIL        optional — visible copy of every enquiry (comma-separated for several)
//   QUOTE_BCC_EMAIL       optional — blind copy of every enquiry (comma-separated for several)
//   QUOTE_REVIEW_EMAIL    optional — inbox for "possible spam" enquiries (default: main inbox, flagged)
//   SITE_URL              optional — used for the thank-you redirect
//   TURNSTILE_SECRET_KEY  optional — Cloudflare Turnstile secret; turns on bot verification
//   TURNSTILE_MODE        optional — "enforce" (default) | "monitor" | "off"
//   FORM_HASH_SALT        optional — key for hashing IP addresses (defaults to the service key)
//   RATE_LIMIT_*, SPAM_*_THRESHOLD, DUPLICATE_WINDOW_SEC, … — see config.ts
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided automatically by Supabase.

import { loadConfig } from "./config.ts";
import { createHandler } from "./handler.ts";
import { FailoverStore, MemoryStore, SupabaseStore } from "./store.ts";

const cfg = loadConfig((k) => Deno.env.get(k));
const log = (entry: Record<string, unknown>) => console.log(JSON.stringify(entry));
const primary = cfg.supabaseUrl && cfg.supabaseServiceKey ? new SupabaseStore(cfg.supabaseUrl, cfg.supabaseServiceKey) : null;
const store = new FailoverStore(primary, new MemoryStore(), (msg) => log({ event: "store_fallback", message: msg }));

log({ event: "send_quote_boot", turnstile: cfg.turnstileMode, store: primary ? "supabase" : "memory", review_inbox: Boolean(cfg.reviewEmail) });

Deno.serve(createHandler(cfg, { fetch, store, log }));
