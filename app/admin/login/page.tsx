'use client';

import { useActionState } from 'react';
import { login } from '../actions';

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, null);

  return (
    <form action={action} className="mx-auto mt-16 max-w-sm space-y-4 rounded-sm border border-line bg-card p-6">
      <h1 className="text-lg font-semibold">员工登录</h1>
      <label className="block text-sm">
        <span className="text-muted">密码</span>
        <input name="password" type="password" autoFocus required className="mt-1 w-full rounded-sm border border-line bg-white px-3 py-2" />
      </label>
      {state?.error && <p className="text-sm text-accent">{state.error}</p>}
      <button disabled={pending} className="w-full rounded-sm bg-accent py-2.5 text-accent-ink disabled:opacity-60">
        {pending ? '登录中…' : '登录'}
      </button>
    </form>
  );
}
