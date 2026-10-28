# Conversion, Lead Quality & Tracking Report

Site: **www.watfordrubbishclearance.co.uk** (this repo; 52 indexable pages). Date: 28 October 2026.

## 1. Limits: read first

- **No behavioural data exists.** The domain isn't live from this environment (the proxy blocks it), there's no Watford project in the Lovable workspace (so no Lovable visitor analytics), and there's no GA4, GTM, Search Console, call tracking or CRM. **Every journey and friction point below is either observed in the built site or labelled as a hypothesis.** No conversion rates, volumes or revenue figures are quoted.
- Competitor pages can't be fetched from here. Competitor notes come from the search-snippet research already recorded in `OPPORTUNITY-AUDIT.md` and `SEO-STRATEGY.md`.
- Performance figures are bundle sizes from the production build. No Lighthouse or field (CrUX) data was available.

## 2. Conversion audit: observed findings

| # | Finding (observed in the built site) | Pages | Severity | Status |
|---|---|---|---|---|
| 1 | The hero **"Get a free quote"** button, the header button and the mobile sticky **"Free quote"** all went to `/contact/#quote`, even though every one of those pages already has a short quote form in the hero. Visitors were sent off-page, and the service they had been reading about was no longer pre-selected. | All service, location, hub and pricing pages (≈48) | High | **Fixed**: buttons now jump to the form on the same page (`#quick-quote`), with the service still selected |
| 2 | Tapping "Free quote" a second time did nothing (the scroll only ran when the URL changed) | All | Low | **Fixed** |
| 3 | The mobile menu had links only, with no call or quote action | All (mobile) | Medium | **Fixed**: menu now ends with "Get a free quote" and "Call 01293 549164 · 24/7" |
| 4 | Single generic full form: no way to tell a landlord from a homeowner, or a regular trade contract from a one-off job | All full forms | Medium | **Fixed**: optional "Who is it for?" plus one service-specific question (see §5) |
| 5 | "Roughly how much?", "Where is it?" and "Preferred time" looked required but weren't | All full forms | Low | **Fixed**: marked "(optional)" |
| 6 | No reassurance next to the submit button about what happens after sending | All full forms | Medium (hypothesis) | **Fixed**: one line saying "No obligation. Nothing is booked until you agree the price." This matches existing commitments on the site. |
| 7 | **No tracking of any kind**: call taps, form submissions and lead source were invisible | Site-wide | High | **Implemented** (see §7) |
| 8 | Enquiry emails didn't say where the lead came from | All forms | High | **Implemented**: lead source, landing page, referrer, UTM tags and gclid are added to each enquiry |
| 9 | **Phone number 01293 is the Crawley/Gatwick area code**, not Watford (01923) | Site-wide | Medium (hypothesis: may reduce local trust and call rate) | **Needs your decision** (§11) |
| 10 | WhatsApp number not supplied, so every WhatsApp button stays hidden | Site-wide | Medium | Blocked. The code is ready, and messages are now prefilled per page (§4). |
| 11 | No reviews, photos of real jobs or waste carrier registration number on the site | Site-wide | High for trust | Blocked: needs real evidence (§11). None was invented. |
| 12 | One 416 kB JS bundle (125 kB gzip) holds the content for all 52 pages and is hydrated on every page | Site-wide | Medium (mobile INP/TBT) | Recommended (§9). Not changed this round. |

Already in good shape and **left alone**: a short quote form above the fold on every commercial page, click-to-call in the top bar, header, hero, footer and mobile bar; a photo upload; honeypot spam protection; accessible error messages; trust badges taken only from confirmed facts; pricing explained without invented prices; and a "what happens next" box on the contact page.

## 3. Customer journeys (hypotheses until analytics run)

| Journey | Intent | What they need | Friction before | Now |
|---|---|---|---|---|
| Google → service page (e.g. sofa removal) → quote | Price for one job | Price factors, same-day availability, an easy way to send photos | Hero quote button sent them to `/contact/` and the chosen service was lost | Stays on the page, service pre-selected |
| Google → town page → call | Urgent, local | Proof the business covers their area, a phone number | None major. Call is in the hero and the sticky bar. | Call taps tracked |
| Google Ads → landing page → quote form | Paid, commercial | Same as above, plus attribution | Paid leads couldn't be told apart from organic | `gclid`/UTM on the enquiry, plus a `generate_lead` event |
| AI assistant → FAQ/pricing → contact | Research, then a quote | Direct answers, then a CTA | The CTA left the page | On-page form. AI referrers are labelled "AI assistant (host)" in the lead source. |
| Landlord/agent → end-of-tenancy → quote | Recurring or B2B | Key-holder access, invoicing | No way to flag "agent" or "not on site" | "Who is it for?" plus "Will someone be at the property?" |
| Business → commercial bins → enquiry | Contract value | Regular vs one-off | Not captured | "One-off or regular?" |

## 4. Changes implemented

**Mobile and CTAs**
- `src/lib/useQuoteHref.ts`: quote buttons in the hero, header, mobile menu and sticky bar point at the form on the current page (the hero quick-quote card first, then the full form, then `/contact/`). The prerendered HTML still links to `/contact/#quote`, so it works before JavaScript loads and gives the same markup for SEO.
- Mobile menu: quote and call buttons added. Sticky bar: 56 px touch targets, now marked up as a `nav` landmark ("Quick contact").
- WhatsApp (once a number is added): the sticky-bar message is prefilled with the service or town of the current page, e.g. *"Hello, I'd like a quote for sofa removal. Please could you advise availability? My postcode is: "*. The customer still presses send themselves.

**Quote form** (`src/components/QuoteForm.tsx`)
- New optional field **"Who is it for?"**: homeowner/tenant, landlord/agent, executor/family, business, builder/trade, other.
- **One conditional question**, chosen by service:
  - House, end of tenancy, probate and hoarder clearances: *Will someone be at the property?* (this answers the "what if I'm not there?" objection)
  - Builders waste: *Main type of waste* (rubble/soil, plasterboard and so on, which drive the price)
  - Commercial services, or a business/trade customer: *One-off or regular?* (flags contract opportunities)
- Service-specific placeholder hints for hot tub, piano, fridge, builders waste, office and commercial bins, so customers know which details change the price.
- No new required fields. The required set is still name, phone, postcode, service, plus details on the full form.

**Copy and trust**: the reassurance line above the submit button. No new claims: every statement repeats commitments the site already made.

## 5. Lead quality

Each enquiry email now includes: `customer_type`, the conditional answer (`on_site` / `waste_type` / `frequency`), `page` (where the form was sent from), `lead_source`, `landing_page`, `referrer`, `utm_*` and `gclid`. Out-of-area checking was deliberately **not** added: coverage is a 30-mile radius, and a postcode-prefix rule would wrongly reject edge cases. Review real enquiries first.

## 6. Analytics and tracking status

| Event (dataLayer) | Fires when | What it means | What it does *not* mean |
|---|---|---|---|
| `phone_click` | Any `tel:` link is tapped (`cta_location` says which one) | Intent to call | A completed call |
| `whatsapp_click` | Any wa.me link | Intent to message | A message sent |
| `email_click` | Any mailto link | Intent to email | An email sent |
| `cta_click` | Quote buttons (`quote-hero`, `quote-header`, `quote-mobile-bar`, `quote-menu`, `quote-cta-band`) | Navigation to a form | A submission |
| `quote_form_start` | First focus in a form | Started a form | |
| `quote_form_error` | Validation blocked a submit (`error_fields`) | Friction signal | |
| `quote_form_submit` | Valid form leaving the page | Submit attempt | Delivery |
| `generate_lead` | `/thank-you/` loads (FormSubmit redirects there after it accepts a submission) | **Confirmed form lead**. Use this as the GA4 key event / Ads conversion. | A booking or revenue |

- **Consent:** set `VITE_GTM_ID=GTM-XXXXXXX` to enable Google Tag Manager. Consent Mode v2 defaults to *denied*, and GTM is **not loaded at all** until the visitor clicks Accept on the banner. Reject is as prominent as Accept, and the footer has a "Cookie settings" link. Without `VITE_GTM_ID`, no tag, no banner and no cookies. The privacy policy updates itself to match.
- Attribution is kept **in memory only** for the visit (nothing is stored on the device), so it needs no consent. A full page reload or a new tab starts a new visit.
- Tested: see §10.

**GTM setup still needed (needs your accounts):** create a GA4 property and a GTM container, add a GA4 Configuration tag, and create GA4 event tags for the events above, triggered by Custom Event. Mark `generate_lead` as a key event and import it into Google Ads. For call *completions*, use a call-tracking provider or Google Ads call assets. Link clicks can't tell you that.

## 7. Search Console

Unavailable: no property or access. Once verified, use the Performance report and pull pages with high impressions and CTR under 2% for title and description tests, and commercial queries ranking 4–15. Compare each page's GSC clicks against its `generate_lead` count in GA4 to find pages that get traffic but no enquiries.

## 8. A/B test backlog (run only once each arm can reach ~100+ form leads; until then, ship and monitor)

| Test | Hypothesis | Primary metric | Guardrails | Decide |
|---|---|---|---|---|
| Hero CTA emphasis: call vs quote first | Urgent searchers call more if Call comes first | `generate_lead` + `phone_click` per session | Bounce rate | Combined contacts per session, 95% CI |
| Short vs full form on service pages | The full form loses mobile users | `quote_form_submit` ÷ `quote_form_start` | Lead quality (share with photos/details) | Completion rate without a drop in quote acceptance |
| Two-step full form (contact details → job details) | Splitting the form reduces abandonment | Completion rate | Error rate | Same |
| Trust strip next to the form (once reviews exist) | Reviews at the decision point lift submissions | `generate_lead` per form view | | |
| Local 01923 number vs 01293 | A local code increases calls | `phone_click` per session | | Requires call tracking |

Lovable has no built-in experiment tooling. Use GTM-based testing or a server-side split, not client-side flicker.

## 9. Performance and accessibility

- Measured: JS 416 kB (125 kB gzip), CSS 41 kB (10 kB gzip), fonts self-hosted with `font-display: swap`. All pages are prerendered, so LCP text is in the HTML.
- **Recommended next:** split the route data (services, locations and guides content) per page, so that each page hydrates only its own content. This should cut parsed JS on mobile substantially. It wasn't done here because it changes the prerender and hydration pipeline and needs its own testing.
- Accessibility changes: the sticky bar is now a named `nav` landmark, touch targets are ≥ 44 px, the optional state is in each label (not colour alone), and the consent banner is a labelled region with real buttons. Already present: skip link, focus rings, labelled inputs, `aria-invalid` + `aria-describedby` errors, and focus moving to the first error.

## 10. QA performed (Playwright, production build, 360–390 px mobile)

All 27 checks passed:
- Hero, mobile-bar and header quote buttons point to the on-page form. Tapping one scrolls the card into view without leaving the page, and the service stays pre-selected.
- Conditional fields show and hide correctly for house clearance, builders waste and sofa removal, and for business customers. Placeholder hints change with the service.
- `phone_click` is pushed with its location, along with `cta_click`, `quote_form_start`, `quote_form_error`, `quote_form_submit` and `generate_lead` (once).
- A visit landing from `?utm_source=google&utm_medium=cpc&gclid=…` that navigates to `/contact/` submits the expected `lead_source=Google Ads / paid search`, landing page, UTMs and gclid. The multipart POST to FormSubmit was intercepted and checked, so no real email was sent.
- An empty submit shows 5 errors and moves focus to Name.
- No horizontal scroll on 8 page types. The sticky bar doesn't cover the footer links. No console or hydration errors.
- With `VITE_GTM_ID` set: the banner shows; Reject means GTM is never requested and the choice is remembered; Accept loads GTM, and loads it again on the next visit.
- `npm run typecheck`, `npm run build` and `npm run qa` are clean (53 pages, 52 sitemap URLs, no SEO problems). Titles, descriptions, H1s, canonicals and URLs are unchanged.

**Not tested:** a live FormSubmit delivery (needs the one-time inbox activation), real devices, screen readers, and a live GTM container.

## 11. Needs your approval or information

1. **Phone number:** 01293 is a Crawley code. If you have, or can get, a 01923 Watford number (a call-tracking number works too), add it to `business.ts`. This is likely the single biggest trust gain for local searchers.
2. **WhatsApp number:** add it to `business.whatsapp` and every WhatsApp button appears, with page-specific messages.
3. **Waste carrier registration number** (CBDU…): it shows on the About page, in the footer and in the schema as soon as it's filled in.
4. **Reviews and real photos:** set up a Google Business Profile and collect reviews. Send before/after photos of real jobs. Nothing has been invented.
5. **GTM/GA4:** create the accounts and set `VITE_GTM_ID`. Then have the privacy policy reviewed.
6. **FormSubmit activation:** confirm the first activation email, or forms won't deliver.

## 12. Scorecard (diagnostic, implementation-based; not conversion rates)

| Area | Before | After | Note |
|---|---|---|---|
| Homepage conversion readiness | 8 | 9 | |
| Service pages | 7 | 9 | On-page quote buttons, service kept |
| Location pages | 7 | 8.5 | Same |
| Mobile usability | 7.5 | 9 | Menu CTAs, sticky bar targets |
| Telephone experience | 7 | 7 | Tracking added. Non-local code unresolved. |
| WhatsApp | n/a | n/a | No number |
| Quote form effectiveness | 7 | 8.5 | |
| Lead quality capture | 5 | 8 | |
| Customer trust | 6 | 6 | Blocked on reviews, photos and carrier number |
| Pricing clarity | 8 | 8 | No prices without confirmed figures |
| Analytics reliability | 0 | 6 | Events built and tested. No container yet. |
| Technical performance | 7 | 7 | Bundle split recommended |
| Accessibility | 8 | 8.5 | |
| **Overall commercial readiness** | **6.5** | **8** | Remaining gains depend on the business inputs in §11 |

## 13. Next priorities

1. Supply the §11 items. Trust evidence and a local number come first.
2. Set up GTM/GA4 and Search Console, and let 4–6 weeks of data build up.
3. Review the `lead_source` and `customer_type` fields in real enquiries, then decide on qualification rules.
4. Split the route bundles for mobile performance.
5. Run the first A/B test (CTA emphasis) once volume allows.
