export interface Pain {
  icon: string; // Phosphor icon name
  title: string;
  description: string;
}

export const pains: Pain[] = [
  {
    icon: 'door-open',
    title: 'Vacancia',
    description:
      'Cada mes sin inquilino es renta que no recuperás y gastos que siguen corriendo.',
  },
  {
    icon: 'money',
    title: 'Mora',
    description:
      'Los atrasos en el pago afectan tu flujo de caja y escalan en conflictos.',
  },
  {
    icon: 'wrench',
    title: 'Mantenimiento',
    description:
      'Coordinar técnicos, supervisar reparaciones y responder urgencias consume tu tiempo.',
  },
  {
    icon: 'scales',
    title: 'Riesgo legal',
    description:
      'Contratos mal redactados te exponen a desalojos prolongados y juicios.',
  },
  {
    icon: 'key',
    title: 'Entrega',
    description:
      'Garantías insuficientes, daños ocultos y conciliaciones al finalizar el contrato.',
  },
];
