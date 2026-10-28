# Missing Services, Locations & Local Search Opportunity Audit

Site audited: **www.watfordrubbishclearance.co.uk**. The domain isn't live yet, so I audited the built site in this repo (39 indexable URLs) and ran the prompt's `{WEBSITE_URL}` against this site. Date: 28 October 2026.

**Research limits:** search-result summaries only. Competitor pages, croydonwaste.co.uk and other reference sites can't be fetched from this environment. There's no keyword tool, Search Console or Google Business Profile data, so **no search volumes or rankings are quoted**, and priorities reflect commercial intent and competitor coverage seen in search results.

## 1. Current coverage (before this audit)

| Type | URLs |
|---|---|
| Homepage | `/` — rubbish removal & clearance Watford |
| Services (14) | same-day/24-7, house, probate, office, garden waste, furniture, sofa, mattress, bulky waste, fridge/freezer, builders waste, shed & garage, domestic bins, commercial bins |
| Locations (10) | Bushey, Oxhey & South Oxhey, Croxley Green, Rickmansworth, Abbots Langley & Leavesden, Kings Langley, St Albans, Harpenden, Hatfield & Welwyn, Berkhamsted & Tring |
| Hubs / commercial | services, areas, pricing, contact, about, FAQs |
| Guides (3) | waste carrier licence, council vs private bulky waste, bereavement clearance |
| Service × location | None as URLs; each town page covers 4 popular services and links to all of them |
| Hub-only areas | Hitchin, Welwyn, Wheathampstead, Redbourn, Tring; Bedfordshire (Leighton Buzzard, Houghton Regis, Toddington, Caddington); Chesham; Enfield, St John's Wood, Hampstead |

Watford is the primary market. The confirmed phone is 01293 549164, and every commercial page and meta description carries it.

## 2. Gaps found

### Missing services
| Opportunity | Evidence | Closest URL | Decision |
|---|---|---|---|
| **End of tenancy clearance** (landlords, letting agents, HMOs) | Several competitors rank with dedicated end-of-tenancy clearance pages; the NRLA publishes landlord waste guidance; the business already serves landlords | `/house-clearance/` only mentions landlords in passing | **CREATE NEW SERVICE PAGE** ★★★★★ — built |
| Loft clearance | Common qualifier | `/house-clearance/` | **IMPROVE EXISTING PAGE** — new H2 added |
| Washing machine / appliance removal | Appliance queries | `/fridge-freezer-removal/` | **IMPROVE EXISTING PAGE** — FAQ and keywords added |
| Hoarder clearance | A Hertfordshire competitor lists it | `/house-clearance/` | **HUMAN REVIEW REQUIRED** — specialist work; needs business confirmation |
| Hot tub removal | Marketplace demand; no local specialist pages seen | `/bulky-waste-collection/` | **HUMAN REVIEW REQUIRED** — confirm the service is offered |
| Piano removal, carpet removal | Item queries | `/furniture-removal/`, `/house-clearance/` | **DO NOT CREATE** (yet); add as list items only if offered |
| Asbestos, clinical waste | — | — | **DO NOT CREATE** — not offered (licensed specialists) |

### Missing locations
| Location | Status | Decision |
|---|---|---|
| **Hemel Hempstead** | Large town near Watford; several competitors cover it | **HUMAN REVIEW REQUIRED** — not on your service list; confirm before building `/rubbish-removal-hemel-hempstead/` (★★★★ if confirmed) |
| **Borehamwood / Radlett** (Hertsmere) | Next to Bushey; competitors present | **HUMAN REVIEW REQUIRED** — confirm coverage |
| Garston, Leavesden, North/West Watford | Covered by homepage and Abbots Langley page | **No new page** |
| Hitchin, Leighton Buzzard, Chesham, Enfield | Listed by business, far from base | **Keep on hub** until regular demand is confirmed |

### Service × location matrix (summary)

| | Watford | St Albans | Rickmansworth | Hatfield | Bushey | Harpenden | Others |
|---|---|---|---|---|---|---|---|
| Rubbish removal | EXISTING (home) | EXISTING | EXISTING | EXISTING | EXISTING | EXISTING | EXISTING / hub |
| House clearance | EXISTING | MISSING — HIGH (Wave 2*) | MISSING — MEDIUM (Wave 3*) | COVERED BY HUB | COVERED BY HUB | COVERED BY HUB | LOW VALUE |
| End of tenancy | EXISTING (new) | COVERED BY HUB | COVERED BY HUB | MISSING — MEDIUM (student lets, Wave 3*) | COVERED BY HUB | — | LOW VALUE |
| Office clearance | EXISTING | MISSING — MEDIUM (Wave 3*) | — | MISSING — LOW | — | — | DO NOT CREATE |
| Garden / builders / items | EXISTING | COVERED BY HUB | COVERED BY HUB | COVERED BY HUB | COVERED BY HUB | COVERED BY HUB | DO NOT CREATE |

\* Only build when real local jobs, photos or reviews exist to make each page genuinely different. Without them they would be near-duplicates of the Watford service page (MEDIUM–HIGH cannibalisation risk).

### Customer-type / industry
| Audience | Decision |
|---|---|
| Landlords, letting agents, HMOs | Served by the new end-of-tenancy page (one URL rather than separate landlord *and* agent pages) |
| Estate agents | Section in house clearance and end-of-tenancy pages — no page |
| Builders | Existing builders waste page |
| Offices, retail, hospitality, schools | Existing office clearance and commercial waste pages |
| Care homes, housing associations | **HUMAN REVIEW** — needs confirmed contracts or experience |

### Commercial modifiers: where each one lives
| Modifier | Placement |
|---|---|
| same day / urgent / emergency / 24 hour | `/same-day-rubbish-removal/` plus a same-day FAQ on every town page (added) |
| cost / price / cheap / affordable | `/pricing/`, plus a cost FAQ on every town page and the sofa page (added) |
| man and van | Homepage copy (added) and the skip comparison guide |
| skip alternative | `/builders-waste-removal/` and the new skip guide |
| near me | Google Business Profile (not a page) |
| landlord / letting agent | `/end-of-tenancy-clearance/` |

### AI and conversational questions now answered directly
- "Who offers same-day rubbish removal in {town}?"
- "How much does rubbish removal cost in {town}?"
- "Can I throw away what my tenant left behind?"
- "Is a man and van cheaper than a skip?"
- "Do I need a skip permit in Watford?"
- "How much does sofa removal cost in Watford?"
- "Can you take a washing machine?"

### Competitor gap table (from search summaries)
| Competitors cover | This site before | Now |
|---|---|---|
| End-of-tenancy clearance pages | Missing | Built |
| Skip vs man-and-van comparisons | Missing | Guide built |
| Hoarder clearance | Missing | Awaiting confirmation |
| Hemel Hempstead / Borehamwood pages | Missing | Awaiting confirmation |
| Reviews, ratings, review badges | Missing | Blocked — no reviews yet |
| Instant online pricing (aggregators) | Missing | Not recommended without a confirmed price list |

**White-space opportunities:** licence-checking advice, POPs sofa rules, the council-vs-private comparison and the legal points on tenant belongings. Competitor directory pages rarely explain any of these, and they're now all on site.

## 3. Changes implemented (all tested)

| # | Change | Type |
|---|---|---|
| 1 | `/end-of-tenancy-clearance/` — unique content: turnaround, agent and key handling, the legal note on former tenants' goods (Torts (Interference with Goods) Act 1977), outgoing tenants, 4 FAQs, Service + FAQ + Breadcrumb schema, illustration, hero and full quote forms | CREATE NEW SERVICE PAGE |
| 2 | `/guides/skip-hire-vs-rubbish-removal/` — comparison, when to choose each, licence check, 2 FAQs, Article schema | CREATE SUPPORTING GUIDE |
| 3 | All 10 town pages: same-day FAQ (with phone) and cost FAQ, included in FAQPage schema | ADD FAQ / AI ANSWER BLOCK |
| 4 | `/house-clearance/`: "Loft, cellar and under-stairs clearances" H2; landlords now point to the end-of-tenancy page (avoids overlap) | IMPROVE EXISTING PAGE |
| 5 | `/fridge-freezer-removal/`: washing machine and cooker FAQ; appliance keywords | IMPROVE EXISTING PAGE |
| 6 | `/sofa-removal/`: "How much does sofa removal cost in Watford?" FAQ | IMPROVE EXISTING PAGE |
| 7 | `/pricing/`: same-day / out-of-hours pricing FAQ | IMPROVE EXISTING PAGE |
| 8 | Homepage: man-and-van wording, a link to the skip guide, and the landlords paragraph linked to end-of-tenancy | IMPROVE EXISTING PAGE |
| 9 | Internal links: end-of-tenancy added to house clearance and mattress related services, and to popular services on the Hatfield and Oxhey pages; reachable from the footer, homepage cards and services hub on every page | INTERNAL LINKING |

**Verification:** `npm run build` and `npm run qa` pass on 39 pages, with no duplicate titles, descriptions or H1s, no broken links, no orphans and valid JSON-LD. Playwright checked 7 changed or new pages at 375px and 1366px: all return 200, have one H1, no horizontal overflow, no console errors, and both quote forms present (one form on the guide).

## 4. Requiring your approval or confirmation
- **Hemel Hempstead, Borehamwood/Radlett** — do you cover them? If yes, these are Wave 1–2 town pages.
- **Hoarder clearance, hot tub removal, piano removal** — do you offer them?
- **Care homes / housing association contracts** — any genuine experience?
- No pages were deleted, redirected, renamed or set to noindex.

## 5. Do-not-create list (additions)
| Proposed keyword | Closest page | Reason | Alternative |
|---|---|---|---|
| landlord rubbish removal Watford | `/end-of-tenancy-clearance/` | Same audience and intent | Secondary keyword (done) |
| letting agent clearance | `/end-of-tenancy-clearance/` | Same intent | H3 section (done) |
| loft clearance Watford | `/house-clearance/` | Subset of house clearance | H2 (done) |
| washing machine removal Watford | `/fridge-freezer-removal/` | Same appliance/WEEE intent | FAQ + keyword (done) |
| cheap rubbish removal Watford | `/pricing/` | Modifier, not a service | Pricing H2 on cheap quotes (exists) |
| man and van rubbish removal Watford | `/` | Same as homepage intent | Homepage copy (done) |
| same day rubbish removal {town} × 10 | town pages + same-day page | Thin doorway risk | Same-day FAQ on each town page (done) |
| rubbish removal near me | `/` + GBP | Not a page intent | Google Business Profile |
| house clearance {every town} | `/house-clearance/` + town pages | Near-duplicates without local evidence | Build selectively when real jobs exist |

## 6. Build waves
- **Wave 1 (done):** end-of-tenancy page; same-day and cost answers on every town page.
- **Wave 2:** Hemel Hempstead page (if confirmed); `house-clearance-st-albans` once there are real St Albans jobs or photos; Google Business Profile.
- **Wave 3:** Borehamwood/Radlett (if confirmed); `office-clearance-st-albans`; Hatfield student-let clearance (if demand is proven); hoarder clearance (if offered).
- **Wave 4 (skip guide done):** "Garage clearance checklist", "Simpler Recycling for small businesses in Watford", "What can't go in a skip or rubbish collection".

## 7. Remaining priorities
1. Answer the confirmations in section 4.
2. Create the Google Business Profile — the biggest local-pack lever, and "near me" depends on it.
3. Collect genuine reviews and job photos; they unlock the service × town pages.
4. Add the waste carrier registration number.

## 8. Update — 28 October 2026: coverage confirmed as a 30-mile radius of Watford town centre

The business confirmed it covers everything within **30 miles of Watford town centre**. That answers the Hemel Hempstead and Borehamwood/Radlett questions, and brings in Harrow and Amersham/Chesham too. Hoarder clearance, hot tub removal and piano removal are **still unconfirmed** and have not been built.

**New town pages built** (each with local detail — council, housing, access, business areas — plus 4 FAQs including same-day and cost, quote forms, breadcrumbs and FAQ schema):

| URL | Primary keyword | Why it qualifies |
|---|---|---|
| `/rubbish-removal-hemel-hempstead/` | rubbish removal Hemel Hempstead | Largest town near Watford; Dacorum council; New Town housing; Maylands business area |
| `/rubbish-removal-borehamwood/` | rubbish removal Borehamwood (+ Radlett, Elstree, Shenley) | Hertsmere; next to Bushey; flats plus large Radlett homes |
| `/rubbish-removal-harrow/` | rubbish removal Harrow (+ Stanmore, Pinner) | Large NW London market about 6–8 miles away; interwar housing, lofts and extensions; parking zones |
| `/rubbish-removal-amersham/` | rubbish removal Amersham (+ Chesham) | Buckinghamshire Council; large gardens and outbuildings; Chesham was already on your list |

**Other changes**
- The 30-mile radius now appears on the areas page, homepage, FAQs, the facts strip ("30 miles — radius around Watford") and in the structured data (`GeoCircle`, 48,280 m from Watford town centre).
- The areas page lists further towns inside the radius without their own pages: Hitchin, Stevenage, Hertford, Welwyn Garden City, Potters Bar, Luton, Dunstable, Leighton Buzzard, High Wycombe, Beaconsfield, Gerrards Cross, Aylesbury, Edgware, Barnet, Enfield, Hendon, Uxbridge, Ruislip and others.
- The coverage map now shows 14 towns. The new pages are linked from neighbouring towns (Bushey → Borehamwood and Harrow; Kings Langley and Berkhamsted → Hemel; Rickmansworth and Berkhamsted → Amersham; Oxhey → Harrow).

**Verification:** build plus `npm run qa` pass on 43 pages. In Playwright, the 4 new pages, the areas page and the homepage return 200 at 375px and 1366px, with one H1, no overflow, no console errors and both quote forms present.

**Next town candidates (Wave 2–3, build one at a time as demand shows):** Luton & Dunstable, Stevenage & Hitchin, High Wycombe, Uxbridge & Ruislip, Edgware & Barnet. A page for every town within 30 miles would create thin doorway pages and is deliberately not planned.

## 9. Update — 28 October 2026: remaining services confirmed and implemented

The business confirmed it offers **hoarder clearance, hot tub removal and piano removal**, plus **commercial and domestic bin collections, overflow collections, and contract and account work**. Nothing is now awaiting service confirmation.

| Opportunity | Decision | URL / location | Primary keyword | Cannibalisation check |
|---|---|---|---|---|
| Hoarder clearance | CREATE NEW SERVICE PAGE ★★★★★ | `/hoarder-clearance/` | hoarder clearance Watford | LOW — distinct sensitive intent; house clearance links to it |
| Hot tub removal | CREATE NEW SERVICE PAGE ★★★★ | `/hot-tub-removal/` | hot tub removal Watford | LOW — item-specific, very different process (draining, disconnection, cutting up) |
| Piano removal & disposal | CREATE NEW SERVICE PAGE ★★★ | `/piano-removal/` | piano removal Watford | LOW — states clearly it's disposal, not piano moving |
| Contract & account work | CREATE INDUSTRY / COMMERCIAL PAGE ★★★★★ | `/contract-waste-services/` | waste collection contract Watford | LOW — B2B recurring and account intent; the commercial bin page keeps the one-off and trade-bin intent |
| Domestic overflow collections | IMPROVE EXISTING PAGE | `/domestic-bin-collection/` — new "Overflow collections" H2, H1 and title updated | overflow waste collection Watford | Avoided a separate page that would compete with this one |
| Commercial overflow and contracts | IMPROVE EXISTING PAGE | `/commercial-bin-collection/` — "Scheduled contracts or one-off" and "Commercial overflow collections" H2s; meta description with phone | commercial waste collection Watford | — |
| Bin store clearance (managing agents) | ADD SECTION, NOT A NEW URL | H2 on `/contract-waste-services/` | bin store clearance Watford | Would overlap with contract and domestic pages |

**Each new page has:** unique H1/H2/H3 structure, a direct-answer box, a "what we can take" list, a custom illustration, 3–4 FAQs, Service + FAQ + Breadcrumb schema, a hero quote form with the service pre-selected, the full quote form with photo upload, a meta description with 01293 549164, and related-service links.

**Internal links added:** house clearance → hoarder; garden waste → hot tub; furniture → piano; bulky waste → hot tub and piano; domestic and commercial bins → contracts; the homepage "Who we help" section → contracts and hoarder clearance; the homepage "often asked to take" list → hot tubs and pianos. All new pages are also on the services hub, homepage service cards and footer.

**Verification:** build plus `npm run qa` pass on 47 pages, with no duplicate titles, descriptions or H1s, no broken links or orphans, and valid JSON-LD. In Playwright, all 4 new pages and 4 changed pages return 200 at 375px and 1366px, with one H1, no overflow, no console errors, and both quote forms present with the correct service pre-selected.

**Remaining Wave 2–3 (unchanged):** further town pages within the 30-mile radius (Luton & Dunstable, Stevenage & Hitchin, High Wycombe, Uxbridge & Ruislip, Edgware & Barnet) and service-in-town pages (e.g. house clearance St Albans) once real local jobs, photos or reviews exist. Google Business Profile, reviews and the waste carrier number remain the top non-page priorities.

## 10. Update — 28 October 2026: Wave 2 towns and corporate redesign

**Five new town pages**, all within the confirmed 30-mile radius. Each has local context (council, housing, business areas, access), 4 FAQs including same-day and cost, quote forms, schema and a phone number in the meta description:

| URL | Primary keyword | Local angle |
|---|---|---|
| `/rubbish-removal-luton/` | rubbish removal Luton (+ Dunstable, Houghton Regis) | Private rented sector and student lets; industrial estates; Luton unitary vs Central Bedfordshire |
| `/rubbish-removal-stevenage/` | rubbish removal Stevenage (+ Hitchin, Letchworth) | First post-war New Town; Gunnels Wood employment area; Hitchin streets and Letchworth gardens |
| `/rubbish-removal-high-wycombe/` | rubbish removal High Wycombe (+ Beaconsfield) | Hillside access; furniture-making heritage; Cressex trade estates |
| `/rubbish-removal-uxbridge/` | rubbish removal Uxbridge (+ Ruislip, Ickenham) | Brunel student lets; interwar Ruislip homes; Hillingdon Council |
| `/rubbish-removal-edgware/` | rubbish removal Edgware (+ Mill Hill, Barnet) | Flats and maisonettes vs larger family homes; controlled parking; Barnet Council |

The areas page's wider-towns list was trimmed so no town is listed there and on its own page. Neighbouring pages now link to the new ones (Harpenden → Luton, Hatfield → Stevenage, Amersham → High Wycombe, Harrow → Uxbridge and Edgware, Borehamwood → Edgware). The coverage map was redrawn as a square with all 19 towns and a 30-mile radius label.

**Corporate redesign (site-wide)**
- **Type:** Manrope for headings (replacing the heavier Archivo), Inter for body text, lighter heading weights and tighter tracking.
- **Palette:** deeper corporate navy, a muted gold accent instead of bright yellow, a controlled brand red for calls to action. The brand red, yellow and blue stripe is kept as a thin 3px accent.
- **Components:** square-cornered buttons, thin-bordered cards with soft hover lift, outlined circular icons, eyebrow labels with a rule line, a navy facts strip, a navy-ruled "In short" answer box, a quote card with a red top rule, and a calm top bar with no animation.
- **Illustrations:** cartoon sun and clouds removed in favour of a subtle grid backdrop in the refined palette. The logo, favicon and social-share image were updated to match.

**Verification:** build plus `npm run qa` pass on 52 pages. In Playwright, all 5 new town pages return 200 at 375px and 1366px, with one H1, no overflow, no console errors and both quote forms. I visually reviewed the homepage, a service page, a town page and the map on desktop and mobile.
