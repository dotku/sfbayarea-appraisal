'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Link, routing, usePathname } from '@/i18n/routing';

const NAV = [
  { href: '/', key: 'home' },
  { href: '/items', key: 'items' },
  { href: '/collecting', key: 'collecting' },
  { href: '/services', key: 'services' },
  { href: '/collection', key: 'collection' },
] as const;

export default function SiteHeader() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on navigation, language switch or Escape.
  useEffect(() => setOpen(false), [pathname, locale]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  const linkClass = (href: string) =>
    isActive(href) ? 'text-accent font-semibold underline decoration-2 underline-offset-8' : 'text-ink/80 hover:text-ink';
  const ctaActive = isActive('/contact');

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-sm bg-accent font-serif text-sm font-semibold tracking-tight text-accent-ink">PA</span>
          <span className="leading-tight">
            <span className="block font-serif text-base font-semibold sm:hidden">{t('brand.short')}</span>
            <span className="hidden font-serif text-lg font-semibold sm:block">{t('brand.name')}</span>
            <span className="hidden text-xs text-muted sm:block">{t('brand.en')}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={isActive(n.href) ? 'page' : undefined} className={linkClass(n.href)}>
              {t(`nav.${n.key}`)}
            </Link>
          ))}
          <Link
            href="/contact"
            aria-current={ctaActive ? 'page' : undefined}
            className={`rounded-sm px-4 py-2 ${
              ctaActive ? 'border border-accent text-accent' : 'bg-accent text-accent-ink hover:opacity-90'
            }`}
          >
            {t('nav.contact')}
          </Link>
          <LocaleSwitch locale={locale} pathname={pathname} />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <LocaleSwitch locale={locale} pathname={pathname} />
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
            className="rounded-sm border border-line px-3 py-1.5 text-sm"
          >
            {open ? t('nav.close') : t('nav.menu')}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-line bg-paper px-4 pb-4 md:hidden">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? 'page' : undefined}
              onClick={() => setOpen(false)}
              className={`block border-b border-line py-3 ${isActive(n.href) ? 'font-semibold text-accent' : 'text-ink/80'}`}
            >
              {t(`nav.${n.key}`)}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-sm bg-accent px-4 py-3 text-center text-accent-ink"
          >
            {t('nav.contact')}
          </Link>
        </nav>
      )}
    </header>
  );
}

const LOCALE_LABEL: Record<string, string> = { en: 'EN', es: 'ES', zh: '中文' };

function LocaleSwitch({ locale, pathname }: { locale: string; pathname: ReturnType<typeof usePathname> }) {
  // Dynamic routes (/items/[no]) need their params to build the other-language URL.
  const params = useParams();
  const href = { pathname, params } as unknown as Parameters<typeof Link>[0]['href'];
  return (
    <span className="flex items-center text-sm">
      {routing.locales.map((l) =>
        l === locale ? (
          <span key={l} className="px-1.5 py-2 font-semibold text-ink">{LOCALE_LABEL[l]}</span>
        ) : (
          <Link key={l} href={href} locale={l} className="px-1.5 py-2 text-muted hover:text-ink">
            {LOCALE_LABEL[l]}
          </Link>
        ),
      )}
    </span>
  );
}
