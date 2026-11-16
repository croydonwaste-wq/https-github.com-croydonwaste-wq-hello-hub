import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import App from "./App";
import { routes, utilityRoutes } from "./routes";
import { business } from "./data/business";

export function render(url: string) {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>,
  );
  const h = helmetContext.helmet!;
  const head = [h.title.toString(), h.meta.toString(), h.link.toString(), h.script.toString()].join("\n");
  return { html, head };
}

export const routeMeta = routes.map(({ path, priority, changefreq, lastmod }) => ({ path, priority, changefreq, lastmod }));

export const utilityPaths = utilityRoutes.map((r) => r.path);

/** Canonical origin, so the prerender script never hard-codes its own copy. */
export const siteUrl = business.domain;
export const siteName = business.name;
