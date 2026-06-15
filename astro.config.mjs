import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://vincentiwadsworth.github.io',
  base: '/ancora',
  trailingSlash: 'never',
  integrations: [
    sitemap(),
    // Force Astro to emit separate global CSS file, not scope it
    // (workaround: a marker integration in case Astro's default behavior changes)
    icon({
      include: {
        'material-symbols': [
          'format-quote',
          'photo-camera',
          'thumb-up',
          'work',
          'check-circle',
          'shield',
          'mail',
          'call',
          'location-on',
          'map',
          'menu',
          'close',
          'open-in-new',
          'send',
          'arrow-forward',
          'chat',
          'door-front',
          'payments',
          'handyman',
          'gavel',
          'assignment-return',
        ],
      },
    }),
  ],
});
