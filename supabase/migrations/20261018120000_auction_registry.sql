-- Collection registry (藏品登記) for the auction business.
-- Lives in the virtual-human Supabase project for now; every table is
-- prefixed auction_ and has RLS on with no policies, so only the server
-- (secret key) can read or write. Consignor contact details never reach the
-- browser through the public API.

create table public.auction_consignors (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  phone text not null default '',
  email text not null default '',
  wechat text not null default '',
  city text not null default '', -- Bay Area city, e.g. Oakland
  notes text not null default '',
  created_at timestamptz not null default now()
);

create sequence public.auction_item_seq;

create table public.auction_items (
  id uuid primary key default gen_random_uuid(),
  item_no text not null unique default ('PA-' || lpad(nextval('public.auction_item_seq')::text, 4, '0')),
  title text not null check (char_length(title) between 1 and 160),
  category text not null check (category in ('ceramics', 'jade', 'painting', 'bronze', 'furniture', 'metalwork', 'scholar', 'other')),
  era text not null default '',        -- as stated / as judged, never certified here
  material text not null default '',
  dimensions text not null default '',
  weight text not null default '',
  marks text not null default '',      -- 款識、印章
  condition text not null default '',  -- 品相，含修復
  provenance text not null default '', -- 來源、傳承、購買記錄
  source_channel text not null default 'consignment'
    check (source_channel in ('consignment', 'estate', 'fair', 'auction', 'dealer', 'other')),
  consignor_id uuid references public.auction_consignors (id) on delete set null,
  acquired_on date,
  estimate_low integer check (estimate_low is null or estimate_low >= 0),
  estimate_high integer check (estimate_high is null or estimate_high >= 0),
  reserve integer check (reserve is null or reserve >= 0),
  -- Compliance: any red flag blocks listing until cleared.
  has_ivory_rhino boolean not null default false,
  is_archaeological boolean not null default false,
  has_regulated_wood boolean not null default false,
  provenance_documented boolean not null default false,
  status text not null default 'intake'
    check (status in ('intake', 'appraising', 'consigned', 'photographed', 'listed', 'sold', 'unsold', 'returned')),
  location text not null default '',   -- where the object is now
  notes text not null default '',
  images text[] not null default '{}', -- storage paths in bucket auction-items
  created_by text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (estimate_low is null or estimate_high is null or estimate_low <= estimate_high),
  -- Ivory / rhino horn cannot be sold in California at all.
  check (not (has_ivory_rhino and status in ('listed', 'sold')))
);

create index auction_items_status_idx on public.auction_items (status, created_at desc);
create index auction_items_consignor_idx on public.auction_items (consignor_id);

alter table public.auction_consignors enable row level security;
alter table public.auction_items enable row level security;

insert into storage.buckets (id, name, public) values ('auction-items', 'auction-items', false)
  on conflict (id) do nothing;
