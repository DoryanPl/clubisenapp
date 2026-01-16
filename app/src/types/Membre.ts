export interface Membre {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  clubNom: string;
  role: string;
  dateInscription: string;
  isActive?: boolean;
  avatar?: string;
}

export type Membres = Membre[];

export const membresExample: Membres = [
  {
    id: "m1",
    nom: "Dupont",
    prenom: "Alice",
    email: "alice.dupont@example.com",
    clubNom: "Tech & Code",
    role: "Présidente",
    dateInscription: "2023-09-01",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
    isActive: true,
  },
  {
    id: "m2",
    nom: "Martin",
    prenom: "Lucas",
    email: "lucas.martin@example.com",
    clubNom: "Bureau des Sports",
    role: "Trésorier",
    dateInscription: "2023-10-12",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    isActive: false,
  },
  {
    id: "m3",
    nom: "Nguyen",
    prenom: "Sophie",
    email: "sophie.nguyen@example.com",
    clubNom: "Photo & Art",
    role: "Membre",
    dateInscription: "2023-11-20",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
    isActive: true,
  },
  {
    id: "m4",
    nom: "Diallo",
    prenom: "Cheikh",
    email: "cheikh.diallo@example.com",
    clubNom: "Musique & Scène",
    role: "Responsable événementiel",
    dateInscription: "2024-01-08",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=200&q=80",
    isActive: true,
  },
];
