-- Paradise City International - Supabase Setup
-- Run this in Supabase SQL Editor

create table if not exists bookings (
  id bigserial primary key,
  name text not null,
  email text,
  phone text,
  service text,
  date text,
  people integer default 1,
  message text,
  status text default 'pending',
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table bookings enable row level security;

-- Allow service role full access (for admin API)
create policy "service role full access" on bookings
  for all using (true);

-- Index for status queries
create index if not exists bookings_status_idx on bookings(status);
create index if not exists bookings_created_at_idx on bookings(created_at desc);

select 'Setup complete!' as result;
