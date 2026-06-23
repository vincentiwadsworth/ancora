export interface Pain {
  icon: string; // Phosphor icon name
  title: string;
  description: string;
}

export const pains: Pain[] = [
  {
    icon: 'house',
    title: 'Vacancia',
    description: 'Cada mes vacío es dinero perdido.',
  },
  {
    icon: 'calendar-check',
    title: 'Mora',
    description: 'Retrasos que afectan tu flujo de caja y generan conflictos.',
  },
  {
    icon: 'wrench',
    title: 'Mantenimiento',
    description: 'Coordinar técnicos y supervisar reparaciones.',
  },
  {
    icon: 'file-text',
    title: 'Riesgo legal',
    description: 'Contratos deficientes generan exposición y conflictos.',
  },
  {
    icon: 'package',
    title: 'Entrega',
    description: 'Daños, garantías y conciliaciones al finalizar.',
  },
];
