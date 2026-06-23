export interface Service {
  title: string;
  description: string;
  icon: string; // Phosphor icon name, e.g. "user-check"
}

export const services: Service[] = [
  {
    title: 'Captación y evaluación',
    description:
      'Captamos y evaluamos documentadamente a cada inquilino antes de recomendarlo.',
    icon: 'user-check',
  },
  {
    title: 'Gestión contractual',
    description:
      'Contratos bajo escritura pública ante Notaría, con cláusulas que protegen al propietario.',
    icon: 'scroll',
  },
  {
    title: 'Cobranza activa',
    description:
      'Cobranza gestada desde el día 1 de atraso, sin esperar a fin de mes.',
    icon: 'money',
  },
  {
    title: 'Comunicación con propietarios',
    description:
      'Comunicación permanente y transparente sobre el estado de tu propiedad.',
    icon: 'chats',
  },
  {
    title: 'Mantenimientos',
    description:
      'Coordinación de técnicos y reparaciones con aprobación previa del propietario.',
    icon: 'wrench',
  },
  {
    title: 'Inspección y entrega',
    description:
      'Inspección inicial con registro fotográfico y control de entrega al finalizar.',
    icon: 'camera',
  },
  {
    title: 'Reportes mensuales',
    description:
      'Reportes con liquidación detallada de ingresos, egresos y transferencia al propietario.',
    icon: 'chart-bar',
  },
  {
    title: 'Gestión de conflictos',
    description:
      'Soporte legal en gestión de conflictos, morosidad y conciliaciones.',
    icon: 'shield-check',
  },
];
