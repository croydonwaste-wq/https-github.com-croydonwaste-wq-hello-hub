import { Link } from "react-router-dom";
import { business, telHref, whatsappHref, mailtoHref } from "@/data/business";
import { Icon } from "./Icon";

type Props = { context?: string; tone?: "light" | "dark"; className?: string };

/**
 * Primary conversion buttons. Call / WhatsApp only render once a verified number
 * exists in business.ts — the quote form is always available.
 */
export function ContactButtons({ context = "a rubbish clearance", tone = "light", className = "" }: Props) {
  const tel = telHref();
  const wa = whatsappHref(`Hi, I'd like a quote for ${context}. My postcode is: `);
  const ghost =
    tone === "dark"
      ? "border-white/30 text-white hover:bg-white/10"
      : "border-navy-900/15 text-navy-900 hover:bg-navy-50";
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <Link to="/contact/#quote" className="btn-primary">
        Get a free quote <Icon name="arrow" className="h-5 w-5" />
      </Link>
      {tel && (
        <a href={tel} className={`btn border ${ghost}`} data-cta="call">
          <Icon name="phone" className="h-5 w-5" /> Call {business.phone}
        </a>
      )}
      {wa && (
        <a href={wa} className={`btn border ${ghost}`} target="_blank" rel="noopener" data-cta="whatsapp">
          <Icon name="whatsapp" className="h-5 w-5" /> WhatsApp photos
        </a>
      )}
      {!tel && !wa && (
        <a href={mailtoHref(`Quote request: ${context}`)} className={`btn border ${ghost}`} data-cta="email">
          <Icon name="mail" className="h-5 w-5" /> Email us
        </a>
      )}
    </div>
  );
}
