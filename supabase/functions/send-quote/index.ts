// Quote form handler: emails each website enquiry through Resend.
//
// - Sends the enquiry to the business inbox (QUOTE_TO_EMAIL) with a BCC (QUOTE_BCC_EMAIL).
// - Sends the customer an automatic reply summarising their request, if they gave an email.
// - Accepts the normal multipart form POST from the site (works without JavaScript, carries
//   photo attachments) and redirects the visitor to /thank-you/.
//
// Secrets / env (set in Lovable Cloud → Secrets, or `supabase secrets set`):
//   RESEND_API_KEY   required — the "re_…" API key from resend.com/api-keys
//   QUOTE_FROM_EMAIL optional — sender on your Resend-verified domain
//   QUOTE_TO_EMAIL   optional — where enquiries go
//   QUOTE_BCC_EMAIL  optional — blind copy of every enquiry (comma-separated for several)
//   SITE_URL         optional — used for the thank-you redirect

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const FROM = Deno.env.get("QUOTE_FROM_EMAIL") ?? "Watford Rubbish Clearance <quotes@watfordrubbishclearance.co.uk>";
const TO = Deno.env.get("QUOTE_TO_EMAIL") ?? "hello@watfordrubbishclearance.co.uk";
const BCC = (Deno.env.get("QUOTE_BCC_EMAIL") ?? "info@croydonwaste.co.uk").split(",").map((s) => s.trim()).filter(Boolean);
const SITE_URL = (Deno.env.get("SITE_URL") ?? "https://www.watfordrubbishclearance.co.uk").replace(/\/$/, "");

const BUSINESS = "Watford Rubbish Clearance";
const PHONE = "01293 549164";
const MAX_ATTACH_BYTES = 10 * 1024 * 1024;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Order and labels used in both emails.
const FIELDS: [string, string][] = [
  ["name", "Name"],
  ["phone", "Phone"],
  ["email", "Email"],
  ["postcode", "Postcode"],
  ["service", "Service"],
  ["load_size", "Load size"],
  ["access", "Location / access"],
  ["preferred_date", "Preferred date"],
  ["preferred_time", "Preferred time"],
  ["details", "What needs removing"],
];

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Send the visitor back to the site they came from (live site or Lovable preview), never elsewhere. */
function siteOrigin(req: Request): string {
  for (const h of [req.headers.get("origin"), req.headers.get("referer")]) {
    if (!h) continue;
    try {
      const u = new URL(h);
      if (u.protocol === "https:" && /(^|\.)(watfordrubbishclearance\.co\.uk|lovable\.app|lovableproject\.com)$/.test(u.hostname)) return u.origin;
      if (u.hostname === "localhost") return u.origin;
    } catch { /* ignore */ }
  }
  return SITE_URL;
}

const redirect = (url: string) => new Response(null, { status: 303, headers: { ...CORS, Location: url } });

function table(rows: [string, string][]) {
  return `<table cellpadding="8" cellspacing="0" style="border-collapse:collapse;font:15px/1.45 Arial,sans-serif;color:#1a2433;width:100%;max-width:640px">${rows
    .map(
      ([k, v]) =>
        `<tr><th align="left" valign="top" style="border-bottom:1px solid #e5e8ee;width:38%;color:#4a5568;font-weight:600">${esc(k)}</th><td style="border-bottom:1px solid #e5e8ee;white-space:pre-wrap">${esc(v)}</td></tr>`,
    )
    .join("")}</table>`;
}

const text = (rows: [string, string][]) => rows.map(([k, v]) => `${k}: ${v}`).join("\n");

async function sendEmail(payload: Record<string, unknown>) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

function toBase64(buf: ArrayBuffer) {
  const bytes = new Uint8Array(buf);
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  const origin = siteOrigin(req);
  if (req.method !== "POST") return redirect(`${origin}/contact/`);

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return redirect(`${origin}/contact/?sent=error`);
  }

  // Honeypot: bots fill the hidden field. Pretend it worked, send nothing.
  if (String(form.get("_honey") ?? "").trim()) return redirect(`${origin}/thank-you/`);

  const v = (k: string) => String(form.get(k) ?? "").trim().slice(0, 4000);
  const name = v("name");
  const phone = v("phone");
  const email = EMAIL_RE.test(v("email")) ? v("email") : "";
  if (name.length < 2 || phone.replace(/\D/g, "").length < 10) return redirect(`${origin}/contact/?sent=error`);

  const rows = FIELDS.map(([k, label]) => [label, k === "email" ? email : v(k)] as [string, string]).filter(([, val]) => val);
  const page = v("page");

  // Photos (full form only).
  const files = form.getAll("attachment").filter((f): f is File => f instanceof File && f.size > 0);
  const attachments: { filename: string; content: string }[] = [];
  let total = 0;
  for (const f of files) {
    total += f.size;
    if (total > MAX_ATTACH_BYTES) break;
    attachments.push({ filename: f.name || "photo.jpg", content: toBase64(await f.arrayBuffer()) });
  }

  const kind = v("form") === "compact" ? "Quick quote" : "Quote request";
  const subject = `${kind}: ${v("service") || "Rubbish removal"} – ${name}${v("postcode") ? `, ${v("postcode").toUpperCase()}` : ""}`;

  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set");
    return redirect(`${origin}/contact/?sent=error`);
  }

  // 1) Enquiry to the business.
  try {
    await sendEmail({
      from: FROM,
      to: [TO],
      bcc: BCC.length ? BCC : undefined,
      reply_to: email || undefined,
      subject,
      html: `<div style="font:15px/1.5 Arial,sans-serif;color:#1a2433"><h2 style="margin:0 0 12px">New ${kind.toLowerCase()} from the website</h2>${table(rows)}<p style="color:#4a5568;font-size:13px">Sent from ${esc(origin + page)}${attachments.length ? ` · ${attachments.length} photo(s) attached` : ""}${files.length > attachments.length ? ` · ${files.length - attachments.length} photo(s) skipped (over 10MB)` : ""}${email ? " · Reply to this email to answer the customer directly." : ""}</p></div>`,
      text: `New ${kind.toLowerCase()} from the website\n\n${text(rows)}\n\nSent from ${origin + page}`,
      attachments: attachments.length ? attachments : undefined,
    });
  } catch (err) {
    console.error("Failed to send enquiry", err);
    return redirect(`${origin}/contact/?sent=error`);
  }

  // 2) Automatic reply to the customer. A failure here must not lose the enquiry, so just log it.
  if (email) {
    const summary = rows.filter(([k]) => k !== "Email");
    try {
      await sendEmail({
        from: FROM,
        to: [email],
        reply_to: TO,
        subject: `We've received your quote request – ${BUSINESS}`,
        html: `<div style="font:15px/1.6 Arial,sans-serif;color:#1a2433;max-width:640px">
<p>Hi ${esc(name.split(" ")[0])},</p>
<p>Thank you for your quote request with ${BUSINESS}. We've received your details and a member of our team will be in contact in due course with your price.</p>
<p><strong>Here's a summary of what you sent us:</strong></p>
${table(summary)}
${attachments.length ? `<p>We also received ${attachments.length} photo(s).</p>` : "<p>Photos help us price accurately — just reply to this email with a few pictures if you can.</p>"}
<p>Need it gone today? Call us on <a href="tel:+44${PHONE.replace(/\s/g, "").replace(/^0/, "")}">${PHONE}</a> — we're open 24 hours, 7 days a week.</p>
<p>Kind regards,<br>The ${BUSINESS} team<br><a href="${SITE_URL}/">${SITE_URL.replace(/^https?:\/\//, "")}</a></p>
<p style="color:#6b7280;font-size:12px">You're receiving this because a quote was requested on our website using this email address. If this wasn't you, please ignore this email.</p>
</div>`,
        text: `Hi ${name.split(" ")[0]},\n\nThank you for your quote request with ${BUSINESS}. We've received your details and a member of our team will be in contact in due course with your price.\n\nSummary of your request:\n${text(summary)}\n\nNeed it gone today? Call ${PHONE} — we're open 24/7.\n\nKind regards,\nThe ${BUSINESS} team\n${SITE_URL}/`,
      });
    } catch (err) {
      console.error("Failed to send customer auto-reply", err);
    }
  }

  return redirect(`${origin}/thank-you/`);
});
