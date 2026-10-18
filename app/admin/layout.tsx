import type { Metadata } from 'next';
import Link from 'next/link';
import { isAdmin } from '@/lib/admin/auth';
import { isConfigured } from '@/lib/admin/db';
import { logout } from './actions';
import '../[locale]/globals.css';

export const metadata: Metadata = {
  title: { default: '藏品登记 | 半岛拍卖行', template: '%s | 半岛拍卖行藏品登记' },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const signedIn = isConfigured && (await isAdmin());

  return (
    <html lang="zh-Hans">
      <body className="min-h-screen antialiased">
        <header className="sticky top-0 z-20 border-b border-line bg-paper/95 backdrop-blur">
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4">
            <Link href="/admin" className="font-semibold">
              半岛拍卖行 · 藏品登记
            </Link>
            {signedIn && (
              <nav className="flex items-center gap-1 text-sm sm:gap-4">
                <Link href="/admin" className="px-2 py-2 hover:text-accent">藏品</Link>
                <Link href="/admin/consignors" className="px-2 py-2 hover:text-accent">委托人</Link>
                <Link href="/admin/items/new" className="rounded-sm bg-accent px-3 py-1.5 text-accent-ink">+ 登记</Link>
                <form action={logout}>
                  <button className="px-2 py-2 text-muted hover:text-ink">退出</button>
                </form>
              </nav>
            )}
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6">
          {isConfigured ? children : <p className="text-muted">后台未配置：需要设置 SUPABASE_URL、SUPABASE_SECRET_KEY、ADMIN_PASSWORD。</p>}
        </main>
      </body>
    </html>
  );
}
