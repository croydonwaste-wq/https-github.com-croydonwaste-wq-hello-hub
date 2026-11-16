// Runtime settings for the quote form handler. Everything is read from environment variables
// (Lovable Cloud → Secrets, or `supabase secrets set`) so thresholds can be tuned without a deploy.
// Pure module: no Deno globals, so it runs under both Deno (production) and Node (tests).

export type Config = {
  // Email delivery (Resend)
  resendApiKey: string;
  from: string;
  to: string;
  cc: string[];
  bcc: string[];
  /** Optional separate inbox for "medium risk" enquiries. Unset → they go to the main inbox, flagged. */
  reviewEmail: string;
  siteUrl: string;

  // Cloudflare Turnstile
  turnstileSecret: string;
  /** "enforce" (default when a secret is set): missing/invalid token is rejected. "monitor": scored, not rejected. "off". */
  turnstileMode: "enforce" | "monitor" | "off";
  /** Hostnames the Turnstile token must have been issued on. */
  turnstileHostnames: string[];

  // Request limits
  allowedOrigins: RegExp;
  maxBodyBytes: number;

  // Rate limiting (per hashed IP)
  rateShortMax: number;
  rateShortWindowSec: number;
  rateLongMax: number;
  rateLongWindowSec: number;
  /** Same enquiry (same contact details + message) inside this window is not emailed twice. */
  duplicateWindowSec: number;
  /** Window for spotting one message template sent from several different connections. */
  bulkWindowSec: number;

  // Spam score thresholds
  mediumThreshold: number;
  highThreshold: number;

  // Storage / privacy
  supabaseUrl: string;
  supabaseServiceKey: string;
  hashSalt: string;
};

const DEFAULT_ORIGINS = /^https:\/\/([a-z0-9-]+\.)*(watfordrubbishclearance\.co\.uk|lovable\.app|lovableproject\.com)$|^http:\/\/localhost(:\d+)?$/;

const int = (v: string | undefined, d: number, min = 0) => {
  const n = Number.parseInt(v ?? "", 10);
  return Number.isFinite(n) && n >= min ? n : d;
};
const list = (v: string | undefined, d: string) => (v ?? d).split(",").map((s) => s.trim()).filter(Boolean);

export function loadConfig(env: (k: string) => string | undefined): Config {
  const turnstileSecret = env("TURNSTILE_SECRET_KEY") ?? "";
  const modeRaw = (env("TURNSTILE_MODE") ?? "").toLowerCase();
  const turnstileMode = !turnstileSecret ? "off" : modeRaw === "monitor" || modeRaw === "off" ? modeRaw : "enforce";
  let allowedOrigins = DEFAULT_ORIGINS;
  const extra = list(env("FORM_ALLOWED_ORIGINS"), "");
  if (extra.length) {
    const esc = extra.map((o) => o.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\/$/, ""));
    allowedOrigins = new RegExp(`${DEFAULT_ORIGINS.source}|^(${esc.join("|")})$`);
  }
  const supabaseServiceKey = env("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  return {
    resendApiKey: env("RESEND_API_KEY") ?? "",
    from: env("QUOTE_FROM_EMAIL") ?? "Watford Rubbish Clearance <quotes@watfordrubbishclearance.co.uk>",
    to: env("QUOTE_TO_EMAIL") ?? "hello@watfordrubbishclearance.co.uk",
    cc: list(env("QUOTE_CC_EMAIL"), "admin@reepro.co.uk"),
    bcc: list(env("QUOTE_BCC_EMAIL"), "info@croydonwaste.co.uk"),
    reviewEmail: env("QUOTE_REVIEW_EMAIL") ?? "",
    siteUrl: (env("SITE_URL") ?? "https://www.watfordrubbishclearance.co.uk").replace(/\/$/, ""),

    turnstileSecret,
    turnstileMode,
    turnstileHostnames: list(env("TURNSTILE_HOSTNAMES"), "www.watfordrubbishclearance.co.uk,watfordrubbishclearance.co.uk"),

    allowedOrigins,
    // 10MB of photos plus multipart overhead and text fields.
    maxBodyBytes: int(env("FORM_MAX_BODY_BYTES"), 12 * 1024 * 1024, 1024),

    rateShortMax: int(env("RATE_LIMIT_SHORT_MAX"), 3, 1),
    rateShortWindowSec: int(env("RATE_LIMIT_SHORT_WINDOW_SEC"), 600, 1),
    rateLongMax: int(env("RATE_LIMIT_LONG_MAX"), 10, 1),
    rateLongWindowSec: int(env("RATE_LIMIT_LONG_WINDOW_SEC"), 3600, 1),
    duplicateWindowSec: int(env("DUPLICATE_WINDOW_SEC"), 1800, 0),
    bulkWindowSec: int(env("BULK_WINDOW_SEC"), 86400, 0),

    mediumThreshold: int(env("SPAM_MEDIUM_THRESHOLD"), 5, 1),
    highThreshold: int(env("SPAM_HIGH_THRESHOLD"), 10, 1),

    supabaseUrl: (env("SUPABASE_URL") ?? "").replace(/\/$/, ""),
    supabaseServiceKey,
    // Key for one-way hashing of IP addresses. Falls back to the service key (also secret).
    hashSalt: env("FORM_HASH_SALT") || supabaseServiceKey || "send-quote",
  };
}
