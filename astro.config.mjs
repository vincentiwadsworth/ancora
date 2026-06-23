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
        // Retained until PR 3 migrates all components to Phosphor
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
        // Phosphor icons — new icon set for the one-pager
        ph: [
          'arrow-right',
          'calendar-blank',
          'calendar-check',
          'camera',
          'caret-down',
          'chart-bar',
          'chat-circle',
          'chats',
          'check',
          'check-circle',
          'clock',
          'door-open',
          'envelope-simple',
          'facebook-logo',
          'flag-checkered',
          'gear',
          'handshake',
          'house',
          'instagram-logo',
          'key',
          'linkedin-logo',
          'list',
          'map-pin',
          'minus',
          'money',
          'phone',
          'plus',
          'scales',
          'scroll',
          'shield-check',
          'user-check',
          'whatsapp-logo',
          'wrench',
          'x',
        ],
      },
    }),
  ],
});
