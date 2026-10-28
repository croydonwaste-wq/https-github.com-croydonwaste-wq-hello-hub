/**
 * Vector illustrations in the brand palette. Pure SVG, so they stay razor-sharp at any
 * size (no blurry text or compression artefacts) and weigh a few KB each. They are
 * illustrative only — never presented as photos of the company's own jobs.
 */
import type { ReactNode } from "react";

const C = {
  navy: "#0A1D3F",
  navy2: "#1E3F7A",
  blue: "#2B55A0",
  sky: "#E6ECF6",
  sky2: "#F4F7FB",
  yellow: "#E9B949",
  red: "#C21D25",
  green: "#3F8F4E",
  green2: "#6DB36B",
  brown: "#8A5A3B",
  wood: "#C58B5A",
  grey: "#9AA3B2",
  grey2: "#CBD2DC",
  dark: "#1F2937",
  white: "#FFFFFF",
};

type P = { x: number; y: number; s?: number };
const T = ({ x, y, s = 1, children }: P & { children: ReactNode }) => <g transform={`translate(${x} ${y}) scale(${s})`}>{children}</g>;

export const Van = (p: P) => (
  <T {...p}>
    <rect x="0" y="10" width="150" height="80" rx="6" fill={C.white} stroke={C.navy} strokeWidth="3" />
    <path d="M150 34h34l22 26v30h-56z" fill={C.navy} />
    <path d="M158 40h24l16 20h-40z" fill={C.sky} />
    <rect x="0" y="58" width="150" height="10" fill={C.yellow} />
    <rect x="0" y="68" width="150" height="5" fill={C.red} />
    <rect x="0" y="73" width="150" height="5" fill={C.blue} />
    <text x="75" y="34" textAnchor="middle" fontFamily="Archivo, Arial, sans-serif" fontWeight="800" fontSize="15" fill={C.navy}>WATFORD</text>
    <text x="75" y="50" textAnchor="middle" fontFamily="Archivo, Arial, sans-serif" fontWeight="800" fontSize="10.5" fill={C.red} letterSpacing="1">RUBBISH CLEARANCE</text>
    <rect x="196" y="74" width="10" height="6" rx="2" fill={C.yellow} />
    <circle cx="40" cy="92" r="15" fill={C.dark} /><circle cx="40" cy="92" r="6" fill={C.grey2} />
    <circle cx="172" cy="92" r="15" fill={C.dark} /><circle cx="172" cy="92" r="6" fill={C.grey2} />
  </T>
);

export const Sofa = (p: P) => (
  <T {...p}>
    <rect x="8" y="0" width="104" height="38" rx="10" fill={C.blue} />
    <rect x="0" y="22" width="22" height="40" rx="8" fill={C.navy2} />
    <rect x="98" y="22" width="22" height="40" rx="8" fill={C.navy2} />
    <rect x="18" y="34" width="84" height="22" rx="5" fill={C.blue} stroke={C.navy2} strokeWidth="2" />
    <line x1="60" y1="36" x2="60" y2="55" stroke={C.navy2} strokeWidth="2" />
    <rect x="6" y="60" width="6" height="8" fill={C.dark} /><rect x="108" y="60" width="6" height="8" fill={C.dark} />
  </T>
);

export const Mattress = (p: P) => (
  <T {...p}>
    <rect x="0" y="0" width="36" height="110" rx="8" fill={C.white} stroke={C.grey} strokeWidth="2.5" />
    {[18, 36, 54, 72, 90].map((y) => <circle key={y} cx="18" cy={y} r="2.2" fill={C.grey2} />)}
    <rect x="4" y="4" width="28" height="102" rx="6" fill="none" stroke={C.sky} strokeWidth="2" />
  </T>
);

export const Fridge = (p: P) => (
  <T {...p}>
    <rect x="0" y="0" width="50" height="104" rx="6" fill={C.white} stroke={C.grey} strokeWidth="2.5" />
    <line x1="0" y1="38" x2="50" y2="38" stroke={C.grey} strokeWidth="2.5" />
    <rect x="40" y="12" width="4" height="16" rx="2" fill={C.grey} />
    <rect x="40" y="48" width="4" height="22" rx="2" fill={C.grey} />
  </T>
);

export const Box = ({ w = 44, h = 34, ...p }: P & { w?: number; h?: number }) => (
  <T {...p}>
    <rect x="0" y="0" width={w} height={h} rx="2" fill={C.wood} stroke={C.brown} strokeWidth="2" />
    <rect x={w / 2 - 6} y="0" width="12" height={h} fill="#E6B98A" opacity=".8" />
  </T>
);

export const Bag = (p: P) => (
  <T {...p}>
    <path d="M10 14c-10 8-12 32-4 40h32c8-8 6-32-4-40z" fill={C.dark} />
    <path d="M14 14l8-12 8 12z" fill={C.dark} />
    <path d="M14 30c4-4 10-4 14 0" stroke="#4B5563" strokeWidth="2" fill="none" />
  </T>
);

export const Chair = (p: P) => (
  <T {...p}>
    <rect x="4" y="0" width="34" height="34" rx="5" fill={C.navy2} />
    <rect x="0" y="34" width="42" height="10" rx="4" fill={C.navy} />
    <line x1="21" y1="44" x2="21" y2="58" stroke={C.dark} strokeWidth="4" />
    <line x1="6" y1="62" x2="36" y2="62" stroke={C.dark} strokeWidth="4" strokeLinecap="round" />
  </T>
);

export const Desk = (p: P) => (
  <T {...p}>
    <rect x="0" y="40" width="120" height="8" fill={C.wood} />
    <rect x="6" y="48" width="6" height="40" fill={C.brown} /><rect x="108" y="48" width="6" height="40" fill={C.brown} />
    <rect x="80" y="48" width="30" height="34" fill={C.wood} stroke={C.brown} strokeWidth="1.5" />
    <rect x="22" y="0" width="54" height="34" rx="3" fill={C.dark} /><rect x="26" y="4" width="46" height="26" fill={C.blue} />
    <rect x="44" y="34" width="10" height="6" fill={C.grey} />
  </T>
);

export const Tree = (p: P) => (
  <T {...p}>
    <rect x="22" y="60" width="12" height="44" fill={C.brown} />
    <circle cx="28" cy="40" r="30" fill={C.green} /><circle cx="12" cy="52" r="16" fill={C.green2} /><circle cx="46" cy="50" r="18" fill={C.green2} />
  </T>
);

export const GreenPile = (p: P) => (
  <T {...p}>
    <path d="M0 40c10-30 30-38 50-30 14-14 40-8 46 12 10 2 16 10 16 18z" fill={C.green2} />
    <path d="M20 40c6-14 18-18 28-14M60 40c4-10 14-16 26-12" stroke={C.green} strokeWidth="3" fill="none" />
    <line x1="10" y1="34" x2="40" y2="12" stroke={C.brown} strokeWidth="4" strokeLinecap="round" />
    <line x1="60" y1="36" x2="98" y2="16" stroke={C.brown} strokeWidth="3" strokeLinecap="round" />
  </T>
);

export const Wheelbarrow = (p: P) => (
  <T {...p}>
    <path d="M0 0h70l-10 30H10z" fill={C.red} />
    <path d="M6 0c10-12 50-14 60 0" fill={C.green2} />
    <circle cx="20" cy="42" r="10" fill={C.dark} />
    <line x1="60" y1="24" x2="96" y2="40" stroke={C.dark} strokeWidth="4" strokeLinecap="round" />
  </T>
);

export const Rubble = (p: P) => (
  <T {...p}>
    <path d="M0 50l20-34 18 10 16-24 22 22 14-8 22 34z" fill={C.grey} />
    {[[18, 36], [44, 30], [70, 38], [92, 44], [32, 46]].map(([x, y], i) => (
      <rect key={i} x={x} y={y} width="16" height="9" rx="1" fill={i % 2 ? C.red : "#B5523B"} transform={`rotate(${i * 17 - 20} ${x + 8} ${y + 4})`} />
    ))}
  </T>
);

export const Planks = (p: P) => (
  <T {...p}>
    {[0, 10, 20].map((y, i) => <rect key={y} x={i * 6} y={y} width="110" height="8" rx="1" fill={C.wood} stroke={C.brown} strokeWidth="1.5" transform={`rotate(-8 55 ${y})`} />)}
    <rect x="0" y="34" width="70" height="40" fill="#F3F4F6" stroke={C.grey2} strokeWidth="2" transform="rotate(-6 35 54)" />
  </T>
);

export const WheelieBin = ({ color = C.navy2, ...p }: P & { color?: string }) => (
  <T {...p}>
    <rect x="0" y="4" width="50" height="10" rx="3" fill={color} />
    <path d="M3 14h44l-4 72H7z" fill={color} />
    <circle cx="10" cy="88" r="7" fill={C.dark} />
    <rect x="18" y="30" width="14" height="4" rx="2" fill="rgba(255,255,255,.4)" />
  </T>
);

export const TradeBin = (p: P) => (
  <T {...p}>
    <path d="M0 20h110l-6 64H6z" fill={C.green} />
    <rect x="-4" y="8" width="118" height="14" rx="4" fill="#2F6E3B" />
    <circle cx="16" cy="90" r="8" fill={C.dark} /><circle cx="94" cy="90" r="8" fill={C.dark} />
    <rect x="40" y="40" width="30" height="5" rx="2" fill="rgba(255,255,255,.35)" />
  </T>
);

export const House = (p: P) => (
  <T {...p}>
    <path d="M0 60L80 0l80 60z" fill={C.red} />
    <rect x="12" y="58" width="136" height="100" fill={C.white} stroke={C.navy} strokeWidth="2" />
    <rect x="30" y="76" width="30" height="26" fill={C.sky} stroke={C.navy} strokeWidth="2" />
    <rect x="100" y="76" width="30" height="26" fill={C.sky} stroke={C.navy} strokeWidth="2" />
    <rect x="66" y="108" width="28" height="50" fill={C.navy2} />
    <circle cx="88" cy="134" r="2.5" fill={C.yellow} />
    <rect x="114" y="10" width="14" height="30" fill={C.brown} />
  </T>
);

export const Shed = (p: P) => (
  <T {...p}>
    <path d="M0 30L60 0l60 30z" fill={C.brown} />
    <rect x="8" y="30" width="104" height="70" fill={C.wood} />
    {[22, 38, 54, 70, 86, 102].map((x) => <line key={x} x1={x} y1="30" x2={x} y2="100" stroke={C.brown} strokeWidth="1.5" />)}
    <rect x="44" y="50" width="32" height="50" fill={C.brown} />
  </T>
);

export const Key = (p: P) => (
  <T {...p}>
    <circle cx="16" cy="16" r="14" fill="none" stroke={C.yellow} strokeWidth="7" />
    <path d="M28 22l40 26M54 40l-6 10M62 45l-6 10" stroke={C.yellow} strokeWidth="7" strokeLinecap="round" />
  </T>
);

const Frame = ({ children, label, tint = C.sky }: { children: ReactNode; label: string; tint?: string }) => (
  <svg viewBox="0 0 480 300" {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })} className="h-auto w-full">
    <defs>
      <linearGradient id="wrc-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={C.sky2} />
        <stop offset="1" stopColor={tint} />
      </linearGradient>
    </defs>
    <rect width="480" height="300" fill="url(#wrc-bg)" />
    <path d="M0 60h480M0 120h480M0 180h480M80 0v240M160 0v240M240 0v240M320 0v240M400 0v240" stroke={C.navy} strokeOpacity=".04" />
    <rect y="240" width="480" height="60" fill={C.navy} opacity=".06" />
    <rect y="239" width="480" height="2" fill={C.navy} opacity=".18" />
    {children}
  </svg>
);

export type Scene =
  | "van" | "house" | "probate" | "office" | "garden" | "furniture" | "sofa" | "mattress"
  | "tenancy" | "hoarder" | "hottub" | "piano" | "contract" | "bulky" | "fridge" | "builders" | "shed" | "bins" | "trade" | "town" | "sameday";

const scenes: Record<Scene, ReactNode> = {
  van: (<><Van x={40} y={140} s={1.05} /><Box x={290} y={206} /><Box x={330} y={206} w={40} h={34} /><Box x={306} y={176} w={40} h={30} /><Bag x={380} y={186} /><Bag x={414} y={194} s={0.85} /></>),
  sameday: (<><Van x={130} y={140} s={1.05} /><path d="M30 170h80M50 195h60M20 220h90" stroke={C.yellow} strokeWidth="8" strokeLinecap="round" /><circle cx="80" cy="80" r="40" fill={C.white} stroke={C.navy} strokeWidth="5" /><path d="M80 56v26l16 10" stroke={C.red} strokeWidth="6" strokeLinecap="round" fill="none" /></>),
  house: (<><House x={30} y={82} /><Sofa x={210} y={172} s={0.9} /><Box x={330} y={206} /><Box x={370} y={206} w={40} /><Box x={344} y={176} w={40} h={30} /><Bag x={420} y={190} s={0.8} /></>),
  hoarder: (<><Box x={40} y={206} /><Box x={84} y={206} w={40} /><Box x={124} y={206} /><Box x={56} y={174} w={40} h={32} /><Box x={98} y={174} /><Box x={74} y={142} w={40} h={32} /><Box x={88} y={110} w={36} h={32} /><Bag x={180} y={186} /><Bag x={212} y={192} s={0.85} /><Box x={250} y={206} /><Box x={262} y={176} w={36} h={30} /><Chair x={320} y={178} /><Bag x={380} y={186} /><Box x={410} y={206} w={36} /></>),
  hottub: (<><rect x="60" y="160" width="190" height="80" rx="14" fill="#8A5A3B" /><rect x="66" y="166" width="178" height="12" rx="6" fill="#C58B5A" />{[90, 120, 150, 180, 210].map((x) => <line key={x} x1={x} y1="180" x2={x} y2="236" stroke="#6B4429" strokeWidth="3" />)}<path d="M78 160c20-18 134-18 154 0" fill="#2B55A0" opacity=".85" /><rect x="270" y="196" width="60" height="44" rx="4" fill="#9AA3B2" /><circle cx="300" cy="218" r="10" fill="#E6ECF6" /><path d="M340 240l30-40 30 40z" fill="#C58B5A" /><Bag x={410} y={186} /></>),
  piano: (<><rect x="70" y="110" width="200" height="130" rx="6" fill="#1F2937" /><rect x="80" y="120" width="180" height="40" rx="3" fill="#374151" /><rect x="78" y="170" width="184" height="26" fill="#FFFFFF" />{Array.from({ length: 15 }, (_, i) => <line key={i} x1={78 + i * 12.3} y1="170" x2={78 + i * 12.3} y2="196" stroke="#CBD2DC" strokeWidth="1.5" />)}{[0, 1, 3, 4, 5, 7, 8, 10, 11, 12].map((i) => <rect key={i} x={86 + i * 12.3} y="170" width="7" height="16" fill="#1F2937" />)}<rect x="80" y="196" width="10" height="44" fill="#111827" /><rect x="250" y="196" width="10" height="44" fill="#111827" /><rect x="300" y="200" width="60" height="16" rx="3" fill="#1F2937" /><rect x="306" y="216" width="6" height="24" fill="#111827" /><rect x="348" y="216" width="6" height="24" fill="#111827" /><Box x={390} y={206} /></>),
  contract: (<><TradeBin x={40} y={150} /><WheelieBin x={180} y={150} color="#1F2937" /><WheelieBin x={236} y={150} color="#2B55A0" /><Bag x={296} y={186} /><rect x="340" y="110" width="90" height="120" rx="8" fill="#FFFFFF" stroke="#0A1D3F" strokeWidth="3" /><rect x="362" y="100" width="46" height="18" rx="4" fill="#0A1D3F" />{[136, 160, 184, 208].map((y) => <g key={y}><path d={`M354 ${y}l6 6 10-12`} stroke="#3F8F4E" strokeWidth="4" fill="none" strokeLinecap="round" /><rect x="378" y={y - 2} width="40" height="6" rx="3" fill="#CBD2DC" /></g>)}</>),
  tenancy: (<><House x={30} y={82} /><Mattress x={214} y={128} /><Sofa x={262} y={172} s={0.8} /><Bag x={372} y={186} /><Bag x={408} y={192} s={0.85} /></>),
  probate: (<><House x={40} y={82} /><Key x={230} y={150} s={1.2} /><Box x={330} y={206} /><Box x={372} y={206} w={40} /><Box x={350} y={176} w={36} h={30} /></>),
  office: (<><Desk x={40} y={150} /><Chair x={180} y={178} /><Desk x={250} y={150} s={0.9} /><Box x={380} y={206} /><Box x={400} y={176} w={36} h={30} /></>),
  garden: (<><Tree x={40} y={136} /><Tree x={110} y={150} s={0.85} /><GreenPile x={200} y={200} /><Wheelbarrow x={330} y={186} /></>),
  furniture: (<><rect x="50" y="110" width="80" height="130" rx="4" fill={C.wood} stroke={C.brown} strokeWidth="3" /><line x1="90" y1="110" x2="90" y2="240" stroke={C.brown} strokeWidth="3" /><circle cx="82" cy="175" r="3" fill={C.brown} /><circle cx="98" cy="175" r="3" fill={C.brown} /><Sofa x={160} y={172} /><Chair x={310} y={178} /><Box x={380} y={206} /></>),
  sofa: (<><Sofa x={60} y={150} s={1.5} /><Sofa x={290} y={184} s={0.9} /><Chair x={410} y={180} s={0.9} /></>),
  mattress: (<><Mattress x={70} y={128} /><Mattress x={120} y={128} /><g transform="rotate(-90 300 230)"><rect x="290" y="150" width="30" height="170" rx="6" fill={C.white} stroke={C.grey} strokeWidth="2.5" /></g><Box x={380} y={206} /></>),
  bulky: (<><Sofa x={40} y={172} /><Fridge x={180} y={136} /><Mattress x={250} y={130} /><Box x={310} y={206} /><Bag x={360} y={186} /><Bag x={398} y={192} s={0.9} /></>),
  fridge: (<><Fridge x={70} y={112} s={1.2} /><Fridge x={150} y={136} /><rect x="230" y="160" width="80" height="80" rx="6" fill={C.white} stroke={C.grey} strokeWidth="2.5" /><circle cx="270" cy="200" r="24" fill={C.sky} stroke={C.grey} strokeWidth="3" /><Box x={360} y={206} /></>),
  builders: (<><Rubble x={40} y={190} s={1.3} /><Planks x={220} y={170} /><Bag x={390} y={186} /><Bag x={420} y={192} s={0.8} /></>),
  shed: (<><Shed x={50} y={140} /><Wheelbarrow x={200} y={192} /><Box x={330} y={206} /><Box x={370} y={206} w={40} /><Box x={344} y={176} w={40} h={30} /></>),
  bins: (<><WheelieBin x={60} y={150} color={C.dark} /><WheelieBin x={120} y={150} color={C.blue} /><WheelieBin x={180} y={150} color={C.green} /><Bag x={260} y={186} /><Bag x={294} y={192} s={0.9} /><Bag x={324} y={186} /><Bag x={360} y={194} s={0.8} /></>),
  trade: (<><TradeBin x={50} y={150} /><TradeBin x={190} y={150} /><Box x={340} y={206} /><Box x={382} y={206} w={40} /><Box x={356} y={176} w={40} h={30} /></>),
  town: (<><House x={30} y={120} s={0.75} /><House x={160} y={100} s={0.88} /><House x={310} y={128} s={0.7} /><path d="M240 30c-22 0-38 16-38 36 0 28 38 64 38 64s38-36 38-64c0-20-16-36-38-36z" fill={C.red} /><circle cx="240" cy="66" r="13" fill={C.white} /></>),
};

export function Illustration({ scene, label, className = "" }: { scene: Scene; label: string; className?: string }) {
  return (
    <figure className={`overflow-hidden rounded-lg ${className}`}>
      <Frame label={label}>{scenes[scene]}</Frame>
    </figure>
  );
}

/** Van with fill level — used for the load-size guide. */
export function VanLoad({ fill, label }: { fill: number; label: string }) {
  const w = 128 * fill;
  return (
    <svg viewBox="0 0 220 112" role="img" aria-label={label} className="h-auto w-full">
      <rect x="4" y="10" width="140" height="70" rx="6" fill={C.white} stroke={C.navy} strokeWidth="3" />
      <rect x="10" y={16} width={w} height="58" rx="3" fill={C.yellow} />
      {fill > 0 && <path d={`M10 ${46} h${w}`} stroke={C.navy} strokeOpacity=".15" strokeWidth="2" />}
      <path d="M144 30h32l22 24v26h-54z" fill={C.navy} />
      <path d="M152 36h22l14 18h-36z" fill={C.sky} />
      <circle cx="40" cy="84" r="13" fill={C.dark} /><circle cx="168" cy="84" r="13" fill={C.dark} />
    </svg>
  );
}

export const serviceScene: Record<string, Scene> = {
  "same-day-rubbish-removal": "sameday",
  "house-clearance": "house",
  "probate-clearance": "probate",
  "end-of-tenancy-clearance": "tenancy",
  "hoarder-clearance": "hoarder",
  "hot-tub-removal": "hottub",
  "piano-removal": "piano",
  "contract-waste-services": "contract",
  "office-clearance": "office",
  "garden-waste-clearance": "garden",
  "furniture-removal": "furniture",
  "sofa-removal": "sofa",
  "mattress-disposal": "mattress",
  "bulky-waste-collection": "bulky",
  "fridge-freezer-removal": "fridge",
  "builders-waste-removal": "builders",
  "shed-garage-clearance": "shed",
  "domestic-bin-collection": "bins",
  "commercial-bin-collection": "trade",
};
