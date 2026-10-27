import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { business, mailtoHref } from "@/data/business";
import { services } from "@/data/services";

type Fields = {
  name: string;
  phone: string;
  email: string;
  postcode: string;
  service: string;
  details: string;
  date: string;
  consent: boolean;
  website: string; // honeypot
};

const empty: Fields = { name: "", phone: "", email: "", postcode: "", service: "", details: "", date: "", consent: false, website: "" };

const UK_POSTCODE = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;
const UK_POSTCODE_DISTRICT = /^[A-Z]{1,2}\d[A-Z\d]?$/i;

export function validate(f: Fields) {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (f.name.trim().length < 2) e.name = "Please enter your name.";
  const digits = f.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 13) e.phone = "Please enter a UK phone number we can call you back on.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Please enter a valid email address.";
  const pc = f.postcode.trim();
  if (!UK_POSTCODE.test(pc) && !UK_POSTCODE_DISTRICT.test(pc)) e.postcode = "Please enter your postcode, e.g. WD17 1AA or WD17.";
  if (!f.service) e.service = "Please choose a service.";
  if (f.details.trim().length < 10) e.details = "Please tell us a little about what needs removing.";
  if (!f.consent) e.consent = "Please confirm we can contact you about your quote.";
  return e;
}

type Status = "idle" | "sending" | "sent" | "error" | "fallback";

export function QuoteForm({ defaultService = "" }: { defaultService?: string }) {
  const [f, setF] = useState<Fields>({ ...empty, service: defaultService });
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [startedAt] = useState(() => Date.now());

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => setF((p) => ({ ...p, [k]: v }));

  const summary = () =>
    [
      `Name: ${f.name}`,
      `Phone: ${f.phone}`,
      `Email: ${f.email}`,
      `Postcode: ${f.postcode.toUpperCase()}`,
      `Service: ${f.service}`,
      `Preferred date: ${f.date || "Flexible"}`,
      "",
      f.details,
    ].join("\n");

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e = validate(f);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = document.getElementById(`q-${Object.keys(e)[0]}`);
      first?.focus();
      return;
    }
    // Spam protection: honeypot field and minimum fill time.
    if (f.website || Date.now() - startedAt < 3000) {
      setStatus("sent");
      return;
    }
    if (!business.formEndpoint) {
      // No backend configured: hand off to the visitor's email app rather than pretend to send.
      setStatus("fallback");
      window.location.href = mailtoHref(`Quote request: ${f.service} (${f.postcode.toUpperCase()})`, summary());
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(business.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...f, website: undefined, _subject: `Quote request: ${f.service}`, source: window.location.pathname }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      setF({ ...empty });
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-xl border border-navy-100 bg-navy-50 p-6">
        <h3 className="font-display text-xl font-bold text-navy-900">Thanks — your request has been sent</h3>
        <p className="mt-2 text-ink-700">We'll be in touch to discuss your quote. If you have photos of the items, email them to <a className="link" href={mailtoHref("Photos for my quote")}>{business.email}</a> to speed things up.</p>
      </div>
    );
  }

  const field = "mt-1.5 block w-full rounded-lg border border-ink-200 bg-white px-3.5 py-3 text-base text-ink-900 shadow-sm focus:border-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-600/30";
  const err = (k: keyof Fields) =>
    errors[k] ? (
      <p id={`q-${k}-err`} className="mt-1 text-sm font-medium text-brick-600">{errors[k]}</p>
    ) : null;
  const aria = (k: keyof Fields) => ({ "aria-invalid": Boolean(errors[k]) || undefined, "aria-describedby": errors[k] ? `q-${k}-err` : undefined });

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2" aria-label="Request a free quote">
      <div>
        <label htmlFor="q-name" className="font-semibold text-navy-900">Your name</label>
        <input id="q-name" name="name" autoComplete="name" className={field} value={f.name} onChange={(e) => set("name", e.target.value)} {...aria("name")} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="q-phone" className="font-semibold text-navy-900">Phone number</label>
        <input id="q-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" className={field} value={f.phone} onChange={(e) => set("phone", e.target.value)} {...aria("phone")} />
        {err("phone")}
      </div>
      <div>
        <label htmlFor="q-email" className="font-semibold text-navy-900">Email</label>
        <input id="q-email" name="email" type="email" autoComplete="email" className={field} value={f.email} onChange={(e) => set("email", e.target.value)} {...aria("email")} />
        {err("email")}
      </div>
      <div>
        <label htmlFor="q-postcode" className="font-semibold text-navy-900">Postcode</label>
        <input id="q-postcode" name="postcode" autoComplete="postal-code" className={`${field} uppercase`} value={f.postcode} onChange={(e) => set("postcode", e.target.value)} {...aria("postcode")} />
        {err("postcode")}
      </div>
      <div>
        <label htmlFor="q-service" className="font-semibold text-navy-900">What do you need?</label>
        <select id="q-service" name="service" className={field} value={f.service} onChange={(e) => set("service", e.target.value)} {...aria("service")}>
          <option value="">Choose a service…</option>
          <option value="Rubbish removal (general)">Rubbish removal (general)</option>
          {services.map((s) => (
            <option key={s.slug} value={s.name}>{s.name}</option>
          ))}
          <option value="Something else">Something else</option>
        </select>
        {err("service")}
      </div>
      <div>
        <label htmlFor="q-date" className="font-semibold text-navy-900">Preferred date <span className="font-normal text-ink-500">(optional)</span></label>
        <input id="q-date" name="date" type="date" className={field} value={f.date} onChange={(e) => set("date", e.target.value)} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="q-details" className="font-semibold text-navy-900">What needs removing?</label>
        <p id="q-details-hint" className="text-sm text-ink-500">Rough list of items or amount, where they are (e.g. upstairs, loft, garden) and any access issues such as stairs or parking.</p>
        <textarea id="q-details" name="details" rows={5} className={field} value={f.details} onChange={(e) => set("details", e.target.value)} {...aria("details")} />
        {err("details")}
      </div>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="q-website">Leave this field empty</label>
        <input id="q-website" name="website" tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => set("website", e.target.value)} />
      </div>
      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-sm text-ink-700">
          <input id="q-consent" type="checkbox" className="mt-0.5 h-5 w-5 rounded border-ink-200 accent-navy-700" checked={f.consent} onChange={(e) => set("consent", e.target.checked)} {...aria("consent")} />
          <span>
            I agree that {business.name} can use these details to respond to my quote request, as described in the <Link to="/privacy-policy/" className="link">privacy policy</Link>.
          </span>
        </label>
        {err("consent")}
      </div>
      <div className="sm:col-span-2">
        <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Request my free quote"}
        </button>
        {status === "error" && (
          <p role="alert" className="mt-3 text-sm font-medium text-brick-600">
            Sorry, something went wrong sending your request. Please email <a className="link" href={mailtoHref("Quote request", summary())}>{business.email}</a> instead.
          </p>
        )}
        {status === "fallback" && (
          <p role="status" className="mt-3 text-sm text-ink-700">
            Your email app should have opened with your details filled in — just press send. If nothing happened, email <a className="link" href={mailtoHref("Quote request", summary())}>{business.email}</a>.
          </p>
        )}
        <p className="mt-3 text-sm text-ink-500">Photos help us quote accurately — you can attach them to your email reply.</p>
      </div>
    </form>
  );
}
