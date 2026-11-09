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

**Fix:** `business.domain` in `src/data/business.ts` is now `https://watfordrubbishclearance.co.uk`, matching what the host serves. Canonicals, og tags, JSON-LD, sitemap.xml and robots.txt are all built from that one value (the build scripts no longer keep their own copies). The prerender now fails the build if any page's canonical is not its own URL on that domain. `npm run qa` also flags any self-link that uses a different host or `http://`.

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
| `www` → non-`www` redirect type | 302 (temporary). Google treats a long-standing 302 like a 301, but 301 is preferred. This is set by the host |
| llms.txt for AI assistants | Was missing (404). Now generated at build time: a plain-text index of every page with its description |

## What to do after this is published

1. **Publish** the site (Lovable → Publish) so the new build is live.
2. Run `npm run check:live`. It should report PASS (warnings about the 302 and unknown-URL 200s are host settings, not errors).
3. In **Search Console**, use a **Domain property** (`watfordrubbishclearance.co.uk`) so www and non-www are covered together. If you only have a URL-prefix property for `https://www.…`, add one for `https://watfordrubbishclearance.co.uk/`.
4. **Sitemaps** → remove the old `https://www.watfordrubbishclearance.co.uk/sitemap.xml` and submit `https://watfordrubbishclearance.co.uk/sitemap.xml`.
5. **URL Inspection** → test the homepage and a few key pages on the non-www domain, then *Request indexing*.
6. In the two reports, click **Validate fix**. Google rechecks over days to a few weeks.
7. Update the Google Business Profile website link and any directory listings to the non-www address (they will still work through the redirect, but a direct link is cleaner).

**What will still show (and is fine):** `www.` URLs and slashless URLs will keep appearing under "Page with redirect" and "Alternate page with proper canonical tag". Those reports list URLs Google *chose not* to index because a better version exists. They are only a problem when the URLs you want indexed are in them, which is what this fix addresses.

**If you'd rather use www:** set `www.watfordrubbishclearance.co.uk` as the primary domain in Lovable's domain settings *and* change `business.domain` back to `https://www.watfordrubbishclearance.co.uk` in the same release. The two must always match.
