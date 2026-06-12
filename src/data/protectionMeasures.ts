export interface ProtectionMeasure {
  title: string;
  description: string;
}

export const protectionMeasures: ProtectionMeasure[] = [
  { title: 'Inspección inicial documentada', description: 'Registramos el estado de cada ambiente, instalación y equipamiento antes del ingreso del inquilino.' },
  { title: 'Registro fotográfico completo', description: 'Fotos de todos los ambientes firmadas. Evidencia ante cualquier reclamo sobre el estado del inmueble.' },
  { title: 'Seguimiento periódico', description: 'Monitoreo del estado del inmueble durante la relación contractual con visitas y reportes documentados.' },
  { title: 'Coordinación de reparaciones', description: 'Gestionamos cotizaciones, aprobación del propietario y seguimiento de cada trabajo realizado.' },
  { title: 'Control de entrega documentado', description: 'Al finalizar, verificamos el estado del inmueble, liquidamos garantías y gestionamos conciliaciones.' },
];
