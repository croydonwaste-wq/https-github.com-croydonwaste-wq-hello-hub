# Watford Rubbish Clearance — website

Local SEO-focused site for www.watfordrubbishclearance.co.uk. Built with Vite, React, TypeScript and Tailwind (the stack Lovable uses), with **every page prerendered to static HTML** at build time so search engines and AI crawlers get the full content, metadata and structured data without running JavaScript.

The strategy, keyword-to-URL map, do-not-create list, QA results and outstanding confirmations are in [`docs/SEO-STRATEGY.md`](docs/SEO-STRATEGY.md).

## Commands

```bash
npm install
```

```bash
npm run dev          # local dev server on :8080
```

```bash
npm run build        # client build + SSR prerender of all routes, sitemap.xml, robots.txt → dist/
```

```bash
npm run qa           # static SEO/link QA over dist/ (run after build)
```

## Where things live

| What | File |
|---|---|
| Business details (phone, WhatsApp, hours, insurance, carrier no.) | `src/data/business.ts` |
| Service page content + keywords | `src/data/services.ts` |
| Location page content + keywords | `src/data/locations.ts` |
| Guides | `src/data/guides.ts` |
| Route list (drives router, prerender and sitemap) | `src/routes.tsx` |
| Structured data | `src/lib/schema.ts` |
| Conversion tracking, attribution, consent | `src/lib/tracking.ts`, `src/components/ConsentBanner.tsx` |
| Illustrations & graphics | `src/components/Illustration.tsx`, `src/components/Graphics.tsx` |

Values left as `null` in `business.ts` have not been confirmed by the business. Features depending on them (call/WhatsApp buttons, address, schema fields) stay hidden until they are filled in — nothing is invented.

## Quote form

Every page has a short quote form in its header; key pages also have a full form with photo upload. Forms POST to [FormSubmit](https://formsubmit.co) at `hello@watfordrubbishclearance.co.uk` (no account needed). The **first** submission sends an activation email to that inbox: click the link once and later enquiries are delivered. To use another provider, set `VITE_FORM_ENDPOINT` to any endpoint that accepts a multipart form POST.

## Tracking & attribution

Call, WhatsApp, email and quote-button clicks plus form start/error/submit events are pushed to `window.dataLayer`; `generate_lead` fires on `/thank-you/` (the confirmed form lead). Each enquiry email includes the lead source, landing page, referrer, UTM tags and gclid for the visit (held in memory, never stored on the device). Set `VITE_GTM_ID=GTM-XXXXXXX` to load Google Tag Manager — it only loads after the visitor accepts analytics cookies. Event list and GTM setup: [`docs/CONVERSION-GROWTH.md`](docs/CONVERSION-GROWTH.md).

## Hosting notes

- Serve `dist/` as static files; `dist/404.html` should be returned with status 404 for unknown paths.
- Redirect `http://` and non-`www` to `https://www.watfordrubbishclearance.co.uk`.
