import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { Icon } from "@/components/Icon";
import { ContactButtons } from "@/components/ContactButtons";
import { AnswerBox, CtaBand, HeroBadges, FaqList, ProcessSteps, ServiceCard, TickList, TrustGrid } from "@/components/blocks";
import { QuickQuoteCard, QuoteForm } from "@/components/QuoteForm";
import { CoverageMap, LoadSizeGuide, StatsStrip, WasteJourney } from "@/components/Graphics";
import { Illustration } from "@/components/Illustration";
import { services, serviceGroups } from "@/data/services";
import { locations, watfordAreas } from "@/data/locations";
import { guides } from "@/data/guides";
import { business } from "@/data/business";
import { faqSchema, localBusinessSchema, webPageSchema, websiteSchema } from "@/lib/schema";
import type { Faq } from "@/data/types";

const TITLE = "Rubbish Removal & Clearance Watford | Watford Rubbish Clearance";
const DESCRIPTION =
  "Rubbish removal in Watford, open 24/7 with same-day collections. Licensed and £5m insured, and we do all the loading. Call 01293 549164.";

/** Watford Borough Council bulky waste prices, as published at the source below on the date checked. */
const COUNCIL_SOURCE = "https://www.watford.gov.uk/bulkywaste";
const COUNCIL_CHECKED = "12 November 2026";
const councilFacts = [
  "£57 for up to three general bulky items",
  "£57 for up to three sofas or upholstered items",
  "£57 per electrical item; £69.50 for an American fridge freezer",
  "Items left outside the front of the property",
  "Booked through the council's contractor, Veolia",
  "50% off for residents receiving council-related benefits",
];
const privateFacts = [
  "Mixed items in one visit, priced on volume, item type and access",
  "Collected from any room, loft, garage or garden",
  "Open 24/7, with same-day collections available",
  "Price agreed before any work starts",
];

/** Guides that help someone decide how to get rid of their rubbish. */
const decisionGuides = ["council-bulky-waste-vs-private-collection", "skip-hire-vs-rubbish-removal", "check-waste-carrier-licence"];

const homeFaqs: Faq[] = [
  {
    q: "How much does rubbish removal cost in Watford?",
    a: "The price depends on how much waste there is, what it is (sofas, fridges and rubble cost more to dispose of) and how easy it is to carry out. We quote from photos or a description before any work starts, so you know the cost up front. See our pricing page for what affects the price.",
  },
  {
    q: "Do you offer same-day rubbish removal in Watford?",
    a: "Yes. We operate 24 hours a day, 7 days a week and offer same-day collections. Call as early as you can, or send the quote form with photos, and we'll confirm the earliest slot.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. We are a licensed waste carrier and hold £5 million public liability insurance. Waste is taken to authorised facilities for reuse, recycling or disposal.",
  },
  {
    q: "What areas of Watford do you cover?",
    a: `All of Watford, including ${watfordAreas.slice(1, 7).join(", ")} and more — plus everywhere within 30 miles of Watford town centre, including Bushey, Hemel Hempstead, St Albans, Borehamwood, Harrow and Amersham.`,
  },
  {
    q: "Will Watford council collect my sofa or fridge instead?",
    a: `Usually, yes, if you live in Watford borough and can put it outside. When we checked watford.gov.uk on ${COUNCIL_CHECKED}, the council listed £57 for up to three sofas or upholstered items and £57 per electrical item, each booked as a separate collection. A private collection is usually more practical for mixed loads, items inside the property or a short deadline. Check watford.gov.uk for current prices.`,
  },
  {
    q: "Do I need to bring everything outside?",
    a: "No. We collect from wherever the rubbish is: upstairs rooms, lofts, garages, sheds and gardens.",
  },
  {
    q: "What can't you take?",
    a: "Hazardous waste such as asbestos, clinical waste, gas bottles, chemicals and liquid paint needs specialist handling. Let us know if you have any of these and we'll advise.",
  },
  {
    q: "How do I know my rubbish won't be fly-tipped?",
    a: "Ask any collector for their waste carrier registration and check it on the Environment Agency's public register. As a licensed waste carrier we'll give you our registration details on request. Our guide explains how to check.",
  },
];

export default function Home() {
  return (
    <>
      <Seo
        title={TITLE}
        description={DESCRIPTION}
        path="/"
        schema={[localBusinessSchema(), websiteSchema(), webPageSchema("/", TITLE, DESCRIPTION), faqSchema(homeFaqs)]}
      />

      {/* Hero */}
      <section className="hero-bg relative overflow-hidden text-white">
        <div className="container relative grid gap-10 py-12 md:py-20 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
          <div>
            <p className="eyebrow inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-signal-400">
              <Icon name="pin" className="h-4 w-4" /> Watford &amp; Hertfordshire
            </p>
            <h1 className="mt-4 font-display text-[2.2rem] font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Rubbish Removal &amp; Clearance in <span className="text-signal-500">Watford</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-navy-100">
              From a single sofa to a full house clearance — we carry it out, load it up and sort it for reuse and recycling. Homes, landlords and businesses across Watford and Hertfordshire.
            </p>
            <ContactButtons tone="dark" className="mt-8" quoteHref="#quick-quote" />
            <HeroBadges />
          </div>
          <div id="quick-quote" className="scroll-mt-24">
            <QuickQuoteCard heading="Free rubbish removal quote" />
          </div>
        </div>
      </section>

      <StatsStrip />
      <section className="border-b border-ink-200 bg-white">
        <div className="container py-10"><TrustGrid /></div>
      </section>

      {/* Direct answer */}
      <section className="container grid gap-10 py-14 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div>
          <h2 className="section-title">Rubbish clearance for Watford homes and businesses</h2>
          <div className="prose-site mt-4">
            <p>
              {business.name} removes household, garden, bulky and business waste across Watford and the surrounding towns. We handle the heavy part — carrying items down stairs, out of lofts and through gardens — then sort what we collect so reusable items and recyclable materials stay out of landfill. We're a licensed waste carrier with £5 million public liability cover, open 24/7, with <Link to="/same-day-rubbish-removal/">same-day rubbish removal</Link> available — <Link to="/about/">more about how we work</Link>.
            </p>
            <p>
              Think of it as a licensed man-and-van rubbish removal service, and a practical alternative to hiring a skip (<Link to="/guides/skip-hire-vs-rubbish-removal/">skip vs rubbish removal</Link>) or booking a council bulky collection: no permit, no waiting for a slot, no limit to three items, and nothing left sitting on your drive.
            </p>
          </div>
        </div>
        <div className="space-y-6">
          <Illustration scene="van" label="Illustration: Watford Rubbish Clearance van being loaded with boxes and rubbish bags" />
          <AnswerBox title="How does rubbish removal work?">
            Tell us what needs to go and where it is — photos help. We confirm a price, arrive at an agreed time (24/7, same-day available), load everything ourselves and take it away for reuse, recycling or licensed disposal. You don't need to move anything outside.
          </AnswerBox>
        </div>
      </section>

      {/* Services */}
      <section className="bg-paper py-16" aria-labelledby="services-heading">
        <div className="container">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-brick-600">Services</p>
              <h2 id="services-heading" className="section-title mt-1">Clearances and collections we offer in Watford</h2>
            </div>
            <Link to="/services/" className="link font-semibold">View all services</Link>
          </div>
          {serviceGroups.map((g) => (
            <div key={g.key} className="mt-10">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-navy-700">{g.label}</h3>
              <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {services.filter((s) => s.group === g.key).map((s) => <ServiceCard key={s.slug} s={s} visual />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container space-y-16 py-16">
        <ProcessSteps heading="How our rubbish removal service works" />
        <LoadSizeGuide />
      </section>

      {/* Areas */}
      <section className="bg-navy-50 py-16" aria-labelledby="areas-heading">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-brick-600">Coverage</p>
            <h2 id="areas-heading" className="section-title mt-1">Rubbish collection across Watford and nearby towns</h2>
            <p className="mt-4 leading-relaxed text-ink-700">We cover every part of Watford, including:</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {watfordAreas.map((a) => (
                <li key={a} className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-navy-900 shadow-sm">{a}</li>
              ))}
            </ul>
            <p className="mt-6 leading-relaxed text-ink-700">
              Watford postcodes WD17, WD18, WD19, WD24 and WD25 are all covered, and we travel anywhere within 30 miles of Watford town centre. Not sure if we reach you? <Link to="/areas-we-cover/" className="link">See all areas we cover</Link>.
            </p>
          </div>
          <div className="space-y-8">
            <CoverageMap />
            <div>
            <h3 className="font-display text-lg font-bold text-navy-900">Rubbish removal in nearby towns</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {locations.map((l) => (
                <li key={l.slug}>
                  <Link to={`/${l.slug}/`} className="card flex items-center justify-between gap-3 px-4 py-3">
                    <span className="flex flex-col">
                      <span className="font-semibold text-navy-900">{l.town}</span>
                      <span className="text-xs text-ink-500">{l.county} · {l.postcodes.slice(0, 3).join(", ")}</span>
                    </span>
                    <Icon name="arrow" className="h-4 w-4 shrink-0 text-brick-500" />
                  </Link>
                </li>
              ))}
            </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Local decision help: verified council facts */}
      <section className="container py-16" aria-labelledby="council-heading">
        <p className="eyebrow text-brick-600">Before you book</p>
        <h2 id="council-heading" className="section-title mt-1">Watford council bulky collection or private rubbish removal?</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-ink-700">
          If you live in Watford borough, the council runs a paid bulky waste collection. For a few items of one type that you can put outside, it's often the cheapest option, and we'd rather you knew that. A private collection makes more sense for mixed loads, items inside the property or a short deadline.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="card p-6">
            <h3 className="font-display text-lg font-bold text-navy-900">Watford Borough Council bulky collection</h3>
            <ul className="tick-list text-ink-700">
              {councilFacts.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </div>
          <div className="card border-navy-200 bg-navy-50 p-6">
            <h3 className="font-display text-lg font-bold text-navy-900">A private collection from us</h3>
            <ul className="tick-list text-ink-700">
              {privateFacts.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </div>
        </div>
        <p className="mt-5 text-sm leading-relaxed text-ink-500">
          Council details from <a href={COUNCIL_SOURCE} className="link" target="_blank" rel="noopener">watford.gov.uk/bulkywaste</a>, checked {COUNCIL_CHECKED}. Prices change, so check before booking. Bushey is in Hertsmere, and South Oxhey, Carpenders Park, Croxley Green, Rickmansworth and Abbots Langley are in Three Rivers, so different council rules apply there. Full comparison: <Link to="/guides/council-bulky-waste-vs-private-collection/" className="link">council vs private collection in Watford</Link>.
        </p>
      </section>

      <section className="container py-16"><WasteJourney /></section>

      {/* Who we help */}
      <section className="container grid gap-10 py-16 lg:grid-cols-2">
        <div>
          <h2 className="section-title">Who we help</h2>
          <div className="prose-site mt-4">
            <h3>Households</h3>
            <p>Clear-outs before a move, after a renovation, or simply to get the garage back. See <Link to="/house-clearance/">house clearance</Link> and <Link to="/furniture-removal/">furniture removal</Link>.</p>
            <h3>Landlords and letting agents</h3>
            <p><Link to="/end-of-tenancy-clearance/">End of tenancy clearances</Link>, abandoned belongings and mattresses between lets — arranged with key holders so you don't need to be there, 24/7.</p>
            <h3>Businesses</h3>
            <p><Link to="/office-clearance/">Office clearances</Link>, <Link to="/commercial-bin-collection/">commercial bin and overflow collections</Link> and <Link to="/builders-waste-removal/">builders' waste removal</Link>, with the waste paperwork businesses must keep. Regular customers can work with us on <Link to="/contract-waste-services/">contract or account</Link>.</p>
            <h3>Sensitive clearances</h3>
            <p>Patient, discreet <Link to="/hoarder-clearance/">hoarder clearances</Link> and <Link to="/probate-clearance/">probate clearances</Link>, working with families, landlords and support services.</p>
          </div>
        </div>
        <div className="card p-6 md:p-8">
          <h2 className="font-display text-xl font-bold text-navy-900">Things we're often asked to take</h2>
          <div className="mt-5">
            <TickList items={["Sofas and armchairs", "Mattresses and beds", "Fridges and freezers", "Washing machines", "Garden waste and soil", "Old kitchens and bathrooms", "Carpets and underlay", "Office furniture and IT", "Hot tubs and pianos", "Boxes, bags and loft clutter"]} />
          </div>
          <p className="mt-5 text-sm text-ink-500">Asbestos, clinical waste, gas bottles and chemicals need specialist handling — ask us first.</p>
        </div>
      </section>

      {/* Guides */}
      <section className="bg-paper py-16">
        <div className="container">
          <h2 className="section-title">Help deciding how to get rid of it</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {guides.filter((g) => decisionGuides.includes(g.slug)).map((g) => (
              <Link key={g.slug} to={`/guides/${g.slug}/`} className="card group p-6">
                <Icon name="doc" className="h-7 w-7 text-navy-700" />
                <h3 className="mt-3 font-display text-lg font-bold text-navy-900 group-hover:text-brick-600">{g.title}</h3>
                <p className="mt-2 text-sm text-ink-700">{g.lead}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16">
        <FaqList faqs={homeFaqs} heading="Rubbish removal in Watford: common questions" />
      </section>

      <section id="quote" className="bg-navy-50 py-16">
        <div className="container max-w-4xl">
          <h2 className="section-title">Request a free rubbish removal quote</h2>
          <p className="mt-2 text-ink-700">Tell us what needs to go and we'll come back to you with a price.</p>
          <div className="card mt-8 p-6 md:p-8"><QuoteForm /></div>
        </div>
      </section>

      <CtaBand
        heading="Need rubbish removed in Watford?"
        text="We're open 24/7. Call, or send photos with the quote form, and we'll confirm the price before we start."
        quoteHref="#quote"
      />
    </>
  );
}
