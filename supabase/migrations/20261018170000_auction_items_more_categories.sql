-- Bay Area target categories (徵集目標) beyond Chinese art, plus grading fields for cards.
alter table public.auction_items drop constraint auction_items_category_check;
alter table public.auction_items add constraint auction_items_category_check check (category in (
  'ceramics', 'jade', 'painting', 'bronze', 'furniture', 'metalwork', 'scholar', 'buddhist', 'japan_korea',
  'cards', 'jewelry', 'california_art', 'wine', 'design', 'western', 'other'));
alter table public.auction_items add column grade_company text not null default ''; -- PSA / BGS / CGC …
alter table public.auction_items add column grade text not null default '';
alter table public.auction_items add column cert_no text not null default '';
