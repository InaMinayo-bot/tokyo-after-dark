import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Project site: https://inaminayo-bot.github.io/tokyo-after-dark/
export default defineConfig({
  site: 'https://inaminayo-bot.github.io',
  base: '/tokyo-after-dark',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/newsletter/'),
    }),
  ],
});
