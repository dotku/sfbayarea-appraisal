import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'zh'],

  // Used when no locale matches
  defaultLocale: 'en',

  // The `pathnames` object maps internal pathnames to locale-specific paths
  pathnames: {
    '/': '/',
    '/about': {
      en: '/about',
      zh: '/about'
    },
    '/services': {
      en: '/services',
      zh: '/services'
    },
    '/pricing': {
      en: '/pricing',
      zh: '/pricing'
    },
    '/members': {
      en: '/members',
      zh: '/members'
    },
    '/news': {
      en: '/news',
      zh: '/news'
    },
    '/contact': {
      en: '/contact',
      zh: '/contact'
    }
  }
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
