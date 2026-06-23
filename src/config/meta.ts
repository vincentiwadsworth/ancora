import { site } from './site';

export type PageKey = 'home';

export interface PageMeta {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonical: string;
}

const base = 'https://ancora.com.bo';

const meta: Record<PageKey, PageMeta> = {
  home: {
    title: `${site.brandName} — ${site.tagline}`,
    description:
      'Administración profesional de activos residenciales en alquiler. Rentabilidad, protección y tranquilidad para inversores inmobiliarios en Bolivia.',
    ogTitle: `${site.brandName} — ${site.tagline}`,
    ogDescription:
      'Administración profesional de activos residenciales en alquiler en Bolivia.',
    ogImage: `${base}/og/home.png`,
    canonical: `${base}/`,
  },
};

// Fallback to home meta for any page key not yet migrated to the one-pager.
// PR 2 removes the remaining multi-page routes that pass non-home keys.
export function getPageMeta(page: PageKey): PageMeta {
  return (meta as Record<string, PageMeta>)[page] ?? meta.home;
}
