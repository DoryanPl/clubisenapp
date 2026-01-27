import React from "react";
import { clubsExample } from "@/types/Club/Club";
import {Card, CardBody, CardFooter, CardHeader, Image} from "@heroui/react";
import { Users, Calendar } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface CardClubProps {
  searchTerm?: string;
}

function CardClub({ searchTerm = '' }: CardClubProps) {
  const filteredClubs = clubsExample.filter(club => 
    club.ClubNom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    club.ClubDesc.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const getRedirection = (id: number) => `/clubs/details/${id}`;

  return(
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 pt-6 px-4 sm:px-6 lg:px-8">
        {filteredClubs.map((item, index) => (
          <Link 
            key={index} 
            href={getRedirection(item.id)}
            className="no-underline h-full flex">
            <Card 
              isPressable 
              shadow="sm" 
              className="bg-primary/60 relative border border-default-200 shadow-xlhover:border-secondary transition-all hover:shadow-lg hover:shadow-secondary/50 flex flex-col group w-full" 
              onPress={() => console.log("item pressed")}>

              <CardHeader className="p-0 m-0 flex-shrink-0 relative w-full h-[120px] sm:h-[140px] lg:h-[150px] overflow-hidden">
                <Image
                  alt={item.ClubNom}
                  className="object-cover transition-transform duration-1 ease-in-out group-hover:scale-105 origin-center"
                  radius="none"
                  shadow="none"
                  src={item.ClubImage}
                  width="100%"
                />
                <div className="absolute top-2 right-2 bg-secondary/80 rounded-lg px-2 py-1 flex items-center gap-1 z-10">
                  <Users size={16} className="text-white" />
                  <span className="text-sm text-white font-bold">{item.memberCount}</span>
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
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
export default CardClub;