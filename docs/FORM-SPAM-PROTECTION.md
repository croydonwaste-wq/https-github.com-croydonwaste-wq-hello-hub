# Quote form spam protection

**Date:** 16 November 2026 · **Branch:** `claude/contact-form-anti-spam-va3ip4`

This branch was behind `main`, the version the live site runs: the live form posts to the `send-quote` Supabase Edge Function, which only exists on `main`. `main` was merged in first so the protection is built on the deployed code. The only conflict was the homepage title; `main`'s shorter title was kept.

---

## 1. Audit (before changes)

### Forms and endpoints found

| Form | Where | Fields | Submits to |
|---|---|---|---|
| Quick quote (compact, two steps) | Hero of every page except legal / thank-you (`QuickQuoteCard` in `blocks.tsx`, `Home.tsx`) | service, postcode, photos → name, phone, email, note, date, consent | `send-quote` edge function |
| Full quote form | Home, every service page, every location page, pricing, contact | adds load size, access, date/time, details, photos | `send-quote` edge function |
| FormSubmit fallback | Same forms, only if the build has no `VITE_SUPABASE_URL` | same | formsubmit.co (its own captcha switched off by `_captcha=false`) |

There are no other forms, booking widgets, callback forms or API routes. Footer and mobile CTAs are `tel:` / `mailto:` links or point to these forms. Both form variants are one React component (`src/components/QuoteForm.tsx`) and one endpoint, so protecting that endpoint protects every page.

### Findings

| # | Check | Before | Risk |
|---|---|---|---|
| 1 | Server validation | Only name ≥ 2 characters and phone ≥ 10 digits. Email, postcode, service and consent weren't checked on the server | Medium |
| 2 | Spam protection | Honeypot (`_honey`) checked on the server: the only layer | High |
| 3 | Rate limiting | None | High |
| 4 | CAPTCHA / bot detection | None | High |
| 5 | Direct API bypass | The endpoint is public (it has to be). Every browser-side check could be skipped by posting directly | High |
| 6 | Origin / CORS | `Access-Control-Allow-Origin: *`, no origin check | Medium |
| 7 | Payload limits | Whole body parsed with no size cap. The 10MB photo limit only applied after parsing. **Any file type** was attached to the business email (malware route) | Medium |
| 8 | Email relay abuse | An auto-reply went to whatever email address was entered, echoing the name and message. The form could be used to send branded emails with attacker-supplied text to strangers | Medium |
| 9 | Header injection | Resend's JSON API means no raw SMTP headers. The subject still carried unfiltered name/service text | Low |
| 10 | HTML injection in emails | Every value was already HTML-escaped ✔ | — |
| 11 | Duplicates / monitoring | No duplicate detection; no stats beyond function logs | Low |
| 12 | Error detail | Error codes such as `resend_key_invalid` are shown to visitors. Kept, because they were added deliberately to diagnose set-up problems, but worth removing once email is stable | Low |

---

## 2. What was implemented

Every check runs on the server in `supabase/functions/send-quote/handler.ts`, so direct API calls get exactly the same treatment as the website.

```
POST → method / content type / origin / size limit
     → honeypot ............. fake success, nothing sent
     → rate limit ........... 429 + "please wait or call"
     → Cloudflare Turnstile .. 403 + "try again" (when configured)
     → field validation ..... 400 + the fields to fix
     → duplicate check ...... already delivered: success, not re-sent
     → spam score ........... low: deliver · medium: deliver flagged · high: hold for review
```

| Layer | Files | Details |
|---|---|---|
| Request hardening | `handler.ts` | POST only. multipart or url-encoded only (else 415). Body capped at 12MB **while reading** (413). Origin must be the site, a Lovable preview or localhost (403 otherwise). CORS echoes only allowed origins. No-JS redirects can never point off-site. |
| Honeypot | `QuoteForm.tsx`, `handler.ts` | Existing `_honey` field kept (it worked). Hidden with `display:none` + `aria-hidden` + `tabIndex=-1`, so screen readers, keyboards and autofill skip it. The server discards filled ones with a fake success. |
| Rate limiting | `store.ts`, migration | Per hashed IP: **3 per 10 minutes, 10 per hour** (configurable). Shared Postgres store with an advisory lock (verified exact under 10 concurrent requests). |
| Turnstile | `turnstile.ts` (server), `src/lib/turnstile.ts` (browser) | Invisible (`interaction-only`), loaded only on first interaction with a form. Server-side Siteverify rejects missing, invalid, expired, reused, wrong-hostname and wrong-action tokens. A failed attempt resets the widget so the visitor can retry without losing what they typed. If Cloudflare itself is down, customers aren't blocked. **Off until keys are set** (see §3). |
| Timing | `QuoteForm.tsx`, `spam.ts` | The browser sends the milliseconds since the form became usable. Under 1.5s adds 4 points, under 4s adds 2, missing adds 1. A risk signal only; never rejects by itself. |
| Validation | `validate.ts` (shared by browser and server) | International names (any alphabet, apostrophes, hyphens), no links or markup. UK and international phone formats, including `+44 (0)…` and numbers missing the leading 0; rejects `0000000000` and `0123456789`. Strict email structure. UK postcode. Service, consent, details for the full form. All single-line fields are stripped of CR/LF/control characters (header injection). The browser now uses the same functions, so it can't accept what the server rejects. |
| Spam score | `spam.ts` | See the table below. |
| Duplicates | `handler.ts`, migration | A keyed hash of contact details plus normalised message. The same enquiry delivered in the last 30 minutes isn't emailed again, but the customer still sees success. Changed details go through. Nothing is remembered for a failed send, so retries work. The same message text from 2+ other connections in 24h counts as a bulk campaign. |
| Photos | `handler.ts` | Max 5 files and 10MB in total. Each file's first bytes must be JPEG, PNG, GIF, WebP, HEIC or AVIF; other files are dropped and the email says so. Filenames are sanitised. |
| Relay abuse | `email.ts` | Auto-replies only for low-risk enquiries. Links in the message are never echoed back to the customer. |
| Monitoring | migration | `form_events` (no personal data), `form_daily_stats` view, `form_quarantine` review queue. Structured JSON logs without personal data. |

### Spam scoring (`supabase/functions/send-quote/spam.ts`)

| Signal | Points |
|---|---|
| 1 link / 2 links / 3+ links in the message | 1 / 3 / 6 |
| `[url=` or `<a href` markup | 6 |
| Link-seller phrases (backlinks, guest posts, "first page of Google", DA 50…) | 5 |
| "SEO services/agency" alone (SEO firms need clearances too) | 2 |
| Sales templates ("I came across your website", "more leads for your business", "reply STOP"…) | 3 |
| Crypto / investment scams | 5 |
| Business loans / funding offers | 4 |
| Adult / pharma / gambling | 6 |
| Each extra distinct phrase from the same group | +2 (max +4) |
| Repeated characters, very low letter variety, all caps, mostly Cyrillic, message = name | 1–3 |
| Bot-style names (`JqKzLwPd`, several digits) | 2–3 |
| Disposable email domain | 3 |
| Submitted in under 1.5s / under 4s / no timing (posted without the page's JavaScript) | 4 / 2 / 1 (3 in strict mode) |
| No Origin or Referer header (scripted) | 2 |
| Turnstile failed (monitor mode only) | 6 |
| Same text from other connections: 1 / 2+ | 2 / 5 |

**Thresholds:** under 5 = **low**; 5–9 = **medium**; 10+ = **high** (`SPAM_MEDIUM_THRESHOLD`, `SPAM_HIGH_THRESHOLD`).

- **Low:** delivered exactly as before (to, CC, BCC, auto-reply).
- **Medium:** **strict mode (the default, chosen by the owner)** holds these for review exactly like high-risk ones. With `FORM_STRICT=false` (balanced), they're delivered with the subject `[Possible spam – please check]` and a note listing the reasons, to `QUOTE_REVIEW_EMAIL` if set, otherwise to the main inbox with the usual copies, and with no auto-reply.
- **High:** not emailed. Saved to `form_quarantine` for 30 days and the sender sees normal success. **Safety net:** if the queue can't be saved (database down or migration not applied), it's emailed flagged instead, without CC/BCC, so a misjudged genuine enquiry is never lost.

No single ordinary signal reaches medium. One link, the word "SEO", an autofilled form or JavaScript being off all stay low.

**Strict mode trade-off:** a script posting straight to the function (no page JavaScript and no Origin header) now reaches 5 and is held, even with clean content. A real visitor with JavaScript off still sends an Origin header and stays low (tested). A genuine customer who trips two weak signals, for example "I came across your website" plus a very fast submit, may be held; check `form_quarantine` weekly. Set `FORM_STRICT=false` to go back to balanced.

---

## 3. Set-up required (owner)

Nothing below needs a code change. Until steps 1–2 are done, the new function still works: it falls back to per-instance memory, so rate limits are per server instance and high-risk spam arrives flagged rather than held back.

1. **Apply the database migration** `supabase/migrations/20261116190000_form_protection.sql`. In Lovable, ask the Lovable agent to run this migration, or paste it into Cloud → SQL editor. With the Supabase CLI, run `supabase db push`. It's safe to run more than once.
2. **Deploy the function.** Lovable redeploys edge functions when it syncs this repo; with the CLI, run `supabase functions deploy send-quote`. `verify_jwt = false` in `supabase/config.toml` must stay.
3. **Cloudflare Turnstile** (free):
   1. Cloudflare dashboard → Turnstile → Add widget. Mode: **Managed**. Hostnames: `www.watfordrubbishclearance.co.uk`, `watfordrubbishclearance.co.uk`. Add the Lovable preview domain if you test there.
   2. Put the **site key** (public) in the frontend build as `VITE_TURNSTILE_SITE_KEY` and deploy the site.
   3. **Then** add the **secret key** as the function secret `TURNSTILE_SECRET_KEY`. Do it in this order: setting the secret before the site sends tokens would reject every enquiry. Optional: start with `TURNSTILE_MODE=monitor` for a week (failures are scored, not rejected), then remove it.
   4. Never commit the secret key. Keep it in Lovable Cloud → Secrets only.
4. **Optional secrets:**
   - `FORM_STRICT`: `false` switches to balanced mode (borderline enquiries delivered with a warning instead of held).
   - `QUOTE_REVIEW_EMAIL`: separate inbox for "possible spam" (balanced mode, and the fallback when the review queue can't be saved).
   - `FORM_HASH_SALT`: any long random string; defaults to the service key.
   - `RATE_LIMIT_SHORT_MAX` (3), `RATE_LIMIT_SHORT_WINDOW_SEC` (600), `RATE_LIMIT_LONG_MAX` (10), `RATE_LIMIT_LONG_WINDOW_SEC` (3600), `DUPLICATE_WINDOW_SEC` (1800), `BULK_WINDOW_SEC` (86400), `SPAM_MEDIUM_THRESHOLD` (5), `SPAM_HIGH_THRESHOLD` (10), `FORM_ALLOWED_ORIGINS`, `TURNSTILE_HOSTNAMES`, `FORM_MAX_BODY_BYTES`.
5. **After deploying:** send one real enquiry from the live site (phone and desktop) and confirm it arrives with its copies and the auto-reply.

### Reviewing held enquiries and tuning

- **Held messages:** Cloud → Database → `form_quarantine`, newest first. If one is genuine, contact the customer and set `review_status` to `genuine` (it then counts as a false positive in the stats). Otherwise set it to `spam`. Check weekly.
- **Stats:** `select * from form_daily_stats;` shows daily attempts, delivered, flagged, held, honeypot, rate-limited, Turnstile failures, invalid, duplicates and false positives.
- **Tuning:** if genuine enquiries are being flagged, raise the thresholds or look at which `reasons` fire in `form_events`. If spam gets through, lower them. Review after 2–4 weeks of real traffic.
- **Shared networks:** 3 enquiries in 10 minutes from one IP is plenty for an office or a mobile network. If an enquiry is rate-limited, the customer is told to wait a few minutes or call.

### Privacy (UK GDPR)

| Data | Stored as | Kept |
|---|---|---|
| IP address | Keyed one-way hash only | 1 day |
| Message text | Hash only | 2 days |
| Event log | Outcome, score, reasons, form type, page path: no personal data | 180 days |
| Held enquiries | Full details (no photos) | 30 days |

Deletion is automatic, on every submission. None of these tables or functions can be read or called with the public website key: RLS is on and grants are revoked (verified against Postgres with Supabase's roles). The privacy policy now has a section describing this and Turnstile.

---

## 4. Testing

`npm run test:forms` runs 44 tests against the real handler code. Three of them call **Cloudflare's live Siteverify** with Cloudflare's official test secrets; set `SKIP_LIVE_TURNSTILE=1` to skip those offline.

| # | Scenario | Result |
|---|---|---|
| 1 | Normal enquiry | ✅ delivered with CC, BCC and auto-reply |
| 2 | Mobile (compact form, `+44 (0)` number, iPhone) | ✅ delivered; also in a real browser with iPhone 13 emulation |
| 3 | Honeypot filled | ✅ fake success, nothing sent |
| 4 | Missing Turnstile token | ✅ 403 `verification_required` |
| 5 | Invalid token | ✅ 403 `verification_failed` (live Siteverify) |
| 6 | Expired or reused token | ✅ 403 `verification_expired` (live Siteverify); wrong-hostname tokens rejected; a Cloudflare outage doesn't block customers |
| 7 | Repeated submissions from one IP | ✅ 4th in 10 minutes → 429; 11th in an hour → 429; other IPs unaffected |
| 8 | Direct API bypass | ✅ no token → 403; foreign origin → 403; GET → 405; JSON → 415; foreign preflight → 403 |
| 9 | Spam with several promotional URLs | ✅ held for review, not emailed (score 13+); crypto spam held |
| 10 | Genuine enquiry with a link | ✅ delivered normally; link not echoed in the auto-reply. SEO-agency office clearance delivered |
| 11 | Autofill / fast submit | ✅ delivered (2s in tests; Playwright's instant fills in a real browser too) |
| 12 | Shared network | ✅ three different customers on one IP all delivered |
| 13 | Duplicates | ✅ identical second send not emailed (customer sees success); updated enquiry sent; bulk template across 4 IPs flagged |
| 14 | Malformed / oversized | ✅ 400 listing the fields to fix; 13MB → 413 before parsing; CR/LF and `<script>` neutralised; non-image "photo" dropped |
| — | Strict mode | ✅ medium-risk pitches and scripted no-JavaScript posts held; a real no-JS browser visitor still delivered; balanced mode still works with `FORM_STRICT=false` |
| 15 | Failed verification, then retry | ✅ 403 first, then delivered; in a real browser the typed data was kept and the retry succeeded |

**Also verified:**

- **Deno:** `deno check` passes. The real `index.ts` ran under Deno 2 and was probed with curl: every gate above, plus a delivered enquiry with a photo attachment, using the live Turnstile pass key.
- **Postgres 16:** the migration applies and re-applies cleanly; the rate-limit, duplicate, bulk, record and retention functions behave correctly; 10 concurrent requests are counted exactly. The `anon` and `authenticated` roles are denied every table, view and function.
- **Browser (Playwright, Chromium):** desktop two-step hero form, iPhone full form, and server error then retry, each against the local function with the real Turnstile widget. The Turnstile script makes no requests until the visitor interacts.
- **Visual:** the five main page types on desktop and mobile, compared before and after with Turnstile active. Eight are pixel-identical. The contact page differs by at most 2/255 in colour on a few pixels (anti-aliasing from the invisible iframe).
- **Build:** `npm run typecheck`, `npm run build` and `npm run qa` all pass, with no SEO or link regressions.

**Not tested here:** real email delivery through Resend (no key in this environment; the Resend call is unchanged from `main`), PostgREST's conversion of JSON to SQL arguments (argument names checked against the SQL), and Turnstile with the production site key. Step 5 of §3 covers these.

---

## 5. Possible impact on genuine enquiries

- **Stricter validation:** visitors now get inline messages for numbers like `12345`, names containing links or symbols such as `@` and `_`, and malformed emails. They keep their answers and can correct them.
- **When Turnstile is on:**
  - A small share of visitors may see a one-click "verify you are human" box.
  - Visitors with JavaScript disabled, or extensions blocking `challenges.cloudflare.com`, can't pass and are told to retry or call. The phone number is shown with every error.
- **Medium-risk enquiries** arrive with a warning in the subject and no auto-reply. **High-risk ones** sit in `form_quarantine`; check it weekly.
- **Rate limit:** a fourth enquiry from the same connection within 10 minutes is refused with a message to wait or call.
