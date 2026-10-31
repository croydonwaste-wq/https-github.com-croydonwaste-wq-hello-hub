# Watford Rubbish Clearance — website

This project is connected to [Lovable](https://lovable.dev/projects/ab684665-e15e-4e7b-9833-92261ebdcfd0). Changes pushed to `main` sync into the Lovable editor, and edits made in Lovable are committed back here.

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
| Illustrations & graphics | `src/components/Illustration.tsx`, `src/components/Graphics.tsx` |

Values left as `null` in `business.ts` have not been confirmed by the business. Features depending on them (call/WhatsApp buttons, address, schema fields) stay hidden until they are filled in — nothing is invented.

## Quote form

Every page has a short quote form in its header; key pages also have a full form with photo upload. Forms POST to the `send-quote` edge function (`supabase/functions/send-quote/index.ts`), which uses [Resend](https://resend.com) to:

1. email the enquiry (and any photos) to `hello@watfordrubbishclearance.co.uk`, CC `admin@reepro.co.uk`, BCC `info@croydonwaste.co.uk`, with Reply-To set to the customer;
2. send the customer an automatic reply summarising their request and saying a member of the team will be in contact in due course (only when they gave an email address);
3. redirect the visitor to `/thank-you/` (or back to `/contact/?sent=error` if sending failed).

**Setup (once):**

1. In Resend, verify the domain `watfordrubbishclearance.co.uk` by adding the DNS records Resend shows (the `resend._domainkey` TXT/DKIM record, plus the SPF/MX records for the `send` subdomain) at your DNS provider.
2. In Resend → API Keys, create a key with *Sending access* (it starts with `re_`).
3. In Lovable, enable Cloud, then add a secret named `RESEND_API_KEY` with that key. Never commit the key to the repo.

Optional secrets: `QUOTE_TO_EMAIL`, `QUOTE_CC_EMAIL` and `QUOTE_BCC_EMAIL` (comma-separated), `QUOTE_FROM_EMAIL` (must be on the verified domain), `SITE_URL`.

The site picks up the function URL from `VITE_SUPABASE_URL`, which Lovable Cloud sets for you. To point the form somewhere else, set `VITE_FORM_ENDPOINT`. If neither is set, the form falls back to [FormSubmit](https://formsubmit.co).

## Hosting notes

- Serve `dist/` as static files; `dist/404.html` should be returned with status 404 for unknown paths.
- Redirect `http://` and non-`www` to `https://www.watfordrubbishclearance.co.uk`.
