import type { ReactElement } from "react";
import Home from "@/pages/Home";
import ServicePage from "@/pages/ServicePage";
import LocationPage from "@/pages/LocationPage";
import { AreasHub, GuidePage, GuidesHub, ServicesHub } from "@/pages/hubs";
import { About, Contact, Faqs, NotFound, Pricing, ThankYou } from "@/pages/info";
import { Privacy, Terms } from "@/pages/legal";
import { services } from "@/data/services";
import { locations } from "@/data/locations";
import { guides } from "@/data/guides";

/** lastmod is only set where a real content date exists; a build date on every URL would be an inaccurate freshness signal. */
export type AppRoute = { path: string; element: ReactElement; priority: number; changefreq: "weekly" | "monthly" | "yearly"; lastmod?: string };

/** Every indexable URL. Used by the router, the prerenderer and the sitemap. */
export const routes: AppRoute[] = [
  { path: "/", element: <Home />, priority: 1.0, changefreq: "weekly" },
  { path: "/services/", element: <ServicesHub />, priority: 0.8, changefreq: "monthly" },
  ...services.map((s) => ({ path: `/${s.slug}/`, element: <ServicePage service={s} />, priority: 0.9, changefreq: "monthly" as const })),
  { path: "/areas-we-cover/", element: <AreasHub />, priority: 0.8, changefreq: "monthly" },
  ...locations.map((l) => ({ path: `/${l.slug}/`, element: <LocationPage location={l} />, priority: 0.8, changefreq: "monthly" as const })),
  { path: "/pricing/", element: <Pricing />, priority: 0.8, changefreq: "monthly" },
  { path: "/about/", element: <About />, priority: 0.5, changefreq: "yearly" },
  { path: "/contact/", element: <Contact />, priority: 0.7, changefreq: "yearly" },
  { path: "/faqs/", element: <Faqs />, priority: 0.6, changefreq: "monthly" },
  { path: "/guides/", element: <GuidesHub />, priority: 0.5, changefreq: "monthly" },
  ...guides.map((g) => ({ path: `/guides/${g.slug}/`, element: <GuidePage guide={g} />, priority: 0.6, changefreq: "monthly" as const, lastmod: g.updated })),
  { path: "/privacy-policy/", element: <Privacy />, priority: 0.2, changefreq: "yearly" },
  { path: "/terms/", element: <Terms />, priority: 0.2, changefreq: "yearly" },
];

/** Reachable but not indexed or listed in the sitemap. */
export const utilityRoutes: AppRoute[] = [{ path: "/thank-you/", element: <ThankYou />, priority: 0, changefreq: "yearly" }];

export const notFoundElement = <NotFound />;
