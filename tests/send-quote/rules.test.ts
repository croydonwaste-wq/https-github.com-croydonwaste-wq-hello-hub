// Unit tests for field validation and spam scoring rules.
import { test } from "node:test";
import assert from "node:assert/strict";
import { loadConfig } from "../../supabase/functions/send-quote/config.ts";
import { classify, scoreQuote, type Signals } from "../../supabase/functions/send-quote/spam.ts";
import { normalise, validEmail, validName, validPhone } from "../../supabase/functions/send-quote/validate.ts";

test("phone numbers: UK and international formats accepted, junk rejected", () => {
  for (const ok of ["07700 900123", "07700900123", "01923 123456", "020 7946 0018", "+44 7700 900123", "+44 (0)7700 900123", "0044 7700 900123", "447700900123", "7700900123", "+353 85 123 4567", "+1 (415) 555-0132", "016977 2345"])
    assert.ok(validPhone(ok), ok);
  for (const bad of ["12345", "0000000000", "01234567890", "07700 900123 ext", "call me", "+44 0000", "1111111111111", "<script>"]) assert.ok(!validPhone(bad), bad);
});

test("names: international names accepted, junk rejected", () => {
  for (const ok of ["Sarah O'Connor", "José Álvarez", "Zoë Brontë-Smith", "Nguyễn Văn An", "Анна Иванова", "李小龙", "Dr. A. Khan", "John & Mary Lee", "Ng"]) assert.ok(validName(ok), ok);
  for (const bad of ["x", "123", "http://spam.example", "www.spam.example", "<b>Bob</b>", "bob@example.com", "a".repeat(101)]) assert.ok(!validName(bad), bad);
});

test("emails", () => {
  for (const ok of ["a@b.co", "first.last+quote@sub.example.co.uk", "o'neil@example.ie"]) assert.ok(validEmail(ok), ok);
  for (const bad of ["a@b", "a@@b.com", "a b@c.com", ".a@b.com", "a..b@c.com", "a@-b.com", "a@b.c", "x@y.com\r\nBcc: v@z.com"]) assert.ok(!validEmail(bad), bad);
});

test("normalise strips control characters from single-line fields", () => {
  const fd = new FormData();
  fd.set("name", "Bob\r\nBcc: x@y.com");
  fd.set("details", "line1\r\nline2\u0000");
  fd.set("page", "//evil.example");
  const q = normalise(fd);
  assert.equal(q.name, "Bob Bcc: x@y.com");
  assert.equal(q.details, "line1\nline2");
  assert.equal(q.page, "/");
});

const human: Signals = { elapsedMs: 45000, hasOriginOrReferer: true, turnstile: "pass", bulkCount: 0 };
const q = (details: string, extra: Record<string, string> = {}) => {
  const fd = new FormData();
  for (const [k, v] of Object.entries({ name: "Pat Jones", email: "pat@gmail.com", phone: "07700900123", postcode: "WD17 1AA", service: "House clearance", consent: "yes", details, ...extra })) fd.set(k, v);
  return normalise(fd);
};
const risk = (details: string, s: Partial<Signals> = {}, extra: Record<string, string> = {}) => {
  const cfg = loadConfig(() => undefined);
  const r = scoreQuote(q(details, extra), { ...human, ...s });
  return { ...r, risk: classify(r.score, cfg.mediumThreshold, cfg.highThreshold) };
};

test("genuine enquiries score low", () => {
  const genuine = [
    "3 bags of garden waste and an old lawnmower, side gate access.",
    "Can you take a fridge freezer? It's in the garage. Photos here: https://photos.app.goo.gl/abc123",
    "We run a web design and SEO agency and are moving offices — 8 desks and chairs to clear.",
    "I came across your website on Google, need a sofa removed tomorrow if possible.",
    "",
    "HOUSE CLEARANCE NEEDED ASAP, 3 BED SEMI, LANDLORD WANTS IT EMPTY BY FRIDAY.",
    "Bitte rufen Sie mich an. Sofa und Matratze.",
  ];
  for (const d of genuine) assert.equal(risk(d).risk, "low", `${d} → ${JSON.stringify(risk(d))}`);
  // Even without JavaScript and with autofill speed, still low.
  assert.equal(risk(genuine[0], { elapsedMs: null, turnstile: "skipped" }).risk, "low");
  assert.equal(risk(genuine[0], { elapsedMs: 2500 }).risk, "low");
});

test("typical spam scores medium or high", () => {
  const cases: [string, "medium" | "high"][] = [
    ["Hi, I noticed your website is not ranking. Our SEO services can get you on the first page of Google. Reply STOP to unsubscribe.", "medium"],
    ["Buy high DA backlinks and guest posts: https://a.example https://b.example https://c.example", "high"],
    ["Invest in bitcoin today! Guaranteed returns, earn $1000 per day: https://crypto.example", "medium"],
    ["Get viagra and casino bonuses at [url=https://x.example]our site[/url]", "high"],
  ];
  for (const [d, min] of cases) {
    const r = risk(d);
    assert.ok(min === "medium" ? r.risk !== "low" : r.risk === "high", `${d} → ${JSON.stringify(r)}`);
  }
});

test("bot behaviour pushes borderline content over the line", () => {
  const pitch = "We can help you get more leads. Visit https://leads.example and https://leads2.example";
  assert.equal(risk(pitch).risk, "medium");
  assert.equal(risk(pitch, { elapsedMs: 600, hasOriginOrReferer: false }).risk, "high");
  assert.ok(risk("asdfghjkl", {}, { name: "JqKzLwPdXs" }).reasons.includes("random_name"));
  assert.ok(risk("aaaaaaaaaaaaaaaaaaaa").reasons.includes("repeated_characters"));
  assert.ok(risk("hello", {}, { email: "x@mailinator.com" }).reasons.includes("disposable_email"));
});

test("config defaults match the documented thresholds and are overridable", () => {
  const d = loadConfig(() => undefined);
  assert.deepEqual([d.rateShortMax, d.rateShortWindowSec, d.rateLongMax, d.rateLongWindowSec], [3, 600, 10, 3600]);
  assert.equal(d.turnstileMode, "off");
  const c = loadConfig((k) => ({ TURNSTILE_SECRET_KEY: "s", RATE_LIMIT_SHORT_MAX: "5", SPAM_HIGH_THRESHOLD: "x" })[k]);
  assert.equal(c.turnstileMode, "enforce");
  assert.equal(c.rateShortMax, 5);
  assert.equal(c.highThreshold, 10); // invalid value falls back to default
  assert.ok(c.allowedOrigins.test("https://www.watfordrubbishclearance.co.uk"));
  assert.ok(c.allowedOrigins.test("https://id-preview--abc.lovable.app"));
  assert.ok(!c.allowedOrigins.test("https://watfordrubbishclearance.co.uk.evil.com"));
  assert.ok(!c.allowedOrigins.test("http://www.watfordrubbishclearance.co.uk"));
});
