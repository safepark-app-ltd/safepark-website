// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL is set by the deploy workflow. It is https://preview.safepark.app
// until go-live, then https://safepark.app (see docs/deploy.md).
const site = process.env.SITE_URL ?? 'https://preview.safepark.app';

export default defineConfig({
  site,
  // Every address the old WordPress site published ends in a slash. Keep it
  // that way so Google sees the same URLs after the switch.
  trailingSlash: 'always',
  build: { format: 'directory' },
  redirects: {
    // Old WordPress category archive.
    '/category/latest-news/': '/guides/',
  },
  integrations: [sitemap({ filter: (page) => !page.includes('/category/') })],
});
