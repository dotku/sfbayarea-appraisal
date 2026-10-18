import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // One messages/<locale>.json per locale; zh is Traditional Chinese.
  locales: ['en', 'es', 'zh', 'fr', 'ru'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/departments': '/departments',
    '/departments/[slug]': '/departments/[slug]',
    '/items': '/items',
    '/items/[no]': '/items/[no]',
    '/collecting': '/collecting',
    '/services': '/services',
    '/collection': '/collection',
    '/pricing': '/pricing',
    '/contact': '/contact',
  },
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
