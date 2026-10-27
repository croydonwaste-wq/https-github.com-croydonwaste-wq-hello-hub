import { business, absoluteUrl } from "@/data/business";
import { locations } from "@/data/locations";
import type { Faq, Service, Guide } from "@/data/types";

export const ORG_ID = `${business.domain}/#business`;
export const SITE_ID = `${business.domain}/#website`;

type Json = Record<string, unknown>;

/** LocalBusiness entity. Only verified fields are emitted (no fake address, ratings or prices). */
export function localBusinessSchema(): Json {
  const areaServed = [
    { "@type": "City", name: "Watford" },
    ...locations.map((l) => ({ "@type": "Place", name: l.town })),
    { "@type": "AdministrativeArea", name: "Hertfordshire" },
  ];
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": ORG_ID,
    name: business.name,
    ...(business.legalName ? { legalName: business.legalName } : {}),
    url: `${business.domain}/`,
    email: business.email,
    ...(business.phone ? { telephone: business.phone.replace(/\s/g, "").replace(/^0/, "+44") } : {}),
    ...(business.open247
      ? {
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: "00:00",
            closes: "23:59",
          },
        }
      : {}),
    ...(business.address ? { address: { "@type": "PostalAddress", addressCountry: "GB", ...business.address } } : {}),
    logo: absoluteUrl("/logo.svg"),
    image: absoluteUrl("/og-image.png"),
    description:
      "Rubbish removal and clearance company serving Watford and Hertfordshire: house, office, garden and garage clearances, furniture, sofa, mattress and appliance collections, and builders and commercial waste.",
    areaServed,
    knowsAbout: ["Rubbish removal", "House clearance", "Waste collection", "Recycling", "Bulky waste collection"],
    ...(business.sameAs.length ? { sameAs: business.sameAs } : {}),
    slogan: "Rubbish removal and clearances in Watford",
  };
}

export function websiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: `${business.domain}/`,
    name: business.name,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-GB",
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
  };
}

export function faqSchema(faqs: Faq[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function serviceSchema(s: Service, areaName = "Watford"): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(`/${s.slug}/`)}#service`,
    name: s.name,
    serviceType: s.name,
    description: s.answer,
    provider: { "@id": ORG_ID },
    areaServed: [{ "@type": "City", name: areaName }, { "@type": "AdministrativeArea", name: "Hertfordshire" }],
    url: absoluteUrl(`/${s.slug}/`),
    audience: s.customers.map((c) => ({ "@type": "Audience", audienceType: c })),
  };
}

export function articleSchema(g: Guide): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.h1,
    description: g.metaDescription,
    datePublished: g.published,
    dateModified: g.updated,
    author: { "@type": "Organization", "@id": ORG_ID, name: business.name },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: absoluteUrl(`/guides/${g.slug}/`),
    inLanguage: "en-GB",
  };
}

/** Swap a generic closing CTA in a meta description for the click-to-call number. */
export function withPhone(desc: string): string {
  if (!business.phone || desc.includes(business.phone)) return desc;
  const swapped = desc.replace(/\s*(?:(?:Request|Get|Ask for) (?:a |your )?(?:free|business)?[^.]*quote[^.]*|Free quotes?(?: on request)?)\.$/i, ` Call ${business.phone} 24/7.`);
  return swapped.length <= 165 ? swapped : desc;
}
