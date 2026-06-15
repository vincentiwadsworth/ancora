export interface ProcessStepData {
  step: number;
  title: string;
  description: string;
}

export const tenantSelectionSteps: ProcessStepData[] = [
  {
    step: 1,
    title: 'Verificación de ingresos',
    description: 'Comprobamos que el inquilino tenga capacidad de pago real.',
  },
  {
    step: 2,
    title: 'Referencias laborales',
    description:
      'Contactamos al empleador o verificamos la actividad comercial para confirmar estabilidad.',
  },
  {
    step: 3,
    title: 'Evaluación documental',
    description: 'Documentamos todo el proceso de evaluación.',
  },
  {
    step: 4,
    title: 'Validación del propietario',
    description:
      'Presentamos el perfil completo. La decisión final siempre la toma el propietario.',
  },
];
