/**
 * Single source of truth for business identity (NAP) and verified facts.
 *
 * Anything set to `null` has NOT been confirmed by the business. Components hide
 * features that depend on a null value (e.g. no WhatsApp button without a number)
 * so the site never publishes invented details. Fill these in once confirmed and
 * every page, CTA and schema block updates automatically.
 */
export const business = {
  name: "Watford Rubbish Clearance",
  /** Confirmed by the business: trades as Watford Rubbish Clearance. Add Ltd name / Companies House no. if incorporated. */
  legalName: null as string | null,
  companyNumber: null as string | null,
  domain: "https://www.watfordrubbishclearance.co.uk",
  email: "hello@watfordrubbishclearance.co.uk",

  /** Confirmed by the business. */
  phone: "01293 549164" as string | null,
  /** Mobile/WhatsApp in international format without "+" or spaces, e.g. "447700900000". Not yet supplied. */
  whatsapp: null as string | null,
  /** Only publish if customers can visit or it is the registered trading address. Not supplied — service-area business. */
  address: null as null | {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressRegion: string;
  },
  /** Confirmed: licensed waste carrier. Registration number (e.g. "CBDU123456") not yet supplied. */
  licensedWasteCarrier: true,
  wasteCarrierNumber: null as string | null,
  /** Confirmed by the business. */
  openingHours: "Open 24 hours, 7 days a week",
  open247: true,
  /** Confirmed by the business. */
  sameDay: true,
  /** Confirmed by the business. */
  publicLiability: "£5 million",
  /** Public profiles (Google Business Profile, Facebook…). None yet — business confirmed no GBP or Checkatrade. */
  sameAs: [] as string[],

  /**
   * Quote form handler. Uses the `send-quote` edge function (Resend: emails the enquiry to the
   * business, BCCs head office and auto-replies to the customer) once Lovable Cloud / Supabase is
   * connected (VITE_SUPABASE_URL). Override with VITE_FORM_ENDPOINT. Falls back to FormSubmit.
   */
  formEndpoint:
    (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) ||
    (import.meta.env.VITE_SUPABASE_URL ? `${import.meta.env.VITE_SUPABASE_URL.replace(/\/$/, "")}/functions/v1/send-quote` : "") ||
    "https://formsubmit.co/hello@watfordrubbishclearance.co.uk",
} as const;

export const hasPhone = () => Boolean(business.phone);
export const hasWhatsApp = () => Boolean(business.whatsapp);

export const telHref = () => (business.phone ? `tel:${business.phone.replace(/\s/g, "").replace(/^0/, "+44")}` : null);

export const whatsappHref = (message = "Hi, I'd like a quote for a rubbish clearance.") =>
  business.whatsapp ? `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}` : null;

export const mailtoHref = (subject = "Quote request", body = "") =>
  `mailto:${business.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;

export const absoluteUrl = (path: string) => `${business.domain}${path}`;
