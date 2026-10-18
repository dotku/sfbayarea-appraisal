// The eight target categories (徵集目標), ordered by Bay Area market size.
// Copy lives in messages/*.json under collecting.g.<key>; `tier` drives the badge.
export const TARGETS = [
  { key: 'asian', tier: 'first' },
  { key: 'furniture', tier: 'first' },
  { key: 'cards', tier: 'also' },
  { key: 'jewelry', tier: 'also' },
  { key: 'california', tier: 'also' },
  { key: 'wine', tier: 'interest' },
  { key: 'design', tier: 'also' },
  { key: 'western', tier: 'also' },
] as const;

export const tierClass = (tier: (typeof TARGETS)[number]['tier']) =>
  tier === 'first' ? 'bg-accent text-accent-ink' : tier === 'interest' ? 'border border-gold/60 text-gold' : 'border border-line text-ink/70';
