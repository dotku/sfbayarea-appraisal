-- Remaining departments from the reference directory: Old Masters & European
-- art, clocks & instruments, interiors, antiquities, African & Oceanic art,
-- arms & armour.
alter table public.auction_items drop constraint auction_items_category_check;
alter table public.auction_items add constraint auction_items_category_check check (category in (
  'ceramics', 'jade', 'painting', 'bronze', 'furniture', 'metalwork', 'scholar', 'buddhist', 'japan_korea',
  'cards', 'jewelry', 'california_art', 'design', 'western', 'coins', 'modern_art', 'euro_ceramics',
  'old_masters', 'clocks', 'interiors', 'antiquities', 'african_oceanic', 'arms_armour', 'other'));
