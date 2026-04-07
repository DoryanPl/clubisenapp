"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { clubsExample } from "@/types/Club/Club";
import {Card, CardBody, CardFooter, CardHeader, Image} from "@heroui/react";
import { Users, Calendar } from "lucide-react";

interface CardClubProps {
  searchTerm?: string;
}

function CardClub({ searchTerm = '' }: CardClubProps) {
  const router = useRouter();
  const filteredClubs = clubsExample.filter(club => 
    club.ClubNom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    club.ClubDesc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return(
    <div className="gap-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 pt-6 px-4 sm:px-6 lg:px-8">
      {filteredClubs.map((item, index) => (
          <div key={index} className="h-full flex">
            <Card 
              isPressable 
              shadow="sm" 
              className="bg-primary/60 relative border border-default-200 shadow-lg dark:shadow-xl h-full hover:border-secondary/50 transition-colors flex flex-col group w-full cursor-pointer" 
              onPress={() => router.push(`/clubs/details/${item.id}`)}>

              <CardHeader className="p-0 m-0 flex-shrink-0 relative w-full h-[120px] sm:h-[140px] lg:h-[150px] overflow-hidden">
                <Image
                  alt={item.ClubNom}
                  className="object-cover transition-transform duration-1 ease-in-out group-hover:scale-105 origin-center"
                  radius="none"
                  shadow="none"
                  src={item.ClubImage}
                  width="100%"
                />
                <div className="absolute top-2 right-2 bg-secondary hover:bg-secondary/90 rounded-lg px-2 py-1 flex items-center gap-1 z-10">
                  <Users size={16} className="text-background" />
                  <span className="text-sm text-background font-semibold">{item.memberCount}</span>
                </div>
              </CardHeader>

              <CardBody className="overflow-hidden p-6 flex-1 flex flex-col">
                <div className="flex flex-col gap-3 text-left">
                  <b className="text-foreground text-xl">{item.ClubNom}</b>
                  <p className="text-sm text-foreground/70 line-clamp-3">{item.ClubDesc}</p>
                </div>
              </CardBody>

              <CardFooter className="border-t border-default-200 px-6 py-3 text-sm text-foreground/70 flex justify-between">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  Crée le {item.dateInscription}
                </span>
              </CardFooter>
          </Card>
          </div>
        ))}
      </div>
    );
  }
  export default CardClub;