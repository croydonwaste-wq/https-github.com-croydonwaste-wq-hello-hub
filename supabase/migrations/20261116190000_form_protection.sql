-- Quote form spam protection: shared rate limits, duplicate detection, review queue and
-- monitoring for the send-quote edge function.
--
-- Privacy (UK GDPR):
--   * IP addresses are never stored, only a keyed one-way hash (kept 1 day for rate limiting).
--   * Message text is stored only as a hash (kept 2 days for duplicate / bulk detection).
--   * form_events holds no personal data: outcome, score, reasons, form type and page path (kept 180 days).
--   * form_quarantine holds the enquiry details of submissions held as likely spam, so a
--     misjudged genuine enquiry can be found and answered. Deleted after 30 days.
--
-- Access: Row Level Security is on with no policies, and the anon/authenticated roles have no
-- grants, so nothing here is readable or writable with the public (publishable) key. Only the
-- edge function (service role) and the project dashboard can use these objects.

create table if not exists public.form_rate_hits (
  id bigint generated always as identity primary key,
  ip_hash text not null,
  created_at timestamptz not null default now()
);
create index if not exists form_rate_hits_ip_time on public.form_rate_hits (ip_hash, created_at);
create index if not exists form_rate_hits_time on public.form_rate_hits (created_at);

create table if not exists public.form_fingerprints (
  id bigint generated always as identity primary key,
  kind text not null check (kind in ('content', 'body')),
  hash text not null,
  ip_hash text,
  created_at timestamptz not null default now()
);
create index if not exists form_fingerprints_lookup on public.form_fingerprints (kind, hash, created_at);
create index if not exists form_fingerprints_time on public.form_fingerprints (created_at);

create table if not exists public.form_events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  outcome text not null,
  score integer,
  reasons text[] not null default '{}',
  form text,
  page text
);
create index if not exists form_events_time on public.form_events (created_at);

create table if not exists public.form_quarantine (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  score integer,
  reasons text[] not null default '{}',
  form text,
  page text,
  payload jsonb not null,
  -- Set to 'genuine' when a held enquiry turns out to be real (counts as a false positive), or 'spam'.
  review_status text not null default 'pending' check (review_status in ('pending', 'spam', 'genuine')),
  reviewed_at timestamptz
);
create index if not exists form_quarantine_time on public.form_quarantine (created_at);

alter table public.form_rate_hits enable row level security;
alter table public.form_fingerprints enable row level security;
alter table public.form_events enable row level security;
alter table public.form_quarantine enable row level security;

-- Counts this attempt against the IP's rate limit and looks up duplicates, in one round trip.
create or replace function public.form_guard_check(
  p_ip_hash text,
  p_content_hash text,
  p_body_hash text,
  p_short_secs integer,
  p_long_secs integer,
  p_dup_secs integer,
  p_bulk_secs integer
) returns json
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_short integer;
  v_long integer;
  v_dup boolean;
  v_bulk integer := 0;
begin
  -- Serialise attempts from the same connection so simultaneous requests are all counted.
  perform pg_advisory_xact_lock(hashtext('form_rate:' || p_ip_hash));
  insert into form_rate_hits (ip_hash) values (p_ip_hash);

  select count(*) filter (where created_at > now() - make_interval(secs => p_short_secs)),
         count(*) filter (where created_at > now() - make_interval(secs => p_long_secs))
    into v_short, v_long
    from form_rate_hits
   where ip_hash = p_ip_hash
     and created_at > now() - make_interval(secs => greatest(p_short_secs, p_long_secs));

  select exists (
    select 1 from form_fingerprints
     where kind = 'content' and hash = p_content_hash
       and created_at > now() - make_interval(secs => p_dup_secs)
  ) into v_dup;

  if p_bulk_secs > 0 then
    select count(distinct ip_hash) into v_bulk
      from form_fingerprints
     where kind = 'body' and hash = p_body_hash and ip_hash is distinct from p_ip_hash
       and created_at > now() - make_interval(secs => p_bulk_secs);
  end if;

  return json_build_object('short_count', v_short, 'long_count', v_long, 'duplicate', v_dup, 'bulk_count', v_bulk);
end;
$$;

-- Records the outcome of a submission, remembers fingerprints, queues likely spam for review,
-- and deletes anything past its retention period.
create or replace function public.form_guard_record(
  p_outcome text,
  p_score integer,
  p_reasons text[],
  p_form text,
  p_page text,
  p_ip_hash text,
  p_content_hash text,
  p_body_hash text,
  p_payload jsonb
) returns void
language plpgsql
security invoker
set search_path = public
as $$
begin
  insert into form_events (outcome, score, reasons, form, page)
  values (left(p_outcome, 40), p_score, coalesce(p_reasons, '{}'), left(p_form, 20), left(p_page, 200));

  if p_content_hash is not null and p_outcome in ('delivered', 'delivered_flagged') then
    insert into form_fingerprints (kind, hash, ip_hash) values ('content', p_content_hash, p_ip_hash);
  end if;

  if p_body_hash is not null and p_score is not null then
    insert into form_fingerprints (kind, hash, ip_hash) values ('body', p_body_hash, p_ip_hash);
  end if;

  if p_payload is not null then
    insert into form_quarantine (score, reasons, form, page, payload)
    values (p_score, coalesce(p_reasons, '{}'), left(p_form, 20), left(p_page, 200), p_payload);
  end if;

  -- Retention.
  delete from form_rate_hits where created_at < now() - interval '1 day';
  delete from form_fingerprints where created_at < now() - interval '2 days';
  delete from form_events where created_at < now() - interval '180 days';
  delete from form_quarantine where created_at < now() - interval '30 days';
end;
$$;

-- Daily summary for monitoring (no personal data).
create or replace view public.form_daily_stats
with (security_invoker = true) as
select
  e.day,
  e.attempts,
  e.delivered,
  e.delivered_flagged,
  e.quarantined,
  e.honeypot,
  e.rate_limited,
  e.turnstile_failed,
  e.invalid,
  e.duplicate,
  e.other_rejected,
  e.send_failed,
  coalesce(q.false_positives, 0) as false_positives
from (
  select
    created_at::date as day,
    count(*) as attempts,
    count(*) filter (where outcome = 'delivered') as delivered,
    count(*) filter (where outcome = 'delivered_flagged') as delivered_flagged,
    count(*) filter (where outcome = 'quarantined') as quarantined,
    count(*) filter (where outcome = 'honeypot') as honeypot,
    count(*) filter (where outcome = 'rate_limited') as rate_limited,
    count(*) filter (where outcome = 'turnstile_failed') as turnstile_failed,
    count(*) filter (where outcome = 'invalid') as invalid,
    count(*) filter (where outcome = 'duplicate') as duplicate,
    count(*) filter (where outcome in ('rejected_origin', 'bad_request', 'too_large')) as other_rejected,
    count(*) filter (where outcome = 'send_failed') as send_failed
  from public.form_events
  group by 1
) e
left join (
  select created_at::date as day, count(*) as false_positives
  from public.form_quarantine
  where review_status = 'genuine'
  group by 1
) q using (day)
order by e.day desc;

-- Lock everything down to the service role.
revoke all on public.form_rate_hits, public.form_fingerprints, public.form_events, public.form_quarantine, public.form_daily_stats from public;
do $$
begin
  if exists (select 1 from pg_roles where rolname = 'anon') then
    execute 'revoke all on public.form_rate_hits, public.form_fingerprints, public.form_events, public.form_quarantine, public.form_daily_stats from anon';
  end if;
  if exists (select 1 from pg_roles where rolname = 'authenticated') then
    execute 'revoke all on public.form_rate_hits, public.form_fingerprints, public.form_events, public.form_quarantine, public.form_daily_stats from authenticated';
  end if;
end $$;

revoke execute on function public.form_guard_check(text, text, text, integer, integer, integer, integer) from public;
revoke execute on function public.form_guard_record(text, integer, text[], text, text, text, text, text, jsonb) from public;
do $$
begin
  if exists (select 1 from pg_roles where rolname = 'anon') then
    execute 'revoke execute on function public.form_guard_check(text, text, text, integer, integer, integer, integer) from anon';
    execute 'revoke execute on function public.form_guard_record(text, integer, text[], text, text, text, text, text, jsonb) from anon';
  end if;
  if exists (select 1 from pg_roles where rolname = 'authenticated') then
    execute 'revoke execute on function public.form_guard_check(text, text, text, integer, integer, integer, integer) from authenticated';
    execute 'revoke execute on function public.form_guard_record(text, integer, text[], text, text, text, text, text, jsonb) from authenticated';
  end if;
  if exists (select 1 from pg_roles where rolname = 'service_role') then
    execute 'grant select, insert, delete on public.form_rate_hits, public.form_fingerprints, public.form_events to service_role';
    execute 'grant select, insert, update, delete on public.form_quarantine to service_role';
    execute 'grant select on public.form_daily_stats to service_role';
    execute 'grant execute on function public.form_guard_check(text, text, text, integer, integer, integer, integer) to service_role';
    execute 'grant execute on function public.form_guard_record(text, integer, text[], text, text, text, text, text, jsonb) to service_role';
  end if;
end $$;
