export const site = {
  brandName: 'ANCORA',
  tagline: 'Administramos. Vos descansás.',
  phone: '+591 00000000',
  whatsapp: '59100000000',
  email: 'contacto@ancora.com.bo',
  address: 'Santa Cruz de la Sierra, Bolivia',
  socialHandles: {
    instagram: 'https://instagram.com/ancora.bo',
    facebook: 'https://facebook.com/ancora.bo',
    linkedin: 'https://linkedin.com/company/ancora-bo',
  },
  umamiEnabled: import.meta.env.PUBLIC_UMAMI_ENABLED === 'true',
  umamiSiteId: import.meta.env.PUBLIC_UMAMI_SITE_ID || '',
} as const;

export const ctaMessages = {
  evaluate: 'Hola Ancora, quiero evaluar mi propiedad para administración.',
  general: 'Hola Ancora, quiero más información sobre sus servicios.',
  process: 'Hola Ancora, quiero saber más sobre el proceso de selección de inquilinos.',
} as const;

export type CtaIntent = keyof typeof ctaMessages;

export function whatsappLink(intent: CtaIntent): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(ctaMessages[intent])}`;
}
