import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { absoluteUrl, business, telHref } from "@/data/business";
import { services } from "@/data/services";
import { Icon } from "@/components/Icon";

/**
 * Quote form. Submits as a normal multipart POST (works before/without JavaScript and
 * supports photo attachments) to `business.formEndpoint` — the `send-quote` edge function
 * (supabase/functions/send-quote), which emails the enquiry via Resend, sends the customer
 * an automatic summary and redirects to /thank-you/. FormSubmit is the fallback.
 *
 * Layout follows the Guildford Rubbish Removal quote form:
 * - compact: two steps — (1) service, postcode, photos → (2) name, phone, email, note, date,
 *            consent. Sits in every page hero. Without JavaScript all fields show at once.
 * - full:    single step with load size, access, preferred date/time, details, photos and consent.
 * Email and consent are required so every customer gets the automatic summary email.
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

type ErrorKey = "name" | "phone" | "email" | "postcode" | "service" | "details" | "photos" | "consent";
type Errors = Partial<Record<ErrorKey, string>>;

const MAX_PHOTOS = 5;
/** Fields shown on step 1 of the two-step quick form. */
const STEP1: ErrorKey[] = ["service", "postcode", "photos"];

export function validateQuote(data: FormData, variant: Variant): Errors {
  const e: Errors = {};
  const v = (k: string) => String(data.get(k) ?? "").trim();
  if (!v("service")) e.service = "Please choose what you need.";
  if (!UK_POSTCODE.test(v("postcode"))) e.postcode = "Please enter your postcode, e.g. WD17 1AA.";
  const files = data.getAll("attachment").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > MAX_PHOTOS) e.photos = `Please choose up to ${MAX_PHOTOS} photos.`;
  else if (files.reduce((n, f) => n + f.size, 0) > MAX_PHOTO_BYTES) e.photos = "Photos are over 10MB in total — please choose fewer or smaller photos.";
  if (v("name").length < 2) e.name = "Please enter your name.";
  const digits = v("phone").replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 13) e.phone = "Please enter a phone number we can call you back on.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) e.email = "Please enter your email so we can send you a copy of your quote.";
  if (variant === "full" && v("details").length < 5) e.details = "Please tell us a little about what needs removing.";
  if (!data.get("consent")) e.consent = "Please tick to let us contact you about your quote.";
  return e;
}

export function QuoteForm({ variant = "full", defaultService = "", title }: { variant?: Variant; defaultService?: string; title?: string }) {
  const id = useId();
  const { pathname } = useLocation();
  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [photos, setPhotos] = useState<{ file: File; url: string }[]>([]);
  // Before hydration (or without JavaScript) every field shows and the browser validates;
  // once hydrated we add the two steps, photo previews and our own accessible messages.
  const [enhanced, setEnhanced] = useState(false);
  useEffect(() => setEnhanced(true), []);
  useEffect(() => () => photos.forEach((p) => URL.revokeObjectURL(p.url)), [photos]);

  const compact = variant === "compact";
  const stepped = compact && enhanced;
  const fid = (k: string) => `${id}-${k}`;

  const focusFirst = (e: Errors) => {
    const k = Object.keys(e)[0];
    if (k) setTimeout(() => document.getElementById(fid(k === "photos" ? "photo-btn" : k))?.focus(), 0);
  };

  /** Keep the real file input in sync with the preview list so the normal form POST carries the photos. */
  function syncFiles(list: File[]) {
    const input = fileRef.current;
    if (input) {
      const dt = new DataTransfer();
      list.forEach((f) => dt.items.add(f));
      input.files = dt.files;
    }
    setPhotos(list.map((file) => ({ file, url: URL.createObjectURL(file) })));
  }
  function onPhotosChosen(ev: ChangeEvent<HTMLInputElement>) {
    if (!enhanced) return;
    const added = Array.from(ev.target.files ?? []).filter((f) => f.type.startsWith("image/"));
    const merged = [...photos.map((p) => p.file), ...added].slice(0, MAX_PHOTOS);
    syncFiles(merged);
    setErrors((e) => ({ ...e, photos: added.length + photos.length > MAX_PHOTOS ? `Only the first ${MAX_PHOTOS} photos were kept.` : undefined }));
  }
  const removePhoto = (i: number) => syncFiles(photos.filter((_, n) => n !== i).map((p) => p.file));

  function next() {
    const all = validateQuote(new FormData(formRef.current!), variant);
    const e: Errors = Object.fromEntries(STEP1.filter((k) => all[k]).map((k) => [k, all[k]]));
    setErrors(e);
    if (Object.keys(e).length) return focusFirst(e);
    setStep(2);
    setTimeout(() => document.getElementById(fid("name"))?.focus(), 0);
  }

  function onSubmit(ev: FormEvent<HTMLFormElement>) {
    const e = validateQuote(new FormData(ev.currentTarget), variant);
    setErrors(e);
    if (Object.keys(e).length) {
      ev.preventDefault();
      if (stepped && STEP1.some((k) => e[k])) setStep(1);
      focusFirst(e);
      return;
    }
    setSending(true); // let the browser submit the form normally
  }

  const field =
    "mt-1 block w-full rounded-md border border-ink-200 bg-navy-50/60 px-3.5 py-3 text-base text-ink-900 shadow-sm placeholder:text-ink-500/70 focus:border-navy-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-600/30";
  const label = "text-xs font-semibold uppercase tracking-wider text-navy-900";
  const req = <span className="text-brick-500"> *</span>;
  const opt = <span className="font-normal normal-case tracking-normal text-ink-500"> (optional)</span>;
  const err = (k: ErrorKey) =>
    errors[k] ? <p id={fid(`${k}-err`)} className="mt-1 text-sm font-medium text-brick-600">{errors[k]}</p> : null;
  const aria = (k: ErrorKey) => ({ "aria-invalid": Boolean(errors[k]) || undefined, "aria-describedby": errors[k] ? fid(`${k}-err`) : undefined });
  const tel = telHref();
  const usesFormSubmit = business.formEndpoint.includes("formsubmit.co");
  const show = (n: 1 | 2) => (!stepped || step === n ? "" : "hidden");

  const photoPicker = (
    <div className={compact ? "" : "sm:col-span-2"}>
      <span className={label}>Photos{opt}</span>
      <input
        ref={fileRef}
        id={fid("attachment")}
        name="attachment"
        type="file"
        accept="image/*"
        multiple
        onChange={onPhotosChosen}
        className={enhanced ? "sr-only" : "mt-1 block w-full text-sm"}
        tabIndex={enhanced ? -1 : undefined}
        aria-hidden={enhanced || undefined}
      />
      {enhanced && (
        <button
          type="button"
          id={fid("photo-btn")}
          onClick={() => fileRef.current?.click()}
          disabled={photos.length >= MAX_PHOTOS}
          className={`mt-1 flex w-full items-center justify-center gap-2 rounded-md border-2 border-dashed border-navy-600/30 bg-navy-50 text-sm font-semibold text-navy-800 transition hover:border-navy-600 hover:bg-navy-100 disabled:opacity-60 ${compact ? "px-3 py-3" : "px-4 py-6"}`}
          {...aria("photos")}
        >
          <Icon name="camera" className="h-5 w-5" />
          {photos.length ? `Add more photos (${photos.length}/${MAX_PHOTOS})` : compact ? "Add photos — speeds up your quote" : "Click to add photos — up to 5 images"}
        </button>
      )}
      {photos.length > 0 && (
        <ul className="mt-2.5 flex flex-wrap gap-2.5">
          {photos.map((p, i) => (
            <li key={p.url} className="relative">
              <img src={p.url} alt={`Photo ${i + 1}`} className="h-16 w-16 rounded-md border border-ink-200 object-cover" />
              <button
                type="button"
                onClick={() => removePhoto(i)}
                aria-label={`Remove photo ${i + 1}`}
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-brick-500 text-sm font-bold leading-none text-white shadow"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
      {err("photos")}
    </div>
  );

  const consentBox = (
    <div className={compact ? "" : "sm:col-span-2"}>
      <label className="flex cursor-pointer items-start gap-2.5">
        <input
          id={fid("consent")}
          name="consent"
          type="checkbox"
          value="yes"
          required
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-ink-200 accent-brick-500"
          {...aria("consent")}
        />
        <span className="text-xs leading-snug text-ink-700">
          I agree to {business.name} contacting me about my quote and storing my details in line with the{" "}
          <Link to="/privacy-policy/" className="underline">privacy policy</Link>.{req}
        </span>
      </label>
      {err("consent")}
    </div>
  );

  const submitBtn = (
    <button type="submit" className={`btn-primary ${stepped ? "flex-1" : "w-full"}`} disabled={sending}>
      {sending ? "Sending…" : compact ? "Get my free quote" : "Send my quote request"}
    </button>
  );

  return (
    <form
      ref={formRef}
      action={business.formEndpoint}
      method="POST"
      encType="multipart/form-data"
      noValidate={enhanced}
      onSubmit={onSubmit}
      onChange={(ev) => {
        // Clear a field's error as soon as the visitor changes it.
        const name = (ev.target as HTMLInputElement).name;
        const k = (name === "attachment" ? "photos" : name) as ErrorKey;
        if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
      }}
      aria-label={title ?? "Request a free quote"}
      className={compact ? "grid gap-3" : "grid gap-4 sm:grid-cols-2"}
    >
      <input type="hidden" name="form" value={variant} />
      <input type="hidden" name="page" value={pathname} />
      {/* Settings used only by the FormSubmit fallback. */}
      {usesFormSubmit && (
        <>
          <input type="hidden" name="_subject" value={`${compact ? "Quick quote" : "Quote request"} – ${business.name} website`} />
          <input type="hidden" name="_next" value={absoluteUrl("/thank-you/")} />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_cc" value="info@croydonwaste.co.uk" />
          <input
            type="hidden"
            name="_autoresponse"
            value={`Thanks for your quote request with ${business.name}. A member of our team will be in contact in due course.${business.phone ? ` For same-day or urgent jobs call ${business.phone} – we're open 24/7.` : ""}`}
          />
        </>
      )}
      {/* Honeypot: real visitors never see or fill this. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={fid("honey")}>Leave this empty</label>
        <input id={fid("honey")} type="text" name="_honey" tabIndex={-1} autoComplete="off" />
      </div>

      {stepped && (
        <div>
          <div className="flex items-center justify-between text-[0.7rem] font-semibold uppercase tracking-wider text-ink-500">
            <span>{step === 1 ? "What needs clearing?" : "Where do we send your quote?"}</span>
            <span>Step {step}/2</span>
          </div>
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-ink-100" role="progressbar" aria-label="Quote form progress" aria-valuemin={1} aria-valuemax={2} aria-valuenow={step}>
            <div className="h-full rounded-full bg-brick-500 transition-all duration-300" style={{ width: step === 1 ? "50%" : "100%" }} />
          </div>
        </div>
      )}

      {compact ? (
        <>
          {/* Step 1 — the job */}
          <div className={`grid gap-3 ${show(1)}`}>
            <div>
              <label htmlFor={fid("service")} className={label}>Service{req}</label>
              <ServiceSelect id={fid("service")} className={field} defaultValue={defaultService} {...aria("service")} />
              {err("service")}
            </div>
            <div>
              <label htmlFor={fid("postcode")} className={label}>Collection postcode{req}</label>
              <input id={fid("postcode")} name="postcode" required autoComplete="postal-code" placeholder="e.g. WD17 1AA" className={`${field} uppercase placeholder:normal-case`} {...aria("postcode")} />
              {err("postcode")}
            </div>
            {photoPicker}
            {stepped && (
              <button type="button" onClick={next} className="btn-primary w-full">
                Next: your details <Icon name="arrow" className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Step 2 — the customer */}
          <div className={`grid gap-3 ${show(2)}`}>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor={fid("name")} className={label}>Name{req}</label>
                <input id={fid("name")} name="name" required maxLength={120} autoComplete="name" placeholder="Your name" className={field} {...aria("name")} />
                {err("name")}
              </div>
              <div>
                <label htmlFor={fid("phone")} className={label}>Phone{req}</label>
                <input id={fid("phone")} name="phone" type="tel" required inputMode="tel" autoComplete="tel" placeholder="07700 900123" className={field} {...aria("phone")} />
                {err("phone")}
              </div>
            </div>
            <div>
              <label htmlFor={fid("email")} className={label}>Email{req}</label>
              <input id={fid("email")} name="email" type="email" required maxLength={254} inputMode="email" autoComplete="email" placeholder="We'll email you a copy of your quote" className={field} {...aria("email")} />
              {err("email")}
            </div>
            <div>
              <label htmlFor={fid("details")} className={label}>What needs removing?{opt}</label>
              <input id={fid("details")} name="details" maxLength={4000} placeholder="e.g. sofa and 10 bags from a 1st-floor flat" className={field} />
            </div>
            <div>
              <label htmlFor={fid("date")} className={label}>Preferred date{opt}</label>
              <input id={fid("date")} name="preferred_date" type="date" className={field} />
            </div>
            {consentBox}
            <div className="flex gap-2">
              {stepped && (
                <button type="button" onClick={() => setStep(1)} className="btn border border-ink-200 bg-white px-4 text-navy-900 hover:bg-navy-50" aria-label="Back to step 1">
                  Back
                </button>
              )}
              {submitBtn}
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <label htmlFor={fid("name")} className={label}>Name{req}</label>
            <input id={fid("name")} name="name" required maxLength={120} autoComplete="name" placeholder="Your name" className={field} {...aria("name")} />
            {err("name")}
          </div>
          <div>
            <label htmlFor={fid("phone")} className={label}>Phone{req}</label>
            <input id={fid("phone")} name="phone" type="tel" required inputMode="tel" autoComplete="tel" placeholder="07700 900123" className={field} {...aria("phone")} />
            {err("phone")}
          </div>
          <div>
            <label htmlFor={fid("email")} className={label}>Email{req}</label>
            <input id={fid("email")} name="email" type="email" required maxLength={254} inputMode="email" autoComplete="email" placeholder="For your written quote" className={field} {...aria("email")} />
            {err("email")}
          </div>
          <div>
            <label htmlFor={fid("postcode")} className={label}>Collection postcode{req}</label>
            <input id={fid("postcode")} name="postcode" required autoComplete="postal-code" placeholder="e.g. WD17 1AA" className={`${field} uppercase placeholder:normal-case`} {...aria("postcode")} />
            {err("postcode")}
          </div>
          <div>
            <label htmlFor={fid("service")} className={label}>Service required{req}</label>
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
            <label htmlFor={fid("date")} className={label}>Preferred date{opt}</label>
            <input id={fid("date")} name="preferred_date" type="date" className={field} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={fid("time")} className={label}>Preferred time</label>
            <select id={fid("time")} name="preferred_time" className={field} defaultValue="">
              <option value="">Choose a time…</option>
              {timeOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={fid("details")} className={label}>What needs removing?{req}</label>
            <textarea
              id={fid("details")}
              name="details"
              rows={4}
              required
              maxLength={4000}
              placeholder="List the items or describe the load, plus any access notes (stairs, parking, gates)."
              className={field}
              {...aria("details")}
            />
            {err("details")}
          </div>
          {photoPicker}
          {consentBox}
          <div className="sm:col-span-2">{submitBtn}</div>
        </>
      )}

      <p className={`text-xs leading-relaxed text-ink-500 ${compact ? "" : "sm:col-span-2"}`}>
        We'll never share your details.
        {tel && <> Prefer to talk? Call <a href={tel} className="font-semibold text-navy-800 underline">{business.phone}</a>, 24/7.</>}
      </p>
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
