// Renders every route to static HTML so crawlers and AI agents get full content,
// metadata and JSON-LD without executing JavaScript. Also writes sitemap.xml, robots.txt and llms.txt.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const { render, routeMeta, utilityPaths, siteUrl: DOMAIN, siteName } = await import(pathToFileURL(path.join(root, "dist-server/entry-server.js")).href);

const write = (url, html) => {
  const file = url === "/404/" ? path.join(dist, "404.html") : path.join(dist, url, "index.html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
};

const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const pageInfo = new Map();
for (const url of [...routeMeta.map((r) => r.path), ...utilityPaths, "/404/"]) {
  const { html, head } = render(url);
  // Never publish a canonical that points anywhere but this page's own URL on DOMAIN.
  const canonical = head.match(/rel="canonical" href="([^"]*)"/)?.[1];
  if (canonical && canonical !== DOMAIN + url) throw new Error(`${url}: canonical ${canonical} is not ${DOMAIN + url}`);
  pageInfo.set(url, {
    title: decode(head.match(/<title[^>]*>([^<]*)<\/title>/)?.[1] ?? url).replace(/\s*\|\s*[^|]+$/, ""),
    description: decode(head.match(/name="description" content="([^"]*)"/)?.[1] ?? ""),
  });
  write(url, template.replace("<!--app-head-->", head).replace("<!--app-html-->", html));
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routeMeta
  .map((r) => `  <url><loc>${DOMAIN}${r.path}</loc>${r.lastmod ? `<lastmod>${r.lastmod}</lastmod>` : ""}<changefreq>${r.changefreq}</changefreq><priority>${r.priority.toFixed(1)}</priority></url>`)
  .join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${DOMAIN}/sitemap.xml\n`);

// llms.txt (llmstxt.org): a plain-text map of the site for AI assistants and answer engines.
const section = (heading, test) => {
  const items = routeMeta.filter((r) => test(r.path)).map((r) => `- [${pageInfo.get(r.path).title}](${DOMAIN}${r.path}): ${pageInfo.get(r.path).description}`);
  return items.length ? `## ${heading}\n\n${items.join("\n")}\n` : "";
};
const used = new Set();
const pick = (test) => (p) => { if (used.has(p) || !test(p)) return false; used.add(p); return true; };
const llms = [
  `# ${siteName}\n`,
  `> ${pageInfo.get("/").description}\n`,
  `Every page below is static HTML; the sitemap is at ${DOMAIN}/sitemap.xml.\n`,
  section("Key pages", pick((p) => ["/", "/services/", "/areas-we-cover/", "/pricing/", "/faqs/", "/contact/", "/about/"].includes(p))),
  section("Guides", pick((p) => p.startsWith("/guides/"))),
  section("Locations", pick((p) => p.startsWith("/rubbish-removal-"))),
  section("Services", pick((p) => !["/privacy-policy/", "/terms/"].includes(p))),
  section("Optional", pick(() => true)),
].filter(Boolean).join("\n");
fs.writeFileSync(path.join(dist, "llms.txt"), llms);
fs.rmSync(path.join(root, "dist-server"), { recursive: true, force: true });
console.log(`Prerendered ${routeMeta.length} routes + 404, sitemap.xml, robots.txt and llms.txt for ${DOMAIN}`);
