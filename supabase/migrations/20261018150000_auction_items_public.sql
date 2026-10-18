-- Items the staff choose to show on the public site (藏品展示).
alter table public.auction_items add column is_public boolean not null default false;
alter table public.auction_items add column title_en text not null default '' check (char_length(title_en) <= 160);
create index auction_items_public_idx on public.auction_items (is_public, created_at desc) where is_public;
