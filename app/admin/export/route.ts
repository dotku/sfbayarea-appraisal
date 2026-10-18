import { isAdmin } from '@/lib/admin/auth';
import { db } from '@/lib/admin/db';
import { CATEGORY_LABEL, SOURCE_LABEL, STATUS_LABEL, type Item } from '@/lib/admin/items';

export const dynamic = 'force-dynamic';

const COLUMNS: [string, (i: Item & { consignor: { name: string } | null }) => unknown][] = [
  ['编号', (i) => i.item_no],
  ['品名', (i) => i.title],
  ['门类', (i) => CATEGORY_LABEL[i.category]],
  ['年代', (i) => i.era],
  ['材质', (i) => i.material],
  ['尺寸', (i) => i.dimensions],
  ['重量', (i) => i.weight],
  ['款识', (i) => i.marks],
  ['品相', (i) => i.condition],
  ['来源渠道', (i) => SOURCE_LABEL[i.source_channel]],
  ['委托人', (i) => i.consignor?.name ?? ''],
  ['收货日期', (i) => i.acquired_on ?? ''],
  ['来源记录', (i) => i.provenance],
  ['估价下限', (i) => i.estimate_low ?? ''],
  ['估价上限', (i) => i.estimate_high ?? ''],
  ['底价', (i) => i.reserve ?? ''],
  ['象牙犀角', (i) => (i.has_ivory_rhino ? '是' : '')],
  ['疑似出土', (i) => (i.is_archaeological ? '是' : '')],
  ['受管制木材', (i) => (i.has_regulated_wood ? '是' : '')],
  ['有来源证明', (i) => (i.provenance_documented ? '是' : '')],
  ['状态', (i) => STATUS_LABEL[i.status]],
  ['存放位置', (i) => i.location],
  ['照片数', (i) => i.images.length],
  ['备注', (i) => i.notes],
  ['登记时间', (i) => i.created_at],
];

const cell = (v: unknown) => {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export async function GET() {
  if (!(await isAdmin())) return new Response('unauthorized', { status: 401 });
  const { data } = await db().from('auction_items').select('*, consignor:auction_consignors(name)').order('item_no');
  const rows = (data ?? []) as (Item & { consignor: { name: string } | null })[];
  // BOM so Excel opens the Chinese text as UTF-8.
  const csv = '﻿' + [COLUMNS.map((c) => c[0]), ...rows.map((r) => COLUMNS.map((c) => c[1](r)))].map((r) => r.map(cell).join(',')).join('\n');
  const day = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    headers: { 'content-type': 'text/csv; charset=utf-8', 'content-disposition': `attachment; filename="peninsula-items-${day}.csv"` },
  });
}
