"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { membresExample } from "@/types/Membre/Membre";
import { Card, CardBody, CardFooter, Avatar } from "@heroui/react";
import { Mail, Calendar } from "lucide-react";

interface CardMembreProps {
  searchTerm?: string;
}

export default function CardMembre({ searchTerm = '' }: CardMembreProps) {
  const router = useRouter();
  const filteredMembres = membresExample.filter(membre => 
    membre.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    membre.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="gap-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 pt-6 px-4 sm:px-6 lg:px-8">
      {filteredMembres.map((membre, index) => (
          <div key={index} className="h-full flex">
            <Card
              isPressable
              shadow="sm"
              className="bg-primary/60 relative border border-default-200 shadow-lg dark:shadow-xl h-full hover:border-secondary/50 transition-colors flex flex-col w-full cursor-pointer"
              onPress={() => router.push(`/membres/details/${membre.MembreID.toString()}`)}>
              <span
                className={`absolute top-3 right-3 h-3 w-3 rounded-full animate-pulse shadow-[0_0_0_6px_rgba(0,0,0,0.04)] ${
                  membre.isActive ? "bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,0.25)]" : "bg-rose-500 shadow-[0_0_0_6px_rgba(244,63,94,0.25)]"
                }`}
                aria-label={membre.isActive ? "Compte actif" : "Compte inactif"}
                role="status"
              />
              <CardBody className="flex-1 p-6 flex flex-col items-center gap-4">
                <Avatar
                  src={membre.avatar}
                  name={`${membre.prenom} ${membre.nom}`}
                  className="w-16 h-16 text-lg"
                  radius="full"
                  isBordered
                  color="secondary"
                />
                <div className="text-center space-y-1">
                  <h3 className="text-lg font-semibold text-foreground">{membre.prenom} {membre.nom}</h3>
                  <div className="flex items-center justify-center gap-2 text-sm text-foreground/70">
                    <Mail size={14} className="text-foreground/70" />
                    <span>{membre.email}</span>
                  </div>
                </div>

                <div className="flex flex-row w-full items-center justify-center gap-2">
                  <span className="px-3 py-2 rounded-full bg-content2 text-foreground text-sm font-semibold text-center">
                    {membre.clubNom}
                  </span>
                  <span className="px-3 py-2 rounded-full bg-secondary text-background font-semibold text-sm font-semibold text-center">
                    {membre.role}
                  </span>
                </div>
              </CardBody>

              <CardFooter className="border-t border-default-200 px-6 py-3 text-sm text-foreground/70 flex justify-between w-full">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  Inscrit le {membre.dateInscription}
                </span>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    );
  }
  