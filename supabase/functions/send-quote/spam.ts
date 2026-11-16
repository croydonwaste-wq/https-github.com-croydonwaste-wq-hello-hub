// Spam risk scoring. Each signal adds points; the total decides how the enquiry is handled
// (see Config.mediumThreshold / highThreshold). No single ordinary signal — one link, the word
// "SEO", a fast autofilled form — is enough on its own to stop a genuine enquiry.

import { URL_RE, type Quote } from "./validate.ts";

export type Signals = {
  /** Milliseconds between the form becoming interactive and submit, as reported by the browser. null = not sent (no JavaScript, or a direct POST). */
  elapsedMs: number | null;
  /** The request carried an Origin or Referer header. Browsers always send one on a form POST. */
  hasOriginOrReferer: boolean;
  /** Turnstile outcome: "pass", "fail" (monitor mode only), or "skipped" when not configured. */
  turnstile: "pass" | "fail" | "skipped";
  /** Other connections sent the same message text recently (see store.bulkCount). */
  bulkCount: number;
};

export type Score = { score: number; reasons: string[] };

/** Phrase groups typical of unsolicited sales pitches and scams. Each group counts once. */
export const SPAM_PATTERNS: { reason: string; points: number; re: RegExp }[] = [
  {
    // Things only a link seller says.
    reason: "seo_pitch",
    points: 5,
    re: /\b(back-?links?|link[- ]building|guest[- ]post(?:ing|s)?|domain authority|\bDA\s?\d{2}\b|first page of google|page 1 of google|(?:rank|ranking)\s+(?:your|ur)\s+(?:web)?site|organic traffic|increase (?:your )?(?:website )?traffic)\b/i,
  },
  {
    // Ambiguous: SEO businesses need clearances too, so this counts for little on its own.
    reason: "seo_mention",
    points: 2,
    re: /\bseo (?:services?|agency|package|audit|expert|specialist|company)\b/i,
  },
  {
    reason: "marketing_template",
    // Lower weight: a genuine customer may also write "I came across your website".
    points: 3,
    re: /\b(i (?:came across|was (?:checking|looking at|browsing)|noticed|visited|found) your (?:web)?site|we can help (?:you )?(?:get|generate|increase)|more (?:leads|customers|sales) for your business|web(?:site)? (?:design|development|redesign) (?:services?|agency)|app development|lead generation|virtual assistant|outsourc(?:e|ing)|digital marketing (?:services?|agency)|social media (?:marketing|management)|reply (?:with )?["']?(?:stop|unsubscribe|remove)|to (?:unsubscribe|opt[- ]out)|(?:free|no[- ]obligation) (?:seo )?(?:audit|consultation) of your)\b/i,
  },
  {
    reason: "crypto_finance",
    points: 5,
    re: /\b(bitcoin|btc wallet|crypto(?:currency)?|forex|binary options?|investment opportunit(?:y|ies)|passive income|guaranteed (?:returns?|profit)|earn \$?\d[\d,]*\s*(?:per|a|\/)\s*(?:day|week|hour)|trading (?:platform|bot|signals)|nft)\b/i,
  },
  {
    reason: "loans_funding",
    points: 4,
    re: /\b(business (?:loans?|funding|cash advance)|merchant cash advance|pre-?approved|working capital|unsecured loan)\b/i,
  },
  {
    reason: "adult_pharma_gambling",
    points: 6,
    re: /\b(viagra|cialis|casino|porn|xxx|escort|sex (?:dating|chat)|dating site|cbd oil|weight loss pills?|replica watches)\b/i,
  },
];

const DISPOSABLE_DOMAINS = new Set(
  (
    "mailinator.com guerrillamail.com guerrillamail.info sharklasers.com grr.la 10minutemail.com 10minutemail.net tempmail.com temp-mail.org " +
    "tempmail.net tempmailo.com throwawaymail.com yopmail.com yopmail.net getnada.com nada.email dispostable.com trashmail.com trashmail.de " +
    "maildrop.cc mailnesia.com mintemail.com mohmal.com emailondeck.com fakeinbox.com spamgourmet.com getairmail.com tempinbox.com " +
    "burnermail.io mailpoof.com moakt.com tmail.ws tmpmail.org tmpmail.net discard.email spambox.us 33mail.com inboxkitten.com"
  ).split(/\s+/),
);

export const isDisposableEmail = (email: string) => DISPOSABLE_DOMAINS.has(email.split("@")[1] ?? "");

export const countUrls = (s: string) => (s.match(URL_RE) ?? []).length;

/** Normalised message text used for duplicate / bulk detection. */
export const normaliseText = (s: string) => s.toLowerCase().replace(/https?:\/\/\S+/g, "url").replace(/[^\p{L}\p{N}]+/gu, " ").trim();

export function scoreQuote(q: Quote, s: Signals, opts: { strict?: boolean } = {}): Score {
  const reasons: string[] = [];
  let score = 0;
  const add = (points: number, reason: string) => {
    score += points;
    reasons.push(reason);
  };
  const text = `${q.details}\n${q.service}`;

  // Links. One link is normal ("here's the listing"), several is typical of spam.
  const urls = countUrls(q.details);
  if (urls >= 3) add(6, "many_links");
  else if (urls === 2) add(3, "two_links");
  else if (urls === 1) add(1, "one_link");
  if (/\[url=|<a\s+href|\[link=/i.test(q.details)) add(6, "link_markup");

  // Each phrase group scores once, plus a little for every further distinct phrase from it
  // (a message stuffed with sales phrases is worse than one stray word).
  for (const p of SPAM_PATTERNS) {
    const hits = new Set((text.match(new RegExp(p.re.source, "gi")) ?? []).map((m) => m.toLowerCase()));
    if (hits.size) add(p.points + Math.min(4, (hits.size - 1) * 2), p.reason);
  }

  // Junk text.
  if (/(.)\1{9,}/su.test(q.details)) add(2, "repeated_characters");
  const letters = q.details.replace(/[^\p{L}]/gu, "");
  if (letters.length >= 40 && new Set(letters.toLowerCase()).size <= 4) add(2, "low_variety_text");
  if (letters.length >= 40 && letters === letters.toUpperCase() && letters !== letters.toLowerCase()) add(1, "all_caps");
  const cyr = (q.details.match(/[Ѐ-ӿ]/g) ?? []).length;
  if (letters.length >= 20 && cyr / letters.length > 0.5) add(2, "non_latin_message");
  if (q.details && q.details.trim().toLowerCase() === q.name.trim().toLowerCase()) add(3, "details_equals_name");

  // Names like "JqKzLwPd" or "RobertCaw4" are typical of form bots; real names rarely have
  // several capitals inside one word or several digits.
  if ((q.name.match(/\p{Ll}\p{Lu}/gu) ?? []).length >= 2) add(3, "random_name");
  if ((q.name.match(/\d/g) ?? []).length >= 3) add(2, "digits_in_name");

  if (isDisposableEmail(q.email)) add(3, "disposable_email");

  // Behaviour. Weak on their own: autofill and fast typists exist, and some people browse without JavaScript.
  // Strict: almost every real visitor runs the page's JavaScript; form bots usually post directly.
  if (s.elapsedMs === null) add(opts.strict ? 3 : 1, "no_timing");
  else if (s.elapsedMs < 1500) add(4, "submitted_instantly");
  else if (s.elapsedMs < 4000) add(2, "submitted_very_fast");
  if (!s.hasOriginOrReferer) add(2, "no_origin_header");
  if (s.turnstile === "fail") add(6, "turnstile_failed");
  if (s.bulkCount >= 2) add(5, "bulk_template");
  else if (s.bulkCount === 1) add(2, "repeated_template");

  return { score, reasons };
}

export type Risk = "low" | "medium" | "high";
export const classify = (score: number, medium: number, high: number): Risk => (score >= high ? "high" : score >= medium ? "medium" : "low");
