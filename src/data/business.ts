/**
 * Single source of truth for business identity (NAP) and verified facts.
 *
 * Anything set to `null` has NOT been confirmed by the business. Components hide
 * features that depend on a null value (e.g. no call button without a phone
 * number) so the site never publishes invented details. Fill these in once
 * confirmed and every page, CTA and schema block updates automatically.
 */
export const business = {
  name: "Watford Rubbish Clearance",
  legalName: null as string | null, // BUSINESS CONFIRMATION REQUIRED (Ltd company name / Companies House no.)
  companyNumber: null as string | null,
  domain: "https://www.watfordrubbishclearance.co.uk",
  email: "hello@watfordrubbishclearance.co.uk",

  /** Landline in display format, e.g. "01923 000000". BUSINESS CONFIRMATION REQUIRED */
  phone: null as string | null,
  /** Mobile/WhatsApp in international format without "+" or spaces, e.g. "447700900000". BUSINESS CONFIRMATION REQUIRED */
  whatsapp: null as string | null,
  /** Only publish if customers can visit or it is the registered trading address. BUSINESS CONFIRMATION REQUIRED */
  address: null as null | {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressRegion: string;
  },
  /** Environment Agency upper-tier waste carrier registration, e.g. "CBDU123456". BUSINESS CONFIRMATION REQUIRED */
  wasteCarrierNumber: null as string | null,
  /** e.g. "Mon–Sat 7am–7pm". BUSINESS CONFIRMATION REQUIRED */
  openingHours: null as string | null,
  /** Public profiles (Google Business Profile, Checkatrade, Facebook…). Add only confirmed URLs. */
  sameAs: [] as string[],

  /** Endpoint that accepts the quote form as JSON (Formspree, Web3Forms, Supabase edge function…). */
  formEndpoint: (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) || null,
} as const;

export const hasPhone = () => Boolean(business.phone);
export const hasWhatsApp = () => Boolean(business.whatsapp);

export const telHref = () => (business.phone ? `tel:${business.phone.replace(/[^\d+]/g, "")}` : null);

export const whatsappHref = (message = "Hi, I'd like a quote for a rubbish clearance.") =>
  business.whatsapp ? `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}` : null;

export const mailtoHref = (subject = "Quote request", body = "") =>
  `mailto:${business.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;

export const absoluteUrl = (path: string) => `${business.domain}${path}`;
