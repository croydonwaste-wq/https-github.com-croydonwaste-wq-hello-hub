import { Link } from "react-router-dom";
import { business, telHref, whatsappHref, mailtoHref } from "@/data/business";
import { useQuoteHref } from "@/lib/useQuoteHref";
import { Icon } from "./Icon";

type Props = { context?: string; tone?: "light" | "dark"; className?: string; placement?: string };

/**
 * Primary conversion buttons. Call / WhatsApp only render once a verified number
 * exists in business.ts — the quote form is always available.
 */
export function ContactButtons({ context = "a rubbish clearance", tone = "light", className = "", placement = "content" }: Props) {
  const tel = telHref();
  const wa = whatsappHref(`Hello, I'd like a quote for ${context}. My postcode is: `);
  const quoteHref = useQuoteHref();
  const ghost =
    tone === "dark"
      ? "border-white/30 text-white hover:bg-white/10"
      : "border-navy-900/15 text-navy-900 hover:bg-navy-50";
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <Link to={quoteHref} className="btn-primary" data-cta={`quote-${placement}`}>
        Get a free quote <Icon name="arrow" className="h-5 w-5" />
      </Link>
      {tel && (
        <a href={tel} className={`btn border ${ghost}`} data-cta={`call-${placement}`}>
          <Icon name="phone" className="h-5 w-5" /> Call {business.phone}
        </a>
      )}
      {wa && (
        <a href={wa} className={`btn border ${ghost}`} target="_blank" rel="noopener" data-cta={`whatsapp-${placement}`}>
          <Icon name="whatsapp" className="h-5 w-5" /> WhatsApp photos
        </a>
      )}
      {!tel && !wa && (
        <a href={mailtoHref(`Quote request: ${context}`)} className={`btn border ${ghost}`} data-cta={`email-${placement}`}>
          <Icon name="mail" className="h-5 w-5" /> Email us
        </a>
      )}
    </div>
  );
}
