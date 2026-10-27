import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { AnswerBox, ContentBlocks, CtaBand, FaqList, PageHero, ServiceCard } from "@/components/blocks";
import { QuoteForm } from "@/components/QuoteForm";
import { Icon } from "@/components/Icon";
import { Illustration } from "@/components/Illustration";
import { serviceBySlug, services } from "@/data/services";
import { locationBySlug } from "@/data/locations";
import { withPhone, breadcrumbSchema, faqSchema, ORG_ID } from "@/lib/schema";
import { absoluteUrl, business } from "@/data/business";
import type { Location, Service } from "@/data/types";

export default function LocationPage({ location: l }: { location: Location }) {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Areas we cover", path: "/areas-we-cover/" },
    { name: l.town, path: `/${l.slug}/` },
  ];
  const popular = l.popular.map(serviceBySlug).filter(Boolean) as Service[];
  const others = services.filter((s) => !l.popular.includes(s.slug));
  const nearby = l.nearby.map(locationBySlug).filter(Boolean) as Location[];
  const place = l.town.split(" & ")[0];
  const faqs = [
    ...l.faqs,
    {
      q: `Do you offer same-day rubbish removal in ${place}?`,
      a: `Yes. We operate 24 hours a day, 7 days a week and offer same-day collections in ${l.town}${business.phone ? ` — call ${business.phone} as early as you can` : ""}, or send the quote form with photos.`,
    },
    {
      q: `How much does rubbish removal cost in ${place}?`,
      a: "Prices depend on the volume of waste, the type of items (sofas, fridges and rubble cost more to dispose of) and access. We give a fixed quote from photos before any work starts — see our pricing page for details.",
    },
  ];

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: l.h1,
    url: absoluteUrl(`/${l.slug}/`),
    about: { "@id": ORG_ID },
    spatialCoverage: { "@type": "Place", name: `${l.town}, ${l.county}` },
  };

  return (
    <>
      <Seo title={l.metaTitle} description={withPhone(l.metaDescription)} path={`/${l.slug}/`} schema={[pageSchema, breadcrumbSchema(crumbs), faqSchema(faqs)]} />
      <PageHero crumbs={crumbs} eyebrow={`${l.county} · ${l.postcodes.join(", ")}`} h1={l.h1} lead={l.lead} context={`rubbish removal in ${l.town}`} quote={{ heading: `Free quote in ${l.town.split(" & ")[0]}` }} />

      <div className="container grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-12">
          <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center">
            <AnswerBox>{l.answer}</AnswerBox>
            <Illustration scene="town" label={`Illustration: rubbish collection in ${l.town}`} />
          </div>
          <ContentBlocks blocks={l.blocks} />
          <section aria-labelledby="popular">
            <h2 id="popular" className="section-title">Popular services in {l.town}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {popular.map((s) => <ServiceCard key={s.slug} s={s} />)}
            </div>
            <p className="mt-6 text-sm text-ink-700">
              We also offer{" "}
              {others.map((s, i) => (
                <span key={s.slug}>
                  <Link to={`/${s.slug}/`} className="link">{s.short.toLowerCase()}</Link>
                  {i < others.length - 2 ? ", " : i === others.length - 2 ? " and " : "."}
                </span>
              ))}
            </p>
          </section>
          <FaqList faqs={faqs} heading={`Rubbish removal in ${l.town}: FAQs`} />
        </div>
        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <div className="card p-6">
            <h2 className="font-display text-lg font-bold text-navy-900">Areas covered</h2>
            <ul className="mt-3 space-y-1.5 text-sm text-ink-700">
              {l.areas.map((a) => <li key={a} className="flex items-center gap-2"><Icon name="pin" className="h-4 w-4 text-brick-500" />{a}</li>)}
            </ul>
            <p className="mt-3 text-sm text-ink-500">Postcodes: {l.postcodes.join(", ")}</p>
          </div>
          <div className="card p-6">
            <h2 className="font-display text-lg font-bold text-navy-900">Nearby</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/" className="link">Rubbish removal Watford</Link></li>
              {nearby.map((n) => <li key={n.slug}><Link to={`/${n.slug}/`} className="link">Rubbish removal {n.town}</Link></li>)}
              <li><Link to="/areas-we-cover/" className="link">All areas</Link></li>
            </ul>
          </div>
        </aside>
      </div>

      <section id="quote" className="bg-navy-50 py-14">
        <div className="container max-w-4xl">
          <h2 className="section-title">Get a free quote in {l.town}</h2>
          <div className="card mt-6 p-6 md:p-8"><QuoteForm /></div>
        </div>
      </section>
      <CtaBand heading={`Rubbish to clear in ${l.town}?`} text="Tell us what needs to go and we'll confirm a price before we start." context={`rubbish removal in ${l.town}`} />
    </>
  );
}
