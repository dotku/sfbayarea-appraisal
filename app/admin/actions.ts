'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { passwordMatches, requireAdmin, signIn, signOut } from '@/lib/admin/auth';
import { BUCKET, db } from '@/lib/admin/db';
import { CATEGORY_LABEL, SOURCE_LABEL, STATUS_LABEL, complianceBlocks } from '@/lib/admin/items';

export async function login(_: unknown, form: FormData) {
  if (!passwordMatches(String(form.get('password') ?? ''))) return { error: '密码不对' };
  await signIn();
  redirect('/admin');
}

export async function logout() {
  await signOut();
  redirect('/admin/login');
}

const text = (f: FormData, k: string, max = 2000) => String(f.get(k) ?? '').trim().slice(0, max);
const money = (f: FormData, k: string) => {
  const v = String(f.get(k) ?? '').replace(/[$,\s]/g, '');
  if (!v) return null;
  const n = Math.round(Number(v));
  return Number.isFinite(n) && n >= 0 ? n : null;
};
const oneOf = <T extends string>(v: string, labels: Record<T, string>, fallback: NoInfer<T>): T => (v in labels ? (v as T) : fallback);

export async function saveItem(_: unknown, form: FormData): Promise<{ error?: string }> {
  await requireAdmin();
  const id = text(form, 'id', 64);
  const sb = db();

  let consignorId: string | null = text(form, 'consignor_id', 64) || null;
  if (consignorId === 'new') {
    const name = text(form, 'new_consignor_name', 120);
    if (!name) return { error: '选了「新委托人」，请填写委托人姓名' };
    const { data, error } = await sb
      .from('auction_consignors')
      .insert({ name, phone: text(form, 'new_consignor_phone', 40), wechat: text(form, 'new_consignor_wechat', 60), city: text(form, 'new_consignor_city', 60) })
      .select('id')
      .single();
    if (error) return { error: `委托人保存失败：${error.message}` };
    consignorId = data.id;
  }

  const row = {
    title: text(form, 'title', 160),
    title_en: text(form, 'title_en', 160),
    is_public: form.get('is_public') === 'on',
    category: oneOf(text(form, 'category'), CATEGORY_LABEL, 'other'),
    era: text(form, 'era', 200),
    material: text(form, 'material', 200),
    dimensions: text(form, 'dimensions', 200),
    weight: text(form, 'weight', 100),
    marks: text(form, 'marks', 500),
    grade_company: text(form, 'grade_company', 40),
    grade: text(form, 'grade', 40),
    cert_no: text(form, 'cert_no', 60),
    condition: text(form, 'condition'),
    provenance: text(form, 'provenance'),
    source_channel: oneOf(text(form, 'source_channel'), SOURCE_LABEL, 'consignment'),
    consignor_id: consignorId,
    acquired_on: text(form, 'acquired_on', 10) || null,
    estimate_low: money(form, 'estimate_low'),
    estimate_high: money(form, 'estimate_high'),
    reserve: money(form, 'reserve'),
    has_ivory_rhino: form.get('has_ivory_rhino') === 'on',
    is_archaeological: form.get('is_archaeological') === 'on',
    has_regulated_wood: form.get('has_regulated_wood') === 'on',
    provenance_documented: form.get('provenance_documented') === 'on',
    status: oneOf(text(form, 'status'), STATUS_LABEL, 'intake'),
    location: text(form, 'location', 200),
    notes: text(form, 'notes'),
    updated_at: new Date().toISOString(),
  };

  if (!row.title) return { error: '请填写品名' };
  if (row.estimate_low != null && row.estimate_high != null && row.estimate_low > row.estimate_high) {
    return { error: '估价下限不能高于上限' };
  }
  const blocks = complianceBlocks(row);
  if (blocks.length && row.is_public) return { error: `合规未通过的藏品不能在网站展示：${blocks.join('；')}` };
  if (blocks.length && (row.status === 'listed' || row.status === 'sold')) {
    return { error: `不能设为「${STATUS_LABEL[row.status]}」：${blocks.join('；')}` };
  }

  const res = id
    ? await sb.from('auction_items').update(row).eq('id', id).select('id').single()
    : await sb.from('auction_items').insert(row).select('id').single();
  if (res.error) return { error: `保存失败：${res.error.message}` };

  revalidatePath('/admin');
  revalidatePath('/[locale]/items', 'layout');
  revalidatePath('/[locale]', 'page');
  redirect(`/admin/items/${res.data.id}${id ? '?saved=1' : '?created=1'}`);
}

/** A one-time URL the browser uploads a (downscaled) photo to directly, so big files never pass through the server. */
export async function createUploadUrl(itemId: string, ext: string) {
  await requireAdmin();
  const safeExt = /^(jpe?g|png|webp|heic)$/i.test(ext) ? ext.toLowerCase() : 'jpg';
  const path = `${itemId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`;
  const { data, error } = await db().storage.from(BUCKET).createSignedUploadUrl(path);
  if (error) throw new Error(error.message);
  return { path, url: data.signedUrl };
}

export async function attachImage(itemId: string, path: string) {
  await requireAdmin();
  if (!path.startsWith(`${itemId}/`)) throw new Error('bad path');
  const sb = db();
  const { data } = await sb.from('auction_items').select('images').eq('id', itemId).single();
  const images = [...(data?.images ?? []), path];
  await sb.from('auction_items').update({ images, updated_at: new Date().toISOString() }).eq('id', itemId);
  revalidatePath(`/admin/items/${itemId}`);
}

export async function removeImage(itemId: string, path: string) {
  await requireAdmin();
  const sb = db();
  const { data } = await sb.from('auction_items').select('images').eq('id', itemId).single();
  await sb.from('auction_items').update({ images: (data?.images ?? []).filter((p: string) => p !== path) }).eq('id', itemId);
  await sb.storage.from(BUCKET).remove([path]);
  revalidatePath(`/admin/items/${itemId}`);
}

export async function makeCover(itemId: string, path: string) {
  await requireAdmin();
  const sb = db();
  const { data } = await sb.from('auction_items').select('images').eq('id', itemId).single();
  const rest = (data?.images ?? []).filter((p: string) => p !== path);
  await sb.from('auction_items').update({ images: [path, ...rest] }).eq('id', itemId);
  revalidatePath(`/admin/items/${itemId}`);
}

export async function saveConsignor(_: unknown, form: FormData): Promise<{ error?: string; ok?: boolean }> {
  await requireAdmin();
  const id = text(form, 'id', 64);
  const row = {
    name: text(form, 'name', 120),
    phone: text(form, 'phone', 40),
    email: text(form, 'email', 120),
    wechat: text(form, 'wechat', 60),
    city: text(form, 'city', 60),
    notes: text(form, 'notes'),
  };
  if (!row.name) return { error: '请填写姓名' };
  const sb = db();
  const { error } = id ? await sb.from('auction_consignors').update(row).eq('id', id) : await sb.from('auction_consignors').insert(row);
  if (error) return { error: error.message };
  revalidatePath('/admin/consignors');
  return { ok: true };
}
