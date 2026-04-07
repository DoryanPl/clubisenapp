import { MapPin } from 'lucide-react';
import { Image, Card, CardBody, Button } from "@heroui/react";
import { clubsExample, type ClubPage } from '@/types/Club/Club';


export default function ClubPageTitle(props: ClubPage) {
  const clubID = props.id;
  const isAdmin = props.isAdmin || false;

  const club = clubsExample.find(c => c.id === clubID);

  const campusInfo = {
    nom: "ISEN Lille",
    adresse: "41 Boulevard Vauban",
    ville: "Lille"
  };

  if (!club) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-foreground">Club non trouvé</p>
      </div>
    );
  }

  return (
    <Card 
      className="relative h-[200px] sm:h-[220px] md:h-[250px] shadow-2xl border-0 rounded-3xl"
      radius="none"
    >
      <CardBody className="relative border border-default-200/80 p-0 overflow-hidden group rounded-3xl">
        <Image
          removeWrapper
          src={club.ClubImage} 
          alt={club.ClubNom} 
          className="w-full h-[200px] sm:h-[220px] md:h-[250px] object-cover group-hover:scale-105 transition-transform duration-[2000ms] ease-out" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end z-10">
          <div className="p-4 sm:p-6 md:p-10 w-full flex flex-col md:flex-row md:justify-between md:items-end gap-4 sm:gap-6">
            <div className="flex-1 max-w-3xl">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
                <div className="flex items-center gap-1.5 text-white/90 text-xs sm:text-sm font-medium">
                  <MapPin size={14} className="sm:w-4 sm:h-4" /> {campusInfo.ville}
                </div>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold sm:font-black text-white mb-2 sm:mb-3 md:mb-4 tracking-tight leading-tight">
                {club.ClubNom}
              </h1>
              <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed line-clamp-2 sm:line-clamp-2">
                {club.ClubDesc}
              </p>
            </div>
            {!isAdmin && (
              <div className="flex gap-3 sm:gap-4 w-full md:w-auto md:flex-shrink-0">
                <Button 
                  color="default"
                  size="md"
                  radius="lg"
                  className="bg-secondary/80 text-white font-bold hover:-translate-y-1 transition-transform shadow-xl w-full md:w-auto md:px-8"
                >
                  Rejoindre
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
