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
| Business details (phone, WhatsApp, address, carrier no.) | `src/data/business.ts` |
| Service page content + keywords | `src/data/services.ts` |
| Location page content + keywords | `src/data/locations.ts` |
| Guides | `src/data/guides.ts` |
| Route list (drives router, prerender and sitemap) | `src/routes.tsx` |
| Structured data | `src/lib/schema.ts` |

Values left as `null` in `business.ts` have not been confirmed by the business. Features depending on them (call/WhatsApp buttons, address, schema fields) stay hidden until they are filled in — nothing is invented.

## Quote form

Set `VITE_FORM_ENDPOINT` to a JSON-accepting endpoint (Formspree, Web3Forms, Supabase edge function). Without it, the form validates and opens the visitor's email app with the enquiry prefilled.

## Hosting notes

- Serve `dist/` as static files; `dist/404.html` should be returned with status 404 for unknown paths.
- Redirect `http://` and non-`www` to `https://www.watfordrubbishclearance.co.uk`.
