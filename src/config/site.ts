export const site = {
  brandName: 'ÁNCORA',
  tagline: 'Administramos. Vos descansás.',
  phone: '+591 78077772',
  whatsapp: '59178077772',
  email: 'contacto@ancora.com.bo',
  address: 'Santa Cruz de la Sierra, Bolivia',
  socialHandles: {
    instagram: 'https://www.instagram.com/ancora.scz/?hl=es-la',
    facebook: 'https://www.facebook.com/ancora.scz',
    linkedin: 'https://www.linkedin.com/company/ancora-scz/',
    tiktok: 'https://www.tiktok.com/@ancora.scz',
  },
  umamiEnabled: import.meta.env.PUBLIC_UMAMI_ENABLED === 'true',
  umamiSiteId: import.meta.env.PUBLIC_UMAMI_SITE_ID || '',
} as const;

export const ctaMessages = {
  evaluate: 'Hola Ancora, quiero evaluar mi propiedad para administración.',
  general: 'Hola Ancora, quiero más información sobre sus servicios.',
  solicitarAsesoria:
    'Hola Ancora, quiero solicitar una asesoría gratuita para mi propiedad.',
} as const;

export type CtaIntent = keyof typeof ctaMessages;

export function whatsappLink(intent: CtaIntent): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(ctaMessages[intent])}`;
}
