import React from "react";
import { Card, CardBody, Avatar, Button } from "@heroui/react";
import { Mail, Clock, Check, GraduationCap, MessageSquare, Drama } from "lucide-react";
import { membresExample } from "@/types/Membre/Membre";
import type { MembreID } from "@/types/Membre/Membre";

export default function CardInfoMembre(props: MembreID) {
  const membreID = props.id;

  const membre = membresExample.find(
    (m) => membreID === undefined || m.MembreID === Number(membreID)
  );

  const formatLastConnection = (dateString?: string): string => {
    if (!dateString) return "Jamais connecté";

    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const dateOnly = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const yesterdayOnly = new Date(
      yesterday.getFullYear(),
      yesterday.getMonth(),
      yesterday.getDate()
    );

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    if (dateOnly.getTime() === todayOnly.getTime()) {
      return `Aujourd'hui à ${hours}h${minutes}`;
    } else if (dateOnly.getTime() === yesterdayOnly.getTime()) {
      return `Hier à ${hours}h${minutes}`;
    } else {
      return (
        "le " +
        date.toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }) +
        " à " +
        hours +
        "h" +
        minutes
      );
    }
  };

  if (!membre) {
    return (
      <Card className="bg-primary border border-default-200 shadow-sm dark:shadow-xl">
        <CardBody className="p-6 flex flex-col items-center justify-center min-h-96">
          <p className="text-foreground/70">Aucun membre trouvé</p>
        </CardBody>
      </Card>
    );
  }

  return (
      <Card className="bg-primary/60 border border-default-200 shadow-xl w-full relative">
          <CardBody className="p-6 flex flex-col items-center gap-6">
              {/* Indicateur de statut */}
              <span
                  className={`absolute top-3 right-3 h-3 w-3 rounded-full animate-pulse shadow-[0_0_0_6px_rgba(0,0,0,0.04)] ${
                  membre.isActive ? "bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,0.25)]" : "bg-rose-500 shadow-[0_0_0_6px_rgba(244,63,94,0.25)]"
                  }`}
                  aria-label={membre.isActive ? "Compte actif" : "Compte inactif"}
                  role="status"
              />

              {/* Avatar */}
              <div className="relative">
                <Avatar
                    src={membre.avatar}
                    name={`${membre.prenom} ${membre.nom}`}
                    className="w-32 h-32 text-2xl"
                    radius="lg"
                    isBordered
                    color="secondary"
                />
              </div>

              {/* Nom */}
              <div className="text-center">
                <h3 className="text-3xl font-bold text-foreground">
                    {membre.prenom} {membre.nom}
                </h3>
                <p className="text-lg text-secondary font-medium flex items-center justify-center gap-2 mt-2">
                    <Drama className="w-5 h-5"  />
                    {membre.clubNom}
                </p>
              </div>

              {/* Info Box */}
              <div className="w-full bg-background/70 border border-default-200 focus-within:border-primary rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-3 text-foreground/80">
                    <Mail size={18} className="flex-shrink-0" />
                    <span className="text-sm">{membre.email}</span>
                </div>
                <div className="flex items-center gap-3 text-foreground/80">
                    <GraduationCap size={18} className="flex-shrink-0" />
                    <span className="text-sm">{membre.classe}</span>
                </div>
                <div className="flex items-center gap-3 text-foreground/80">
                    <Clock size={18} className="flex-shrink-0" />
                    <span className="text-sm">Vu : {formatLastConnection(membre.lastConnection)}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="w-full flex justify-around">
                <div className="text-center">
                    <div className="text-2xl font-bold text-secondary">
                    {membre.heuresValidees || 0}h
                    </div>
                    <div className="text-xs text-foreground/50 uppercase tracking-wide">
                    Heures validées
                    </div>
                </div>
              </div>

              {/* Contact Button */}
              <Button
                fullWidth
                className="bg-secondary/80 hover:bg-secondary text-white font-semibold py-3 px-4"
                size="lg"
                startContent={<MessageSquare size={20} />}
              >
                Contacter l'étudiant
              </Button>
          </CardBody>
      </Card>
  );
}
