import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ancora.com.bo',
  trailingSlash: 'never',
  integrations: [sitemap()],
});
