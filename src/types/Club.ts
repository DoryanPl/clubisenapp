export interface Club {
  id: string;
  ClubNom: string;
  ClubDesc: string;
  ClubImage: string;
  memberCount: number;
}

export const clubsExample: Club[] = [
  {
    id: "1",
    ClubNom: "Club de Robotique",
    ClubDesc: "Découvrez et construisez des robots innovants avec notre club passionné.",
    ClubImage: "/clubs/robotique.jpg",
    memberCount: 45,
  },
  {
    id: "2",
    ClubNom: "Club de Gaming",
    ClubDesc: "Rejoignez-nous pour des compétitions et des parties en ligne.",
    ClubImage: "/clubs/gaming.jpg",
    memberCount: 78,
  },
  {
    id: "3",
    ClubNom: "Club de Développement Web",
    ClubDesc: "Apprenez et créez des applications web modernes ensemble.",
    ClubImage: "/clubs/web.jpg",
    memberCount: 62,
  },
  {
    id: "4",
    ClubNom: "Club de Design",
    ClubDesc: "Explorez votre créativité dans le domaine du design graphique et UX/UI.",
    ClubImage: "/clubs/design.jpg",
    memberCount: 38,
  },
];
