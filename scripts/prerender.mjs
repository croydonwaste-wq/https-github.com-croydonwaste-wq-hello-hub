// Renders every route to static HTML so crawlers and AI agents get full content,
// metadata and JSON-LD without executing JavaScript. Also writes sitemap.xml and robots.txt.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const DOMAIN = "https://www.watfordrubbishclearance.co.uk";

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const { render, routeMeta } = await import(pathToFileURL(path.join(root, "dist-server/entry-server.js")).href);

const write = (url, html) => {
  const file = url === "/404/" ? path.join(dist, "404.html") : path.join(dist, url, "index.html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
};

for (const { path: url } of [...routeMeta, { path: "/404/" }]) {
  const { html, head } = render(url);
  write(url, template.replace("<!--app-head-->", head).replace("<!--app-html-->", html));
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routeMeta
  .map((r) => `  <url><loc>${DOMAIN}${r.path}</loc><lastmod>${today}</lastmod><changefreq>${r.changefreq}</changefreq><priority>${r.priority.toFixed(1)}</priority></url>`)
  .join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${DOMAIN}/sitemap.xml\n`);
fs.rmSync(path.join(root, "dist-server"), { recursive: true, force: true });
console.log(`Prerendered ${routeMeta.length} routes + 404, sitemap.xml and robots.txt`);
