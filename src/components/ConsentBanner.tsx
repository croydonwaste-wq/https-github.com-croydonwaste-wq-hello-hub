import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GTM_ID, readConsent, setConsent } from "@/lib/tracking";

export const OPEN_CONSENT_EVENT = "wrc:open-consent";

/**
 * Analytics cookie choice. Only exists when Google Tag Manager is configured (VITE_GTM_ID);
 * until then the site sets no analytics cookies and shows nothing. Non-blocking, sits above
 * the mobile contact bar, and "Reject" is as easy as "Accept" (UK GDPR / PECR).
 */
export function ConsentBanner() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!GTM_ID) return;
    if (readConsent() === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);
  if (!open) return null;
  const choose = (c: "granted" | "denied") => {
    setConsent(c);
    setOpen(false);
  };
  return (
    <section
      aria-label="Cookie choice"
      className="fixed inset-x-3 bottom-[4.5rem] z-50 rounded-lg border border-ink-200 bg-white p-4 text-sm text-ink-700 shadow-lift md:inset-x-auto md:bottom-4 md:right-4 md:max-w-sm"
    >
      <p>
        Can we use analytics cookies to see which pages help people get a quote? They're off unless you accept.{" "}
        <Link to="/privacy-policy/" className="link">Privacy policy</Link>
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button type="button" className="btn border border-navy-900/15 !min-h-[44px] !py-2 text-navy-900" onClick={() => choose("denied")}>Reject</button>
        <button type="button" className="btn border border-navy-900/15 !min-h-[44px] !py-2 text-navy-900" onClick={() => choose("granted")}>Accept</button>
      </div>
    </section>
  );
}
