# Content Refresh, SEO Re-optimisation & AI Search Review

**Site:** www.watfordrubbishclearance.co.uk. The prompt's `{WEBSITE_URL}` was blank, so this ran on this site. Source of truth: the Lovable-connected repo `croydonwaste-wq/hello-hub` (`kok` branch).
**Date:** 28 October 2026.

## 1. Limits — read first

- **No performance data exists.** The site hasn't launched, so there is no Search Console, analytics, ranking or enquiry data. Every finding below comes from inspecting the content and from search-result summaries. **No traffic, CTR or ranking figures are quoted or implied.**
- **Content decay can't be measured on a brand-new site.** "Decay" here means content that became **out of date as the business confirmed new facts** during the build (24/7 hours, 30-mile radius, new services and towns).
- Competitor and reference sites can't be fetched from this environment; only search-result summaries were used.

## 2. Inventory (52 indexable pages)

Extracted from the built HTML: titles, descriptions, H1/H2s, word counts, FAQs, schema and in-content inbound links.

| Type | Count | Notes |
|---|---|---|
| Homepage | 1 | 2,040 words, 7 FAQs, LocalBusiness + WebSite + FAQPage |
| Service pages | 19 | 900–1,400 words each, 3–4 FAQs, Service + Breadcrumb + FAQPage, 23–34 in-content inbound links |
| Town pages | 19 | 790–960 words, 4 FAQs, WebPage + Breadcrumb + FAQPage, 8–11 in-content inbound links |
| Hubs | 3 | Services, areas, guides |
| Commercial / support | 4 | Pricing, FAQs, about, contact |
| Guides | 4 | Article + FAQPage |
| Legal | 2 | Privacy, terms |

Before this refresh: every page had a unique title, description and H1; canonicals were correct; there were no broken links or orphans.

## 3. Findings and what was changed

### A. Accuracy — unverified business claims (★★★★★, fixed)
Seven sentences described the business's enquiry patterns ("most of our work here", "many of our enquiries", "we regularly hear from…") with no data behind them. They were rewritten as facts about the area or housing.

| Page | Before | After |
|---|---|---|
| Croxley Green | "…which is where most of our work here comes from" | "…the spaces that most often need clearing" |
| Rickmansworth | "Many of our Rickmansworth and Moor Park enquiries come from families downsizing…" | "Rickmansworth and Moor Park have many larger family homes, and downsizing from them often means…" |
| Hemel Hempstead | "…the most common jobs here" | "…typical jobs here" |
| Amersham | "…make up much of our work here" | "…are typical jobs here" |
| Luton | "…some of our most frequent jobs here" | "…common needs here" |
| Stevenage | "…make up much of the work here" | "…are typical jobs here" |
| Piano removal | "We regularly hear from organisations…" | "Schools, churches and community halls … can book a collection too" |

### B. Decay — content out of date after later confirmations (★★★★, fixed)
- **Office clearance:** said out-of-hours work was "by arrangement" (lead and FAQ). It now reflects the confirmed 24/7 operation.
- **Areas hub, "further towns" list:** repeated towns that now have their own pages or are named on one (Tring, Welwyn Garden City, Redbourn, Wheathampstead, Houghton Regis, Toddington, Caddington, Baldock, Marlow), which gave mixed signals about which URL covers a place. It now lists only towns without a page.
- **Services hub meta description:** listed only the original services. It now names hoarder clearance, hot tubs, pianos and trade bins, plus the phone number.
- **About meta description:** now includes the confirmed licence, insurance, 24/7 and 30-mile facts.
- **FAQ hub "What areas do you cover?":** was a 19-item list of combined town labels. It now states the 30-mile radius with representative towns and points to the areas page.

### C. Information gain / customer objections (★★★★, implemented)
On `/faqs/`, three process questions were added, each based on facts already stated on the site (quote form fields; the price-change rule in the terms; the process steps):
- "What do you need from me for a quote?"
- "Is the price fixed once I accept the quote?"
- "What happens on collection day?"

**Not added, because they need your confirmation:** VAT treatment, minimum charge and payment methods. Price guides show customers commonly ask these.

### D. FAQ hub (★★★, implemented)
The "service-specific questions" section showed only the first six services, a leftover from when there were fewer. It now shows one question per service for all 19, grouped like the services hub, each linking to its page. FAQPage schema stays on the general questions only, to avoid duplicating the schema already on service pages.

### E. Local relevance on service pages (★★★★, implemented)
The service-page sidebar showed areas only when a service was listed as "popular" on some town page, so **hot tub, piano, hoarder and contract pages showed no coverage at all**. Every service page now has a "Where we offer this" block: the 30-mile statement plus six town links, with towns where the service is popular first.

### F. Internal linking (★★★, implemented)
The homepage had no in-text links to `/same-day-rubbish-removal/` or `/about/`; both were reachable only through cards and the footer. A factual trust sentence was added with natural anchors ("same-day rubbish removal", "more about how we work").

### G. Structured data (★★★, implemented)
- **`Service.areaServed`** said "Watford + Hertfordshire", contradicting the confirmed coverage. It now uses Watford plus the same 30-mile `GeoCircle` as the LocalBusiness, defined once and shared.
- **`LocalBusiness.areaServed`** used combined labels as single place names (e.g. "Oxhey & South Oxhey"). They're now split into individual places.

### H. Technical (★★, implemented)
- **Sitemap `lastmod`:** every URL carried the build date, an inaccurate freshness signal. `lastmod` is now emitted only for guides, which have real published and updated dates.

## 4. Search intent and cannibalisation — re-checked, no changes needed

| Cluster | Owner | Check |
|---|---|---|
| rubbish removal / clearance Watford | `/` | Clear. The same-day page owns the urgent intent; the homepage links to it rather than competing |
| overflow collections | Domestic: `/domestic-bin-collection/`; trade: `/commercial-bin-collection/`; blocks and bin stores: `/contract-waste-services/` | Distinct audiences and anchors |
| furniture / bulky / sofa | Separate pages | Distinct: multi-item furniture vs mixed bulky items vs POPs-regulated seating |
| house / probate / hoarder / end of tenancy | Separate pages | Distinct triggers and customers; house clearance links out to each |
| towns | One page each | No town appears on two pages after the areas-hub fix |

H1s and meta titles were reviewed. None were changed, because none had a clear problem; changing them without a reason only adds risk.

## 5. Do-not-change list
- All 52 URLs (no renames or redirects).
- All H1s and meta titles.
- Service and town body copy, apart from the accuracy fixes above.
- The design system and components from the corporate redesign.

## 6. Verification
- `bun run build` prerenders 52 routes plus the 404 page. `npm run qa` reports no duplicate titles, descriptions or H1s, correct canonicals, valid JSON-LD, no broken links and no orphans.
- Sitemap: 52 URLs; 4 `lastmod` entries (guides only).
- Playwright at 375px and 1366px on the 9 changed or affected pages: all 200, one H1, no horizontal overflow, no console errors. "Where we offer this" appears on service pages, the FAQ hub has 19 service cards, and the homepage contains the same-day and about links.

## 7. Needs your confirmation or approval

| Item | Why |
|---|---|
| **Is labour, loading and disposal included in quotes?** | The pricing page states this (written at the start of the build); it has never been confirmed |
| VAT: are prices inclusive or exclusive, and are you VAT-registered? | Common customer question; can't be answered without you |
| Minimum charge? | Same |
| Payment methods (card, bank transfer, on account) | Same |
| Waste carrier registration number | Strongest single trust signal; the licence-check guide tells customers to ask for it |
| Reviews, job photos, case studies | Biggest remaining E-E-A-T gap |
| Google Business Profile | Local pack and "near me" visibility |

## 8. 30 / 60 / 90-day roadmap (from launch)
- **Days 1–30:** activate FormSubmit and test a live enquiry; submit the sitemap in Search Console; check that all 52 URLs are indexed; confirm call tracking (or note enquiry sources manually).
- **Days 31–60:** review Search Console queries per page; for pages with impressions but low CTR, test title and description changes one at a time; add verified answers on VAT, minimum charge and payment once confirmed.
- **Days 61–90:** compare enquiries by page; add real job examples and photos to the strongest town and service pages; decide on service-in-town pages (e.g. house clearance St Albans) only where queries show demand.

**Ongoing:** review commercial pages quarterly, pricing content whenever rates change, regulation-based copy (POPs, Simpler Recycling, duty of care) when rules change, and coverage whenever the service area changes. Don't edit pages just to make them look fresh.
