import type { IconName } from "@/data/types";

const paths: Record<IconName, string> = {
  truck: "M3 6h11v10H3zM14 9h4l3 3v4h-7M7.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
  home: "M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6",
  office: "M4 21V5l8-2v18M12 7l8 2v12M7 8h2M7 12h2M7 16h2M15 12h2M15 16h2M2 21h20",
  leaf: "M5 19c0-8 5-13 15-14-1 10-6 15-14 15M5 19l7-7",
  chair: "M6 12V4h12v8M5 12h14v3H5zM6 15v5M18 15v5",
  brick: "M3 5h18v14H3zM3 10h18M3 15h18M9 5v5M15 10v5M9 15v4",
  shed: "M3 10l9-6 9 6M5 9v11h14V9M9 20v-6h6v6",
  sofa: "M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3M2 12a2 2 0 0 1 4 0v2h12v-2a2 2 0 0 1 4 0v5H2zM5 17v2M19 17v2",
  bed: "M3 18V6M3 12h18v6M21 18v-4a2 2 0 0 0-2-2M7 12V9h5v3",
  box: "M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10",
  bin: "M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6",
  binCommercial: "M3 8h18v12H3zM3 8l2-4h14l2 4M8 12v4M12 12v4M16 12v4",
  fridge: "M6 2h12v20H6zM6 10h12M9 5v2M9 13v3",
  key: "M15 7a4 4 0 1 1-3.5 6L4 20.5M7 17.5l2 2M9.5 15l2 2",
  check: "M5 12l5 5 9-10",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2",
  whatsapp: "M3 21l1.6-4.7A9 9 0 1 1 8 19.6zM9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 1a5 5 0 0 1-3-3l1-1-1-2z",
  mail: "M3 5h18v14H3zM3 6l9 7 9-7",
  pin: "M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM8.5 12l2.5 2.5 4.5-5",
  recycle: "M7 19H4l3-5M17 19h3l-3-5M9.5 5.5L12 2l2.5 3.5M7 19h10M8 14L12 7l4 7",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2",
  camera: "M3 8h4l2-3h6l2 3h4v11H3zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  pound: "M16 6.5A4 4 0 0 0 9 9v11M6 13h8M6 20h12",
  arrow: "M5 12h14M13 6l6 6-6 6",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6L6 18",
  chevron: "M9 6l6 6-6 6",
  tub: "M3 11h18v4a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4zM6 11V8a2 2 0 0 1 2-2M9 6c0-1 1-2 2-2M7 19l-1 2M17 19l1 2",
  piano: "M3 5h18v14H3zM3 12h18M7 12v7M11 12v7M15 12v7M6 12v4M10 12v4M14 12v4M18 12v4",
  stack: "M4 14h8v6H4zM12 14h8v6h-8zM7 8h9v6H7zM9 3h6v5H9z",
  handshake: "M2 11l4-4 4 2 3-2 4 1 5 3M6 7v6l5 4 3-1 2 1 4-4M11 17l-2 2M14 16l-1 2",
  doc: "M6 3h9l4 4v14H6zM14 3v5h5M9 13h6M9 17h6",
};

export function Icon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" focusable="false">
      <path d={paths[name]} />
    </svg>
  );
}
