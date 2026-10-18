import { requireAdmin } from '@/lib/admin/auth';
import { db } from '@/lib/admin/db';
import ItemForm from '../ItemForm';

export const dynamic = 'force-dynamic';
export const metadata = { title: '登记新藏品' };

export default async function NewItemPage() {
  await requireAdmin();
  const { data } = await db().from('auction_consignors').select('id, name, city').order('name');

  return (
    <div className="pb-4">
      <h1 className="mb-1 text-2xl font-semibold">登记新藏品</h1>
      <p className="mb-6 text-sm text-muted">先填文字信息，保存后再拍照上传。只有品名是必填的，其余可以之后补。</p>
      <ItemForm consignors={data ?? []} />
    </div>
  );
}
