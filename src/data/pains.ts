export interface Pain {
  icon: string;
  title: string;
  description: string;
}

export const pains: Pain[] = [
  {
    icon: 'door-front',
    title: 'Vacancia',
    description: 'Cada mes vacío representa ingresos perdidos.',
  },
  {
    icon: 'payments',
    title: 'Mora',
    description: 'Los atrasos afectan el flujo de caja y generan conflictos.',
  },
  {
    icon: 'handyman',
    title: 'Mantenimiento',
    description: 'Coordinar técnicos y supervisar reparaciones consume tiempo.',
  },
  {
    icon: 'gavel',
    title: 'Riesgo legal',
    description: 'Contratos deficientes generan exposición y conflictos.',
  },
  {
    icon: 'assignment-return',
    title: 'Entrega',
    description: 'Garantías, daños y conciliaciones al finalizar.',
  },
];
