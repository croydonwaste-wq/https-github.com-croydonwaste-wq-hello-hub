# Local Landing Page Audit — Rubbish Removal in Watford

**Date:** 12 November 2026
**Page audited:** `https://www.watfordrubbishclearance.co.uk/` (homepage)
**Branch:** `ccr-1d7fe10c-4jpymc`. **Not yet deployed**: the live site still serves the previous version.

## Scope and assumptions

The brief's project fields were blank, so the details come from this repository:

| Field | Value | Source |
|---|---|---|
| Business | Watford Rubbish Clearance | `src/data/business.ts` |
| Primary service | Rubbish removal / rubbish clearance | `docs/SEO-STRATEGY.md` §2 |
| Target location | Watford (WD17, WD18, WD19, WD24, WD25) | `docs/SEO-STRATEGY.md` §2 |
| Phone | 01293 549164 (confirmed by the business; a Crawley area code) | `src/data/business.ts` |
| Preferred conversion | Quote request, with call as the urgent route | Existing site design |

**Why the homepage:** the strategy doc assigns "rubbish removal / rubbish clearance Watford" to `/`, and puts a separate `/rubbish-removal-watford/` page on the do-not-create list because it would compete with the homepage. Following the brief, I improved the existing page rather than creating a duplicate.

## 1. Main issues found and what was done

| # | Issue | Severity | Status |
|---|---|---|---|
| 1 | **Out-of-date council facts across 5 pages.** The site said Watford council's bulky collection excludes sofas and electricals. watford.gov.uk/bulkywaste (checked 12 Nov 2026) now lists £57 for up to 3 sofas/upholstered items and £57 per electrical item. | High (accuracy) | **Fixed** on the homepage, bulky waste, sofa removal, pricing and council guide pages; guide `updated` date set to 2026-11-12 |
| 2 | "A local rubbish clearance company" (homepage H2, About lead, guide CTA) implied a Watford base. No address or Watford base is verified, and the phone is a Crawley number. | Medium (accuracy) | **Fixed**: reworded to "serving Watford" |
| 3 | Homepage had little genuinely Watford-specific, decision-useful content | Medium | **Added** a "Watford council bulky collection or private rubbish removal?" section with sourced prices, how council collection works, which areas fall under other councils, and a source link with the date checked |
| 4 | The hero "Get a free quote" button sent visitors to `/contact/`, although a form sits beside it | Medium (conversion) | **Fixed**: now jumps to the on-page hero form; the closing CTA jumps to the full form |
| 5 | Sticky header had no call button below 768px (only the bottom bar did) | Low | **Fixed**: round call button in the mobile header (`aria-label="Call 01293 549164, open 24/7"`) |
| 6 | 19 identical "Rubbish removal {Town}" anchors on the homepage | Low | **Fixed**: one descriptive heading, with each card showing the town name plus county and postcodes |
| 7 | Homepage linked all 4 guides, including a bereavement guide that doesn't help most visitors decide | Low | **Trimmed** to 3 decision-aid guides (council vs private, skip vs removal, licence check) |
| 8 | Meta description was 158 characters | Low | **Rewritten** to 136 characters |
| 9 | Closing CTA ("Ready to clear the clutter?") didn't mention the service or city | Low | **Changed** to "Need rubbish removed in Watford?" |
| 10 | Schema had no service catalogue or WebPage node | Low | **Added** `hasOfferCatalog`, which mirrors the visible service cards, with no prices, plus a `WebPage` node |
| 11 | On mobile, the fixed bottom bar could cover keyboard focus | Low (a11y) | **Fixed** with `scroll-padding-bottom` (mobile only); tested |
| 12 | No way to verify the waste carrier licence | Medium (trust) | **Prepared**: a link to the Environment Agency register appears automatically once `wasteCarrierNumber` is filled in |
| 13 | Unknown URLs return HTTP 200 on the live host (soft 404) | Medium (technical) | **Not fixable in code**: a hosting setting |
| 14 | `watfordrubbishclearance.co.uk` → `www` uses a 302, not a 301 | Low | **Not fixable in code**: a hosting/DNS setting |
| 15 | The host injects `twitter:title` / `twitter:description` with double-escaped `&amp;amp;` | Low | **Not fixable in code**: check the Lovable or hosting project's social meta settings |

## 2. Final metadata

| Element | Value |
|---|---|
| URL | `https://www.watfordrubbishclearance.co.uk/` (unchanged; established URL) |
| Title | Rubbish Removal & Clearance Watford \| Watford Rubbish Clearance |
| Meta description | Rubbish removal in Watford, open 24/7 with same-day collections. Licensed and £5m insured, and we do all the loading. Call 01293 549164. (136 chars) |
| H1 | Rubbish Removal & Clearance in Watford |
| Canonical | `https://www.watfordrubbishclearance.co.uk/` |

Google may rewrite titles and descriptions; these are what the page supplies.

## 3. Page structure (implemented, in order)

1. Top bar (24/7, licence and insurance, phone) → sticky header (logo/home, nav, "Call 24/7 01293 549164" on desktop, call button on mobile, Free quote)
2. **Hero:** H1, a summary, CTAs (quote → on-page form, call), verified badges, and a compact quote form (name, phone, postcode, service, optional note) with privacy notice
3. **Trust strip:** 24/7 · same day · £5m public liability · 19 services · 30-mile radius; then 4 trust points (licensed and insured, price agreed first, etc.)
4. **About (H2 "Rubbish clearance for Watford homes and businesses")** and "How does rubbish removal work?" answer box
5. **Services (H2 "Clearances and collections we offer in Watford")**: 19 cards in 3 groups, each linking to its service page
6. How it works · load-size guide
7. **Coverage (H2 "Rubbish collection across Watford and nearby towns")**: Watford neighbourhoods, postcodes, 30-mile radius, schematic map labelled "not to scale", 19 town links
8. **New: "Watford council bulky collection or private rubbish removal?"** (sourced and dated)
9. Where your rubbish goes · Who we help · items taken and not taken
10. Decision guides (3)
11. **FAQ (H2 "Rubbish removal in Watford: common questions")**: 8 questions, including a new council question
12. Full quote form (with photo upload)
13. **Closing CTA (H2 "Need rubbish removed in Watford?")** with call and quote buttons

Sections the brief asks for but that were **deliberately not added**, because no evidence exists: customer quote beside the form, reviews, recent local jobs, team photos, Google map embed. Placeholders were not added either.

## 4. Internal links and structured data

**Internal links (55 unique on the homepage, 0 broken):** 19 service pages; 19 town pages, each anchored by town name; areas hub; pricing; about; contact; same-day page; 3 decision guides; FAQ hub; privacy; terms. The footer adds service groups, an areas list with an "All areas" link, and guides.

**JSON-LD on the homepage:**
- `LocalBusiness` (`@id …/#business`): name, URL, email, telephone `+441293549164`, 24/7 opening hours, area served (Watford, the 19 towns, Hertfordshire, and a 30-mile GeoCircle), logo, description, **`hasOfferCatalog` with 19 Service offers (no prices)**. No address, ratings or reviews, because none are verified.
- `WebSite`, **`WebPage`** (`@id …/#webpage`, `isPartOf` website, `about` business)
- `FAQPage`: 8 questions that match the visible FAQ text. Valid Schema.org markup, but **not eligible** for FAQ rich results: since August 2023 Google shows them only for well-known government and health sites. It's kept because it matches visible content and does no harm.
- Verification: every block parses as valid JSON and uses standard Schema.org types. The Schema.org validator and Google's Rich Results Test could not be reached from the build environment: **Not verified**.

## 5. Checklist

| Requirement | Status | Evidence or location | Remaining action |
|---|---|---|---|
| Clean lowercase URL | Pass | `/` (homepage owns the keyword) | — |
| Established URL retained | Pass | No URL changes | — |
| Unique title, service + city, brand last | Pass | `src/pages/Home.tsx` `TITLE`; QA found no duplicates | — |
| Meta description ~140 chars with service, location, benefit, CTA | Pass | 136 chars, ends "Call 01293 549164." | — |
| Canonical + social metadata | Needs work | Canonical and OG correct in build; live host injects double-escaped `twitter:*` tags | Fix the host/Lovable social meta setting |
| Sticky header with identity, phone, call button | Pass | `Layout.tsx`; tested at 320–1366px, phone link visible in header at every width | — |
| Working tap-to-call | Pass | 7 `tel:+441293549164` links on the page | Test a real call from a phone after deploy |
| Call action reachable while scrolling, not obscuring focus | Pass | Playwright: 120 tab stops, no content focus hidden (2 flagged stops were false positives: skip link and top bar) | — |
| One H1 with service + city near top | Pass | "Rubbish Removal & Clearance in Watford" | — |
| Concise hero copy | Pass | Hero lead + badges | — |
| Short hero form | Pass | Name, phone, postcode, service, optional note | — |
| Labels, validation, privacy, success/error states | Pass | Empty submit: 4 inline errors, focus moves to the first field; valid submit (mocked): /thank-you/ | — |
| Submissions routed and delivery tested | Not verified | FormSubmit POST fields confirmed (mocked); live email delivery not tested | Send one live test; click FormSubmit's activation email |
| Genuine customer quote near form | Needs work | None exists; nothing invented | Collect reviews and add one with attribution |
| Trust strip below hero | Pass | `StatsStrip` + `TrustGrid` (verified facts only) | — |
| Only entitled badges, with verification links | Needs work | No unverified badges shown; licence can't be verified without the number | Add `wasteCarrierNumber`; the register link then appears automatically |
| About H2 references service/city | Pass | "Rubbish clearance for Watford homes and businesses" | — |
| About covers services, customers, local operation, verified history | Needs work | Services and customers covered; years in business and history unknown | Supply founding year and history |
| No implied local office/team | Pass | "Local company" wording removed (homepage, About, guide CTA) | Restore "local" only if a Watford base is confirmed |
| Team/job photo | Needs work | Illustrations only | Supply real photos |
| Accurate alt text, empty for decorative | Pass | Illustrations labelled as illustrations; card art `label=""` | Write real alt text when photos are added |
| Services section with linked cards | Pass | 19 cards → service pages | — |
| Inclusions, exclusions, next step | Pass | "Things we're often asked to take", hazardous exclusions, process steps | — |
| Authentic reviews with source | Needs work | None exist; the similarly named Checkatrade/Trustpilot profiles are not this business | Create a Google Business Profile and request reviews |
| Authorised Google review integration | Not applicable | No GBP or reviews | Revisit once reviews exist |
| Review widgets not delaying the page | Not applicable | No widgets | Lazy-load any future widget |
| Recent local jobs | Needs work | Section omitted: no evidence | Supply 3–5 Watford jobs (problem, service, access, outcome, date, photos with permission) |
| Useful city-specific information | Pass | New council vs private section (sourced, dated); neighbourhoods; postcodes | Re-check council prices quarterly |
| Genuine GBP map | Not applicable | No GBP exists; a schematic map is labelled "not to scale" | Embed the GBP map once it is verified |
| Service-area coverage explained | Pass | "30 miles of Watford town centre", schema GeoCircle | — |
| No postcode/place-name stuffing | Pass | 5 Watford postcodes and about a dozen neighbourhoods, in context | — |
| Nearby location links with varied anchors | Pass | Town-name anchors under one heading | — |
| Link to homepage | Pass | Logo; mobile nav "Home" | — |
| Footer navigation (services, contact, coverage) | Pass | `Layout.tsx` footer | — |
| No blog links by default | Pass | Homepage guides cut to 3 decision aids; the footer still lists guides sitewide | Optional: drop guides from the footer |
| All internal links work | Pass | `npm run qa` plus a homepage link check (55 links, 0 missing) | — |
| FAQ section with descriptive H2 | Pass | "Rubbish removal in Watford: common questions" | — |
| FAQs based on real enquiries | Not verified | Based on common topics and verified facts, not logged enquiries | Share real customer questions |
| FAQ covers payment, duration, aftercare/guarantee | Needs work | Pricing, availability, coverage, licence, access and exclusions covered | Confirm payment methods, VAT, minimum charge, typical job duration |
| Closing CTA with service + city, phone, action | Pass | "Need rubbish removed in Watford?" + call + quote | — |
| CTA claims verified | Pass | 24/7 and same-day confirmed by the business; price-first in the terms | — |
| Specific, non-templated copy | Pass | Homepage copy is unique to Watford | — |
| Natural keyword use, no quotas | Pass | ~2,000 words; H2s varied | — |
| Consistent genuine business name | Pass | "Watford Rubbish Clearance" throughout | — |
| Accurate JSON-LD with stable `@id`s | Pass | `src/lib/schema.ts` | — |
| No invented addresses or per-city entities | Pass | No address; one business entity | — |
| Schema matches visible content | Pass | OfferCatalog = service cards; FAQ = visible FAQ | — |
| No self-serving review markup | Pass | None | — |
| FAQ rich-result eligibility checked | Pass | Not eligible (non-government/health site); documented above | — |
| Schema validated / Rich Results Test | Not verified | Valid JSON locally; external validators unreachable | Run Rich Results Test on the live URL after deploy |
| Mobile, tablet, desktop | Pass | 320/375/414/768/1024/1366px: no overflow, no console errors | — |
| Keyboard access (nav, forms, accordions) | Pass | Tabbing works; FAQ opens with Enter; visible focus ring | — |
| Contrast | Not verified | No automated contrast audit run | Run axe or Lighthouse after deploy |
| Image optimisation | Pass | Inline SVG illustrations; no raster images in content | Use WebP/AVIF with width/height when photos are added |
| LCP not lazy-loaded | Pass | LCP element is hero text (local: 96–120 ms) | — |
| Space reserved / low CLS | Pass | CLS 0 (mobile), 0.0009 (desktop), local preview | Check field data in Search Console |
| Content crawlable without JS | Pass | Every route prerendered to static HTML | — |
| Live page 200, no noindex | Pass | Live check on 12 Nov 2026: 200, canonical present, no noindex, robots allows all (pre-change version) | Re-check after deploy |
| Canonical in XML sitemap | Pass | Live `sitemap.xml` includes `/` | — |
| Conversion tracking | Not verified | `data-cta` attributes on all call/quote buttons; no analytics installed | Add analytics or call tracking |
| Search Console URL inspection, canonical, indexing | Not verified | No Search Console access | See steps in §7 |
| Sitemap submitted | Not verified | No Search Console access | See steps in §7 |

## 6. Missing business facts and evidence

1. **Waste carrier registration number (CBDU…)**: the strongest trust signal still missing.
2. **Customer reviews**: none exist that belong to this business.
3. **Google Business Profile**: none exists; it would enable the map, reviews and local-pack eligibility.
4. **Real photographs** of team, vans and jobs, with permission.
5. **Recent Watford jobs / case studies** (3–5).
6. **Business history**: founding year, and how long the business has served Watford.
7. **Where the team is based**: 01293 is a Crawley code. If the team is Watford-based, say so and consider a 01923 number; if not, the current "serving Watford" wording is correct.
8. **Payment methods, VAT status, minimum charge, typical job duration, any guarantee.**
9. **Legal entity / Companies House number**, if incorporated.

## 7. Remaining actions, in priority order

1. **Deploy this branch**, then send one live quote-form test and click FormSubmit's activation email.
2. **Fix soft 404s** on the host so unknown URLs return `dist/404.html` with status 404.
3. **Add the waste carrier number** to `src/data/business.ts`, then rebuild.
4. **Create and verify a Google Business Profile**: service-area business with no public address, matching name, phone and URL, "Open 24 hours". Then request reviews.
5. **Change the non-www redirect** from 302 to 301.
6. **Fix the host-injected `twitter:*` tags** (double-escaped `&amp;amp;`).
7. **Search Console** (not verified, no access). Steps:
   1. Add the property `https://www.watfordrubbishclearance.co.uk/` (or a Domain property) and verify it.
   2. Sitemaps → submit `sitemap.xml` → confirm status "Success" and the discovered URL count (52).
   3. URL Inspection → enter the homepage URL → check "URL is on Google", crawl allowed, and that "Google-selected canonical" matches the user-declared one.
   4. After deploying, click **Test live URL** → **Request indexing**.
   5. Record the inspection date and status. "Indexing requested" is not the same as "indexed".
8. Run Google's **Rich Results Test** and **PageSpeed Insights** on the live URL; run an accessibility/contrast audit.
9. Add photos, reviews and local job examples as they become available.
10. Re-check the Watford council prices every quarter, and update `COUNCIL_CHECKED` in `src/pages/Home.tsx` plus the dated sentences on the bulky, sofa, pricing and guide pages.
