'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Link, routing, usePathname } from '@/i18n/routing';

const NAV = [
  { href: '/', key: 'home' },
  { href: '/departments', key: 'departments' },
  { href: '/items', key: 'items' },
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
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:gap-8 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center sm:h-9 sm:w-9 rounded-sm bg-accent font-serif text-sm font-semibold tracking-tight text-accent-ink">PA</span>
          <span className="leading-tight">
            <span className="block max-w-[11rem] font-serif text-[15px] font-semibold leading-tight sm:hidden">{t('brand.short')}</span>
            <span className="hidden whitespace-nowrap font-serif text-lg font-semibold sm:block">{t('brand.name')}</span>
            <span className="hidden whitespace-nowrap text-xs text-muted sm:block">{t('brand.en')}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 whitespace-nowrap text-sm xl:flex">
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

        <div className="flex items-center gap-2 xl:hidden">
          <LocaleSwitch locale={locale} pathname={pathname} />
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
            className="rounded-sm border border-line px-2.5 py-1.5 text-sm"
          >
            {open ? t('nav.close') : t('nav.menu')}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-line bg-paper px-4 pb-4 xl:hidden">
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

// Short code on the button, the language's own name in the list.
const LOCALES: Record<string, { code: string; name: string }> = {
  en: { code: 'EN', name: 'English' },
  es: { code: 'ES', name: 'Español' },
  zh: { code: '中文', name: '中文（繁體）' },
  fr: { code: 'FR', name: 'Français' },
  ru: { code: 'RU', name: 'Русский' },
};

function LocaleSwitch({ locale, pathname }: { locale: string; pathname: ReturnType<typeof usePathname> }) {
  const t = useTranslations('nav');
  // Dynamic routes (/items/[no]) need their params to build the other-language URL.
  const params = useParams();
  const href = { pathname, params } as unknown as Parameters<typeof Link>[0]['href'];
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [locale, pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === 'Escape' : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', close);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t('language')}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-sm border border-line px-2.5 py-1.5 text-sm text-ink/80 hover:border-ink/40 hover:text-ink"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9M12 3c-2.5 2.6-3.8 5.6-3.8 9s1.3 6.4 3.8 9" />
        </svg>
        <span className="whitespace-nowrap">{LOCALES[locale]?.code ?? locale.toUpperCase()}</span>
        <svg aria-hidden="true" viewBox="0 0 20 20" className={`h-3 w-3 transition ${open ? 'rotate-180' : ''}`} fill="currentColor">
          <path d="M5.5 7.5 10 12l4.5-4.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
        </svg>
      </button>
      {open && (
        <ul role="menu" className="absolute right-0 z-40 mt-1 min-w-40 overflow-hidden rounded-sm border border-line bg-card py-1 text-sm shadow-lg">
          {routing.locales.map((l) => (
            <li key={l} role="none">
              {l === locale ? (
                <span role="menuitem" aria-current="true" className="flex items-center justify-between gap-3 px-3 py-2 font-semibold text-accent">
                  {LOCALES[l].name} <span aria-hidden="true">✓</span>
                </span>
              ) : (
                <Link role="menuitem" href={href} locale={l} lang={l === 'zh' ? 'zh-Hant' : l} className="block px-3 py-2 hover:bg-paper">
                  {LOCALES[l].name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
