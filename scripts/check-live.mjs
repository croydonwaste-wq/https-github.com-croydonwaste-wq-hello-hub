// Crawlability/indexability check against the LIVE site. Run after publishing:  npm run check:live
// Catches what a static build check cannot: host redirects that disagree with the canonical
// domain ("Page with redirect" / "Alternate page with proper canonical tag" in Search Console),
// noindex or X-Robots-Tag added by the host, bots being blocked, and sitemap URLs that do not 200.
// Exits non-zero if anything fails. Optional: npm run check:live -- https://staging.example.com
import fs from "node:fs";
import path from "node:path";

const domainFromSource = fs.readFileSync(path.resolve("src/data/business.ts"), "utf8").match(/domain:\s*"([^"]+)"/)[1];
const DOMAIN = (process.argv[2] ?? domainFromSource).replace(/\/$/, "");
const host = new URL(DOMAIN).host;
const altHost = host.startsWith("www.") ? host.slice(4) : `www.${host}`;
const BOTS = {
  Googlebot: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
  Bingbot: "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
  GPTBot: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.1; +https://openai.com/gptbot)",
  "OAI-SearchBot": "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)",
  ClaudeBot: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)",
  PerplexityBot: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)",
};

const fails = [];
const warns = [];
const get = (url, ua = BOTS.Googlebot) => fetch(url, { redirect: "manual", headers: { "user-agent": ua } });

// 1. The canonical origin must answer directly, and its alternates must redirect to it.
const home = await get(`${DOMAIN}/`);
if (home.status !== 200) fails.push(`${DOMAIN}/ returned ${home.status}${home.headers.get("location") ? ` → ${home.headers.get("location")}` : ""}. The host redirects away from the canonical domain: set the primary domain in hosting to ${host}, or change business.domain to match the host.`);
for (const alt of [`https://${altHost}/`, `http://${host}/`, `http://${altHost}/`]) {
  try {
    const r = await get(alt);
    const loc = r.headers.get("location") ?? "";
    if (r.status === 200) fails.push(`${alt} serves a page (200) instead of redirecting to ${DOMAIN}/`);
    else if (![301, 302, 307, 308].includes(r.status) || !loc.startsWith(DOMAIN)) fails.push(`${alt} → ${r.status} ${loc}, expected a redirect to ${DOMAIN}/`);
    else if (r.status !== 301 && r.status !== 308) warns.push(`${alt} redirects with ${r.status} (temporary); a 301 is preferred. This is set by the host, not the code.`);
  } catch (e) {
    warns.push(`${alt} unreachable (${e.cause?.code ?? e.message})`);
  }
}

// 2. robots.txt and sitemap.xml
const robots = await (await get(`${DOMAIN}/robots.txt`)).text();
if (/^Disallow:\s*\/\s*$/m.test(robots)) fails.push("robots.txt disallows the whole site");
const sitemapLine = robots.match(/^Sitemap:\s*(\S+)/m)?.[1];
if (sitemapLine !== `${DOMAIN}/sitemap.xml`) fails.push(`robots.txt Sitemap line is ${sitemapLine}, expected ${DOMAIN}/sitemap.xml`);
const sitemapRes = await get(`${DOMAIN}/sitemap.xml`);
if (sitemapRes.status !== 200) fails.push(`sitemap.xml returned ${sitemapRes.status}`);
const urls = [...(await sitemapRes.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urls.length) fails.push("sitemap.xml lists no URLs");

// 3. Every sitemap URL: 200 with no redirect, self-referencing canonical, no noindex anywhere.
let checked = 0;
const queue = [...urls];
await Promise.all(Array.from({ length: 6 }, async () => {
  for (let url; (url = queue.shift()); ) {
    const r = await get(url);
    checked++;
    if (r.status !== 200) { fails.push(`${url}: HTTP ${r.status}${r.headers.get("location") ? ` → ${r.headers.get("location")}` : ""} (sitemap URLs must not redirect)`); continue; }
    const xrt = r.headers.get("x-robots-tag");
    if (xrt && /noindex|none/i.test(xrt)) fails.push(`${url}: X-Robots-Tag "${xrt}"`);
    const html = await r.text();
    const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1];
    if (canonical !== url) fails.push(`${url}: canonical is ${canonical ?? "missing"}`);
    if (/<meta[^>]*name="(robots|googlebot)"[^>]*(noindex|none)/i.test(html)) fails.push(`${url}: meta robots noindex`);
    if (!/<h1[\s>]/.test(html)) fails.push(`${url}: no <h1> in the served HTML (content may not be prerendered)`);
  }
}));

// 4. Search and AI crawlers get the same page (not a 403/challenge from a firewall or bot blocker).
const sample = urls.find((u) => u !== `${DOMAIN}/`) ?? `${DOMAIN}/`;
for (const [name, ua] of Object.entries(BOTS)) {
  const r = await get(sample, ua);
  if (r.status !== 200) fails.push(`${name} gets HTTP ${r.status} on ${sample}`);
}

// 5. llms.txt for AI assistants; unknown URLs should not be indexable copies of another page.
if ((await get(`${DOMAIN}/llms.txt`)).status !== 200) warns.push("llms.txt is not served");
const junk = await get(`${DOMAIN}/this-page-should-not-exist-${Date.now()}/`);
if (junk.status === 200) warns.push("Unknown URLs return HTTP 200 (host SPA fallback). The page renders 'Page not found' with noindex once JavaScript runs, so Google drops them, but a real 404 status would be better if the host supports it.");

console.log(`Live check of ${DOMAIN}: ${checked} sitemap URLs, ${Object.keys(BOTS).length} crawler user-agents.`);
if (warns.length) console.log(`\nWarnings:\n- ${warns.join("\n- ")}`);
console.log(fails.length ? `\nFAIL:\n- ${fails.join("\n- ")}` : "\nPASS: every sitemap URL is crawlable and indexable on the canonical domain.");
process.exitCode = fails.length ? 1 : 0;
