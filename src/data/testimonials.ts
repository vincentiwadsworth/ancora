export interface Testimonial {
  quote: string;
  name: string;
  role: string; // relationship to ÁNCORA, e.g. "Propietaria en Santa Cruz"
}

// CONTENT LOADED: textos reales de clientes. Los roles son placeholder —
// los dueños de Áncora deben definir el vínculo exacto de cada persona.
export const testimonials: Testimonial[] = [
  {
    quote:
      'Antes de contratar el servicio estaba pendiente de cualquier tema que surgiera con el departamento. Ahora prácticamente no tengo que intervenir. Me mantienen informado y sé que la propiedad está bien administrada. Para mí ha sido un gran alivio.',
    name: 'Carlos Siles F.',
    role: 'Propietario en Santa Cruz',
  },
  {
    quote:
      'El proceso para alquilar fue más rápido de lo que esperaba. Me ayudaron a encontrar un buen inquilino y desde entonces la administración ha sido muy ordenada. Los reportes son claros y los pagos siempre están bien documentados.',
    name: 'Michelle Villar G.',
    role: 'Propietaria en Santa Cruz',
  },
  {
    quote:
      'Diego nos explicó todo desde el principio de una forma muy clara. Siempre respondió nuestras consultas y cuando apareció un pequeño inconveniente con el departamento, se ocupó de resolverlo sin que tuviéramos que estar encima. Muy buena experiencia.',
    name: 'Alejandro Moscoso',
    role: 'Propietario en Santa Cruz',
  },
  {
    quote:
      'No vivo en Santa Cruz y necesitaba alguien de confianza para administrar mi departamento. Hasta ahora la experiencia ha sido muy buena. Se encargan de todo y yo solo recibo las novedades cuando corresponde.',
    name: 'Walker San Miguel',
    role: 'Propietario en Santa Cruz',
  },
];
