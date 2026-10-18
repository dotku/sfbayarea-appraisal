import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // Chinese pages are off for now; send old /zh links to the English pages.
  async redirects() {
    return [
      { source: '/zh', destination: '/en', permanent: false },
      { source: '/zh/:path*', destination: '/en/:path*', permanent: false },
    ];
  },
};

export default withNextIntl(nextConfig);
