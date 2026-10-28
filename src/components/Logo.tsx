/** Brand mark: a red/yellow/blue tipper-style block with a wordmark. */
export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <rect width="48" height="48" rx="10" fill="#0A1D3F" />
      <path d="M9 30h30l-3.5-14H12.5z" fill="#E9B949" />
      <path d="M14 16l4-6h12l4 6z" fill="#C21D25" />
      <circle cx="16" cy="35" r="3.5" fill="#fff" />
      <circle cx="32" cy="35" r="3.5" fill="#fff" />
    </svg>
  );
}

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.05rem] font-bold tracking-tight ${inverted ? "text-white" : "text-navy-900"}`}>
          Watford <span className="text-brick-500">Rubbish</span>
        </span>
        <span className={`mt-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] ${inverted ? "text-signal-400" : "text-navy-700"}`}>Clearance</span>
      </span>
    </span>
  );
}
