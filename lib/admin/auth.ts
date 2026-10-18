import 'server-only';

import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// One shared staff password (ADMIN_PASSWORD) for now; the cookie holds an
// HMAC of a fixed label, so changing the password signs everyone out.
const COOKIE = 'pa_admin';

function token() {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return null;
  return createHmac('sha256', pw).update('peninsula-admin-v1').digest('hex');
}

export function passwordMatches(input: string) {
  const pw = process.env.ADMIN_PASSWORD ?? '';
  const a = Buffer.from(input);
  const b = Buffer.from(pw);
  return pw.length > 0 && a.length === b.length && timingSafeEqual(a, b);
}

export async function signIn() {
  const t = token();
  if (!t) return;
  (await cookies()).set(COOKIE, t, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/admin', maxAge: 60 * 60 * 24 * 30 });
}

export async function signOut() {
  (await cookies()).delete({ name: COOKIE, path: '/admin' });
}

export async function isAdmin() {
  const t = token();
  const c = (await cookies()).get(COOKIE)?.value;
  return Boolean(t && c && c.length === t.length && timingSafeEqual(Buffer.from(c), Buffer.from(t)));
}

export async function requireAdmin() {
  if (!(await isAdmin())) redirect('/admin/login');
}
