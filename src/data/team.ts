export interface TeamMemberData {
  name: string;
  initials: string;
  credentials: string;
  education: string;
  experience: string;
}

export const team: TeamMemberData[] = [
  {
    name: 'Diego Paniagua',
    initials: 'DP',
    credentials: 'Formado en Administración de Empresas.',
    education: 'Universidad NN, Buenos Aires, Argentina.',
    experience: 'A definir',
  },
  {
    name: 'Luis Adolfo Valenzuela',
    initials: 'LV',
    credentials: 'Formado en Ingeniería Civil. Especializaciones en Gestión Inmobiliaria.',
    education: 'Universidad Gabriela Mistral, Santiago, Chile. Pontificia Universidad Católica de Chile (PUC) y Universidad de Chile (UC).',
    experience: 'Años de experiencia en desarrollos inmobiliarios.',
  },
];
