-- We don't take wine. (Key california_art is kept; it now means painting in general — 繪畫.)
alter table public.auction_items drop constraint auction_items_category_check;
alter table public.auction_items add constraint auction_items_category_check check (category in (
  'ceramics', 'jade', 'painting', 'bronze', 'furniture', 'metalwork', 'scholar', 'buddhist', 'japan_korea',
  'cards', 'jewelry', 'california_art', 'design', 'western', 'other'));
