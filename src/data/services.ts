export interface Service {
  title: string;
  description: string;
  icon: string; // Phosphor icon name
}

export const services: Service[] = [
  {
    title: 'Evaluación de inquilinos',
    description: 'Verificamos y documentamos para minimizar riesgos.',
    icon: 'user-check',
  },
  {
    title: 'Contratos bajo escritura',
    description: 'Públicos ante Notaría para tu máxima seguridad.',
    icon: 'scroll',
  },
  {
    title: 'Cobranza activa',
    description: 'Seguimiento desde el día 1 de atraso.',
    icon: 'money',
  },
  {
    title: 'Coordinación de mantenimientos',
    description: 'Con aprobación previa y proveedores confiables.',
    icon: 'wrench',
  },
  {
    title: 'Inspección y registro',
    description: 'Fotográfico del estado del inmueble al inicio y al cierre.',
    icon: 'camera',
  },
  {
    title: 'Entrega y cierre',
    description:
      'Verificamos, liquidamos garantías y gestionamos conciliaciones.',
    icon: 'key',
  },
  {
    title: 'Reportes mensuales',
    description: 'Recibí un informe detallado con liquidación y novedades.',
    icon: 'chart-bar',
  },
  {
    title: 'Atención personalizada',
    description: 'Un equipo disponible para resolver lo que necesites.',
    icon: 'chats',
  },
];
