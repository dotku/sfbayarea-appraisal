-- Departments added from the reference directory: coins & medals, modern &
-- contemporary art, European ceramics & glass.
alter table public.auction_items drop constraint auction_items_category_check;
alter table public.auction_items add constraint auction_items_category_check check (category in (
  'ceramics', 'jade', 'painting', 'bronze', 'furniture', 'metalwork', 'scholar', 'buddhist', 'japan_korea',
  'cards', 'jewelry', 'california_art', 'design', 'western', 'coins', 'modern_art', 'euro_ceramics', 'other'));
