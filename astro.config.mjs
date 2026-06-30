import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ancora.com.bo',
  trailingSlash: 'never',
  integrations: [
    sitemap(),
    // Force Astro to emit separate global CSS file, not scope it
    // (workaround: a marker integration in case Astro's default behavior changes)
    icon({
      include: {
        // Phosphor icons — sole icon set for the one-pager (material-symbols
        // fully removed in PR 3 once Footer + ComparisonVisual migrated).
        ph: [
          'arrow-right',
          'calendar-blank',
          'calendar-check',
          'calculator',
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
          'file-text',
          'flag-checkered',
          'gavel',
          'package',
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
          'receipt',
          'list-checks',
          'clipboard-text',
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
