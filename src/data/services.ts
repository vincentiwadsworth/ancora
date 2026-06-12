export interface Service {
  title: string;
  description: string;
}

export const services: Service[] = [
  { title: 'Captación y evaluación', description: 'Captación y evaluación documentada de inquilinos.' },
  { title: 'Contratos notaría', description: 'Contratos bajo escritura pública ante Notaría.' },
  { title: 'Cobranza activa', description: 'Cobranza activa desde el día 1 de atraso.' },
  { title: 'Mantenimiento', description: 'Coordinación de mantenimientos con aprobación previa.' },
  { title: 'Inspección y entrega', description: 'Inspección, registro fotográfico y control de entrega.' },
  { title: 'Reportes', description: 'Reportes periódicos con liquidación detallada.' },
  { title: 'Soporte en conflictos', description: 'Soporte en gestión de conflictos.' },
];
