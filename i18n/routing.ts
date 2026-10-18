import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // English and Spanish for now; messages/zh.json is kept so Chinese can be switched
  // back on by adding 'zh' here (and removing the /zh redirect in next.config.ts).
  locales: ['en', 'es'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
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
