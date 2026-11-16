// Branded enquiry and auto-reply emails, sent through Resend.
// Table-based with inline styles so they render in Gmail, Outlook and Apple Mail.
// Every customer-supplied value is HTML-escaped; subjects and headers only ever receive
// single-line values (see validate.oneLine), which blocks header injection.

import type { Config } from "./config.ts";
import type { Quote } from "./validate.ts";
import { URL_RE } from "./validate.ts";

export const BUSINESS = "Watford Rubbish Clearance";
export const PHONE = "01293 549164";

// Order and labels used in both emails.
const FIELDS: [keyof Quote, string][] = [
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

export const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

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
function layout(cfg: Config, { preheader, eyebrow, heading, body }: { preheader: string; eyebrow: string; heading: string; body: string }) {
  const SITE_URL = cfg.siteUrl;
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
    <div style="margin-top:10px"><a href="${TEL}" style="color:${C.yellow};text-decoration:none;font-weight:700">${PHONE}</a> &nbsp;·&nbsp; <a href="mailto:${esc(cfg.to)}" style="color:#ffffff;text-decoration:none">${esc(cfg.to)}</a> &nbsp;·&nbsp; <a href="${SITE_URL}/" style="color:#ffffff;text-decoration:none">${site}</a></div>
    <div style="margin-top:10px;font-size:12px;color:#8FA3C7">Open 24/7 &nbsp;·&nbsp; Same-day collections &nbsp;·&nbsp; Licensed waste carrier &nbsp;·&nbsp; £5 million public liability</div>
  </td></tr>
</table>
</td></tr></table></body></html>`;
}

const text = (rows: [string, string][]) => rows.map(([k, v]) => `${k}: ${v}`).join("\n");

export type Attachment = { filename: string; content: string };

export async function sendEmail(cfg: Config, payload: Record<string, unknown>, fetchFn: typeof fetch = fetch) {
  const res = await fetchFn("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${cfg.resendApiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

const rowsOf = (q: Quote): [string, string][] => FIELDS.map(([k, label]) => [label, String(q[k] ?? "")] as [string, string]).filter(([, v]) => v);

/**
 * The enquiry email to the business.
 * `flag` marks a medium-risk enquiry: it gets a subject prefix and a note listing why, so
 * staff can check it before replying, but it is still delivered.
 */
export function enquiryEmail(
  cfg: Config,
  q: Quote,
  opts: { origin: string; attachments: Attachment[]; skipped: number; flag: { score: number; reasons: string[] } | null; to: string[]; copies: boolean },
) {
  const rows = rowsOf(q);
  const kind = q.form === "compact" ? "Quick quote" : "Quote request";
  const pc = q.postcode ? `, ${q.postcode}` : "";
  const subject = `${opts.flag ? "[Possible spam – please check] " : ""}${kind}: ${q.service || "Rubbish removal"} – ${q.name}${pc}`;
  const { attachments, skipped, origin } = opts;
  const flagNote = opts.flag
    ? `<p style="margin:0 0 16px;padding:12px 14px;border-left:4px solid ${C.yellow};background:${C.navy50};font-size:13px;color:${C.ink700}"><strong style="color:${C.ink}">Our spam filter wasn't sure about this one</strong> (score ${opts.flag.score}: ${esc(opts.flag.reasons.join(", "))}). It may be genuine — check before replying, and don't click links you don't recognise.</p>`
    : "";
  return {
    from: cfg.from,
    to: opts.to,
    cc: opts.copies && cfg.cc.length ? cfg.cc : undefined,
    bcc: opts.copies && cfg.bcc.length ? cfg.bcc : undefined,
    reply_to: q.email || undefined,
    subject: subject.slice(0, 250),
    html: layout(cfg, {
      preheader: `${q.name} · ${q.phone}${q.postcode ? ` · ${q.postcode}` : ""} — ${q.service || "Rubbish removal"}`,
      eyebrow: `New ${kind.toLowerCase()} · website`,
      heading: `${q.name}${q.postcode ? ` · ${q.postcode}` : ""}`,
      body: `${flagNote}<p style="margin:0 0 16px"><strong style="color:${C.ink}">${esc(q.service || "Rubbish removal")}</strong>${q.load_size ? ` — ${esc(q.load_size)}` : ""}</p>
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right:10px">${button(telOf(q.phone), `Call ${q.phone}`)}</td>${q.email ? `<td>${button(`mailto:${q.email}?subject=${encodeURIComponent(`Your quote from ${BUSINESS}`)}`, "Email customer", C.navy)}</td>` : ""}</tr></table>
<div style="height:20px"></div>${table(rows)}
<p style="margin:18px 0 0;font-size:13px;color:${C.ink500}">Sent from <a href="${esc(origin + q.page)}" style="color:${C.navy700}">${esc(origin.replace(/^https?:\/\//, "") + q.page)}</a>${attachments.length ? ` · <strong>${attachments.length} photo(s) attached</strong>` : ""}${skipped ? ` · ${skipped} file(s) skipped (not an image, or over 10MB)` : ""}${q.email ? " · Reply to this email to answer the customer directly." : " · No email given — please call the customer."}</p>`,
    }),
    text: `${opts.flag ? `POSSIBLE SPAM (score ${opts.flag.score}: ${opts.flag.reasons.join(", ")}) – please check before replying.\n\n` : ""}New ${kind.toLowerCase()} from the website\n\n${text(rows)}\n\nSent from ${origin + q.page}`,
    attachments: attachments.length ? attachments : undefined,
  };
}

/**
 * Automatic reply to the customer. Only sent for low-risk enquiries, so the form can't be used
 * to send messages to strangers' inboxes. Any links in the free-text field are not echoed back.
 */
export function autoReplyEmail(cfg: Config, q: Quote, photoCount: number) {
  const safe: Quote = { ...q, details: q.details && (q.details.match(URL_RE) ?? []).length ? "(included in your request)" : q.details };
  const summary = rowsOf(safe).filter(([k]) => k !== "Email" && k !== "Consent to contact");
  const first = q.name.split(" ")[0];
  return {
    from: cfg.from,
    to: [q.email],
    reply_to: cfg.to,
    subject: `We've received your quote request – ${BUSINESS}`,
    html: layout(cfg, {
      preheader: "Thanks — we've got your request. A member of our team will be in contact in due course.",
      eyebrow: "Quote request received",
      heading: `Thanks, ${first} — we've got your request`,
      body: `<p style="margin:0 0 14px">Thank you for your quote request with ${BUSINESS}. We've received your details and <strong style="color:${C.ink}">a member of our team will be in contact in due course</strong> with your price.</p>
<p style="margin:0 0 10px;font:800 13px ${FONT};letter-spacing:.08em;text-transform:uppercase;color:${C.navy}">Your request</p>
${table(summary)}
<p style="margin:18px 0">${photoCount ? `We also received ${photoCount} photo(s) — thank you, they help us price accurately.` : "Photos help us price accurately — just reply to this email with a few pictures if you can."}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.navy50};border-left:4px solid ${C.yellow};border-radius:6px"><tr><td style="padding:16px 18px">
<div style="font:700 15px ${FONT};color:${C.navy}">Need it gone today?</div>
<div style="margin:4px 0 12px;color:${C.ink700}">We're open 24 hours, 7 days a week, with same-day collections available.</div>
${button(TEL, `Call ${PHONE}`)}
</td></tr></table>
<p style="margin:22px 0 0">Kind regards,<br><strong style="color:${C.ink}">The ${BUSINESS} team</strong></p>
<p style="margin:20px 0 0;font-size:12px;color:${C.ink500}">You're receiving this because a quote was requested on our website using this email address. If this wasn't you, please ignore this email.</p>`,
    }),
    text: `Hi ${first},\n\nThank you for your quote request with ${BUSINESS}. We've received your details and a member of our team will be in contact in due course with your price.\n\nSummary of your request:\n${text(summary)}\n\nNeed it gone today? Call ${PHONE} — we're open 24/7.\n\nKind regards,\nThe ${BUSINESS} team\n${cfg.siteUrl}/`,
  };
}
