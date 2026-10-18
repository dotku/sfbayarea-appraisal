import Link from 'next/link';
import { requireAdmin } from '@/lib/admin/auth';
import { db, signedUrls } from '@/lib/admin/db';
import { CATEGORY_LABEL, STATUS_LABEL, complianceBlocks, usd, type Category, type Item, type Status } from '@/lib/admin/items';

export const dynamic = 'force-dynamic';

export default async function ItemsPage({ searchParams }: { searchParams: Promise<{ status?: string; category?: string; q?: string }> }) {
  await requireAdmin();
  const sp = await searchParams;
  const status = sp.status && sp.status in STATUS_LABEL ? (sp.status as Status) : undefined;
  const category = sp.category && sp.category in CATEGORY_LABEL ? (sp.category as Category) : undefined;
  const q = (sp.q ?? '').trim().slice(0, 80);

  const sb = db();
  let query = sb.from('auction_items').select('*, consignor:auction_consignors(name)').order('created_at', { ascending: false }).limit(500);
  if (status) query = query.eq('status', status);
  if (category) query = query.eq('category', category);
  if (q) query = query.or(`title.ilike.%${q.replace(/[%,()]/g, '')}%,item_no.ilike.%${q.replace(/[%,()]/g, '')}%`);
  const [{ data }, { data: all }] = await Promise.all([query, sb.from('auction_items').select('status')]);
  const items = (data ?? []) as (Item & { consignor: { name: string } | null })[];
  const counts = (all ?? []).reduce<Record<string, number>>((m, r) => ((m[r.status] = (m[r.status] ?? 0) + 1), m), {});
  const thumbs = await signedUrls(items.map((i) => i.images[0]).filter(Boolean));

  const href = (patch: Record<string, string | undefined>) => {
    const p = new URLSearchParams();
    const next = { status, category, q: q || undefined, ...patch };
    for (const [k, v] of Object.entries(next)) if (v) p.set(k, v);
    const s = p.toString();
    return s ? `/admin?${s}` : '/admin';
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">藏品</h1>
          <p className="mt-1 text-sm text-muted">共 {all?.length ?? 0} 件</p>
        </div>
        <div className="flex gap-2">
          <a href="/admin/export" className="rounded-sm border border-line px-3 py-2 text-sm hover:border-ink/40">导出 CSV</a>
          <Link href="/admin/items/new" className="rounded-sm bg-accent px-4 py-2 text-sm text-accent-ink">+ 登记新藏品</Link>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2 text-sm">
        <Link href={href({ status: undefined })} className={chip(!status)}>全部 {all?.length ?? 0}</Link>
        {(Object.keys(STATUS_LABEL) as Status[]).map((s) => (
          <Link key={s} href={href({ status: s })} className={chip(status === s)}>
            {STATUS_LABEL[s]} {counts[s] ?? 0}
          </Link>
        ))}
      </div>

      <form className="mt-3 flex flex-wrap gap-2 text-sm" action="/admin">
        {status && <input type="hidden" name="status" value={status} />}
        <select name="category" defaultValue={category ?? ''} className="rounded-sm border border-line bg-white px-2 py-2">
          <option value="">全部门类</option>
          {(Object.keys(CATEGORY_LABEL) as Category[]).map((c) => (
            <option key={c} value={c}>{CATEGORY_LABEL[c]}</option>
          ))}
        </select>
        <input name="q" defaultValue={q} placeholder="搜索品名或编号" className="min-w-0 flex-1 rounded-sm border border-line bg-white px-3 py-2" />
        <button className="rounded-sm border border-line bg-card px-4 py-2">筛选</button>
      </form>

      {items.length === 0 ? (
        <p className="mt-12 text-center text-muted">
          还没有符合条件的藏品。<Link href="/admin/items/new" className="text-accent underline">登记第一件</Link>
        </p>
      ) : (
        <ul className="mt-5 divide-y divide-line rounded-sm border border-line bg-card">
          {items.map((i) => {
            const blocks = complianceBlocks(i);
            return (
              <li key={i.id}>
                <Link href={`/admin/items/${i.id}`} className="flex gap-3 p-3 hover:bg-paper">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-sm bg-[#ece7df]">
                    {thumbs[i.images[0]] && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={thumbs[i.images[0]]} alt="" className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">
                      <span className="mr-2 font-mono text-xs text-muted">{i.item_no}</span>
                      {i.title}
                    </p>
                    <p className="mt-0.5 text-sm text-muted">
                      {CATEGORY_LABEL[i.category]}
                      {i.era && ` · ${i.era}`}
                      {i.consignor && ` · 委托人 ${i.consignor.name}`}
                    </p>
                    <p className="mt-0.5 text-sm">
                      <span className="rounded-sm bg-paper px-1.5 py-0.5 text-xs">{STATUS_LABEL[i.status]}</span>
                      {(i.estimate_low != null || i.estimate_high != null) && (
                        <span className="ml-2">估价 {usd(i.estimate_low)}–{usd(i.estimate_high)}</span>
                      )}
                      {blocks.length > 0 && <span className="ml-2 text-xs text-accent">⚠ 合规待处理</span>}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

const chip = (on: boolean) =>
  `rounded-full border px-3 py-1 ${on ? 'border-accent bg-accent text-accent-ink' : 'border-line bg-card hover:border-ink/40'}`;
