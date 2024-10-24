import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'ko', 'ja'],
  defaultLocale: 'en',
  localePrefix: 'always',
  pathnames: {
    '/': '/',  // 홈 페이지
    '/users/[nickname]': '/users/[nickname]',
    // '/users/[nickname]': {
    //   en: '/users/[nickname]',
    //   ko: '/users/[nickname]',
    //   ja: '/users/[nickname]',
    // },
  },
});

// Lightweight wrappers around Next.js' navigation APIs
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
