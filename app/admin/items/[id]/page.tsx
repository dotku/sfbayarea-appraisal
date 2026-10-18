import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/admin/auth';
import { db, signedUrls } from '@/lib/admin/db';
import { STATUS_LABEL, complianceBlocks, type Item } from '@/lib/admin/items';
import ItemForm from '../ItemForm';
import Photos from '../Photos';

export const dynamic = 'force-dynamic';

export default async function ItemPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string; created?: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const sp = await searchParams;
  if (!/^[0-9a-f-]{36}$/.test(id)) notFound();

  const sb = db();
  const [{ data: item }, { data: consignors }] = await Promise.all([
    sb.from('auction_items').select('*').eq('id', id).maybeSingle(),
    sb.from('auction_consignors').select('id, name, city').order('name'),
  ]);
  if (!item) notFound();
  const it = item as Item;
  const urls = await signedUrls(it.images);
  const blocks = complianceBlocks(it);

  return (
    <div className="space-y-6 pb-4">
      <div>
        <Link href="/admin" className="text-sm text-muted hover:text-ink">← 藏品列表</Link>
        <h1 className="mt-1 text-2xl font-semibold">
          <span className="mr-2 font-mono text-base text-muted">{it.item_no}</span>
          {it.title}
        </h1>
        <p className="mt-1 text-sm text-muted">状态：{STATUS_LABEL[it.status]} · 更新于 {new Date(it.updated_at).toLocaleString('zh-CN', { timeZone: 'America/Los_Angeles' })}</p>
      </div>

      {sp.created && <p className="rounded-sm border border-line bg-card p-3 text-sm">已登记为 {it.item_no}。下一步：拍照上传。</p>}
      {sp.saved && <p className="rounded-sm border border-line bg-card p-3 text-sm">已保存。</p>}
      {blocks.length > 0 && (
        <ul className="list-disc rounded-sm border border-accent/40 bg-accent/5 p-3 pl-8 text-sm text-accent">
          {blocks.map((b) => <li key={b}>{b}</li>)}
        </ul>
      )}

      <Photos itemId={it.id} photos={it.images.filter((p) => urls[p]).map((p) => ({ path: p, url: urls[p] }))} />
      <ItemForm item={it} consignors={consignors ?? []} />
    </div>
  );
}
