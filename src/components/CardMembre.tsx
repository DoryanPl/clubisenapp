import React from "react";
import { membresExample } from "@/types/Membre";
import { Card, CardBody, CardFooter, Avatar } from "@heroui/react";
import { Mail } from "lucide-react";

function CardMembre() {
  return (
    <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pt-6 px-4 sm:px-6 lg:px-8">
      {membresExample.map((membre) => (
        <Card
          isPressable
          key={membre.id}
          shadow="sm"
          className="relative border border-default-200/80 hover:border-secondary transition-all hover:shadow-[0_0_15px_rgba(250,210,1,0.3)]"
          onPress={() => console.log("item pressed")}>
          <span
            className={`absolute top-3 right-3 h-3 w-3 rounded-full shadow-[0_0_0_6px_rgba(0,0,0,0.04)] ${
              membre.isActive ? "bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,0.25)]" : "bg-rose-500 shadow-[0_0_0_6px_rgba(244,63,94,0.25)]"
            }`}
            aria-label={membre.isActive ? "Compte actif" : "Compte inactif"}
            role="status"
          />
          <CardBody className="p-6 flex flex-col items-center gap-4">
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
                <Mail size={14} className="text-foreground/60" />
                <span>{membre.email}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row w-full items-center justify-center gap-2">
              <span className="px-3 py-1 rounded-full bg-content2 text-foreground text-sm font-medium">
                {membre.clubNom}
              </span>
              <span className="px-3 py-1 rounded-full bg-secondary/20 text-secondary-foreground text-sm font-semibold">
                {membre.role}
              </span>
            </div>
          </CardBody>

          <CardFooter className="border-t border-default-200 px-6 py-3 text-sm text-foreground/70 flex justify-between w-full">
            <span>Inscrit le {membre.dateInscription}</span>
            <span className="text-foreground/60">ID: {membre.id}</span>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default CardMembre;