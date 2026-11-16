// Cloudflare Turnstile server-side verification (Siteverify).
// https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
// Tokens are single-use and expire after 5 minutes; Siteverify reports both as "timeout-or-duplicate".

export const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
export const TURNSTILE_ACTION = "quote";

export type TurnstileResult =
  | { ok: true }
  | { ok: false; reason: "missing" | "invalid" | "expired_or_reused" | "wrong_hostname" | "wrong_action" | "unavailable"; codes?: string[] };

export async function verifyTurnstile(
  opts: { secret: string; token: string; ip?: string; hostnames: string[] },
  fetchFn: typeof fetch = fetch,
): Promise<TurnstileResult> {
  const token = opts.token.trim();
  if (!token) return { ok: false, reason: "missing" };
  if (token.length > 2048) return { ok: false, reason: "invalid" };

  const body = new FormData();
  body.set("secret", opts.secret);
  body.set("response", token);
  if (opts.ip) body.set("remoteip", opts.ip);

  let data: { success?: boolean; "error-codes"?: string[]; hostname?: string; action?: string; metadata?: { result_with_testing_key?: boolean } };
  try {
    const res = await fetchFn(SITEVERIFY_URL, { method: "POST", body, signal: AbortSignal.timeout(8000) });
    data = await res.json();
  } catch {
    return { ok: false, reason: "unavailable" };
  }
  const codes = data["error-codes"] ?? [];
  if (!data.success) {
    if (codes.includes("timeout-or-duplicate")) return { ok: false, reason: "expired_or_reused", codes };
    if (codes.some((c) => c.startsWith("internal") || c === "invalid-input-secret" || c === "missing-input-secret")) return { ok: false, reason: "unavailable", codes };
    return { ok: false, reason: "invalid", codes };
  }
  // Cloudflare's dummy test keys report hostname "example.com" and no action; only check real results.
  if (!data.metadata?.result_with_testing_key) {
    if (opts.hostnames.length && data.hostname && !opts.hostnames.includes(data.hostname) && !/(^|\.)(lovable\.app|lovableproject\.com)$|^localhost$/.test(data.hostname)) {
      return { ok: false, reason: "wrong_hostname" };
    }
    if (data.action && data.action !== TURNSTILE_ACTION) return { ok: false, reason: "wrong_action" };
  }
  return { ok: true };
}
