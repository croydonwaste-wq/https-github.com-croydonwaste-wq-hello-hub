// Quote form handler: emails each website enquiry through Resend.
//
// - Sends the enquiry to the business inbox (QUOTE_TO_EMAIL), CC QUOTE_CC_EMAIL and BCC QUOTE_BCC_EMAIL.
// - Sends the customer an automatic reply summarising their request, if they gave an email.
// - Accepts the normal multipart form POST from the site (works without JavaScript, carries
//   photo attachments) and redirects the visitor to /thank-you/.
//
// Secrets / env (set in Lovable Cloud → Secrets, or `supabase secrets set`):
//   RESEND_API_KEY   required — the "re_…" API key from resend.com/api-keys
//   QUOTE_FROM_EMAIL optional — sender on your Resend-verified domain
//   QUOTE_TO_EMAIL   optional — where enquiries go
//   QUOTE_CC_EMAIL   optional — visible copy of every enquiry (comma-separated for several)
//   QUOTE_BCC_EMAIL  optional — blind copy of every enquiry (comma-separated for several)
//   SITE_URL         optional — used for the thank-you redirect

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const FROM = Deno.env.get("QUOTE_FROM_EMAIL") ?? "Watford Rubbish Clearance <quotes@watfordrubbishclearance.co.uk>";
const TO = Deno.env.get("QUOTE_TO_EMAIL") ?? "hello@watfordrubbishclearance.co.uk";
const CC = (Deno.env.get("QUOTE_CC_EMAIL") ?? "admin@reepro.co.uk").split(",").map((s) => s.trim()).filter(Boolean);
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
  ["consent", "Consent to contact"],
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
const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });

// ---------- Branded email layout (table-based + inline styles so it renders in Gmail/Outlook/Apple Mail) ----------
const C = { navy: "#0A1D3F", navy700: "#1E3F7A", navy50: "#F4F7FB", navy100: "#E6ECF6", red: "#C21D25", yellow: "#E9B949", ink: "#121826", ink700: "#374151", ink500: "#6B7280", line: "#E5E7EB" };
const FONT = "'Manrope','Segoe UI',Helvetica,Arial,sans-serif";
const TEL = `tel:+44${PHONE.replace(/\s/g, "").replace(/^0/, "")}`;
const telOf = (p: string) => `tel:${p.replace(/[^\d+]/g, "").replace(/^0/, "+44")}`;

function button(href: string, label: string, bg = C.red) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:4px 0"><tr><td style="border-radius:6px;background:${bg}"><a href="${esc(href)}" style="display:inline-block;padding:13px 24px;font:700 15px ${FONT};color:#ffffff;text-decoration:none;border-radius:6px">${esc(label)}</a></td></tr></table>`;
}

function table(rows: [string, string][]) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;border:1px solid ${C.line};border-radius:8px">${rows
    .map(
      ([k, v], i) =>
        `<tr style="background:${i % 2 ? "#ffffff" : C.navy50}"><td valign="top" style="padding:11px 14px;width:38%;font:600 13px ${FONT};color:${C.ink500};text-transform:uppercase;letter-spacing:.04em;border-bottom:1px solid ${C.line}">${esc(k)}</td><td valign="top" style="padding:11px 14px;font:15px/1.5 ${FONT};color:${C.ink};white-space:pre-wrap;border-bottom:1px solid ${C.line}">${esc(v)}</td></tr>`,
    )
    .join("")}</table>`;
}

/** Wraps content in the branded shell: logo header, red/yellow/blue accent bar, navy footer. */
function layout({ preheader, eyebrow, heading, body }: { preheader: string; eyebrow: string; heading: string; body: string }) {
  const site = SITE_URL.replace(/^https?:\/\//, "");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${esc(heading)}</title></head>
<body style="margin:0;padding:0;background:${C.navy50}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.navy50}"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid ${C.navy100}">
  <tr><td style="padding:20px 28px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      <td><a href="${SITE_URL}/"><img src="${SITE_URL}/email-logo.png" width="187" height="44" alt="${BUSINESS}" style="display:block;border:0"></a></td>
      <td align="right" style="font:700 12px ${FONT};color:${C.navy700}">Open 24/7<br><a href="${TEL}" style="color:${C.navy};text-decoration:none;font-size:15px">${PHONE}</a></td>
    </tr></table>
  </td></tr>
  <tr><td style="font-size:0;line-height:0"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td height="4" width="34%" style="background:${C.red}"></td><td height="4" width="33%" style="background:${C.yellow}"></td><td height="4" width="33%" style="background:${C.navy700}"></td></tr></table></td></tr>
  <tr><td style="background:${C.navy};padding:26px 28px">
    <div style="font:700 11px ${FONT};letter-spacing:.16em;text-transform:uppercase;color:${C.yellow}">${esc(eyebrow)}</div>
    <div style="margin-top:6px;font:800 24px/1.25 ${FONT};color:#ffffff">${esc(heading)}</div>
  </td></tr>
  <tr><td style="padding:26px 28px;font:15px/1.6 ${FONT};color:${C.ink700}">${body}</td></tr>
  <tr><td style="background:${C.navy};padding:22px 28px;font:13px/1.6 ${FONT};color:#C9D5EA">
    <div style="font:700 15px ${FONT};color:#ffffff">${BUSINESS}</div>
    <div style="margin-top:4px">Rubbish removal &amp; clearance across Watford and Hertfordshire</div>
    <div style="margin-top:10px"><a href="${TEL}" style="color:${C.yellow};text-decoration:none;font-weight:700">${PHONE}</a> &nbsp;·&nbsp; <a href="mailto:${TO}" style="color:#ffffff;text-decoration:none">${TO}</a> &nbsp;·&nbsp; <a href="${SITE_URL}/" style="color:#ffffff;text-decoration:none">${site}</a></div>
    <div style="margin-top:10px;font-size:12px;color:#8FA3C7">Open 24/7 &nbsp;·&nbsp; Same-day collections &nbsp;·&nbsp; Licensed waste carrier &nbsp;·&nbsp; £5 million public liability</div>
  </td></tr>
</table>
</td></tr></table></body></html>`;
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
  // The site submits with fetch and asks for JSON; a plain HTML form POST (no JavaScript) gets redirects.
  const wantsJson = (req.headers.get("accept") ?? "").includes("application/json");
  const ok = () => (wantsJson ? json(200, { success: true }) : redirect(`${origin}/thank-you/`));
  const fail = (status: number, code: string) =>
    wantsJson ? json(status, { success: false, error: code }) : redirect(`${origin}/contact/?sent=error&code=${code}`);
  if (req.method !== "POST") return wantsJson ? json(405, { success: false, error: "method_not_allowed" }) : redirect(`${origin}/contact/`);

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return fail(400, "bad_form_data");
  }

  // Honeypot: bots fill the hidden field. Pretend it worked, send nothing.
  if (String(form.get("_honey") ?? "").trim()) return ok();

  const v = (k: string) => String(form.get(k) ?? "").trim().slice(0, 4000);
  const name = v("name");
  const phone = v("phone");
  const email = EMAIL_RE.test(v("email")) ? v("email") : "";
  if (name.length < 2 || phone.replace(/\D/g, "").length < 10) return fail(400, "missing_details");

  const rows = FIELDS.map(([k, label]) => [label, k === "email" ? email : k === "postcode" ? v(k).toUpperCase() : v(k)] as [string, string]).filter(([, val]) => val);
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
    return fail(500, "email_not_configured");
  }

  // 1) Enquiry to the business.
  try {
    await sendEmail({
      from: FROM,
      to: [TO],
      cc: CC.length ? CC : undefined,
      bcc: BCC.length ? BCC : undefined,
      reply_to: email || undefined,
      subject,
      html: layout({
        preheader: `${name} · ${phone}${v("postcode") ? ` · ${v("postcode").toUpperCase()}` : ""} — ${v("service") || "Rubbish removal"}`,
        eyebrow: `New ${kind.toLowerCase()} · website`,
        heading: `${name}${v("postcode") ? ` · ${v("postcode").toUpperCase()}` : ""}`,
        body: `<p style="margin:0 0 16px"><strong style="color:${C.ink}">${esc(v("service") || "Rubbish removal")}</strong>${v("load_size") ? ` — ${esc(v("load_size"))}` : ""}</p>
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right:10px">${button(telOf(phone), `Call ${phone}`)}</td>${email ? `<td>${button(`mailto:${email}?subject=${encodeURIComponent(`Your quote from ${BUSINESS}`)}`, "Email customer", C.navy)}</td>` : ""}</tr></table>
<div style="height:20px"></div>${table(rows)}
<p style="margin:18px 0 0;font-size:13px;color:${C.ink500}">Sent from <a href="${esc(origin + page)}" style="color:${C.navy700}">${esc(origin.replace(/^https?:\/\//, "") + page)}</a>${attachments.length ? ` · <strong>${attachments.length} photo(s) attached</strong>` : ""}${files.length > attachments.length ? ` · ${files.length - attachments.length} photo(s) skipped (over 10MB)` : ""}${email ? " · Reply to this email to answer the customer directly." : " · No email given — please call the customer."}</p>`,
      }),
      text: `New ${kind.toLowerCase()} from the website\n\n${text(rows)}\n\nSent from ${origin + page}`,
      attachments: attachments.length ? attachments : undefined,
    });
  } catch (err) {
    console.error("Failed to send enquiry", err);
    const msg = String(err);
    // Surface the common Resend set-up problems as short codes the owner can act on.
    const code = /domain is not verified|not verified/i.test(msg) ? "sender_domain_not_verified"
      : /Resend 40[13]/.test(msg) ? "resend_key_invalid"
      : /Resend 422/.test(msg) ? "resend_rejected"
      : "email_send_failed";
    return fail(502, code);
  }

  // 2) Automatic reply to the customer. A failure here must not lose the enquiry, so just log it.
  if (email) {
    const summary = rows.filter(([k]) => k !== "Email" && k !== "Consent to contact");
    try {
      await sendEmail({
        from: FROM,
        to: [email],
        reply_to: TO,
        subject: `We've received your quote request – ${BUSINESS}`,
        html: layout({
          preheader: "Thanks — we've got your request. A member of our team will be in contact in due course.",
          eyebrow: "Quote request received",
          heading: `Thanks, ${name.split(" ")[0]} — we've got your request`,
          body: `<p style="margin:0 0 14px">Thank you for your quote request with ${BUSINESS}. We've received your details and <strong style="color:${C.ink}">a member of our team will be in contact in due course</strong> with your price.</p>
<p style="margin:0 0 10px;font:800 13px ${FONT};letter-spacing:.08em;text-transform:uppercase;color:${C.navy}">Your request</p>
${table(summary)}
<p style="margin:18px 0">${attachments.length ? `We also received ${attachments.length} photo(s) — thank you, they help us price accurately.` : "Photos help us price accurately — just reply to this email with a few pictures if you can."}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.navy50};border-left:4px solid ${C.yellow};border-radius:6px"><tr><td style="padding:16px 18px">
<div style="font:700 15px ${FONT};color:${C.navy}">Need it gone today?</div>
<div style="margin:4px 0 12px;color:${C.ink700}">We're open 24 hours, 7 days a week, with same-day collections available.</div>
${button(TEL, `Call ${PHONE}`)}
</td></tr></table>
<p style="margin:22px 0 0">Kind regards,<br><strong style="color:${C.ink}">The ${BUSINESS} team</strong></p>
<p style="margin:20px 0 0;font-size:12px;color:${C.ink500}">You're receiving this because a quote was requested on our website using this email address. If this wasn't you, please ignore this email.</p>`,
        }),
        text: `Hi ${name.split(" ")[0]},\n\nThank you for your quote request with ${BUSINESS}. We've received your details and a member of our team will be in contact in due course with your price.\n\nSummary of your request:\n${text(summary)}\n\nNeed it gone today? Call ${PHONE} — we're open 24/7.\n\nKind regards,\nThe ${BUSINESS} team\n${SITE_URL}/`,
      });
    } catch (err) {
      console.error("Failed to send customer auto-reply", err);
    }
  }

  return ok();
});
