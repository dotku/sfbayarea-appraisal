import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'zh'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/items': '/items',
    '/items/[no]': '/items/[no]',
    '/services': '/services',
    '/collection': '/collection',
    '/pricing': '/pricing',
    '/contact': '/contact',
  },
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
