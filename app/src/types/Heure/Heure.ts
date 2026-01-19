export interface Heure {
  HeureID: string;
  ClubID: number;
  MembreID: number;
  membreName: string;
  dateHeure: Date;
  duree: number; // en heures
  type: 'accepted' | 'waited' | 'rejected';
  description?: string;
}

export const heureExample: Heure[] = [
  {
    HeureID: '1',
    ClubID: 1,
    MembreID: 1,
    membreName: 'Jean Dupont',
    dateHeure: new Date('2024-01-15'),
    duree: 1.5,
    type: 'accepted',
    description: 'Séance de travail',
  },
  {
    HeureID: '2',
    ClubID: 1,
    MembreID: 2,
    membreName: 'Marie Martin',
    dateHeure: new Date('2024-01-15'),
    duree: 2,
    type: 'accepted',
    description: 'Séance de travail',
  },
  {
    HeureID: '3',
    ClubID: 1,
    MembreID: 3,
    membreName: 'Pierre Bernard',
    dateHeure: new Date('2024-01-16'),
    duree: 2,
    type: 'waited',
    description: 'Formation leadership',
  },
  {
    HeureID: '4',
    ClubID: 1,
    MembreID: 1,
    membreName: 'Jean Dupont',
    dateHeure: new Date('2024-01-17'),
    duree: 1,
    type: 'accepted',
    description: 'Réunion bureau',
  },
  {
    HeureID: '5',
    ClubID: 1,
    MembreID: 4,
    membreName: 'Sophie Lefevre',
    dateHeure: new Date('2024-01-18'),
    duree: 1,
    type: 'rejected',
  },
  // Club 2 examples
  {
    HeureID: '6',
    ClubID: 2,
    MembreID: 5,
    membreName: 'Antoine Girard',
    dateHeure: new Date('2024-01-15'),
    duree: 2,
    type: 'accepted',
    description: 'Entraînement',
  },
  {
    HeureID: '7',
    ClubID: 2,
    MembreID: 6,
    membreName: 'Isabelle Petit',
    dateHeure: new Date('2024-01-15'),
    duree: 2,
    type: 'waited',
    description: 'Entraînement',
  },
  {
    HeureID: '8',
    ClubID: 2,
    MembreID: 5,
    membreName: 'Antoine Girard',
    dateHeure: new Date('2024-01-17'),
    duree: 2,
    type: 'accepted',
    description: 'Réunion coaching',
  },
];
