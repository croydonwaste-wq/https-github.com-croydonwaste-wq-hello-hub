// Static QA over the prerendered build: titles, descriptions, H1s, canonicals,
// JSON-LD validity, internal links and sitemap consistency. Run after `npm run build`.
import fs from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");
const DOMAIN = "https://www.watfordrubbishclearance.co.uk";
const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f === "index.html") files.push(p);
  }
})(dist);

const SKIP = new Set(["/thank-you/"]);
const urlOf = (f) => "/" + path.relative(dist, path.dirname(f)).split(path.sep).filter(Boolean).join("/") + (path.dirname(f) === dist ? "" : "/");
const sitemap = [...fs.readFileSync(path.join(dist, "sitemap.xml"), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(DOMAIN, ""));
const pages = new Set(files.map(urlOf));
const problems = [];
const titles = new Map(), descs = new Map(), h1s = new Map();
const inbound = new Map([...pages].filter((p) => !SKIP.has(p)).map((p) => [p, 0]));

for (const f of files) {
  const url = urlOf(f);
  if (SKIP.has(url)) continue;
  const html = fs.readFileSync(f, "utf8");
  const dec = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'");
  const title = dec(html.match(/<title[^>]*>([^<]*)<\/title>/)?.[1] ?? "");
  const desc = dec(html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/)?.[1] ?? "");
  const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/)?.[1];
  const h1 = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => m[1].replace(/<[^>]+>/g, "").replace(/&amp;/g, "&"));
  const p = (m) => problems.push(`${url}: ${m}`);

  if (!title) p("missing <title>");
  if (title.length > 65) p(`title ${title.length} chars: ${title}`);
  if (desc.length < 110 || desc.length > 165) p(`description ${desc.length} chars`);
  if (canonical !== DOMAIN + url) p(`canonical ${canonical}`);
  if (h1.length !== 1) p(`${h1.length} H1s`);
  if (!sitemap.includes(url)) p("not in sitemap");
  if (/\{[A-Z_]+\}|LANDLINE|WHATSAPP|BUSINESS_ADDRESS/.test(html.replace(/<script type="module".*?<\/script>/g, ""))) p("placeholder text leaked");
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { p("invalid JSON-LD"); }
  }
  for (const m of html.matchAll(/<img\b[^>]*>/g)) if (!/\balt=/.test(m[0])) p("img without alt");
  // headings shouldn't skip from h1 to h3 before any h2
  const order = [...html.matchAll(/<h([1-6])\b/g)].map((m) => +m[1]);
  const firstH3 = order.indexOf(3), firstH2 = order.indexOf(2);
  if (firstH3 !== -1 && (firstH2 === -1 || firstH3 < firstH2) && url !== "/") p("h3 before first h2");
  for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const href = m[1];
    if (/\.(svg|png|xml|txt|css|js)$/.test(href) || href.startsWith("/assets/")) continue;
    if (!pages.has(href)) p(`broken internal link ${href}`);
    else if (href !== url) inbound.set(href, inbound.get(href) + 1);
  }
  [[titles, title], [descs, desc], [h1s, h1[0]]].forEach(([map, v]) => map.set(v, [...(map.get(v) ?? []), url]));
}

for (const [label, map] of [["title", titles], ["description", descs], ["H1", h1s]])
  for (const [v, urls] of map) if (urls.length > 1) problems.push(`duplicate ${label} "${v}" on ${urls.join(", ")}`);
for (const [u, n] of inbound) if (n === 0 && u !== "/") problems.push(`${u}: orphan (no inbound links)`);
for (const u of sitemap) if (!pages.has(u)) problems.push(`sitemap url without page ${u}`);

console.log(`Checked ${files.length} pages, ${sitemap.length} sitemap URLs.`);
console.log(problems.length ? problems.join("\n") : "No problems found.");
process.exitCode = problems.length ? 1 : 0;
