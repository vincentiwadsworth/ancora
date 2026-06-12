export interface Pain {
  number: number;
  title: string;
  description: string;
}

export const pains: Pain[] = [
  { number: 1, title: 'Vacancia', description: 'Cada mes vacío representa ingresos perdidos.' },
  { number: 2, title: 'Mora', description: 'Los atrasos afectan el flujo de caja y generan conflictos.' },
  { number: 3, title: 'Mantenimiento', description: 'Coordinar técnicos y supervisar reparaciones consume tiempo.' },
  { number: 4, title: 'Riesgo legal', description: 'Contratos deficientes generan exposición y conflictos.' },
  { number: 5, title: 'Entrega', description: 'Garantías, daños y conciliaciones al finalizar.' },
];
