import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { AnswerBox, ContentBlocks, CtaBand, FaqList, PageHero, ProcessSteps, ServiceCard, TickList } from "@/components/blocks";
import { QuoteForm } from "@/components/QuoteForm";
import { Illustration, serviceScene } from "@/components/Illustration";
import { serviceBySlug } from "@/data/services";
import { COVERAGE_RADIUS_MILES, locations } from "@/data/locations";
import { guides } from "@/data/guides";
import { withPhone, breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import type { Service } from "@/data/types";

export default function ServicePage({ service: s }: { service: Service }) {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services/" },
    { name: s.name, path: `/${s.slug}/` },
  ];
  const related = s.related.map(serviceBySlug).filter(Boolean) as Service[];
  // Towns where this service is popular first, then the closest towns, so every service page shows coverage.
  const areaLinks = [
    ...locations.filter((l) => l.popular.includes(s.slug)),
    ...locations.filter((l) => !l.popular.includes(s.slug)),
  ].slice(0, 6);
  const relatedGuides = guides.filter((g) => g.related.includes(s.slug));

  return (
    <>
      <Seo
        title={s.metaTitle}
        description={withPhone(s.metaDescription)}
        path={`/${s.slug}/`}
        schema={[serviceSchema(s), breadcrumbSchema(crumbs), faqSchema(s.faqs)]}
      />
      <PageHero crumbs={crumbs} eyebrow="Watford & Hertfordshire" h1={s.h1} lead={s.lead} context={s.name.toLowerCase()} quote={{ defaultService: s.name, heading: `Free ${s.short.toLowerCase()} quote` }} />

      <div className="container grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 space-y-12">
          <AnswerBox>{s.answer}</AnswerBox>

          <section aria-labelledby="takes" className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 id="takes" className="section-title">What we can take</h2>
              <div className="mt-6"><TickList items={s.takes} cols={1} /></div>
            </div>
            <Illustration scene={serviceScene[s.slug] ?? "van"} label={`Illustration: ${s.name.toLowerCase()}`} />
          </section>

          <ContentBlocks blocks={s.blocks} />

          <section aria-labelledby="price">
            <h2 id="price" className="section-title">How {s.short.toLowerCase()} is priced</h2>
            <div className="prose-site mt-4">
              <p>
                Every job is priced on what's actually involved: the volume of waste, the types of item (some, like sofas, fridges and plasterboard, cost more to dispose of correctly) and how easy it is to carry out. You get a quote before any work starts. Read more on our <Link to="/pricing/">pricing page</Link>.
              </p>
            </div>
          </section>

          <FaqList faqs={s.faqs} heading={`${s.name}: frequently asked questions`} />
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <div className="card p-6">
            <h2 className="font-display text-lg font-bold text-navy-900">Who this is for</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {s.customers.map((c) => <li key={c} className="rounded-full bg-navy-50 px-3 py-1 text-sm font-medium text-navy-800">{c}</li>)}
            </ul>
          </div>
          {areaLinks.length > 0 && (
            <div className="card p-6">
              <h2 className="font-display text-lg font-bold text-navy-900">Where we offer this</h2>
              <p className="mt-2 text-sm text-ink-700">Across Watford and everywhere within {COVERAGE_RADIUS_MILES} miles, including:</p>
              <ul className="mt-3 space-y-2 text-sm">
                {areaLinks.map((l) => (
                  <li key={l.slug}><Link to={`/${l.slug}/`} className="link">Clearances in {l.town}</Link></li>
                ))}
                <li><Link to="/areas-we-cover/" className="link">All areas we cover</Link></li>
              </ul>
            </div>
          )}
          {relatedGuides.length > 0 && (
            <div className="card p-6">
              <h2 className="font-display text-lg font-bold text-navy-900">Helpful reading</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {relatedGuides.map((g) => <li key={g.slug}><Link to={`/guides/${g.slug}/`} className="link">{g.title}</Link></li>)}
              </ul>
            </div>
          )}
        </aside>
      </div>

      <section className="bg-paper py-14"><div className="container"><ProcessSteps /></div></section>

      <section id="quote" className="py-14">
        <div className="container max-w-4xl">
          <h2 className="section-title">Get a free {s.short.toLowerCase()} quote</h2>
          <div className="card mt-6 p-6 md:p-8"><QuoteForm defaultService={s.name} /></div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-navy-50 py-14">
          <div className="container">
            <h2 className="section-title">Related services</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => <ServiceCard key={r.slug} s={r} />)}
            </div>
          </div>
        </section>
      )}

      <CtaBand heading={`Need ${s.short.toLowerCase()} in Watford?`} text="Send us a description or photos and we'll confirm a price before we start." context={s.name.toLowerCase()} />
    </>
  );
}
