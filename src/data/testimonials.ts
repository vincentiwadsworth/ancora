export interface Testimonial {
  quote: string;
  name: string;
  role: string; // relationship to ANCORA, e.g. "Propietaria en Santa Cruz"
}

// PLACEHOLDER: Luis Valenzuela confirmó que pasará testimonios reales de amigos/clientes.
// Reemplazar estos placeholders cuando lleguen los textos definitivos.
export const testimonials: Testimonial[] = [
  {
    quote: 'PLACEHOLDER — Texto del testimonio a confirmar con Luis.',
    name: 'Nombre del cliente',
    role: 'Propietario en Santa Cruz',
  },
  {
    quote: 'PLACEHOLDER — Texto del testimonio a confirmar con Luis.',
    name: 'Nombre del cliente',
    role: 'Propietario en Santa Cruz',
  },
];
