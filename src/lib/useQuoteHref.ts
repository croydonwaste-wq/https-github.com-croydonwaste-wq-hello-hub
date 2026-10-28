import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Where "Free quote" buttons should go. Prerendered HTML links to the contact form; once the
 * page is running, buttons point at a quote form on the *current* page instead (the short hero
 * form first), so visitors keep their place and the service they're reading about stays selected.
 */
export function useQuoteHref() {
  const { pathname } = useLocation();
  const [href, setHref] = useState("/contact/#quote");
  useEffect(() => {
    const id = ["quick-quote", "quote"].find((k) => document.getElementById(k));
    setHref(id ? `${pathname}#${id}` : "/contact/#quote");
  }, [pathname]);
  return href;
}
