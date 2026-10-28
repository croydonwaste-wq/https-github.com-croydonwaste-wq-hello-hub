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
    <section aria-label="Key facts" className="relative bg-signal-500">
      <div className="container grid grid-cols-2 gap-px overflow-hidden py-0 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <div key={s.small} className="px-2 py-6 text-center">
            <p className="font-display text-2xl font-extrabold text-navy-950 sm:text-3xl">{s.big}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-navy-900/80">{s.small}</p>
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
            <div className={`flex h-full flex-col rounded-xl p-5 ${j.color}`}>
              <span className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20"><Icon name={j.icon} className="h-5 w-5" /></span>
                <span className="font-display text-sm font-extrabold opacity-70">0{i + 1}</span>
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

/** Approximate compass positions around Watford (schematic, not to scale). */
const mapPos: Record<string, [number, number]> = {
  "rubbish-removal-berkhamsted": [16, 14],
  "rubbish-removal-hemel-hempstead": [38, 4],
  "rubbish-removal-harpenden": [66, 4],
  "rubbish-removal-kings-langley": [26, 26],
  "rubbish-removal-abbots-langley": [50, 34],
  "rubbish-removal-st-albans": [77, 18],
  "rubbish-removal-hatfield": [85, 32],
  "rubbish-removal-amersham": [15, 42],
  "rubbish-removal-croxley-green": [32, 50],
  "rubbish-removal-rickmansworth": [19, 62],
  "rubbish-removal-borehamwood": [83, 52],
  "rubbish-removal-bushey": [72, 68],
  "rubbish-removal-oxhey": [36, 78],
  "rubbish-removal-harrow": [64, 86],
};

export function CoverageMap() {
  return (
    <figure className="relative">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-navy-900">
        <svg viewBox="0 0 100 75" className="absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="none">
          {[12, 24, 36].map((r) => <ellipse key={r} cx="50" cy="48" rx={r} ry={r * 0.75} fill="none" stroke="#FFC629" strokeOpacity=".22" strokeWidth=".4" strokeDasharray="1.5 1.2" />)}
          {Object.values(mapPos).map(([x, y], i) => <line key={i} x1="50" y1="48" x2={x} y2={y * 0.75 + 3} stroke="#2456B8" strokeWidth=".35" />)}
        </svg>
        <Link to="/" className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center" style={{ left: "50%", top: "64%" }}>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brick-500 text-white shadow-lg ring-4 ring-white/30"><Icon name="pin" className="h-6 w-6" /></span>
          <span className="mt-1 rounded bg-white px-2 py-0.5 text-xs font-extrabold text-navy-900">Watford</span>
        </Link>
        {locations.map((l) => {
          const pos = mapPos[l.slug];
          if (!pos) return null;
          return (
            <Link key={l.slug} to={`/${l.slug}/`} className="group absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${pos[0]}%`, top: `${pos[1] + 4}%` }}>
              <span className="block whitespace-nowrap rounded-full bg-white/95 px-2 py-0.5 text-[0.65rem] font-semibold text-navy-900 shadow transition group-hover:bg-signal-500 sm:text-xs">
                {l.town.replace(" & ", " / ").split(" / ")[0]}
              </span>
            </Link>
          );
        })}
      </div>
      <figcaption className="mt-2 text-xs text-ink-500">Schematic map, not to scale. Tap a town to see local services.</figcaption>
    </figure>
  );
}
