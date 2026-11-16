// End-to-end tests of the send-quote request pipeline (the same code the edge function runs).
// Run: npm run test:forms
import { test } from "node:test";
import assert from "node:assert/strict";
import { FailoverStore, MemoryStore, SupabaseStore } from "../../supabase/functions/send-quote/store.ts";
import { body, DbLikeStore, genuine, jpeg, req, setup, SITE, TS_FAIL, TS_PASS, TS_SPENT } from "./helpers.ts";

const LIVE = process.env.SKIP_LIVE_TURNSTILE !== "1";

// 1. Normal customer enquiry
test("1. genuine full-form enquiry is delivered, copied and auto-replied", async () => {
  const t = setup();
  const res = await t.handle(req(genuine));
  assert.equal(res.status, 200);
  assert.deepEqual(await body(res), { success: true });
  assert.equal(t.sent.length, 2);
  const [enquiry, reply] = t.sent;
  assert.deepEqual(enquiry.to, [t.cfg.to]);
  assert.deepEqual(enquiry.cc, t.cfg.cc);
  assert.deepEqual(enquiry.bcc, t.cfg.bcc);
  assert.equal(enquiry.reply_to, "sarah.oconnor@gmail.com");
  assert.match(enquiry.subject, /^Quote request: House clearance – Sarah O'Connor, WD17 1AA$/);
  assert.match(enquiry.html, /Sarah O&#39;Connor/);
  assert.deepEqual(reply.to, ["sarah.oconnor@gmail.com"]);
  assert.deepEqual(t.outcomes(), ["delivered"]);
  assert.equal(res.headers.get("access-control-allow-origin"), SITE);
});

// 2. Mobile: compact hero form, international-format number, no note, mobile UA
test("2. compact form from a phone (+44 number, no note) is delivered", async () => {
  const t = setup();
  const res = await t.handle(
    req(
      { form: "compact", page: "/watford/", name: "Raj Patel", phone: "+44 (0)7700 900456", email: "raj@outlook.com", postcode: "wd18 0aa", service: "Sofa removal", details: "", consent: "yes", _elapsed: "21000" },
      { headers: { "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148" } },
    ),
  );
  assert.equal(res.status, 200);
  assert.equal(t.sent.length, 2);
  assert.match(t.sent[0].subject, /^Quick quote: Sofa removal – Raj Patel, WD18 0AA$/);
});

// 3. Honeypot
test("3. honeypot submission gets a fake success and sends nothing", async () => {
  const t = setup();
  const res = await t.handle(req({ ...genuine, _honey: "http://spam.example" }));
  assert.equal(res.status, 200);
  assert.deepEqual(await body(res), { success: true });
  assert.equal(t.sent.length, 0);
  assert.deepEqual(t.outcomes(), ["honeypot"]);
});

// 4. Missing Turnstile token
test("4. missing Turnstile token is rejected when Turnstile is on", async () => {
  const t = setup({ TURNSTILE_SECRET_KEY: TS_PASS }, { siteverify: () => assert.fail("must not call Siteverify without a token") });
  const res = await t.handle(req(genuine));
  assert.equal(res.status, 403);
  assert.equal((await body(res)).error, "verification_required");
  assert.equal(t.sent.length, 0);
});

// 5. Invalid token (real Cloudflare Siteverify, dummy "always fails" secret)
test("5. invalid Turnstile token is rejected (live Siteverify)", { skip: !LIVE }, async () => {
  const t = setup({ TURNSTILE_SECRET_KEY: TS_FAIL }, { siteverify: "real" });
  const res = await t.handle(req({ ...genuine, "cf-turnstile-response": "forged-token" }));
  assert.equal(res.status, 403);
  assert.equal((await body(res)).error, "verification_failed");
  assert.equal(t.sent.length, 0);
});

// 6. Expired or reused token (real Siteverify, dummy "timeout-or-duplicate" secret)
test("6. expired or reused Turnstile token is rejected (live Siteverify)", { skip: !LIVE }, async () => {
  const t = setup({ TURNSTILE_SECRET_KEY: TS_SPENT }, { siteverify: "real" });
  const res = await t.handle(req({ ...genuine, "cf-turnstile-response": "used-token" }));
  assert.equal(res.status, 403);
  assert.equal((await body(res)).error, "verification_expired");
  assert.equal(t.sent.length, 0);
});

test("6b. valid Turnstile token passes (live Siteverify)", { skip: !LIVE }, async () => {
  const t = setup({ TURNSTILE_SECRET_KEY: TS_PASS }, { siteverify: "real" });
  const res = await t.handle(req({ ...genuine, "cf-turnstile-response": "XXXX.DUMMY.TOKEN.XXXX" }));
  assert.equal(res.status, 200);
  assert.equal(t.sent.length, 2);
});

test("6c. a token issued for another site is rejected", async () => {
  const t = setup({ TURNSTILE_SECRET_KEY: "real-secret" }, { siteverify: () => ({ success: true, hostname: "evil.example", action: "quote" }) });
  const res = await t.handle(req({ ...genuine, "cf-turnstile-response": "tok" }));
  assert.equal(res.status, 403);
});

test("6d. Cloudflare outage does not block customers", async () => {
  const t = setup({ TURNSTILE_SECRET_KEY: "real-secret" }, { siteverify: () => ({ success: false, "error-codes": ["internal-error"] }) });
  const res = await t.handle(req({ ...genuine, "cf-turnstile-response": "tok" }));
  assert.equal(res.status, 200);
  assert.ok(t.logs.some((l) => l.event === "turnstile_unavailable"));
});

test("6e. monitor mode scores a failed token instead of rejecting it", async () => {
  const t = setup({ TURNSTILE_SECRET_KEY: "real-secret", TURNSTILE_MODE: "monitor" }, { siteverify: () => ({ success: false, "error-codes": ["invalid-input-response"] }) });
  const res = await t.handle(req({ ...genuine, "cf-turnstile-response": "bad" }));
  assert.equal(res.status, 200);
  const entry = t.logs.find((l) => l.event === "quote_form")!;
  assert.ok((entry.reasons as string[]).includes("turnstile_failed"));
  assert.equal(entry.outcome, "quarantined");
  assert.equal(t.sent.length, 0);
});

// 7. Repeated submissions from one IP
test("7. fourth submission from one IP within 10 minutes is rate limited", async () => {
  const t = setup();
  for (let i = 0; i < 3; i++) {
    const r = await t.handle(req({ ...genuine, details: `${genuine.details} Visit ${i}.` }, { ip: "198.51.100.7" }));
    assert.equal(r.status, 200, `attempt ${i + 1}`);
  }
  const res = await t.handle(req({ ...genuine, details: "Another job entirely, a fridge." }, { ip: "198.51.100.7" }));
  assert.equal(res.status, 429);
  assert.equal((await body(res)).error, "rate_limited");
  assert.equal(t.sent.length, 6); // 3 enquiries + 3 auto-replies, nothing for the 4th
  // A different connection is unaffected.
  assert.equal((await t.handle(req(genuine, { ip: "198.51.100.8" }))).status, 200);
});

test("7b. hourly limit applies across short windows", async () => {
  let now = 0;
  const t = setup({}, { store: new DbLikeStore(() => now) });
  for (let i = 0; i < 10; i++) {
    now = i * 6 * 60 * 1000; // every 6 minutes
    assert.equal((await t.handle(req({ ...genuine, details: `Job number ${i} - garden waste` }, { ip: "192.0.2.1" }))).status, 200, `attempt ${i + 1}`);
  }
  now = 59 * 60 * 1000;
  assert.equal((await t.handle(req({ ...genuine, details: "eleventh job" }, { ip: "192.0.2.1" }))).status, 429);
});

// 8. Direct API submission bypass attempts
test("8. direct API calls get the same checks as the website", async () => {
  const t = setup({ TURNSTILE_SECRET_KEY: TS_PASS }, { siteverify: () => ({ success: false, "error-codes": ["invalid-input-response"] }) });
  // curl-style: no Origin, no Referer, no token
  const r1 = await t.handle(req({ ...genuine, _elapsed: "" }, { origin: null }));
  assert.equal(r1.status, 403);
  // Another website posting cross-origin
  const r2 = await t.handle(req(genuine, { origin: "https://evil.example" }));
  assert.equal(r2.status, 403);
  assert.equal((await body(r2)).error, "forbidden_origin");
  assert.equal(r2.headers.get("access-control-allow-origin"), null);
  // Wrong method / content type
  assert.equal((await t.handle(req({}, { method: "GET" }))).status, 405);
  const r4 = await t.handle(new Request("https://x/functions/v1/send-quote", { method: "POST", headers: { "content-type": "application/json", accept: "application/json", origin: SITE }, body: JSON.stringify(genuine) }));
  assert.equal(r4.status, 415);
  // Preflight from a foreign origin is refused
  assert.equal((await t.handle(new Request("https://x/", { method: "OPTIONS", headers: { origin: "https://evil.example" } }))).status, 403);
  assert.equal((await t.handle(new Request("https://x/", { method: "OPTIONS", headers: { origin: SITE } }))).status, 204);
  assert.equal(t.sent.length, 0);
});

test("8b. without Turnstile, a scripted post (no page JavaScript, no origin) is held in strict mode", async () => {
  const t = setup();
  const r = await t.handle(req({ ...genuine, _elapsed: "" }, { origin: null }));
  assert.equal(r.status, 200);
  const entry = t.logs.find((l) => l.event === "quote_form")!;
  assert.deepEqual(entry.reasons, ["no_timing", "no_origin_header"]);
  assert.equal(entry.outcome, "quarantined");
  assert.equal(t.sent.length, 0);
  // Balanced mode lets the same clean content through.
  const b = setup({ FORM_STRICT: "false" });
  await b.handle(req({ ...genuine, _elapsed: "" }, { origin: null }));
  assert.deepEqual(b.outcomes(), ["delivered"]);
});

test("8c. a real browser visitor with JavaScript switched off is still delivered in strict mode", async () => {
  const t = setup();
  const r = await t.handle(req({ ...genuine, _elapsed: "" }, { json: false, referer: `${SITE}/contact/` }));
  assert.equal(r.status, 303);
  assert.deepEqual(t.outcomes(), ["delivered"]);
});

// 9. Spam with several promotional URLs
test("9. link-heavy promotional spam is held for review, not emailed", async () => {
  const t = setup();
  const spam = {
    ...genuine,
    name: "Mike Walker",
    details:
      "Hi, I came across your website and noticed it is not on the first page of Google. Our SEO services and high DA backlinks can fix that. See https://seo-agency.example/offer and https://seo-agency.example/prices or www.best-links.example",
    _elapsed: "900",
  };
  const res = await t.handle(req(spam));
  assert.equal(res.status, 200); // spammers aren't told they were caught
  assert.equal(t.sent.length, 0);
  const s = t.store as MemoryStore;
  assert.equal(s.quarantine.length, 1);
  assert.equal(s.quarantine[0].outcome, "quarantined");
  assert.ok((s.quarantine[0].score ?? 0) >= 10);
  assert.ok(s.quarantine[0].reasons.includes("many_links"));
});

test("9b. crypto spam is held for review", async () => {
  const t = setup();
  const res = await t.handle(req({ ...genuine, name: "Investor", details: "Earn $500 per day with our bitcoin trading bot. Guaranteed returns! https://x.example https://y.example", _elapsed: "30000" }));
  assert.equal(res.status, 200);
  assert.equal(t.sent.length, 0);
  assert.deepEqual(t.outcomes(), ["quarantined"]);
});

test("9c. high-risk spam is still emailed (flagged, no copies) if the review queue can't be saved", async () => {
  const failingDb = new SupabaseStore("https://db.example", "key", async () => new Response("down", { status: 503 }));
  const t = setup({}, { store: new FailoverStore(failingDb, new MemoryStore(), () => {}) });
  const res = await t.handle(req({ ...genuine, details: "Buy backlinks and guest posts: https://a.example https://b.example https://c.example", _elapsed: "500" }));
  assert.equal(res.status, 200);
  assert.equal(t.sent.length, 1); // flagged enquiry only — no auto-reply
  assert.match(t.sent[0].subject, /^\[Possible spam – please check\]/);
  assert.equal(t.sent[0].cc, undefined);
  assert.equal(t.sent[0].bcc, undefined);
});

// 10. Legitimate enquiry containing a link
test("10. a genuine enquiry with one link is delivered normally", async () => {
  const t = setup();
  const res = await t.handle(req({ ...genuine, details: "Need this sofa gone, it's the one in this listing: https://www.example-furniture.co.uk/item/123 – ground floor." }));
  assert.equal(res.status, 200);
  assert.equal(t.sent.length, 2);
  assert.doesNotMatch(t.sent[0].subject, /spam/i);
  // Links are not echoed back in the customer auto-reply.
  assert.doesNotMatch(t.sent[1].html, /example-furniture/);
  assert.match(t.sent[1].html, /included in your request/);
});

test("10b. a genuine enquiry that mentions SEO or marketing words is delivered", async () => {
  const t = setup();
  const res = await t.handle(
    req({ ...genuine, service: "Office clearance", details: "We're a small digital marketing and SEO agency moving out of our Watford office. 6 desks, chairs and old monitors need clearing from the 1st floor." }),
  );
  assert.equal(res.status, 200);
  assert.deepEqual(t.outcomes(), ["delivered"]);
});

test("10c. strict mode (default) holds a medium-risk pitch for review", async () => {
  const pitch = { ...genuine, name: "Tom Hughes", details: "I came across your website. Our SEO services could help your business." };
  const t = setup();
  assert.equal((await t.handle(req(pitch))).status, 200);
  assert.deepEqual(t.outcomes(), ["quarantined"]);
  assert.equal(t.sent.length, 0);
});

test("10d. balanced mode delivers a medium-risk pitch flagged, without auto-reply; or to the review inbox when set", async () => {
  const pitch = { ...genuine, name: "Tom Hughes", details: "I came across your website. Our SEO services could help your business." };
  const t = setup({ FORM_STRICT: "false" });
  assert.equal((await t.handle(req(pitch))).status, 200);
  assert.deepEqual(t.outcomes(), ["delivered_flagged"]);
  assert.equal(t.sent.length, 1);
  assert.match(t.sent[0].subject, /^\[Possible spam – please check\]/);
  assert.match(t.sent[0].html, /spam filter wasn/);
  const t2 = setup({ FORM_STRICT: "false", QUOTE_REVIEW_EMAIL: "review@watfordrubbishclearance.co.uk" });
  await t2.handle(req(pitch));
  assert.deepEqual(t2.sent[0].to, ["review@watfordrubbishclearance.co.uk"]);
  assert.equal(t2.sent[0].cc, undefined);
});

// 11. Browser autofill (fast submit)
test("11. an autofilled form submitted in 2 seconds is still delivered", async () => {
  const t = setup();
  const res = await t.handle(req({ ...genuine, _elapsed: "2000" }));
  assert.equal(res.status, 200);
  assert.deepEqual(t.outcomes(), ["delivered"]);
});

// 12. Shared networks
test("12. different customers behind one shared IP are all delivered within the limit", async () => {
  const t = setup();
  const people = [
    { name: "Anna Kowalska", email: "anna.k@gmail.com", phone: "07700 900001", details: "Garden waste, about 20 bags." },
    { name: "Ben Smith", email: "ben@smithfamily.co.uk", phone: "07700 900002", details: "Old fridge freezer from the kitchen." },
    { name: "Chloé Martin", email: "chloe.m@yahoo.co.uk", phone: "01923 000003", details: "Mattress and bed frame." },
  ];
  for (const p of people) assert.equal((await t.handle(req({ ...genuine, ...p }, { ip: "100.64.0.1" }))).status, 200);
  assert.equal(t.sent.filter((s) => s.to[0] === t.cfg.to).length, 3);
});

// 13. Duplicate enquiries
test("13. an identical enquiry sent twice is only emailed once; an updated one goes through", async () => {
  const t = setup();
  assert.equal((await t.handle(req(genuine))).status, 200);
  const again = await t.handle(req(genuine));
  assert.equal(again.status, 200);
  assert.deepEqual(await body(again), { success: true });
  assert.equal(t.sent.length, 2);
  assert.deepEqual(t.outcomes(), ["delivered", "duplicate"]);
  assert.equal((await t.handle(req({ ...genuine, details: `${genuine.details} Also a washing machine.` }))).status, 200);
  assert.equal(t.sent.length, 4);
});

test("13b. the same message text from several different connections is treated as a bulk campaign", async () => {
  const t = setup();
  const template = "Dear business owner, we offer premium quality services at the lowest prices, contact us today for details.";
  const people = ["Alan Grey", "Bea Long", "Carl Diaz", "Dina Rossi"];
  for (const [i, name] of people.entries()) await t.handle(req({ ...genuine, name, email: `p${i}@mail.com`, details: template }, { ip: `198.18.0.${i}` }));
  const scored = t.logs.filter((l) => l.event === "quote_form");
  assert.equal(scored[0].outcome, "delivered");
  assert.ok((scored[3].reasons as string[]).includes("bulk_template"));
  assert.notEqual(scored[3].outcome, "delivered");
});

// 14. Malformed input and oversized payloads
test("14. malformed fields are rejected with the fields to fix", async () => {
  const t = setup();
  const res = await t.handle(req({ ...genuine, name: "x", phone: "12345", email: "not-an-email", postcode: "ABC", consent: "" }));
  assert.equal(res.status, 400);
  const b = await body(res);
  assert.equal(b.error, "invalid_fields");
  assert.deepEqual(b.fields, ["name", "phone", "email", "postcode", "consent"]);
  assert.equal(t.sent.length, 0);
});

test("14b. oversized payloads are refused before parsing", async () => {
  const t = setup({ FORM_MAX_BODY_BYTES: "50000" });
  const res = await t.handle(req(genuine, { files: [jpeg("big.jpg", 80_000)] }));
  assert.equal(res.status, 413);
  assert.equal(t.sent.length, 0);
});

test("14c. header injection and HTML/script injection are neutralised", async () => {
  const t = setup();
  const res = await t.handle(
    req({ ...genuine, service: "House clearance\r\nBcc: victim@example.com", details: "<script>alert(1)</script><img src=x onerror=alert(2)> sofa please" }),
  );
  assert.equal(res.status, 200);
  const [enquiry] = t.sent;
  assert.doesNotMatch(enquiry.subject, /[\r\n]/);
  assert.equal(enquiry.bcc?.includes("victim@example.com"), false);
  assert.doesNotMatch(enquiry.html, /<script>|<img src=x/);
  assert.match(enquiry.html, /&lt;script&gt;/);
});

test("14d. URL in the name field is rejected; non-image uploads are dropped, photos attached", async () => {
  const t = setup();
  assert.equal((await t.handle(req({ ...genuine, name: "http://spam.example" }))).status, 400);
  const evil = new File([new TextEncoder().encode("MZ\x90\x00 not an image")], "photo.jpg", { type: "image/jpeg" });
  const res = await t.handle(req(genuine, { files: [jpeg(), evil] }));
  assert.equal(res.status, 200);
  assert.deepEqual(t.sent[0].attachments?.map((a) => a.filename), ["sofa.jpg"]);
  assert.match(t.sent[0].html, /1 file\(s\) skipped/);
});

// 15. Failed verification followed by a legitimate retry
test("15. a customer whose verification fails can retry and get through", async () => {
  let calls = 0;
  const t = setup({ TURNSTILE_SECRET_KEY: "real-secret" }, {
    siteverify: () => (++calls === 1 ? { success: false, "error-codes": ["timeout-or-duplicate"] } : { success: true, hostname: "www.watfordrubbishclearance.co.uk", action: "quote" }),
  });
  const first = await t.handle(req({ ...genuine, "cf-turnstile-response": "stale" }));
  assert.equal(first.status, 403);
  assert.equal((await body(first)).error, "verification_expired");
  const retry = await t.handle(req({ ...genuine, "cf-turnstile-response": "fresh" }));
  assert.equal(retry.status, 200);
  assert.equal(t.sent.length, 2);
});

// No-JavaScript form posts
test("no-JS form post is redirected to the thank-you page, errors back to the contact page", async () => {
  const t = setup();
  const ok = await t.handle(req(genuine, { json: false, referer: `${SITE}/house-clearance/` }));
  assert.equal(ok.status, 303);
  assert.equal(ok.headers.get("location"), `${SITE}/thank-you/`);
  const bad = await t.handle(req({ ...genuine, email: "nope" }, { json: false }));
  assert.equal(bad.status, 303);
  assert.equal(bad.headers.get("location"), `${SITE}/contact/?sent=error&code=invalid_fields`);
  // Never redirect off-site.
  const evil = await t.handle(req(genuine, { json: false, origin: null, referer: "https://evil.example/" }));
  assert.match(evil.headers.get("location")!, /^https:\/\/www\.watfordrubbishclearance\.co\.uk\//);
});

// Storage resilience
test("database outage falls back to memory and enquiries keep flowing", async () => {
  const logs: string[] = [];
  const failingDb = new SupabaseStore("https://db.example", "key", async () => {
    throw new Error("ECONNREFUSED");
  });
  const t = setup({}, { store: new FailoverStore(failingDb, new MemoryStore(), (m) => logs.push(m)) });
  assert.equal((await t.handle(req(genuine))).status, 200);
  assert.equal(t.sent.length, 2);
  assert.ok(logs.some((l) => l.includes("ECONNREFUSED")));
});

test("SupabaseStore calls the migration's RPC functions with the right arguments", async () => {
  const calls: { url: string; body: Record<string, unknown>; auth: string | null }[] = [];
  const s = new SupabaseStore("https://proj.supabase.co", "service-key", async (u, init) => {
    calls.push({ url: String(u), body: JSON.parse(String(init!.body)), auth: new Headers(init!.headers).get("authorization") });
    return new Response(String(u).endsWith("form_guard_check") ? JSON.stringify({ short_count: 1, long_count: 2, duplicate: false, bulk_count: 0 }) : "", { status: 200 });
  });
  const r = await s.check({ ipHash: "i", contentHash: "c", bodyHash: "b", shortWindowSec: 600, longWindowSec: 3600, duplicateWindowSec: 1800, bulkWindowSec: 86400 });
  assert.deepEqual(r, { shortCount: 1, longCount: 2, duplicate: false, bulkCount: 0 });
  assert.equal(await s.record({ outcome: "delivered", score: 1, reasons: ["one_link"], form: "full", page: "/", ipHash: "i", contentHash: "c", bodyHash: null, payload: null }), true);
  assert.equal(calls[0].url, "https://proj.supabase.co/rest/v1/rpc/form_guard_check");
  assert.deepEqual(Object.keys(calls[0].body).sort(), ["p_body_hash", "p_bulk_secs", "p_content_hash", "p_dup_secs", "p_ip_hash", "p_long_secs", "p_short_secs"]);
  assert.deepEqual(Object.keys(calls[1].body).sort(), ["p_body_hash", "p_content_hash", "p_form", "p_ip_hash", "p_outcome", "p_page", "p_payload", "p_reasons", "p_score"]);
  assert.equal(calls[0].auth, "Bearer service-key");
});

test("logs and stored events contain no personal data", async () => {
  const t = setup();
  await t.handle(req(genuine));
  const dump = JSON.stringify([t.logs, (t.store as MemoryStore).events]);
  for (const pii of [genuine.name, genuine.email, genuine.phone, "203.0.113.10", "WD17"]) assert.ok(!dump.includes(pii), `found ${pii}`);
});

test("email not configured returns a clear code", async () => {
  const t = setup({ RESEND_API_KEY: "" });
  const res = await t.handle(req(genuine));
  assert.equal(res.status, 500);
  assert.equal((await body(res)).error, "email_not_configured");
});
