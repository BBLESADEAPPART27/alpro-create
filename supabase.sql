-- Run this in your Supabase SQL editor (Project → SQL → New query).
-- Creates the table used to store every bowl that visitors design.
-- Useful for showing your professors live analytics during the demo.

create table if not exists configurations (
  id uuid primary key default gen_random_uuid(),
  base text not null,
  protein text not null,
  topping text not null,
  flavor text not null,
  created_at timestamptz default now()
);

-- Enable Row Level Security so only the anon role can insert,
-- nothing else (no public reads of analytics data).
alter table configurations enable row level security;

create policy "Anyone can insert a configuration"
  on configurations
  for insert
  to anon
  with check (true);

-- Optional: a simple aggregated view for analytics.
create or replace view popular_flavors as
  select flavor, count(*) as picks
  from configurations
  group by flavor
  order by picks desc;
