# Watford Rubbish Clearance — Research, SEO Architecture & Build Report

Prepared 27 October 2026. This document records what was researched, what was decided and why, what was built, and what still needs confirming from the business.

## 1. Research limits (read first)

| Source | Status |
|---|---|
| Live web search (search-result snippets) | Used |
| Competitor and reference sites (junkwize.com, reewaste.co.uk, competitor pages) | **Not reachable** — the build environment's network policy blocked direct page fetches. No competitor headings, meta or schema were inspected directly. |
| Keyword tools / search volumes | Not available. **No search volumes are quoted anywhere.** Priorities are based on commercial intent and relevance. |
| Google Search Console, Analytics, Google Business Profile | Not available |
| Business-supplied facts | Name, domain, email, services, service areas, brand colours; later confirmed: phone 01293 549164, licensed waste carrier, 24/7 operation, same-day collections, £5m public liability. WhatsApp, address and carrier registration number not yet supplied. |
| UI reference sites (croydonwaste.co.uk, scrapcarcollectionhampshire, guildfordrubbishremoval.co.uk) | **Not reachable** (network policy). Design uses creative freedom in the same genre: 24/7 top bar, hero quote form, graphics. |

## 2. Business & market summary

- **Primary service:** rubbish removal / rubbish clearance (wait-and-load, man-and-van style collection).
- **Primary market:** Watford (WD17, WD18, WD19, WD24, WD25).
- **Secondary services (confirmed by brief):** house clearance, probate clearance, office clearance, garden waste, furniture removal, sofa removal, mattress disposal, bulky waste collection, fridge/freezer removal, builders' waste, shed & garage clearance, domestic bin collection, commercial bin collection.
- **Customer segments:** homeowners, tenants, landlords/letting agents, executors/solicitors, estate agents, builders/trades, offices/retail/hospitality.

### Findings from search (snippets only)

- The Watford SERP is crowded with **aggregators and directories** (LITTA, Clearabee, Checkatrade, Bark, Airtasker, rubbishwaste.co.uk, clearwaste.com). Independent local firms compete mainly through directory profiles. A fast, content-rich local site is a genuine differentiator.
- Third-party profiles with similar names (a Checkatrade profile and a Trustpilot page for `watfordrubbish.co.uk`) **are not this business** — confirmed by the owner. They must never be linked or used for reviews.
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
│   ├── /same-day-rubbish-removal/  (urgent / 24-hour intent)
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
| same day / 24 hour / urgent rubbish removal Watford | `/same-day-rubbish-removal/` | Urgent transactional | Call |
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
| Asbestos / hazardous waste removal | Not offered (specialist licence) — would mislead |
| Skip hire | Not a service offered; addressed as "skip alternative" on builders page |
| Programmatic service × every town pages | Thin, duplicative, cannibalising |

## 7. What was built

- **39 prerendered, indexable pages** (after the opportunity audit — see `docs/OPPORTUNITY-AUDIT.md`): homepage, services hub, 15 service pages (incl. same-day/24-hour and end of tenancy), areas hub, 10 location pages, pricing, about, contact, FAQs, guides hub, 4 guides, privacy policy, terms. Plus `noindex` thank-you and 404 pages.
- **Quote forms on every page** (except legal/thank-you): a short form (name, phone, postcode, service, note) in every page header, with the service pre-selected on service pages; a full form (adds email, load size, access, preferred date/time, details, **photo upload**) on the homepage, service, location, pricing and contact pages. Submissions go by FormSubmit to hello@watfordrubbishclearance.co.uk, the customer gets an automatic acknowledgement, and they land on /thank-you/. Spam protection: honeypot field. It works even before JavaScript loads.
- **Call conversion:** 01293 549164 appears in the 24/7 top bar, the header ("Call 24/7"), hero buttons, the mobile sticky bar, forms, footer, schema (`+441293549164`) and commercial meta descriptions.
- **Visual system:** a 24/7 top bar; a yellow facts strip (24/7 · same day · £5m cover · 14 services · 11 towns); 15 custom vector illustrations (one per service, plus van and town); illustrated service cards; a van load-size guide matching the form's "how much?" field; a "where does your rubbish go" flow; and a clickable coverage map (schematic). All vector, so text and graphics never blur.
- **Technical SEO:** static HTML for every route, unique titles/descriptions, canonicals, `sitemap.xml`, `robots.txt`, OG/Twitter tags, OG image, `lang="en-GB"`, semantic landmarks, one H1 per page.
- **Schema:** `LocalBusiness` with telephone and 24/7 `openingHoursSpecification` (no address, ratings or reviews), `WebSite`, `Service`, `BreadcrumbList`, `FAQPage`, `Article`, `ItemList`, `AboutPage`/`ContactPage`.
- **Confirmed trust facts used in copy:** licensed waste carrier, £5 million public liability, open 24/7, same-day collections.

## 8. Outstanding business confirmations

1. **Waste carrier registration number (CBDU…)** — the site says you're licensed, and the licence-check guide tells customers to ask for the number, so publishing it matters. Add it to `wasteCarrierNumber` in `src/data/business.ts`.
2. **Phone area code** — 01293 is the Crawley code, not Watford (01923). It's used as instructed, but a Watford number would be a stronger local signal for customers and Google. Consider a 01923 number routed to the same line.
3. **WhatsApp number** (turns on WhatsApp buttons automatically).
4. **Google Business Profile** — none exists. Creating and verifying one is the biggest local-SEO gain available. Use the exact name, phone and site URL, set it up as a service-area business with no public address, and select "Open 24 hours".
5. **Real photos** of vans, team and jobs to add to the illustrations (put them in `public/images/` and they can be dropped into the image slots).
6. **Legal entity / Companies House number** if incorporated.
7. **Service details to confirm:** domestic bin collection (regular contracts? bin cleaning?), commercial bins (scheduled vs one-off; food/glass), certified data destruction, items not taken (asbestos, clinical, gas bottles, chemicals), waste transfer notes.
8. **Coverage depth** for Bedfordshire, Buckinghamshire, Hitchin and North London.
9. **Legal review** of the template privacy policy and terms.

## 9. Outstanding integrations

- **FormSubmit activation (one-off):** the first real enquiry triggers an activation email to hello@watfordrubbishclearance.co.uk. Click the link in it, and every enquiry after that arrives normally. Do one test submission from the live site after deploying. Also confirm that multiple photos arrive (the form allows several; check FormSubmit delivers all of them). To use Formspree, Web3Forms or a Lovable/Supabase function instead, set `VITE_FORM_ENDPOINT`.
- Google Business Profile, Search Console (submit `sitemap.xml`), Bing Webmaster Tools.
- Analytics (cookie-free option recommended, or add a consent banner).
- Hosting: return `dist/404.html` with HTTP 404 for unknown URLs; redirect non-`www`/`http` to `https://www.`.

## 10. QA findings

| Check | Result |
|---|---|
| `npm run build` + `npm run qa` (37 indexable pages) | Pass — no duplicate titles, descriptions or H1s; canonicals correct; all in sitemap; JSON-LD valid; no broken links or orphans |
| Playwright, 15 URLs × mobile (375px) & desktop (1366px) | All 200, no horizontal overflow, no console or hydration errors; tel: links on every page |
| Short form: empty submit | 3 inline errors, nothing sent |
| Short form: valid submit (FormSubmit mocked) | multipart POST to formsubmit.co with name, phone, postcode, service (pre-selected), page, `_subject`, `_next`, `_honey` → redirected to /thank-you/ |
| Full form: empty submit / valid submit with photo (mocked) | 5 inline errors / POST includes the photo attachment and auto-response → /thank-you/ |
| Live email delivery | **Not tested** — a real submission would send to your inbox and needs the one-off activation click |
| WhatsApp | Not applicable — no number yet |

## 11. Launch-readiness scorecard (honest, implementation-based)

| Category | Before | Now | Notes |
|---|---|---|---|
| Organic SEO | 84 | 87 | Same-day page added, phone in metadata |
| Local SEO | 68 | 74 | Phone + 24/7 hours in schema; still no Google Business Profile or reviews; 01293 area code is a weaker local signal |
| Technical SEO | 93 | 93 | Host-level 404/redirects pending |
| Keyword architecture | 92 | 93 | Urgency intent now has its own URL |
| Service coverage | 92 | 94 | |
| Location coverage | 82 | 84 | Coverage map links every town |
| Long-tail coverage | 85 | 87 | Same-day, 24/7 and insurance questions answered |
| AI search readiness | 86 | 88 | Consistent business details across schema and copy |
| Content quality | 85 | 88 | Visual aids (load guide, waste journey) add genuine help |
| Internal linking | 93 | 94 | |
| Trust / E-E-A-T | 55 | 72 | Licensed, £5m insured, 24/7 confirmed; still missing carrier no., reviews and real photos |
| Conversion optimisation | 70 | 91 | Click-to-call everywhere, form on every page, photo upload, working form delivery (needs activation) |
| Mobile experience | 92 | 93 | Call + quote sticky bar, form above the fold |
| **Overall launch readiness** | **78** | **86** | Launchable once the form is activated. Local SEO and Trust need a Google Business Profile, carrier number, reviews and photos to pass 90 |

## 12. Remaining priorities

1. Deploy, send one test enquiry and click FormSubmit's activation email; add the waste carrier number → re-run `npm run build && npm run qa`.
2. Create/verify Google Business Profile with matching NAP; request reviews from real customers.
3. Add real photos and 3–5 short case studies (e.g. "Probate clearance, Cassiobury, 3-bed semi").
4. Wave 3: `house-clearance-st-albans`, `house-clearance-rickmansworth` once there are local jobs to describe; confirm Hitchin / Leighton Buzzard / Chesham demand.
5. Wave 4 guides: "How to dispose of a sofa legally", "Garage clearance checklist", "Simpler Recycling for small businesses in Watford".
