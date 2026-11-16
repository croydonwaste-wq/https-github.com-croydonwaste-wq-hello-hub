# Indexing & crawlability audit — 9 November 2026

Triggered by Google Search Console reporting **"Alternate page with proper canonical tag"** and **"Page with redirect"**. Scope: every URL in the sitemap on the live site, the redirects between host variants, robots.txt, the sitemap, canonical / robots / X-Robots-Tag on every page, behaviour for unknown URLs and slashless URLs, and access for search and AI crawlers (Googlebot, Bingbot, GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Applebot, CCBot).

## Root cause (fixed in code)

The hosting serves the site on **`watfordrubbishclearance.co.uk`** and sends `www.` there with a 302 redirect. The site's code pointed everything at **`www.`**:

| Signal | Pointed at | Result in Search Console |
|---|---|---|
| sitemap.xml (all 52 URLs) | `https://www.…` | Every submitted URL redirects → **Page with redirect** |
| robots.txt `Sitemap:` line | `https://www.…/sitemap.xml` | Sitemap itself behind a redirect |
| `<link rel="canonical">` on every page | `https://www.…` | The page Google actually fetched names a different URL as canonical → **Alternate page with proper canonical tag** |
| og:url, og:image, JSON-LD `@id`/`url`/`logo` | `https://www.…` | Conflicting signals for the business entity |

The canonical said "use www", the server said "use non-www". Google could not index either version cleanly, so pages fell into those two exclusion reports.

**Fix (two parts):**
1. **Hosting (done 9 Nov 2026):** `www.watfordrubbishclearance.co.uk` was made the primary domain in Lovable. www now answers 200 directly; non-www and `http://` redirect to it. The host and the existing www canonicals now agree.
2. **Code:** `business.domain` in `src/data/business.ts` stays `https://www.watfordrubbishclearance.co.uk` and is now the single source of the domain. Canonicals, og tags, JSON-LD, sitemap.xml and robots.txt are all built from that one value (the build scripts no longer keep their own copies). The prerender now fails the build if any page's canonical is not its own URL on that domain. `npm run qa` also flags any self-link that uses a different host or `http://`.

## Everything else checked

| Check | Result |
|---|---|
| All 52 sitemap pages return 200 on the served domain | Pass |
| `noindex` meta or `X-Robots-Tag` on indexable pages | None found. Only `/thank-you/` and the 404 page are noindex, which is intended |
| robots.txt | Allows everything; no crawler blocked |
| Search & AI crawler user-agents (11 tested) | All get 200 with the full page; no firewall or bot challenge |
| Content in the HTML before JavaScript runs | Yes: every page is prerendered with H1, body text, metadata and JSON-LD |
| Internal links | All relative and all use the trailing-slash canonical form; no broken links or orphan pages |
| Duplicate titles, descriptions, H1s; invalid JSON-LD; images without alt | None (`npm run qa`) |
| JavaScript errors when rendering | None |
| Slashless URLs (e.g. `/pricing`) | Serve the page with canonical → `/pricing/`. Google lists these under "Alternate page with proper canonical tag". **That is expected and correct**: nothing links to them |
| Unknown URLs (e.g. `/xyz/`) | Host returns the homepage HTML with status 200. Once rendered, the app replaces it with "Page not found", `noindex` and no canonical, so Google drops them ("Excluded by noindex" / "Soft 404"). A real 404 status is not configurable on the current hosting |
| non-`www` → `www` redirect type | `https://` and `http://` non-www redirect with 302 (temporary); `http://www` uses 301. Google treats a long-standing 302 like a 301, but 301 is preferred. This is set by the host |
| llms.txt for AI assistants | Was missing (404). Now generated at build time: a plain-text index of every page with its description |

## What to do after this is published

1. **Publish** the site (Lovable → Publish) so the new build is live.
2. Run `npm run check:live`. It should report PASS (warnings about the 302 and unknown-URL 200s are host settings, not errors).
3. In **Search Console**, use a **Domain property** (`watfordrubbishclearance.co.uk`) or the URL-prefix property `https://www.watfordrubbishclearance.co.uk/`.
4. **Sitemaps** → make sure `https://www.watfordrubbishclearance.co.uk/sitemap.xml` is submitted (resubmit it so Google refetches).
5. **URL Inspection** → test the homepage and a few key pages on www, then *Request indexing*.
6. In the two reports, click **Validate fix**. Google rechecks over days to a few weeks.
7. Make sure the Google Business Profile website link and directory listings use the www address (they will still work through the redirect, but a direct link is cleaner).

**What will still show (and is fine):** non-www URLs and slashless URLs will keep appearing under "Page with redirect" and "Alternate page with proper canonical tag". Those reports list URLs Google *chose not* to index because a better version exists. They are only a problem when the URLs you want indexed are in them, which is what this fix addresses.

**If the primary domain ever changes:** change `business.domain` in the same release. The hosting's primary domain and `business.domain` must always match.

## Follow-up audit fixes (9 November 2026)

A full crawl of the live site (52 pages, 20 crawler user-agents, Lighthouse, rendered vs non-JS HTML) found no blockers. These smaller issues were fixed:

| Issue found on the live site | Fix |
|---|---|
| On 32 pages, the host injected `twitter:title`/`twitter:description` with "&" double-encoded (`&amp;amp;`), so X/Twitter previews read "Full &amp; Part…" | `Seo.tsx` now outputs its own `twitter:title`, `twitter:description` and `twitter:image`. **Check after publishing** that the live HTML has a single, correctly encoded `twitter:title` per page |
| `/favicon.ico` returned 404 | `public/favicon.ico` (16/32/48 px, generated from `favicon.svg`) and linked in `index.html` |
| `/House-Clearance/` served HTML with canonical `/`, but after JavaScript rendered the page with canonical `/house-clearance/` (conflicting signals) | Routes are case-sensitive, so wrong-case URLs render the noindexed 404 |
| 18 titles over 60 characters, 7 descriptions over 160 | Shortened, primary keyword kept first. `npm run qa` now fails at 60 / 160 |

Not fixable in code (host settings, raise with Lovable): non-www redirects are 302 rather than 301, and unknown URLs return 200 with the homepage HTML (they render as a noindexed "Page not found").
