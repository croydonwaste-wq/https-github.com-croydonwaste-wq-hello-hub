import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { ContentBlock, Faq, Service } from "@/data/types";
import { Icon } from "./Icon";
import { ContactButtons } from "./ContactButtons";
import { QuickQuoteCard } from "./QuoteForm";
import { Illustration, serviceScene } from "./Illustration";
import { business } from "@/data/business";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-navy-100/80">
        {items.map((c, i) => (
          <li key={c.path} className="flex items-center gap-1.5">
            {i > 0 && <Icon name="chevron" className="h-3.5 w-3.5 opacity-60" />}
            {i === items.length - 1 ? (
              <span aria-current="page" className="text-white">{c.name}</span>
            ) : (
              <Link to={c.path} className="hover:text-white hover:underline">{c.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  crumbs,
  eyebrow,
  h1,
  lead,
  context,
  quote = {},
  children,
}: {
  crumbs?: Crumb[];
  eyebrow?: string;
  h1: string;
  lead: string;
  context?: string;
  /** Compact quote form beside the heading; pass false to hide (legal pages, 404). */
  quote?: false | { defaultService?: string; heading?: string };
  children?: ReactNode;
}) {
  return (
    <section className="hero-bg relative overflow-hidden text-white">
      <div className="container relative py-10 md:py-14">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <div className={`mt-6 grid gap-8 ${quote ? "lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start" : ""}`}>
          <div className="max-w-3xl">
            {eyebrow && <p className="eyebrow text-signal-400">{eyebrow}</p>}
            <h1 className="mt-2 font-display text-[2rem] font-bold leading-[1.08] tracking-tight sm:text-5xl">{h1}</h1>
            <p className="mt-4 text-lg leading-relaxed text-navy-100">{lead}</p>
            <ContactButtons tone="dark" context={context} className="mt-7" placement="hero" />
            <HeroBadges />
            {children}
          </div>
          {quote && <QuickQuoteCard {...quote} />}
        </div>
      </div>
    </section>
  );
}

/** Short confirmed-fact badges shown under hero CTAs. */
export function HeroBadges() {
  const items = [
    business.open247 && "Open 24/7",
    business.sameDay && "Same-day collections",
    business.licensedWasteCarrier && "Licensed waste carrier",
    business.publicLiability && `${business.publicLiability} public liability`,
  ].filter(Boolean) as string[];
  return (
    <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-navy-100">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-1.5"><Icon name="check" className="h-4 w-4 text-signal-500" />{t}</li>
      ))}
    </ul>
  );
}

/** A concise answer box placed high on the page for users, snippets and AI retrieval. */
export function AnswerBox({ title = "In short", children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="rounded-r-lg border-l-[3px] border-navy-900 bg-navy-50 p-5 md:p-6">
      <p className="eyebrow text-navy-800">{title}</p>
      <p className="mt-2 text-[1.05rem] leading-relaxed text-ink-900">{children}</p>
    </aside>
  );
}

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="prose-site">
      {blocks.map((b) => (
        <section key={b.h2}>
          <h2>{b.h2}</h2>
          {b.paras?.map((p, i) => <p key={i}>{p}</p>)}
          {b.list && (
            <ul className="tick-list">
              {b.list.map((li) => <li key={li}>{li}</li>)}
            </ul>
          )}
          {b.subs?.map((s) => (
            <div key={s.h3}>
              <h3>{s.h3}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}

export function FaqList({ faqs, heading = "Frequently asked questions" }: { faqs: Faq[]; heading?: string }) {
  return (
    <section aria-labelledby="faqs">
      <h2 id="faqs" className="section-title">{heading}</h2>
      <div className="mt-6 divide-y divide-ink-200 rounded-lg border border-ink-200 bg-white">
        {faqs.map((f) => (
          <details key={f.q} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
              <h3 className="font-display text-lg font-bold text-navy-900">{f.q}</h3>
              <Icon name="chevron" className="mt-1 h-5 w-5 shrink-0 text-brick-500 transition group-open:rotate-90" />
            </summary>
            <p className="mt-3 leading-relaxed text-ink-700">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function ServiceCard({ s, anchor, visual = false }: { s: Service; anchor?: string; visual?: boolean }) {
  return (
    <Link to={`/${s.slug}/`} className="card group flex flex-col overflow-hidden p-6">
      {visual && (
        <div className="-mx-6 -mt-6 mb-5 border-b border-ink-200 bg-navy-50 transition group-hover:bg-signal-100">
          <Illustration scene={serviceScene[s.slug] ?? "van"} label="" className="rounded-none" />
        </div>
      )}
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-200 bg-navy-50 text-navy-700 transition group-hover:border-navy-900 group-hover:bg-navy-900 group-hover:text-white">
        <Icon name={s.icon} />
      </span>
      <h3 className="mt-4 font-display text-lg font-bold text-navy-900">{anchor ?? s.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-700">{s.cardText}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brick-600">
        Find out more <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

export const processSteps = [
  { icon: "camera" as const, title: "Tell us what's going", text: "Use the quote form or email with a description and photos if you can. Photos are the fastest way to an accurate price." },
  { icon: "pound" as const, title: "Get a clear quote", text: "We price on volume, item types and access — and confirm the price before any work starts." },
  { icon: "truck" as const, title: "We load and clear", text: "Our team carries everything out from wherever it is and leaves the area swept." },
  { icon: "recycle" as const, title: "Reuse and recycle first", text: "Waste is sorted so reusable and recyclable items stay out of landfill, with licensed disposal for the rest." },
];

export function ProcessSteps({ heading = "How it works" }: { heading?: string }) {
  return (
    <section aria-labelledby="process">
      <h2 id="process" className="section-title">{heading}</h2>
      <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((p, i) => (
          <li key={p.title} className="card relative p-6">
            <span className="absolute right-5 top-4 font-display text-4xl font-bold text-navy-100">{i + 1}</span>
            <Icon name={p.icon} className="h-7 w-7 text-brick-500" />
            <h3 className="mt-3 font-display text-lg font-bold text-navy-900">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">{p.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function CtaBand({ heading, text, context }: { heading: string; text: string; context?: string }) {
  return (
    <section className="bg-navy-900 text-white">
      <div className="container flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">{heading}</h2>
          <p className="mt-2 text-navy-100">{text}</p>
        </div>
        <ContactButtons tone="dark" context={context} placement="cta-band" />
      </div>
    </section>
  );
}

export function TickList({ items, cols = 2 }: { items: string[]; cols?: 1 | 2 | 3 }) {
  const grid = cols === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : cols === 2 ? "sm:grid-cols-2" : "";
  return (
    <ul className={`grid gap-3 ${grid}`}>
      {items.map((t) => (
        <li key={t} className="flex items-start gap-2.5 text-ink-900">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy-700 text-white">
            <Icon name="check" className="h-3.5 w-3.5" />
          </span>
          {t}
        </li>
      ))}
    </ul>
  );
}

/** Honest trust points — operational commitments, not unverified credentials. */
export const trustPoints = [
  { icon: "clock" as const, title: "Open 24/7, same-day", text: "Day, night or weekend — call early for the best chance of a same-day collection." },
  { icon: "shield" as const, title: "Licensed & insured", text: "Licensed waste carrier with £5 million public liability cover. Waste goes to authorised facilities." },
  { icon: "pound" as const, title: "Price agreed first", text: "You get a quote before we start, based on what you actually need removed." },
  { icon: "recycle" as const, title: "We lift, we recycle", text: "Collected from any room, loft or garden, then sorted for reuse and recycling first." },
];

export function TrustGrid() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {trustPoints.map((t) => (
        <li key={t.title} className="flex gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-navy-200 bg-navy-50 text-navy-700">
            <Icon name={t.icon} />
          </span>
          <div>
            <h3 className="font-display font-bold text-navy-900">{t.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-ink-700">{t.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
