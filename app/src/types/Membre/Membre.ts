
export interface MembreID {
  id: number;
}

export interface MembrePage {
  id: number;
  isAdmin?: boolean;
}

export interface Membre {
  ClubID: number;
  MembreID: number;
  nom: string;
  prenom: string;
  email: string;
  clubNom: string;
  role: string;
  classe: string;
  dateInscription: string;
  isActive?: boolean;
  avatar?: string;
  lastConnection?: string;
  heuresValidees?: number;
}

export type Membres = Membre[];

export const membresExample: Membres = [
  {
    ClubID: 2,
    MembreID: 1,
    nom: "Dupont",
    prenom: "Alice",
    email: "alice.dupont@example.com",
    clubNom: "Tech & Code",
    role: "Présidente",
    classe: "Master 1",
    dateInscription: "2023-09-01",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
    isActive: true,
    lastConnection: "2026-01-20T14:30:00",
    heuresValidees: 48,
  },
  {
    ClubID: 1,
    MembreID: 2,
    nom: "Martin",
    prenom: "Lucas",
    email: "lucas.martin@example.com",
    clubNom: "Bureau des Sports",
    role: "Trésorier",
    classe: "Licence 3",
    dateInscription: "2023-10-12",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    isActive: false,
    lastConnection: "2026-01-15T10:15:00",
    heuresValidees: 32,
  },
  {
    ClubID: 2,
    MembreID: 3,
    nom: "Nguyen",
    prenom: "Sophie",
    email: "sophie.nguyen@example.com",
    clubNom: "Photo & Art",
    role: "Membre",
    classe: "Licence 2",
    dateInscription: "2023-11-20",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
    isActive: true,
    lastConnection: "2026-01-19T16:45:00",
    heuresValidees: 56,
  },
  {
    ClubID: 2,
    MembreID: 4,
    nom: "Diallo",
    prenom: "Cheikh",
    email: "cheikh.diallo@example.com",
    clubNom: "Musique & Scène",
    role: "Responsable événementiel",
    classe: "Master 2",
    dateInscription: "2024-01-08",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=200&q=80",
    isActive: true,
    lastConnection: "2026-01-18T09:00:00",
    heuresValidees: 24,
  },
];
