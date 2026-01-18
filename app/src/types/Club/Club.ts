export interface Club {
  id: number;
  ClubNom: string;
  ClubDesc: string;
  ClubImage: string;
  memberCount: number;
}

export interface ClubID {
  id: number;
}

export interface ClubPage {
  id: number;
  isAdmin?: boolean;
}

export const clubsExample: Club[] = [
  {
    id: 1,
    ClubNom: "Club de Robotique",
    ClubDesc: "Découvrez et construisez des robots innovants avec notre club passionné.",
    ClubImage: "https://fastly.picsum.photos/id/161/800/400.jpg?hmac=Aa9ZoLzHpWJQzgV5iblV4PYMbXbrwA2deO0iNlIGf1k",
    memberCount: 45,
  },
  {
    id: 2,
    ClubNom: "Club de Gaming",
    ClubDesc: "Rejoignez-nous pour des compétitions et des parties en ligne.",
    ClubImage: "https://fastly.picsum.photos/id/161/800/400.jpg?hmac=Aa9ZoLzHpWJQzgV5iblV4PYMbXbrwA2deO0iNlIGf1k",
    memberCount: 78,
  },
  {
    id: 3,
    ClubNom: "Club de Développement Web",
    ClubDesc: "Apprenez et créez des applications web modernes ensemble.",
    ClubImage: "https://fastly.picsum.photos/id/161/800/400.jpg?hmac=Aa9ZoLzHpWJQzgV5iblV4PYMbXbrwA2deO0iNlIGf1k",
    memberCount: 62,
  },
  {
    id: 4,
    ClubNom: "Club de Design",
    ClubDesc: "Explorez votre créativité dans le domaine du design graphique et UX/UI.",
    ClubImage: "https://fastly.picsum.photos/id/161/800/400.jpg?hmac=Aa9ZoLzHpWJQzgV5iblV4PYMbXbrwA2deO0iNlIGf1k",
    memberCount: 38,
  },
];
