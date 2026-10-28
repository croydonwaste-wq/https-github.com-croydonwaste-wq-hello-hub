import { Link } from "react-router-dom";
import { business } from "@/data/business";
import { COVERAGE_RADIUS_MILES, locations } from "@/data/locations";
import { services } from "@/data/services";
import { Icon } from "./Icon";
import { VanLoad } from "./Illustration";

/** Real, confirmed facts only. */
export function StatsStrip() {
  const stats = [
    { big: "24/7", small: "Open every day and night" },
    { big: "Same day", small: "Collections available" },
    { big: business.publicLiability ?? "", small: "Public liability cover" },
    { big: String(services.length), small: "Clearance services" },
    { big: `${COVERAGE_RADIUS_MILES} miles`, small: "Radius around Watford" },
  ].filter((s) => s.big);
  return (
    <section aria-label="Key facts" className="border-y border-navy-800 bg-navy-900">
      <div className="container grid grid-cols-2 divide-navy-800 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x">
        {stats.map((s) => (
          <div key={s.small} className="px-3 py-7 text-center">
            <p className="font-display text-2xl font-bold tracking-tight text-white sm:text-[1.75rem]">{s.big}</p>
            <p className="mt-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-signal-400">{s.small}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const loads = [
  { fill: 0.12, name: "Single item", eg: "A sofa, mattress, fridge or wardrobe" },
  { fill: 0.25, name: "Quarter load", eg: "A few bulky items or 10–15 bags" },
  { fill: 0.5, name: "Half load", eg: "A small room, garden tidy or shed" },
  { fill: 0.75, name: "Three-quarter load", eg: "A garage or 1-bed flat clearance" },
  { fill: 1, name: "Full load", eg: "A large room, renovation or small house" },
];

/** Visual guide that matches the "Roughly how much?" field on the quote form. */
export function LoadSizeGuide({ heading = "How big is your load?" }: { heading?: string }) {
  return (
    <section aria-labelledby="load-guide">
      <h2 id="load-guide" className="section-title">{heading}</h2>
      <p className="mt-2 max-w-2xl text-ink-700">Use this as a rough guide when you ask for a quote — or just send photos and we'll work it out for you.</p>
      <ol className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {loads.map((l) => (
          <li key={l.name} className="card p-4">
            <VanLoad fill={l.fill} label={`Van ${Math.round(l.fill * 100)}% full`} />
            <h3 className="mt-3 font-display font-bold text-navy-900">{l.name}</h3>
            <p className="mt-1 text-sm text-ink-700">{l.eg}</p>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-xs text-ink-500">Heavy waste (soil, rubble, tiles) reaches the van's weight limit before it's full, so it's priced by weight as well as space.</p>
    </section>
  );
}

const journey = [
  { icon: "truck" as const, title: "Collected", text: "Loaded from wherever it is in your property", color: "bg-navy-800 text-white" },
  { icon: "box" as const, title: "Sorted", text: "Separated by material and condition", color: "bg-navy-600 text-white" },
  { icon: "chair" as const, title: "Reused", text: "Good-condition items passed on where possible", color: "bg-signal-500 text-navy-950" },
  { icon: "recycle" as const, title: "Recycled", text: "Metal, wood, cardboard, green waste & electricals", color: "bg-[#3F8F4E] text-white" },
  { icon: "shield" as const, title: "Licensed disposal", text: "Only what's left, at authorised facilities", color: "bg-brick-500 text-white" },
];

/** "Where does my rubbish go?" — process graphic. */
export function WasteJourney() {
  return (
    <section aria-labelledby="journey">
      <h2 id="journey" className="section-title">Where does your rubbish go?</h2>
      <ol className="mt-8 grid gap-3 md:grid-cols-5">
        {journey.map((j, i) => (
          <li key={j.title} className="relative">
            <div className={`flex h-full flex-col rounded-lg p-5 ${j.color}`}>
              <span className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20"><Icon name={j.icon} className="h-5 w-5" /></span>
                <span className="font-display text-sm font-bold opacity-70">0{i + 1}</span>
              </span>
              <h3 className="mt-3 font-display text-lg font-bold">{j.title}</h3>
              <p className="mt-1 text-sm opacity-90">{j.text}</p>
            </div>
            {i < journey.length - 1 && (
              <span aria-hidden="true" className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy-900 shadow md:flex">
                <Icon name="chevron" className="h-4 w-4" />
              </span>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}

/** Approximate compass positions around Watford (schematic, not to scale), as % of a square map. */
const CENTRE: [number, number] = [50, 52];
const mapPos: Record<string, [number, number]> = {
  "rubbish-removal-luton": [46, 5],
  "rubbish-removal-stevenage": [80, 7],
  "rubbish-removal-hemel-hempstead": [24, 13],
  "rubbish-removal-harpenden": [62, 16],
  "rubbish-removal-st-albans": [79, 24],
  "rubbish-removal-kings-langley": [38, 25],
  "rubbish-removal-berkhamsted": [15, 23],
  "rubbish-removal-high-wycombe": [16, 33],
  "rubbish-removal-abbots-langley": [57, 33],
  "rubbish-removal-hatfield": [87, 38],
  "rubbish-removal-croxley-green": [38, 40],
  "rubbish-removal-amersham": [16, 46],
  "rubbish-removal-borehamwood": [84, 50],
  "rubbish-removal-rickmansworth": [20, 59],
  "rubbish-removal-bushey": [72, 64],
  "rubbish-removal-oxhey": [38, 72],
  "rubbish-removal-uxbridge": [17, 75],
  "rubbish-removal-edgware": [80, 78],
  "rubbish-removal-harrow": [56, 87],
};

export function CoverageMap() {
  return (
    <figure className="relative">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-navy-900 ring-1 ring-navy-800">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <pattern id="map-grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M10 0H0V10" fill="none" stroke="#fff" strokeOpacity=".05" strokeWidth=".3" /></pattern>
          </defs>
          <rect width="100" height="100" fill="url(#map-grid)" />
          {[14, 28, 42].map((r) => <circle key={r} cx={CENTRE[0]} cy={CENTRE[1]} r={r} fill="none" stroke="#E9B949" strokeOpacity=".25" strokeWidth=".3" strokeDasharray="1.2 1" />)}
          {Object.values(mapPos).map(([x, y], i) => <line key={i} x1={CENTRE[0]} y1={CENTRE[1]} x2={x} y2={y} stroke="#2B55A0" strokeOpacity=".7" strokeWidth=".3" />)}
          <text x="97" y="97" textAnchor="end" fontSize="2.6" fill="#E9B949" fillOpacity=".7" fontFamily="Inter, sans-serif">30-mile radius</text>
        </svg>
        <Link to="/" aria-label="Rubbish removal Watford" className="absolute flex flex-col items-center" style={{ left: `${CENTRE[0]}%`, top: `${CENTRE[1]}%`, transform: "translate(-50%, -22px)" }}>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brick-500 text-white shadow-lg ring-4 ring-white/20"><Icon name="pin" className="h-5 w-5" /></span>
          <span className="mt-1 rounded-sm bg-white px-2 py-0.5 text-xs font-bold text-navy-900">Watford</span>
        </Link>
        {locations.map((l) => {
          const pos = mapPos[l.slug];
          if (!pos) return null;
          return (
            <Link key={l.slug} to={`/${l.slug}/`} className="group absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${pos[0]}%`, top: `${pos[1]}%` }}>
              <span className="block whitespace-nowrap rounded-sm bg-white/95 px-1.5 py-0.5 text-[0.62rem] font-semibold text-navy-900 shadow-sm transition group-hover:bg-signal-500 sm:px-2 sm:text-xs">
                {l.town.split(" & ")[0]}
              </span>
            </Link>
          );
        })}
      </div>
      <figcaption className="mt-2 text-xs text-ink-500">Schematic map, not to scale. Select a town to see local services.</figcaption>
    </figure>
  );
}
