// Server-side validation and normalisation of quote form fields.
// The browser validates too, but anything can POST here directly, so this is the real check.

export type Quote = {
  form: "compact" | "full";
  page: string;
  name: string;
  phone: string;
  email: string;
  postcode: string;
  service: string;
  load_size: string;
  access: string;
  preferred_date: string;
  preferred_time: string;
  details: string;
  consent: string;
};

export type FieldError = "name" | "phone" | "email" | "postcode" | "service" | "details" | "consent";

export const MAX_DETAILS = 4000;
const UK_POSTCODE = /^[A-Z]{1,2}\d[A-Z\d]?(\s*\d[A-Z]{2})?$/i;
export const URL_RE = /\b(?:https?:\/\/|www\.)\S+|\b[a-z0-9-]+\.(?:com|net|org|info|biz|xyz|top|ru|cn|io|co|online|site|shop|store|link|click)(?:\/\S*)?\b/gi;

/** Collapse to one line: removes CR/LF and other control characters (blocks email header injection). */
export const oneLine = (s: string, max: number) =>
  s.replace(/[\u0000-\u001f\u007f-\u009f\u2028\u2029]+/g, " ").replace(/\s{2,}/g, " ").trim().slice(0, max);

/** Multi-line text: keep newlines and tabs, drop other control characters, cap blank lines. */
export const multiLine = (s: string, max: number) =>
  s.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/g, "").replace(/\n{4,}/g, "\n\n\n").trim().slice(0, max);

export const phoneDigits = (p: string) => p.replace(/\D/g, "");

export function validPhone(raw: string): boolean {
  if (!/^[\d\s()+\-.]{7,25}$/.test(raw)) return false;
  let d = phoneDigits(raw);
  const plus = raw.trim().startsWith("+") || raw.trim().startsWith("00");
  if (raw.trim().startsWith("00")) d = d.slice(2);
  if (d.startsWith("440")) d = `44${d.slice(3)}`; // "+44 (0)7700 900123"
  if (/^(\d)\1+$/.test(d)) return false; // 0000000000
  if ("01234567890123456789".includes(d) || "98765432109876543210".includes(d)) return false; // 0123456789
  if (plus || (d.startsWith("44") && d.length >= 12)) {
    if (d.startsWith("44")) return /^44[1-37-9]\d{8,9}$/.test(d); // UK in international format
    return d.length >= 8 && d.length <= 15; // other countries
  }
  // UK national format (10–11 digits), or a UK number typed without its leading 0.
  return /^0[1-37-9]\d{8,9}$/.test(d) || /^[1-37-9]\d{9}$/.test(d);
}

export function validEmail(e: string): boolean {
  if (e.length > 254 || /\s/.test(e)) return false;
  const m = /^([^@]{1,64})@([^@]+)$/.exec(e);
  if (!m) return false;
  const [, local, domain] = m;
  if (/^\.|\.$|\.\./.test(local) || /[<>()[\]\\,;:"]/.test(local)) return false;
  return /^(?=.{4,253}$)([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,24}$/i.test(domain);
}

export function validName(n: string): boolean {
  if (n.length < 2 || n.length > 100) return false;
  if (!/\p{L}/u.test(n)) return false; // at least one letter, any alphabet
  if (/[<>{}[\]\\|@#$%^*=_~`]/.test(n) || /https?:|www\./i.test(n)) return false;
  return /^[\p{L}\p{M}\s'’.,\-()&\d]+$/u.test(n);
}

export function normalise(form: FormData): Quote {
  const raw = (k: string) => String(form.get(k) ?? "");
  const date = oneLine(raw("preferred_date"), 10);
  const page = oneLine(raw("page"), 200);
  return {
    form: raw("form") === "compact" ? "compact" : "full",
    page: page.startsWith("/") && !page.startsWith("//") ? page : "/",
    name: oneLine(raw("name"), 120),
    phone: oneLine(raw("phone"), 30),
    email: oneLine(raw("email"), 254).toLowerCase(),
    postcode: oneLine(raw("postcode"), 10).toUpperCase(),
    service: oneLine(raw("service"), 120),
    load_size: oneLine(raw("load_size"), 80),
    access: oneLine(raw("access"), 80),
    preferred_date: /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : "",
    preferred_time: oneLine(raw("preferred_time"), 80),
    details: multiLine(raw("details"), MAX_DETAILS),
    consent: raw("consent") ? "Yes" : "",
  };
}

/** Returns the fields that fail. Mirrors the browser rules in src/components/QuoteForm.tsx. */
export function validate(q: Quote, form: FormData): FieldError[] {
  const errors: FieldError[] = [];
  if (!validName(q.name)) errors.push("name");
  if (!validPhone(q.phone)) errors.push("phone");
  if (!validEmail(q.email)) errors.push("email");
  if (!UK_POSTCODE.test(q.postcode)) errors.push("postcode");
  if (q.service.length < 2 || /https?:|www\./i.test(q.service)) errors.push("service");
  const rawDetails = String(form.get("details") ?? "");
  if (rawDetails.length > MAX_DETAILS + 500) errors.push("details");
  else if (q.form === "full" && q.details.replace(/\W/g, "").length < 3) errors.push("details");
  if (!q.consent) errors.push("consent");
  return errors;
}
