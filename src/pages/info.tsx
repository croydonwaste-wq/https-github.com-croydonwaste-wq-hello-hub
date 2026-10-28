import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { AnswerBox, ContentBlocks, CtaBand, FaqList, PageHero, ProcessSteps, TrustGrid } from "@/components/blocks";
import { QuoteForm } from "@/components/QuoteForm";
import { Icon } from "@/components/Icon";
import { LoadSizeGuide, WasteJourney } from "@/components/Graphics";
import { Illustration } from "@/components/Illustration";
import { business, mailtoHref, telHref, whatsappHref } from "@/data/business";
import { services } from "@/data/services";
import { locations } from "@/data/locations";
import { guides } from "@/data/guides";
import { breadcrumbSchema, faqSchema, ORG_ID, localBusinessSchema } from "@/lib/schema";
import type { Faq } from "@/data/types";

export function Pricing() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing/" }];
  const faqs: Faq[] = [
    { q: "Do you charge per item or per load?", a: "Larger jobs are priced by volume — how much of the van the waste fills — with adjustments for heavy or specially-handled items. Single-item collections are priced individually." },
    { q: "Do you charge more for same-day or out-of-hours collections?", a: "We operate 24/7, and your quote reflects the job, the timing and the waste involved. The full price is always confirmed before we start." },
    { q: "Is labour included?", a: "Yes. Loading, carrying from inside the property and disposal are all included in the quote." },
    { q: "Will the price change on the day?", a: "Only if there's significantly more, or different, waste than described. If so we'll tell you before loading it, and you can decide." },
    { q: "How can I get the most accurate quote?", a: "Send photos of everything that's going, mention where it is (upstairs, loft, garden), and tell us about access such as stairs or parking." },
  ];
  return (
    <>
      <Seo
        title="Rubbish Removal Prices Watford | How Our Quotes Work"
        description="How much does rubbish removal cost in Watford? What affects the price, load sizes, items that cost more to dispose of — and a free quote on 01293 549164."
        path="/pricing/"
        schema={[breadcrumbSchema(crumbs), faqSchema(faqs)]}
      />
      <PageHero crumbs={crumbs} eyebrow="Pricing" h1="Rubbish Removal Prices in Watford" lead="Clear, upfront quotes based on what you actually need removing — with labour, loading and disposal included." quote={{ heading: "Get your price" }} />
      <div className="container grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 space-y-12">
          <AnswerBox title="How much does rubbish removal cost?">
            The cost of rubbish removal depends on three things: how much waste there is (measured by how much of the van it fills), what it is (some items cost more to dispose of legally) and how long it takes to load. We give you a fixed quote from photos or a description before any work starts.
          </AnswerBox>
          <LoadSizeGuide heading="Load sizes at a glance" />
          <ContentBlocks
            blocks={[
              {
                h2: "What affects the price",
                subs: [
                  { h3: "Volume", text: "The biggest factor. A few bags and a chair is a small load; a garage or a full house can be one or more full van loads." },
                  { h3: "Type of waste", text: "Sofas and armchairs (POPs rules), fridges and freezers (refrigerant recovery), mattresses, plasterboard, soil and rubble all carry higher disposal costs than general mixed waste." },
                  { h3: "Weight", text: "Heavy waste such as rubble, soil and tiles fills the van's weight limit before its space, so it's priced accordingly." },
                  { h3: "Access and time", text: "Third-floor flats without a lift, long carries from the van or restricted parking add time. Ground-floor items next to the drive are quickest." },
                ],
              },
              {
                h2: "Ways to keep the cost down",
                list: [
                  "Combine everything into one collection rather than several",
                  "Separate heavy waste (rubble, soil) from lighter bulky items",
                  "Donate or sell good-condition furniture with fire labels first",
                  "Send clear photos so the quote is accurate first time",
                  "Have items ready and accessible on the day",
                ],
              },
              {
                h2: "How does a private collection compare with the council?",
                paras: [
                  "For one to three eligible items you can put outside, the council's bulky waste service is often the cheapest route — at the time of writing Watford Borough Council listed £57 for up to three items, excluding electricals and upholstered items (check watford.gov.uk for current prices). For mixed loads, excluded items, items inside the property or a deadline, a private collection is usually the practical choice.",
                ],
              },
              {
                h2: "Why very cheap quotes are a warning sign",
                paras: [
                  "Licensed disposal has real costs. Prices far below everyone else's can mean the waste never reaches a licensed site — and householders can be fined if their rubbish is fly-tipped. Always check a collector's waste carrier registration.",
                ],
              },
            ]}
          />
          <p className="text-ink-700">
            Read more: <Link to="/guides/check-waste-carrier-licence/" className="link">how to check a waste carrier licence</Link> and <Link to="/guides/council-bulky-waste-vs-private-collection/" className="link">council vs private collection in Watford</Link>.
          </p>
          <FaqList faqs={faqs} heading="Pricing questions" />
        </div>
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="card p-6">
            <h2 className="font-display text-lg font-bold text-navy-900">Items with extra disposal costs</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {["sofa-removal", "fridge-freezer-removal", "mattress-disposal", "builders-waste-removal"].map((slug) => {
                const s = services.find((x) => x.slug === slug)!;
                return <li key={slug}><Link to={`/${slug}/`} className="link">{s.name}</Link></li>;
              })}
            </ul>
          </div>
        </aside>
      </div>
      <section id="quote" className="bg-navy-50 py-14">
        <div className="container max-w-4xl">
          <h2 className="section-title">Get your free quote</h2>
          <div className="card mt-6 p-6 md:p-8"><QuoteForm /></div>
        </div>
      </section>
    </>
  );
}

export function About() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "About", path: "/about/" }];
  const aboutSchema = { "@context": "https://schema.org", "@type": "AboutPage", name: `About ${business.name}`, about: { "@id": ORG_ID } };
  return (
    <>
      <Seo
        title="About Us | Watford Rubbish Clearance"
        description="About Watford Rubbish Clearance: a local rubbish removal and clearance company for Watford and Hertfordshire — how we work and how we dispose of waste."
        path="/about/"
        schema={[aboutSchema, breadcrumbSchema(crumbs)]}
      />
      <PageHero crumbs={crumbs} eyebrow="About us" h1="About Watford Rubbish Clearance" lead="A local clearance company for Watford and the surrounding towns — focused on doing the heavy lifting properly, pricing honestly and disposing of waste the right way." />
      <div className="container grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0">
          <ContentBlocks
            blocks={[
              {
                h2: "What we do",
                paras: [
                  "We remove unwanted items and waste from homes and businesses — from a single mattress to a full house, office or building-site clear-out. Our team does the carrying and loading, so customers don't have to move anything outside.",
                ],
              },
              {
                h2: "How we handle your waste",
                paras: [
                  "Everything we collect is sorted. Good-condition items are set aside for reuse where possible, materials like metal, wood, cardboard, green waste and electricals go for recycling, and specially-controlled items such as upholstered seating and fridges go through the correct treatment routes. Only what's left goes for licensed disposal.",
                ],
              },
              {
                h2: "What you can expect from us",
                list: [
                  "Availability 24 hours a day, 7 days a week, including same-day collections",
                  "A licensed waste carrier with £5 million public liability insurance",
                  "A quote agreed before any work starts",
                  "Arrival at the agreed time, with the right number of people for the job",
                  "Care with your property — floors, walls and banisters",
                  "Our waste carrier details and paperwork on request",
                  "Honest advice, including when the council's service would suit you better",
                ],
              },
            ]}
          />
        </div>
        <aside className="space-y-6 self-start">
          <Illustration scene="van" label="Illustration: Watford Rubbish Clearance van loaded with boxes and bags" />
          <div className="card p-6">
          <h2 className="font-display text-lg font-bold text-navy-900">Business details</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div><dt className="font-semibold text-navy-900">Trading name</dt><dd className="text-ink-700">{business.name}</dd></div>
            {business.legalName && <div><dt className="font-semibold text-navy-900">Company</dt><dd className="text-ink-700">{business.legalName}{business.companyNumber ? ` (No. ${business.companyNumber})` : ""}</dd></div>}
            {business.wasteCarrierNumber && <div><dt className="font-semibold text-navy-900">Waste carrier registration</dt><dd className="text-ink-700">{business.wasteCarrierNumber}</dd></div>}
            <div><dt className="font-semibold text-navy-900">Email</dt><dd><a className="link" href={mailtoHref()}>{business.email}</a></dd></div>
            {business.phone && <div><dt className="font-semibold text-navy-900">Phone</dt><dd><a className="link" href={telHref()!}>{business.phone}</a></dd></div>}
            <div><dt className="font-semibold text-navy-900">Hours</dt><dd className="text-ink-700">{business.openingHours}</dd></div>
            <div><dt className="font-semibold text-navy-900">Licensing</dt><dd className="text-ink-700">Licensed waste carrier</dd></div>
            <div><dt className="font-semibold text-navy-900">Insurance</dt><dd className="text-ink-700">{business.publicLiability} public liability</dd></div>
            <div><dt className="font-semibold text-navy-900">Area</dt><dd className="text-ink-700">Watford and Hertfordshire</dd></div>
          </dl>
          </div>
        </aside>
      </div>
      <section className="bg-paper py-14"><div className="container space-y-14"><TrustGrid /><WasteJourney /></div></section>
      <CtaBand heading="Let's get it cleared" text="Request a free quote for your clearance or collection." />
    </>
  );
}

export function Contact() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Contact", path: "/contact/" }];
  const tel = telHref();
  const wa = whatsappHref("Hi, I'd like a quote. My postcode is: ");
  const contactSchema = { "@context": "https://schema.org", "@type": "ContactPage", name: "Contact Watford Rubbish Clearance", about: { "@id": ORG_ID } };
  return (
    <>
      <Seo
        title="Contact & Free Quote | Watford Rubbish Clearance"
        description="Request a free rubbish removal quote in Watford. Call 01293 549164 (open 24/7) or use our quote form — photos help us price your job accurately."
        path="/contact/"
        schema={[contactSchema, localBusinessSchema(), breadcrumbSchema(crumbs)]}
      />
      <PageHero crumbs={crumbs} eyebrow="Contact" h1="Get a Free Rubbish Removal Quote" lead="Tell us what needs to go and where. We'll come back to you with a price — no obligation. Open 24/7, with same-day collections available." quote={false} />
      <div className="container grid gap-10 py-14 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section id="quote" aria-labelledby="form-heading" className="card scroll-mt-28 p-6 md:p-8">
          <h2 id="form-heading" className="font-display text-2xl font-bold text-navy-900">Quote request</h2>
          <p className="mt-1 text-ink-700">Takes about a minute.</p>
          <div className="mt-6"><QuoteForm /></div>
        </section>
        <aside className="space-y-5">
          <div className="card p-6">
            <h2 className="font-display text-lg font-bold text-navy-900">Other ways to reach us</h2>
            <ul className="mt-4 space-y-3">
              {tel && <li><a className="flex items-center gap-3 font-semibold text-navy-900" href={tel}><Icon name="phone" className="h-5 w-5 text-brick-500" />{business.phone}</a></li>}
              {wa && <li><a className="flex items-center gap-3 font-semibold text-navy-900" href={wa} target="_blank" rel="noopener"><Icon name="whatsapp" className="h-5 w-5 text-brick-500" />WhatsApp us photos</a></li>}
              <li><a className="flex items-center gap-3 break-all font-semibold text-navy-900" href={mailtoHref()}><Icon name="mail" className="h-5 w-5 shrink-0 text-brick-500" />{business.email}</a></li>
            </ul>
            {business.openingHours && <p className="mt-4 flex items-center gap-2 text-sm text-ink-700"><Icon name="clock" className="h-4 w-4" />{business.openingHours}</p>}
          </div>
          <div className="card p-6">
            <h2 className="font-display text-lg font-bold text-navy-900">What happens next?</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-ink-700">
              <li>We review your details and any photos.</li>
              <li>We confirm a price and suggest a collection time.</li>
              <li>We arrive, load everything and leave the area swept.</li>
            </ol>
          </div>
        </aside>
      </div>
      <section className="bg-paper py-14"><div className="container"><ProcessSteps heading="From quote to cleared" /></div></section>
    </>
  );
}

export function Faqs() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "FAQs", path: "/faqs/" }];
  const general: Faq[] = [
    { q: "What areas do you cover?", a: `Watford and the surrounding towns including ${locations.map((l) => l.town).join(", ")}, and everywhere else within 30 miles of Watford town centre.` },
    { q: "How do I book?", a: `Call ${business.phone} at any time, or use the quote form on any page. Once you're happy with the price, we agree a collection time.` },
    { q: "Do you offer same-day and out-of-hours collections?", a: "Yes. We operate 24 hours a day, 7 days a week and offer same-day collections — call early for the best choice of times." },
    { q: "Are you licensed and insured?", a: "Yes. We're a licensed waste carrier with £5 million public liability insurance." },
    { q: "Do I need to be home?", a: "Not always. Many jobs are done with access arranged through a key holder, agent or key safe, as long as we've agreed exactly what's being removed." },
    { q: "Do you recycle?", a: "Yes. Waste is sorted so reusable items and recyclable materials are kept out of landfill wherever possible." },
    { q: "What can't you take?", a: "Asbestos, clinical waste, gas bottles, chemicals, liquid paints and other hazardous waste need specialist handling. Ask us and we'll point you in the right direction." },
    { q: "Do you provide paperwork?", a: "Yes — businesses need a waste transfer note for commercial waste, and householders can ask for a receipt showing our carrier details." },
  ];
  const fromServices = services.slice(0, 6).flatMap((s) => s.faqs.slice(0, 1).map((f) => ({ ...f, slug: s.slug, name: s.name })));
  return (
    <>
      <Seo
        title="Rubbish Removal FAQs | Watford Rubbish Clearance"
        description="Answers to common rubbish removal questions in Watford: booking, coverage, pricing, recycling, what we can't take and the paperwork you should get."
        path="/faqs/"
        schema={[breadcrumbSchema(crumbs), faqSchema(general)]}
      />
      <PageHero crumbs={crumbs} eyebrow="FAQs" h1="Rubbish Removal Questions, Answered" lead="The questions we're asked most about booking, pricing, coverage and what happens to your waste." />
      <div className="container space-y-14 py-14">
        <FaqList faqs={general} heading="General questions" />
        <section>
          <h2 className="section-title">Service-specific questions</h2>
          <ul className="mt-6 grid gap-5 md:grid-cols-2">
            {fromServices.map((f) => (
              <li key={f.q} className="card p-6">
                <h3 className="font-display text-lg font-bold text-navy-900">{f.q}</h3>
                <p className="mt-2 text-ink-700">{f.a}</p>
                <Link to={`/${f.slug}/`} className="link mt-3 inline-block text-sm">More about {f.name.toLowerCase()}</Link>
              </li>
            ))}
          </ul>
        </section>
        <p className="text-ink-700">For more detail, see our <Link to="/pricing/" className="link">pricing page</Link> and <Link to="/guides/" className="link">guides</Link>, including <Link to={`/guides/${guides[0].slug}/`} className="link">{guides[0].title.toLowerCase()}</Link>.</p>
      </div>
      <CtaBand heading="Still have a question?" text="Ask us anything when you request a quote." />
    </>
  );
}

export function NotFound() {
  return (
    <>
      <Seo title="Page not found | Watford Rubbish Clearance" description="The page you were looking for couldn't be found." path="/404/" noindex />
      <section className="container py-24 text-center">
        <p className="eyebrow text-brick-600">404</p>
        <h1 className="mt-2 font-display text-4xl font-bold text-navy-900">This page has been cleared away</h1>
        <p className="mx-auto mt-4 max-w-lg text-ink-700">We couldn't find that page. Try one of these instead:</p>
        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          <li><Link to="/" className="btn-primary">Home</Link></li>
          <li><Link to="/services/" className="btn border border-navy-900/15 text-navy-900">Services</Link></li>
          <li><Link to="/contact/" className="btn border border-navy-900/15 text-navy-900">Get a quote</Link></li>
        </ul>
      </section>
    </>
  );
}

/** FormSubmit redirects here after a successful quote request. */
export function ThankYou() {
  const tel = telHref();
  return (
    <>
      <Seo title="Thank You | Watford Rubbish Clearance" description="Thanks for your quote request — we'll be in touch shortly." path="/thank-you/" noindex />
      <section className="container max-w-2xl py-20 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#3F8F4E] text-white"><Icon name="check" className="h-8 w-8" /></span>
        <h1 className="mt-6 font-display text-4xl font-bold text-navy-900">Thanks — we've got your request</h1>
        <p className="mt-4 text-lg text-ink-700">
          We'll be in touch shortly with a price. If you haven't sent photos yet, reply to our email or send them to{" "}
          <a className="link" href={mailtoHref("Photos for my quote")}>{business.email}</a>.
        </p>
        {tel && (
          <p className="mt-6 text-ink-700">
            Need it gone today? Call <a href={tel} className="font-display text-xl font-bold text-brick-600">{business.phone}</a> — we're open 24/7.
          </p>
        )}
        <Link to="/" className="btn-primary mt-8">Back to the homepage</Link>
      </section>
    </>
  );
}
