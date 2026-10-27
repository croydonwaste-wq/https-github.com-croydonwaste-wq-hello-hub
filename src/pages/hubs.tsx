import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { AnswerBox, ContentBlocks, CtaBand, FaqList, PageHero, ServiceCard } from "@/components/blocks";
import { Icon } from "@/components/Icon";
import { CoverageMap } from "@/components/Graphics";
import { services, serviceGroups, serviceBySlug } from "@/data/services";
import { locations, watfordAreas, widerAreas } from "@/data/locations";
import { guides } from "@/data/guides";
import { absoluteUrl } from "@/data/business";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import type { Guide, Service } from "@/data/types";

export function ServicesHub() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Services", path: "/services/" }];
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Rubbish removal and clearance services in Watford",
    itemListElement: services.map((s, i) => ({ "@type": "ListItem", position: i + 1, url: absoluteUrl(`/${s.slug}/`), name: s.name })),
  };
  return (
    <>
      <Seo
        title="Rubbish Clearance Services in Watford | Watford Rubbish Clearance"
        description="All our waste clearance services in Watford: house, office, garden, garage and probate clearances; furniture, sofa, mattress and fridge removal; trade waste."
        path="/services/"
        schema={[itemList, breadcrumbSchema(crumbs)]}
      />
      <PageHero crumbs={crumbs} eyebrow="Services" h1="Waste Clearance Services in Watford" lead="Whole-property clearances, single-item collections and business waste — choose the service closest to what you need, or just tell us what's going and we'll advise." quote={{}} />
      <div className="container py-14">
        {serviceGroups.map((g) => (
          <section key={g.key} className="mb-14">
            <h2 className="section-title">{g.label}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.filter((s) => s.group === g.key).map((s) => <ServiceCard key={s.slug} s={s} visual />)}
            </div>
          </section>
        ))}
        <AnswerBox title="Not sure which service you need?">
          Most jobs are a mix — a few bulky items, some bags and a bit of garden waste. You don't need to pick the perfect category: describe what needs to go on the quote form and we'll price it as one collection.
        </AnswerBox>
      </div>
      <CtaBand heading="Tell us what needs to go" text="One collection can cover several services — we'll price it together." />
    </>
  );
}

export function AreasHub() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Areas we cover", path: "/areas-we-cover/" }];
  const faqs = [
    { q: "Do you cover my postcode?", a: "We cover all Watford postcodes (WD17, WD18, WD19, WD24, WD25) and the surrounding towns listed on this page. If your area isn't listed, ask — we'll tell you straight away whether we can help." },
    { q: "Do you charge more for areas further from Watford?", a: "Travel time can be a factor in the quote for areas further out. We'll always confirm the full price before booking." },
  ];
  return (
    <>
      <Seo
        title="Areas We Cover | Rubbish Removal Watford & Hertfordshire"
        description="24/7 rubbish removal across Watford, Bushey, Oxhey, Croxley Green, Rickmansworth, Abbots Langley, St Albans, Harpenden and more. Call 01293 549164."
        path="/areas-we-cover/"
        schema={[breadcrumbSchema(crumbs), faqSchema(faqs)]}
      />
      <PageHero crumbs={crumbs} eyebrow="Coverage" h1="Areas We Cover for Rubbish Removal" lead="Based around Watford, we cover the surrounding towns and villages of south and west Hertfordshire, with wider coverage on request." />
      <div className="container space-y-14 py-14">
        <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="section-title">Our coverage around Watford</h2>
            <p className="mt-3 leading-relaxed text-ink-700">We're based around Watford and work 24/7 across the surrounding towns, with same-day collections available. Choose a town for local information, or use the quote form with your postcode.</p>
          </div>
          <CoverageMap />
        </section>
        <section>
          <h2 className="section-title">Watford</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-ink-700">
            Watford is our home patch. Our <Link to="/" className="link">Watford rubbish removal</Link> service covers every neighbourhood, including:
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {watfordAreas.map((a) => <li key={a} className="rounded-full bg-navy-50 px-3 py-1.5 text-sm font-medium text-navy-900">{a}</li>)}
          </ul>
        </section>
        <section>
          <h2 className="section-title">Towns near Watford</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((l) => (
              <Link key={l.slug} to={`/${l.slug}/`} className="card group p-6">
                <p className="eyebrow text-brick-600">{l.postcodes.join(" · ")}</p>
                <h3 className="mt-2 font-display text-xl font-bold text-navy-900 group-hover:text-brick-600">Rubbish removal {l.town}</h3>
                <p className="mt-2 text-sm text-ink-700">{l.areas.slice(0, 4).join(", ")}</p>
              </Link>
            ))}
          </div>
        </section>
        <section>
          <h2 className="section-title">Wider coverage</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-ink-700">
            We also take on work further afield, particularly larger clearances. Get in touch with your postcode and we'll confirm availability.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {widerAreas.map((r) => (
              <div key={r.region} className="card p-6">
                <h3 className="flex items-center gap-2 font-display text-lg font-bold text-navy-900"><Icon name="pin" className="h-5 w-5 text-brick-500" />{r.region}</h3>
                <ul className="mt-3 space-y-1 text-sm text-ink-700">{r.towns.map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>
        <FaqList faqs={faqs} heading="Coverage questions" />
      </div>
      <CtaBand heading="Check we cover your area" text="Send your postcode with your quote request and we'll confirm straight away." />
    </>
  );
}

export function GuidesHub() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Guides", path: "/guides/" }];
  return (
    <>
      <Seo
        title="Rubbish Removal Guides & Advice | Watford Rubbish Clearance"
        description="Practical guides on getting rid of rubbish legally in Watford: checking waste carrier licences, council vs private collections, and clearing a home after a death."
        path="/guides/"
        schema={[breadcrumbSchema(crumbs)]}
      />
      <PageHero crumbs={crumbs} eyebrow="Guides" h1="Rubbish Removal Guides & Advice" lead="Straightforward answers to the questions we're asked most — written to help you make a good decision, whoever you book." />
      <div className="container grid gap-6 py-14 md:grid-cols-3">
        {guides.map((g) => (
          <Link key={g.slug} to={`/guides/${g.slug}/`} className="card group flex flex-col p-6">
            <Icon name="doc" className="h-8 w-8 text-navy-700" />
            <h2 className="mt-4 font-display text-xl font-bold text-navy-900 group-hover:text-brick-600">{g.title}</h2>
            <p className="mt-2 flex-1 text-sm text-ink-700">{g.lead}</p>
            <span className="mt-4 text-sm font-semibold text-brick-600">Read the guide →</span>
          </Link>
        ))}
      </div>
    </>
  );
}

export function GuidePage({ guide: g }: { guide: Guide }) {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides/" },
    { name: g.title, path: `/guides/${g.slug}/` },
  ];
  const related = g.related.map(serviceBySlug).filter(Boolean) as Service[];
  const updated = new Date(g.updated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  return (
    <>
      <Seo title={g.metaTitle} description={g.metaDescription} path={`/guides/${g.slug}/`} ogType="article" schema={[articleSchema(g), breadcrumbSchema(crumbs), faqSchema(g.faqs)]} />
      <PageHero crumbs={crumbs} eyebrow="Guide" h1={g.h1} lead={g.lead} />
      <article className="container grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0 space-y-10">
          <p className="text-sm text-ink-500">Last updated {updated} · Information is general guidance, not legal advice.</p>
          <AnswerBox>{g.answer}</AnswerBox>
          <ContentBlocks blocks={g.blocks} />
          <FaqList faqs={g.faqs} />
        </div>
        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <div className="card p-6">
            <h2 className="font-display text-lg font-bold text-navy-900">Related services</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {related.map((s) => <li key={s.slug}><Link to={`/${s.slug}/`} className="link">{s.name}</Link></li>)}
            </ul>
          </div>
        </aside>
      </article>
      <CtaBand heading="Need something cleared?" text="Get a free quote from a local Watford rubbish clearance company." />
    </>
  );
}

