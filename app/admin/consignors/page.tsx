import { requireAdmin } from '@/lib/admin/auth';
import { db } from '@/lib/admin/db';
import type { Consignor } from '@/lib/admin/items';
import ConsignorForm from './ConsignorForm';

export const dynamic = 'force-dynamic';
export const metadata = { title: '委托人' };

export default async function ConsignorsPage() {
  await requireAdmin();
  const sb = db();
  const [{ data }, { data: items }] = await Promise.all([
    sb.from('auction_consignors').select('*').order('created_at', { ascending: false }),
    sb.from('auction_items').select('consignor_id'),
  ]);
  const counts = (items ?? []).reduce<Record<string, number>>((m, r) => (r.consignor_id && (m[r.consignor_id] = (m[r.consignor_id] ?? 0) + 1), m), {});
  const list = (data ?? []) as Consignor[];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">委托人</h1>
      <ConsignorForm />
      {list.length === 0 ? (
        <p className="text-muted">还没有委托人。登记藏品时也可以直接新建。</p>
      ) : (
        <div className="overflow-x-auto rounded-sm border border-line bg-card">
          <table className="w-full text-sm">
            <thead className="bg-paper text-left text-muted">
              <tr>
                <th className="px-3 py-2">姓名</th>
                <th className="px-3 py-2">城市</th>
                <th className="px-3 py-2">电话</th>
                <th className="px-3 py-2">微信</th>
                <th className="px-3 py-2">邮箱</th>
                <th className="px-3 py-2">藏品</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {list.map((c) => (
                <tr key={c.id}>
                  <td className="px-3 py-2 font-medium">{c.name}</td>
                  <td className="px-3 py-2">{c.city}</td>
                  <td className="px-3 py-2">{c.phone}</td>
                  <td className="px-3 py-2">{c.wechat}</td>
                  <td className="px-3 py-2">{c.email}</td>
                  <td className="px-3 py-2">{counts[c.id] ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
