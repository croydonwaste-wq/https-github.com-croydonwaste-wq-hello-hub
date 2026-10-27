import { useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { business, telHref, whatsappHref, mailtoHref } from "@/data/business";
import { services, serviceGroups } from "@/data/services";
import { locations } from "@/data/locations";
import { guides } from "@/data/guides";
import { Logo } from "./Logo";
import { Icon } from "./Icon";

const nav = [
  { to: "/services/", label: "Services" },
  { to: "/areas-we-cover/", label: "Areas" },
  { to: "/pricing/", label: "Pricing" },
  { to: "/guides/", label: "Guides" },
  { to: "/about/", label: "About" },
  { to: "/contact/", label: "Contact" },
];

function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const tel = telHref();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200 bg-white/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4 md:h-20">
        <Link to="/" aria-label={`${business.name} – home`}>
          <Logo />
        </Link>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((n) => (
              <li key={n.to}>
                <NavLink
                  to={n.to}
                  className={({ isActive }) =>
                    `rounded-md px-3 py-2 text-[0.95rem] font-semibold transition ${isActive ? "text-brick-600" : "text-navy-900 hover:text-brick-600"}`
                  }
                >
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          {tel && (
            <a href={tel} className="hidden items-center gap-2 font-display text-lg font-bold text-navy-900 md:flex" data-cta="call-header">
              <Icon name="phone" className="h-5 w-5 text-brick-500" />
              {business.phone}
            </a>
          )}
          <Link to="/contact/#quote" className="btn-primary hidden !py-2.5 sm:inline-flex">
            Free quote
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-navy-900 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-ink-200 bg-white lg:hidden">
          <ul className="container divide-y divide-ink-100 py-2">
            <li>
              <Link to="/" className="block py-3 font-semibold text-navy-900">Home</Link>
            </li>
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="block py-3 font-semibold text-navy-900">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  const tel = telHref();
  const wa = whatsappHref();
  return (
    <footer className="bg-navy-950 text-navy-100">
      <div className="h-1.5 bg-[linear-gradient(90deg,#E0291E_0_33%,#FFC629_33%_66%,#2456B8_66%)]" />
      <div className="container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo inverted />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-100/80">
            Rubbish removal and clearances for homes and businesses in Watford and across Hertfordshire. We do the lifting and loading, and sort waste for reuse and recycling first.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            {tel && (
              <li>
                <a href={tel} className="flex items-center gap-2 hover:text-white"><Icon name="phone" className="h-4 w-4 text-signal-500" />{business.phone}</a>
              </li>
            )}
            {wa && (
              <li>
                <a href={wa} target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-white"><Icon name="whatsapp" className="h-4 w-4 text-signal-500" />WhatsApp</a>
              </li>
            )}
            <li>
              <a href={mailtoHref()} className="flex items-center gap-2 hover:text-white"><Icon name="mail" className="h-4 w-4 text-signal-500" />{business.email}</a>
            </li>
            {business.address && (
              <li className="flex items-start gap-2"><Icon name="pin" className="h-4 w-4 text-signal-500" />
                {business.address.streetAddress}, {business.address.addressLocality} {business.address.postalCode}
              </li>
            )}
            {business.wasteCarrierNumber && <li>Waste carrier registration: {business.wasteCarrierNumber}</li>}
          </ul>
        </div>
        {serviceGroups.map((g) => (
          <div key={g.key}>
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-white">{g.label}</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {services.filter((s) => s.group === g.key).map((s) => (
                <li key={s.slug}><Link className="hover:text-white" to={`/${s.slug}/`}>{s.short}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container grid gap-8 border-t border-white/10 py-10 text-sm md:grid-cols-2">
        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-white">Areas we cover</h2>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
            <li><Link className="hover:text-white" to="/">Watford</Link></li>
            {locations.map((l) => (
              <li key={l.slug}><Link className="hover:text-white" to={`/${l.slug}/`}>{l.town}</Link></li>
            ))}
            <li><Link className="hover:text-white" to="/areas-we-cover/">All areas</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-white">Helpful guides</h2>
          <ul className="mt-4 space-y-2">
            {guides.map((g) => (
              <li key={g.slug}><Link className="hover:text-white" to={`/guides/${g.slug}/`}>{g.title}</Link></li>
            ))}
            <li><Link className="hover:text-white" to="/faqs/">Frequently asked questions</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-3 py-6 pb-24 text-xs text-navy-100/70 sm:flex-row sm:items-center sm:justify-between md:pb-6">
          <p>© {new Date().getFullYear()} {business.legalName ?? business.name}{business.companyNumber ? ` · Company no. ${business.companyNumber}` : ""}</p>
          <ul className="flex gap-4">
            <li><Link to="/privacy-policy/" className="hover:text-white">Privacy policy</Link></li>
            <li><Link to="/terms/" className="hover:text-white">Terms</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

/** Sticky mobile action bar — the main mobile conversion route. */
function MobileBar() {
  const tel = telHref();
  const wa = whatsappHref();
  const items = [
    tel && { href: tel, label: "Call", icon: "phone" as const, external: false },
    wa && { href: wa, label: "WhatsApp", icon: "whatsapp" as const, external: true },
    !tel && !wa && { href: mailtoHref(), label: "Email", icon: "mail" as const, external: false },
  ].filter(Boolean) as { href: string; label: string; icon: "phone" | "whatsapp" | "mail"; external: boolean }[];
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid border-t border-ink-200 bg-white shadow-[0_-4px_16px_rgba(7,23,51,.08)] md:hidden" style={{ gridTemplateColumns: `repeat(${items.length + 1}, minmax(0, 1fr))` }}>
      {items.map((it) => (
        <a key={it.label} href={it.href} {...(it.external ? { target: "_blank", rel: "noopener" } : {})} className="flex flex-col items-center gap-0.5 py-2.5 text-xs font-semibold text-navy-900">
          <Icon name={it.icon} className="h-5 w-5" />
          {it.label}
        </a>
      ))}
      <Link to="/contact/#quote" className="flex flex-col items-center gap-0.5 bg-brick-500 py-2.5 text-xs font-semibold text-white">
        <Icon name="doc" className="h-5 w-5" />
        Free quote
      </Link>
    </div>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2">
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <MobileBar />
    </div>
  );
}
