'use client';

import { useActionState, useEffect, useRef } from 'react';
import { saveConsignor } from '../actions';

const input = 'mt-1 w-full rounded-sm border border-line bg-white px-3 py-2';

export default function ConsignorForm() {
  const [state, action, pending] = useActionState(saveConsignor, null);
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state?.ok) ref.current?.reset();
  }, [state]);

  return (
    <form ref={ref} action={action} className="grid gap-3 rounded-sm border border-line bg-card p-4 sm:grid-cols-3">
      <label className="block text-sm"><span className="text-muted">姓名 *</span><input name="name" required className={input} /></label>
      <label className="block text-sm"><span className="text-muted">电话</span><input name="phone" type="tel" className={input} /></label>
      <label className="block text-sm"><span className="text-muted">微信</span><input name="wechat" className={input} /></label>
      <label className="block text-sm"><span className="text-muted">邮箱</span><input name="email" type="email" className={input} /></label>
      <label className="block text-sm"><span className="text-muted">所在城市</span><input name="city" placeholder="例：San Mateo" className={input} /></label>
      <label className="block text-sm"><span className="text-muted">备注</span><input name="notes" className={input} /></label>
      <div className="flex items-center gap-3 sm:col-span-3">
        <button disabled={pending} className="rounded-sm bg-accent px-5 py-2 text-sm text-accent-ink disabled:opacity-60">{pending ? '保存中…' : '添加委托人'}</button>
        {state?.error && <span className="text-sm text-accent">{state.error}</span>}
        {state?.ok && <span className="text-sm text-muted">已添加</span>}
      </div>
    </form>
  );
}
