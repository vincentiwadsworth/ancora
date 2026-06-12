import { site } from './site';

export type PageKey = 'home' | 'services' | 'about' | 'contact';

export interface PageMeta {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonical: string;
}

const base = `https://ancora.com.bo`;

const meta: Record<PageKey, PageMeta> = {
  home: {
    title: `${site.brandName} — ${site.tagline}`,
    description: 'Administración profesional de activos residenciales en alquiler. Rentabilidad, protección y tranquilidad para inversores inmobiliarios en Bolivia.',
    ogTitle: `${site.brandName} — ${site.tagline}`,
    ogDescription: 'Administración profesional de activos residenciales en alquiler en Bolivia.',
    ogImage: `${base}/og/home.png`,
    canonical: base + '/',
  },
  services: {
    title: `Servicios — ${site.brandName}`,
    description: 'Administración integral de propiedades en alquiler: captación, contratos, cobranza, mantenimiento, inspección y reportes.',
    ogTitle: `Servicios — ${site.brandName}`,
    ogDescription: 'Administración integral de propiedades en alquiler.',
    ogImage: `${base}/og/services.png`,
    canonical: base + '/services',
  },
  about: {
    title: `Sobre nosotros — ${site.brandName}`,
    description: 'Conoce al equipo de ANCORA y los valores que guían la administración de tu propiedad.',
    ogTitle: `Sobre nosotros — ${site.brandName}`,
    ogDescription: 'Equipo y valores de ANCORA.',
    ogImage: `${base}/og/about.png`,
    canonical: base + '/about',
  },
  contact: {
    title: `Contacto — ${site.brandName}`,
    description: 'Contacta a ANCORA para evaluar tu propiedad o solicitar información sobre nuestros servicios.',
    ogTitle: `Contacto — ${site.brandName}`,
    ogDescription: 'Contacta a ANCORA.',
    ogImage: `${base}/og/contact.png`,
    canonical: base + '/contact',
  },
};

export function getPageMeta(page: PageKey): PageMeta {
  return meta[page];
}
