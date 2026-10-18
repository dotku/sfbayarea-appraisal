'use client';

import { useActionState, useState } from 'react';
import { saveItem } from '../actions';
import { CATEGORY_LABEL, SOURCE_LABEL, STATUS_LABEL, type Consignor, type Item } from '@/lib/admin/items';

const input = 'mt-1 w-full rounded-sm border border-line bg-white px-3 py-2';

export default function ItemForm({ item, consignors }: { item?: Item; consignors: Pick<Consignor, 'id' | 'name' | 'city'>[] }) {
  const [state, action, pending] = useActionState(saveItem, null);
  const [consignor, setConsignor] = useState(item?.consignor_id ?? '');

  return (
    <form action={action} className="space-y-8">
      {item && <input type="hidden" name="id" value={item.id} />}

      <Section title="基本信息">
        <Field label="品名 *" wide>
          <input name="title" required maxLength={160} defaultValue={item?.title} placeholder="例：清 青花缠枝莲纹盘" className={input} />
        </Field>
        <Field label="英文品名（英文版网站用，可留空）" wide>
          <input name="title_en" maxLength={160} defaultValue={item?.title_en} placeholder="e.g. Blue-and-white dish with lotus scroll" className={input} />
        </Field>
        <Field label="门类">
          <select name="category" defaultValue={item?.category ?? 'ceramics'} className={input}>
            {Object.entries(CATEGORY_LABEL).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </Field>
        <Field label="年代（委托人所述 / 初步判断）">
          <input name="era" defaultValue={item?.era} placeholder="例：清晚期，存疑" className={input} />
        </Field>
        <Field label="材质">
          <input name="material" defaultValue={item?.material} className={input} />
        </Field>
        <Field label="尺寸">
          <input name="dimensions" defaultValue={item?.dimensions} placeholder="高 × 宽（口径 / 底径）cm" className={input} />
        </Field>
        <Field label="重量">
          <input name="weight" defaultValue={item?.weight} placeholder="g" className={input} />
        </Field>
        <Field label="款识 / 印章" wide>
          <input name="marks" defaultValue={item?.marks} className={input} />
        </Field>
        <Field label="品相（损伤、修复要写清楚）" wide>
          <textarea name="condition" rows={3} defaultValue={item?.condition} className={input} />
        </Field>
      </Section>

      <Section title="来源与委托人">
        <Field label="来源渠道">
          <select name="source_channel" defaultValue={item?.source_channel ?? 'consignment'} className={input}>
            {Object.entries(SOURCE_LABEL).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </Field>
        <Field label="收货 / 委托日期">
          <input type="date" name="acquired_on" defaultValue={item?.acquired_on ?? ''} className={input} />
        </Field>
        <Field label="委托人" wide>
          <select name="consignor_id" value={consignor} onChange={(e) => setConsignor(e.target.value)} className={input}>
            <option value="">（无 / 稍后补）</option>
            {consignors.map((c) => (
              <option key={c.id} value={c.id}>{c.name}{c.city ? `（${c.city}）` : ''}</option>
            ))}
            <option value="new">+ 新委托人…</option>
          </select>
        </Field>
        {consignor === 'new' && (
          <>
            <Field label="新委托人姓名 *">
              <input name="new_consignor_name" required className={input} />
            </Field>
            <Field label="电话">
              <input name="new_consignor_phone" type="tel" className={input} />
            </Field>
            <Field label="微信">
              <input name="new_consignor_wechat" className={input} />
            </Field>
            <Field label="所在城市">
              <input name="new_consignor_city" placeholder="例：Oakland" className={input} />
            </Field>
          </>
        )}
        <Field label="来源 / 传承记录" wide>
          <textarea name="provenance" rows={3} defaultValue={item?.provenance} placeholder="购买时间地点、发票、旧照片、家族传承说明" className={input} />
        </Field>
      </Section>

      <Section title="估价（美元）">
        <Field label="估价下限">
          <input name="estimate_low" inputMode="numeric" defaultValue={item?.estimate_low ?? ''} className={input} />
        </Field>
        <Field label="估价上限">
          <input name="estimate_high" inputMode="numeric" defaultValue={item?.estimate_high ?? ''} className={input} />
        </Field>
        <Field label="底价（委托人同意的最低成交价）">
          <input name="reserve" inputMode="numeric" defaultValue={item?.reserve ?? ''} className={input} />
        </Field>
      </Section>

      <Section title="合规检查">
        <div className="space-y-2 sm:col-span-2">
          <Check name="has_ivory_rhino" defaultChecked={item?.has_ivory_rhino} label="含象牙或犀角（加州禁止买卖，不能上拍）" />
          <Check name="is_archaeological" defaultChecked={item?.is_archaeological} label="疑似出土文物 / 唐代及以前器物" />
          <Check name="has_regulated_wood" defaultChecked={item?.has_regulated_wood} label="受管制木材（黄花梨、紫檀等）" />
          <Check name="provenance_documented" defaultChecked={item?.provenance_documented} label="已有书面来源证明（发票、拍卖记录、出境文件等）" />
        </div>
      </Section>

      <Section title="状态与保管">
        <Field label="状态">
          <select name="status" defaultValue={item?.status ?? 'intake'} className={input}>
            {Object.entries(STATUS_LABEL).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Check name="is_public" defaultChecked={item?.is_public} label="在网站公开展示（只公开品名、门类、年代、材质、尺寸、品相、照片和估价；委托人、底价、备注不公开）" />
        </div>
        <Field label="存放位置">
          <input name="location" defaultValue={item?.location} placeholder="例：仓库 A 架 3 层 / 仍在委托人处" className={input} />
        </Field>
        <Field label="内部备注" wide>
          <textarea name="notes" rows={3} defaultValue={item?.notes} className={input} />
        </Field>
      </Section>

      {state?.error && <p className="rounded-sm border border-accent/40 bg-accent/5 p-3 text-sm text-accent">{state.error}</p>}
      <div className="sticky bottom-0 -mx-4 border-t border-line bg-paper/95 px-4 py-3">
        <button disabled={pending} className="w-full rounded-sm bg-accent py-3 text-accent-ink disabled:opacity-60 sm:w-auto sm:px-10">
          {pending ? '保存中…' : item ? '保存修改' : '保存并添加照片'}
        </button>
      </div>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-sm border border-line bg-card p-4 sm:p-5">
      <legend className="px-1 font-semibold">{title}</legend>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Field({ label, wide, children }: { label: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <label className={`block text-sm ${wide ? 'sm:col-span-2' : ''}`}>
      <span className="text-muted">{label}</span>
      {children}
    </label>
  );
}

function Check({ name, label, defaultChecked }: { name: string; label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-start gap-2 text-sm">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="mt-0.5 h-4 w-4 accent-[var(--accent)]" />
      {label}
    </label>
  );
}
