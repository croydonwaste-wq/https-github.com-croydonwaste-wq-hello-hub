/**
 * Conversion tracking and lead-source attribution.
 *
 * - Events are pushed to `window.dataLayer` (GA4 / GTM naming). Pushing sets no cookies;
 *   nothing leaves the browser unless Google Tag Manager is configured (VITE_GTM_ID) AND
 *   the visitor accepts analytics cookies.
 * - Click events are *link clicks*: a `phone_click` is someone tapping the number, not a
 *   completed call. `generate_lead` fires only on /thank-you/, which FormSubmit redirects
 *   to after it accepts a submission.
 * - Attribution (landing page, referrer, UTM tags, gclid) is held in memory for the visit
 *   only — nothing is written to the device — and sent with the quote form so each enquiry
 *   shows where it came from.
 */
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export const GTM_ID = (import.meta.env.VITE_GTM_ID as string | undefined) || null;
const CONSENT_KEY = "wrc-analytics-consent";

export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  (window.dataLayer ||= []).push({ event, page_path: window.location.pathname, ...params });
}

// ---------- Attribution ----------

const ATTRIBUTION_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"] as const;
export type Attribution = Partial<Record<(typeof ATTRIBUTION_KEYS)[number] | "landing_page" | "referrer" | "source", string>>;

let firstTouch: Attribution | null = null;

/** Lead source in plain words, for the enquiry email. Labelled as the business would read it. */
function classify(a: Attribution): string {
  if (a.gclid || (a.utm_medium && /cpc|ppc|paid/i.test(a.utm_medium))) return "Google Ads / paid search";
  if (a.utm_source) return `Campaign: ${a.utm_source}${a.utm_medium ? ` / ${a.utm_medium}` : ""}`;
  if (!a.referrer) return "Direct / unknown";
  const host = a.referrer.replace(/^https?:\/\//, "").split("/")[0];
  if (/google\.|bing\.|duckduckgo\.|yahoo\.|ecosia\./.test(host)) return `Organic search (${host})`;
  if (/chatgpt\.|openai\.|perplexity\.|claude\.ai|copilot\.|gemini\./.test(host)) return `AI assistant (${host})`;
  if (/facebook\.|instagram\.|t\.co|twitter\.|x\.com|linkedin\.|nextdoor\.|tiktok\./.test(host)) return `Social (${host})`;
  return `Referral (${host})`;
}

/** Call once on the first client render. Later in-app navigations keep the first-touch values. */
export function captureAttribution() {
  if (firstTouch || typeof window === "undefined") return;
  const q = new URLSearchParams(window.location.search);
  const a: Attribution = { landing_page: window.location.pathname + window.location.search };
  for (const k of ATTRIBUTION_KEYS) {
    const v = q.get(k);
    if (v) a[k] = v.slice(0, 120);
  }
  const ref = document.referrer;
  if (ref && !ref.startsWith(window.location.origin)) a.referrer = ref.slice(0, 200);
  a.source = classify(a);
  firstTouch = a;
}

export function getAttribution(): Attribution {
  return firstTouch ?? {};
}

// ---------- Click tracking ----------

/** One delegated listener covers every tel:, WhatsApp, mailto: and data-cta link on the site. */
export function installClickTracking() {
  if (typeof document === "undefined") return;
  document.addEventListener(
    "click",
    (ev) => {
      const a = (ev.target as Element | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const cta_location = a.dataset.cta ?? (a.closest("footer") ? "footer" : a.closest("header") ? "header" : "content");
      if (href.startsWith("tel:")) track("phone_click", { cta_location, link_url: href });
      else if (href.includes("wa.me/")) track("whatsapp_click", { cta_location });
      else if (href.startsWith("mailto:")) track("email_click", { cta_location });
      else if (a.dataset.cta) track("cta_click", { cta_location, link_url: href, link_text: a.textContent?.trim().slice(0, 40) });
    },
    { capture: true },
  );
}

// ---------- Consent + Google Tag Manager (only when VITE_GTM_ID is set) ----------

export type Consent = "granted" | "denied";

export function readConsent(): Consent | null {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

function gtag(..._args: unknown[]) {
  // Consent Mode commands must be pushed as an `arguments` object, as gtag.js does.
  // eslint-disable-next-line prefer-rest-params
  (window.dataLayer ||= []).push(arguments as unknown as Record<string, unknown>);
}

let gtmLoaded = false;
function loadGtm() {
  if (!GTM_ID || gtmLoaded) return;
  gtmLoaded = true;
  window.dataLayer ||= [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`;
  document.head.appendChild(s);
}

/** Records the visitor's choice (remembering it is strictly necessary) and loads GTM only on consent. */
export function setConsent(choice: Consent) {
  try {
    window.localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    /* private mode — choice applies to this page view only */
  }
  const state = choice === "granted" ? "granted" : "denied";
  gtag("consent", "update", { analytics_storage: state, ad_storage: state, ad_user_data: state, ad_personalization: state });
  if (choice === "granted") loadGtm();
}

export function initAnalytics() {
  if (!GTM_ID) return;
  gtag("consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
  if (readConsent() === "granted") setConsent("granted");
}
