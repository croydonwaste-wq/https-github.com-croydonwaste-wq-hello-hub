# Watford Rubbish Clearance — Research, SEO Architecture & Build Report

Prepared 27 October 2026. This document records what was researched, what was decided and why, what was built, and what still needs confirming from the business.

## 1. Research limits (read first)

| Source | Status |
|---|---|
| Live web search (search-result snippets) | Used |
| Competitor and reference sites (junkwize.com, reewaste.co.uk, competitor pages) | **Not reachable** — the build environment's network policy blocked direct page fetches. No competitor headings, meta or schema were inspected directly. |
| Keyword tools / search volumes | Not available. **No search volumes are quoted anywhere.** Priorities are based on commercial intent and relevance. |
| Google Search Console, Analytics, Google Business Profile | Not available |
| Business-supplied facts | Name, domain, email, services, service areas, brand colours. **Landline, WhatsApp and address were placeholders and were not used.** |

## 2. Business & market summary

- **Primary service:** rubbish removal / rubbish clearance (wait-and-load, man-and-van style collection).
- **Primary market:** Watford (WD17, WD18, WD19, WD24, WD25).
- **Secondary services (confirmed by brief):** house clearance, probate clearance, office clearance, garden waste, furniture removal, sofa removal, mattress disposal, bulky waste collection, fridge/freezer removal, builders' waste, shed & garage clearance, domestic bin collection, commercial bin collection.
- **Customer segments:** homeowners, tenants, landlords/letting agents, executors/solicitors, estate agents, builders/trades, offices/retail/hospitality.

### Findings from search (snippets only)

- The Watford SERP is crowded with **aggregators and directories** (LITTA, Clearabee, Checkatrade, Bark, Airtasker, rubbishwaste.co.uk, clearwaste.com). Independent local firms compete mainly through directory profiles. A fast, content-rich local site is a genuine differentiator.
- A Checkatrade trade profile at `checkatrade.com/trades/watfordrubbishclearance` and a Trustpilot page for `watfordrubbish.co.uk` exist. **Neither has been confirmed as this business** — confirm before linking or quoting reviews.
- **Watford Borough Council** bulky waste: at time of research, £57 for up to three items, excluding electricals and sofas/upholstered items (watford.gov.uk). This exclusion is a strong commercial angle for sofa, fridge and bulky pages and is cited with a "check current price" caveat.
- **Regulatory angles** that competitors' directory listings rarely explain: householder duty of care and fly-tipping fixed penalties (typically £400, up to £600 in some councils); POPs rules for upholstered seating; WEEE for fridges; Simpler Recycling for businesses (10+ employees from 31 March 2025; micro-firms from 31 March 2027).
- **Pricing landscape** (third-party, not used on-site as company prices): Checkatrade Herts man-and-van average c. £153; national guides put South East half-loads around £190–£320. Used only to confirm that a transparent "how pricing works" page is valuable.

### Competitor opportunity matrix (from SERP snippets)

| | Aggregators (LITTA, Clearabee, AnyJunk-style) | Directories (Checkatrade, Bark) | Opportunity for this site |
|---|---|---|---|
| Cover well | Brand trust, instant online pricing, broad item lists | Reviews, vetting badges | — |
| Cover poorly | Genuine local context; town pages are templated | No service content | Real local detail per town (councils, housing types, parking) |
| Missing | Honest council-vs-private comparison; executor-specific guidance | Any explanatory content | Guides on licence checks, council vs private, bereavement clearances |

## 3. Homepage keyword strategy

**Homepage owns:** `rubbish removal Watford` + `rubbish clearance Watford` (the brand name itself is an exact match, reinforcing relevance).
Justification: Watford is the primary market and the brand's namesake; targeting "Hertfordshire" on the homepage would dilute local-pack relevance. Hertfordshire is covered through the Areas hub and town pages.

There is **no separate `/rubbish-removal/` page** — it would compete directly with the homepage.

## 4. Architecture & Query → URL map

```
/                                   Homepage — rubbish removal & clearance Watford
├── /services/                      Services hub
│   ├── /house-clearance/           ├── /probate-clearance/      ├── /office-clearance/
│   ├── /garden-waste-clearance/    ├── /furniture-removal/      ├── /sofa-removal/
│   ├── /mattress-disposal/         ├── /bulky-waste-collection/ ├── /fridge-freezer-removal/
│   ├── /builders-waste-removal/    ├── /shed-garage-clearance/  ├── /domestic-bin-collection/
│   └── /commercial-bin-collection/
├── /areas-we-cover/                Areas hub (Watford neighbourhoods + wider coverage)
│   └── /rubbish-removal-{bushey|oxhey|croxley-green|rickmansworth|abbots-langley|
│        kings-langley|st-albans|harpenden|hatfield|berkhamsted}/
├── /pricing/                       Cost / price intent
├── /guides/                        Knowledge hub
│   ├── /guides/check-waste-carrier-licence/
│   ├── /guides/council-bulky-waste-vs-private-collection/
│   └── /guides/clearing-a-house-after-a-bereavement/
├── /faqs/  /about/  /contact/
└── /privacy-policy/  /terms/
```

| Primary keyword cluster | URL | Intent | Primary CTA |
|---|---|---|---|
| rubbish removal / rubbish clearance / waste removal Watford | `/` | Local transactional | Quote |
| house clearance, flat clearance, property clearance Watford | `/house-clearance/` | Local transactional | Quote |
| probate / bereavement / deceased estate clearance | `/probate-clearance/` | Local transactional | Quote |
| office clearance, office furniture removal | `/office-clearance/` | Commercial transactional | Quote |
| garden waste removal / garden clearance / green waste | `/garden-waste-clearance/` | Local transactional | Quote |
| furniture removal / disposal / collection | `/furniture-removal/` | Local transactional | Quote |
| sofa removal / collection / disposal (POPs) | `/sofa-removal/` | Local transactional | Quote |
| mattress disposal / collection / removal | `/mattress-disposal/` | Local transactional | Quote |
| bulky waste collection, large item collection | `/bulky-waste-collection/` | Local transactional | Quote |
| fridge freezer removal / disposal | `/fridge-freezer-removal/` | Local transactional | Quote |
| builders waste, rubble removal, skip alternative | `/builders-waste-removal/` | Transactional (trade) | Quote |
| garage clearance, shed clearance / removal | `/shed-garage-clearance/` | Local transactional | Quote |
| domestic / extra household waste collection | `/domestic-bin-collection/` | Local transactional | Quote |
| commercial / trade waste collection, trade bins | `/commercial-bin-collection/` | Commercial transactional | Quote |
| rubbish removal {town} (10 towns) | `/rubbish-removal-{town}/` | Local transactional | Quote |
| rubbish removal cost / price Watford | `/pricing/` | Commercial investigation | Quote |
| how to check a waste carrier licence; fly-tipping fine | `/guides/check-waste-carrier-licence/` | Informational | → services |
| Watford council bulky waste vs private | `/guides/council-bulky-waste-vs-private-collection/` | Commercial investigation | → bulky/sofa |
| clearing a house after a death | `/guides/clearing-a-house-after-a-bereavement/` | Informational | → probate |

Full primary/secondary/long-tail lists for every page are stored alongside the content in `src/data/services.ts`, `src/data/locations.ts` and `src/data/guides.ts` (`keywords` field).

### AI / conversational queries answered directly on-page
"How much does rubbish removal cost in Watford?" (home, pricing) · "Will Watford council take my sofa?" (sofa, guide) · "Why does sofa disposal cost more?" (sofa) · "Do I need to defrost a fridge before collection?" (fridge) · "Can I be fined if my rubbish is fly-tipped?" (guide) · "Can you clear a house before probate?" (probate) · "Do I need to be home?" (house clearance, FAQs) · "Do businesses need a waste transfer note?" (commercial, office). Every commercial page opens with an "In short" direct-answer box.

## 5. Service × location matrix

| | Watford | Bushey | Oxhey | Croxley | Ricky | Abbots L. | Kings L. | St Albans | Harpenden | Hatfield | Berkhamsted |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Rubbish removal | ★★★★★ home | ★★★★ | ★★★★ | ★★★ | ★★★★ | ★★★ | ★★★ | ★★★★★ | ★★★★ | ★★★★ | ★★★ |
| House clearance | ★★★★★ built | section | section | section | section | section | section | ★★★★ Wave 3 | section | section | section |
| Garden waste | ★★★★ built | section | — | section | section | section | section | section | section | — | section |
| Builders waste | ★★★★ built | — | — | section | — | — | — | section | — | — | section |

"section" = covered within the town page (popular services + copy), no separate URL yet. Candidate Wave 3 service × location pages: `house-clearance-st-albans`, `house-clearance-rickmansworth` — only once real local jobs/photos exist to make them unique.

## 6. DO-NOT-CREATE list

| Proposed page | Reason |
|---|---|
| `/rubbish-removal/` or `/rubbish-removal-watford/` | Duplicates homepage intent — cannibalisation |
| Separate `/mattress-collection/`, `/mattress-removal/` | Same intent as `/mattress-disposal/` |
| Separate `/sofa-collection/`, `/sofa-disposal/` | Same intent as `/sofa-removal/` |
| `/furniture-disposal/` | Same intent as `/furniture-removal/` |
| Pages for North Watford, West Watford, Leavesden, Garston, Cassiobury | Same market as homepage; insufficient differentiation — covered on homepage/Areas hub/Abbots Langley page |
| `/rubbish-removal-bushey-heath/` | Same market as Bushey page |
| `/rubbish-removal-south-oxhey/` separate from Oxhey | Same postcode/market; combined page |
| Welwyn, Wheathampstead, Redbourn standalone pages | Thin; covered on Hatfield / St Albans pages |
| Bedfordshire towns (Caddington, Toddington, Houghton Regis, Leighton Buzzard) | Coverage depth unconfirmed; distant from base — listed on hub only |
| Buckinghamshire (Chesham), Hitchin | Unconfirmed regular coverage — hub only |
| North London (Enfield, St John's Wood, Hampstead) | Different market, heavy London competition, unconfirmed — hub only |
| County pages (`/hertfordshire/`) | Areas hub serves this intent |
| "Same-day rubbish removal" page | Same-day availability not confirmed by the business |
| Asbestos / hazardous waste removal | Not offered (specialist licence) — would mislead |
| Skip hire | Not a service offered; addressed as "skip alternative" on builders page |
| Programmatic service × every town pages | Thin, duplicative, cannibalising |

## 7. What was built (Wave 1 + Wave 2 + part of Wave 4)

- **36 prerendered, indexable pages:** homepage, services hub, 13 service pages, areas hub, 10 location pages, pricing, about, contact, FAQs, guides hub, 3 guides, privacy policy, terms. Plus a `noindex` 404.
- **Technical SEO:** static HTML for every route (content, meta and JSON-LD visible without JavaScript), unique titles (≤65 chars) and descriptions (110–165 chars), self-referencing canonicals on `https://www.` + trailing slash, `sitemap.xml`, `robots.txt`, Open Graph/Twitter tags, OG image, `lang="en-GB"`, semantic landmarks, skip link, one H1 per page, logical H2/H3.
- **Schema:** `LocalBusiness` (no fake address/phone/ratings — fields appear automatically once confirmed), `WebSite`, `Service` per service page, `BreadcrumbList` on all inner pages, `FAQPage` where FAQs are visible, `Article` on guides, `ItemList` on services hub, `AboutPage`/`ContactPage`.
- **Internal linking:** header/footer nav to every hub, service and town; service → related services, nearby towns and guides; town → popular services, all other services, nearby towns and Watford; guides → relevant commercial pages. QA confirms no orphans or broken internal links.
- **Conversion:** sticky mobile action bar, header quote CTA, hero CTAs on every page, quote form on every commercial page (pre-selects the service), contact page with "what happens next".
- **Design:** bespoke navy / signal-yellow / brick-red system from the brand colours, custom SVG logo mark, no stock photography (none supplied — no imagery is presented as the company's own work).

## 8. Outstanding business confirmations

Fill these in `src/data/business.ts` — call/WhatsApp buttons, schema and footer details switch on automatically.

1. **Landline** (enables header click-to-call, mobile call button, schema `telephone`).
2. **WhatsApp number** (enables WhatsApp CTAs with prefilled message).
3. **Address** — only if it is a public trading address; otherwise remain a service-area business.
4. **Waste carrier registration number** (CBDU…) — the most important trust signal for this industry.
5. **Legal entity / Companies House number.**
6. **Opening hours** and whether same-day / next-day collections are offered.
7. **Insurance** (public liability amount) — not mentioned on-site until confirmed.
8. **Reviews** — Google Business Profile URL, and whether the Checkatrade `watfordrubbishclearance` profile belongs to this business. No reviews or ratings are shown until confirmed.
9. **Services to confirm in detail:** domestic bin collection (regular contracts? bin cleaning?), commercial bin collection (scheduled bins vs one-off; food/glass streams), certified data destruction for office IT, confidential shredding.
10. **Items not taken** (asbestos, clinical, gas bottles, chemicals, liquid paint) — written as standard exclusions; confirm.
11. **Waste transfer notes / receipts** — copy states these are provided; confirm.
12. **Coverage depth** for Bedfordshire, Buckinghamshire, Hitchin and North London.
13. **Real photographs** of the team, vans and completed jobs (before/after).
14. **Legal review** of the template privacy policy and terms.

## 9. Outstanding integrations

- **Quote form delivery:** set `VITE_FORM_ENDPOINT` (Formspree, Web3Forms, or a Supabase edge function in Lovable). Until then the form validates, then opens the visitor's email app with the enquiry prefilled — it does **not** pretend to have sent anything. Photo upload should be added with the backend.
- Google Business Profile (create/verify; keep NAP identical to `business.ts`).
- Google Search Console + submit `sitemap.xml`; Bing Webmaster Tools.
- Analytics (cookie-free option recommended, or add consent banner).
- Hosting: serve `dist/404.html` with HTTP 404 for unknown URLs, and redirect non-`www`/`http` to `https://www.` (host-level).

## 10. QA findings

| Check | Result |
|---|---|
| `npm run build` + `npm run qa` (36 pages) | Pass — no duplicate titles/descriptions/H1s, canonicals correct, all pages in sitemap, JSON-LD parses, no broken internal links, no orphans, no placeholder leaks |
| Playwright, 12 key URLs × mobile (375px) & desktop (1366px) | 200, no horizontal overflow, no console errors or hydration errors |
| Quote form — empty submit | 7 inline errors, focus moved to first invalid field |
| Quote form — valid submit (no endpoint) | Email hand-off message shown; no false "sent" confirmation |
| Call / WhatsApp links | **Not testable** — numbers not supplied; buttons hidden |
| Email delivery via endpoint | **Not tested** — no endpoint configured |
| Unknown URL on `vite preview` | Returns 200 + client-rendered 404 page; production host must be configured to return HTTP 404 |

## 11. Launch-readiness scorecard (honest, implementation-based)

| Category | Score | Notes |
|---|---|---|
| Organic SEO | 84 | Strong on-page; no backlinks/GBP yet |
| Local SEO | 68 | No phone, address, GBP or reviews — the biggest gap; cannot reach 90 without business data |
| Technical SEO | 93 | Prerendered HTML, canonicals, sitemap, schema; host-level 404/redirects pending |
| Keyword architecture | 92 | One URL per cluster, do-not-create list enforced |
| Service coverage | 92 | All 13 supplied services built |
| Location coverage | 82 | 10 justified towns; outer areas intentionally hub-only |
| Long-tail coverage | 85 | Direct answers + FAQs; more guides in Wave 4 |
| AI search readiness | 86 | Answer boxes, entity-consistent schema; lacks third-party corroboration |
| Content quality | 85 | Original, specific, regulation-accurate; no real job photos/case studies yet |
| Internal linking | 93 | No orphans; contextual links throughout |
| Trust / E-E-A-T | 55 | No carrier number, reviews, insurance, photos or company details — **blocked on business confirmation** |
| Conversion optimisation | 70 | Form + sticky CTAs work, but no phone/WhatsApp and no live form backend |
| Mobile experience | 92 | Tested at 375px, sticky action bar, 48px targets |
| **Overall launch readiness** | **78** | Ready to deploy as a foundation; Local SEO, Trust and Conversion need the confirmations in §8–9 before launch |

Scores below 90 in Local SEO, Trust and Conversion are caused by missing business information, not by fixable implementation errors; they were not inflated. No score implies guaranteed rankings or AI citations.

## 12. Remaining priorities

1. Supply items 1–4 in §8 and connect the form endpoint → re-run `npm run build && npm run qa`.
2. Create/verify Google Business Profile with matching NAP; request reviews from real customers.
3. Add real photos and 3–5 short case studies (e.g. "Probate clearance, Cassiobury, 3-bed semi").
4. Wave 3: `house-clearance-st-albans`, `house-clearance-rickmansworth` once there are local jobs to describe; confirm Hitchin / Leighton Buzzard / Chesham demand.
5. Wave 4 guides: "How to dispose of a sofa legally", "Garage clearance checklist", "Simpler Recycling for small businesses in Watford".
