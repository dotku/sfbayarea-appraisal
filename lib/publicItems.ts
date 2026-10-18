import 'server-only';

import { db, isConfigured, signedUrls } from '@/lib/admin/db';
import { complianceBlocks, type Category, type Item, type Status } from '@/lib/admin/items';

// What the public site may show about a registered item. Consignor, reserve,
// provenance notes, location and internal notes never leave the server.
export interface PublicItem {
  no: string;
  title: string;
  titleEn: string;
  category: Category;
  era: string;
  material: string;
  dimensions: string;
  marks: string;
  grade: string;
  condition: string;
  estimateLow: number | null;
  estimateHigh: number | null;
  stage: 'collected' | 'upcoming' | 'sold';
  images: string[];
}

const COLUMNS =
  'item_no, title, title_en, category, era, material, dimensions, marks, grade_company, grade, cert_no, condition, estimate_low, estimate_high, status, images, is_public, has_ivory_rhino, is_archaeological, has_regulated_wood, provenance_documented';

const stage = (s: Status): PublicItem['stage'] => (s === 'listed' ? 'upcoming' : s === 'sold' ? 'sold' : 'collected');

async function shape(rows: Item[], allImages: boolean): Promise<PublicItem[]> {
  const shown = rows.filter((r) => r.status !== 'returned' && complianceBlocks(r).length === 0);
  const paths = shown.flatMap((r) => (allImages ? r.images : r.images.slice(0, 1)));
  // Photos live in a private bucket; signed links last long enough for a cached page.
  const urls = await signedUrls(paths, 60 * 60 * 6);
  return shown.map((r) => ({
    no: r.item_no,
    title: r.title,
    titleEn: r.title_en,
    category: r.category,
    era: r.era,
    material: r.material,
    dimensions: r.dimensions,
    marks: r.marks,
    grade: [r.grade_company, r.grade].filter(Boolean).join(' ') + (r.cert_no ? ` · #${r.cert_no}` : ''),
    condition: r.condition,
    estimateLow: r.estimate_low,
    estimateHigh: r.estimate_high,
    stage: stage(r.status),
    images: (allImages ? r.images : r.images.slice(0, 1)).map((p) => urls[p]).filter(Boolean),
  }));
}

export async function listPublicItems(limit = 200): Promise<PublicItem[]> {
  if (!isConfigured) return [];
  const { data } = await db().from('auction_items').select(COLUMNS).eq('is_public', true).order('created_at', { ascending: false }).limit(limit);
  return shape((data ?? []) as unknown as Item[], false);
}

export async function getPublicItem(no: string): Promise<PublicItem | null> {
  if (!isConfigured || !/^PA-\d{4,}$/.test(no)) return null;
  const { data } = await db().from('auction_items').select(COLUMNS).eq('item_no', no).eq('is_public', true).maybeSingle();
  if (!data) return null;
  return (await shape([data as unknown as Item], true))[0] ?? null;
}
