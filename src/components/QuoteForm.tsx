import { useEffect, useId, useState, type FormEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { absoluteUrl, business, telHref } from "@/data/business";
import { services } from "@/data/services";

/**
 * Quote form. Submits as a normal multipart POST (works before/without JavaScript and
 * supports photo attachments) to `business.formEndpoint` — FormSubmit by default, which
 * emails each enquiry to the business inbox and redirects to /thank-you/.
 *
 * - compact: name, phone, postcode, service, short note — sits in every page hero.
 * - full:    adds email, load size, access, preferred date/time, details and photos.
 */
type Variant = "compact" | "full";

const UK_POSTCODE = /^[A-Z]{1,2}\d[A-Z\d]?(\s*\d[A-Z]{2})?$/i;
const MAX_PHOTO_BYTES = 10 * 1024 * 1024;

export const loadSizes = [
  "Single item",
  "A few items / small load",
  "Quarter van load",
  "Half van load",
  "Three-quarter van load",
  "Full van load",
  "More than one van load",
  "Not sure – I'll send photos",
];

export const accessOptions = [
  "Ground floor / outside",
  "Upstairs – lift available",
  "Upstairs – no lift",
  "Loft or basement",
  "Garden, shed or garage",
  "Mixed / several areas",
];

export const timeOptions = ["As soon as possible (same day)", "Morning", "Afternoon", "Evening", "Overnight / out of hours", "Flexible"];

type Errors = Partial<Record<"name" | "phone" | "email" | "postcode" | "service" | "details" | "photos", string>>;

export function validateQuote(data: FormData, variant: Variant): Errors {
  const e: Errors = {};
  const v = (k: string) => String(data.get(k) ?? "").trim();
  if (v("name").length < 2) e.name = "Please enter your name.";
  const digits = v("phone").replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 13) e.phone = "Please enter a phone number we can call you back on.";
  if (!UK_POSTCODE.test(v("postcode"))) e.postcode = "Please enter your postcode, e.g. WD17 1AA.";
  if (!v("service")) e.service = "Please choose what you need.";
  if (variant === "full") {
    const email = v("email");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Please check your email address.";
    if (v("details").length < 5) e.details = "Please tell us a little about what needs removing.";
    const files = data.getAll("attachment").filter((f): f is File => f instanceof File && f.size > 0);
    if (files.reduce((n, f) => n + f.size, 0) > MAX_PHOTO_BYTES) e.photos = "Photos are over 10MB in total — please choose fewer or smaller photos.";
  }
  return e;
}

export function QuoteForm({ variant = "full", defaultService = "", title }: { variant?: Variant; defaultService?: string; title?: string }) {
  const id = useId();
  const { pathname } = useLocation();
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  // Native browser validation until hydrated, then our own accessible messages.
  const [enhanced, setEnhanced] = useState(false);
  useEffect(() => setEnhanced(true), []);

  const compact = variant === "compact";
  const fid = (k: string) => `${id}-${k}`;

  function onSubmit(ev: FormEvent<HTMLFormElement>) {
    const e = validateQuote(new FormData(ev.currentTarget), variant);
    setErrors(e);
    if (Object.keys(e).length) {
      ev.preventDefault();
      const firstKey = Object.keys(e)[0];
      document.getElementById(fid(firstKey === "photos" ? "attachment" : firstKey))?.focus();
      return;
    }
    setSending(true); // let the browser submit the form normally
  }

  const field =
    "mt-1 block w-full rounded-md border border-ink-200 bg-white px-3.5 py-3 text-base text-ink-900 shadow-sm placeholder:text-ink-500/70 focus:border-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-600/30";
  const label = "text-sm font-semibold text-navy-900";
  const err = (k: keyof Errors) =>
    errors[k] ? <p id={fid(`${k}-err`)} className="mt-1 text-sm font-medium text-brick-600">{errors[k]}</p> : null;
  const aria = (k: keyof Errors) => ({ "aria-invalid": Boolean(errors[k]) || undefined, "aria-describedby": errors[k] ? fid(`${k}-err`) : undefined });
  const tel = telHref();

  return (
    <form
      action={business.formEndpoint}
      method="POST"
      encType="multipart/form-data"
      noValidate={enhanced}
      onSubmit={onSubmit}
      aria-label={title ?? "Request a free quote"}
      className={compact ? "grid gap-3" : "grid gap-4 sm:grid-cols-2"}
    >
      {/* FormSubmit settings */}
      <input type="hidden" name="_subject" value={`${compact ? "Quick quote" : "Quote request"} – ${business.name} website`} />
      <input type="hidden" name="_next" value={absoluteUrl("/thank-you/")} />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      {!compact && (
        <input
          type="hidden"
          name="_autoresponse"
          value={`Thanks for your quote request with ${business.name}. We'll be in touch shortly with a price.${business.phone ? ` For same-day or urgent jobs call ${business.phone} – we're open 24/7.` : ""}`}
        />
      )}
      <input type="hidden" name="page" value={pathname} />
      {/* Honeypot: real visitors never see or fill this. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={fid("honey")}>Leave this empty</label>
        <input id={fid("honey")} type="text" name="_honey" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor={fid("name")} className={label}>Name</label>
        <input id={fid("name")} name="name" required autoComplete="name" placeholder="Your name" className={field} {...aria("name")} />
        {err("name")}
      </div>
      <div>
        <label htmlFor={fid("phone")} className={label}>Phone</label>
        <input id={fid("phone")} name="phone" type="tel" required inputMode="tel" autoComplete="tel" placeholder="Best number to call" className={field} {...aria("phone")} />
        {err("phone")}
      </div>
      {!compact && (
        <div>
          <label htmlFor={fid("email")} className={label}>Email <span className="font-normal text-ink-500">(optional)</span></label>
          <input id={fid("email")} name="email" type="email" autoComplete="email" placeholder="For your written quote" className={field} {...aria("email")} />
          {err("email")}
        </div>
      )}
      <div className={compact ? "grid grid-cols-2 gap-3" : ""}>
        <div>
          <label htmlFor={fid("postcode")} className={label}>Postcode</label>
          <input id={fid("postcode")} name="postcode" required autoComplete="postal-code" placeholder="e.g. WD17 1AA" className={`${field} uppercase placeholder:normal-case`} {...aria("postcode")} />
          {err("postcode")}
        </div>
        {compact && (
          <div>
            <label htmlFor={fid("service")} className={label}>Service</label>
            <ServiceSelect id={fid("service")} className={field} defaultValue={defaultService} {...aria("service")} />
            {err("service")}
          </div>
        )}
      </div>
      {!compact && (
        <>
          <div>
            <label htmlFor={fid("service")} className={label}>Service required</label>
            <ServiceSelect id={fid("service")} className={field} defaultValue={defaultService} {...aria("service")} />
            {err("service")}
          </div>
          <div>
            <label htmlFor={fid("load")} className={label}>Roughly how much?</label>
            <select id={fid("load")} name="load_size" className={field} defaultValue="">
              <option value="">Choose a load size…</option>
              {loadSizes.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor={fid("access")} className={label}>Where is it?</label>
            <select id={fid("access")} name="access" className={field} defaultValue="">
              <option value="">Choose location / access…</option>
              {accessOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor={fid("date")} className={label}>Preferred date <span className="font-normal text-ink-500">(optional)</span></label>
            <input id={fid("date")} name="preferred_date" type="date" className={field} />
          </div>
          <div>
            <label htmlFor={fid("time")} className={label}>Preferred time</label>
            <select id={fid("time")} name="preferred_time" className={field} defaultValue="">
              <option value="">Choose a time…</option>
              {timeOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        </>
      )}
      <div className={compact ? "" : "sm:col-span-2"}>
        <label htmlFor={fid("details")} className={label}>
          {compact ? <>What needs removing? <span className="font-normal text-ink-500">(optional)</span></> : "What needs removing?"}
        </label>
        <textarea
          id={fid("details")}
          name="details"
          rows={compact ? 2 : 4}
          required={!compact}
          placeholder={compact ? "e.g. sofa and 10 bags from a 1st-floor flat" : "List the items or describe the load, plus any access notes (stairs, parking, gates)."}
          className={field}
          {...aria("details")}
        />
        {err("details")}
      </div>
      {!compact && (
        <div className="sm:col-span-2">
          <label htmlFor={fid("attachment")} className={label}>Photos <span className="font-normal text-ink-500">(optional — speeds up your quote)</span></label>
          <input
            id={fid("attachment")}
            name="attachment"
            type="file"
            accept="image/*"
            multiple
            className="mt-1 block w-full rounded-lg border border-dashed border-navy-600/40 bg-navy-50 px-3.5 py-3 text-sm text-ink-700 file:mr-3 file:rounded-md file:border-0 file:bg-navy-800 file:px-3 file:py-2 file:font-semibold file:text-white"
            {...aria("photos")}
          />
          {err("photos")}
        </div>
      )}
      <div className={compact ? "" : "sm:col-span-2"}>
        <button type="submit" className="btn-primary w-full" disabled={sending}>
          {sending ? "Sending…" : compact ? "Get my free quote" : "Send my quote request"}
        </button>
        <p className="mt-2 text-xs leading-relaxed text-ink-500">
          We'll only use your details to reply to your enquiry — see our <Link to="/privacy-policy/" className="underline">privacy policy</Link>.
          {tel && compact && (
            <> Prefer to talk? Call <a href={tel} className="font-semibold text-navy-800 underline">{business.phone}</a>, 24/7.</>
          )}
        </p>
      </div>
    </form>
  );
}

function ServiceSelect({ id, className, defaultValue, ...rest }: { id: string; className: string; defaultValue: string } & Record<string, unknown>) {
  return (
    <select id={id} name="service" required className={className} defaultValue={defaultValue} {...rest}>
      <option value="">Choose…</option>
      <option value="Rubbish removal (general)">Rubbish removal (general)</option>
      {services.map((s) => <option key={s.slug} value={s.name}>{s.name}</option>)}
      <option value="Something else">Something else</option>
    </select>
  );
}

/** Card wrapper used in page heroes so every page has a quote form above the fold. */
export function QuickQuoteCard({ defaultService = "", heading = "Get a free quote" }: { defaultService?: string; heading?: string }) {
  return (
    <div className="overflow-hidden rounded-lg bg-white text-ink-900 shadow-[0_24px_60px_-20px_rgba(0,0,0,.45)] ring-1 ring-black/5">
      <div className="h-1 bg-brick-500" />
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-display text-[1.2rem] font-bold tracking-tight text-navy-900">{heading}</h2>
          {business.sameDay && <span className="mt-0.5 whitespace-nowrap rounded-sm border border-navy-200 bg-navy-50 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-navy-700">Same-day</span>}
        </div>
        <p className="mt-1 text-sm text-ink-500">Tell us what's going — we'll call you back with a price.</p>
        <div className="mt-4"><QuoteForm variant="compact" defaultService={defaultService} title={heading} /></div>
      </div>
    </div>
  );
}
