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
