import React from "react";
import { Card, CardBody, CardFooter, Avatar } from "@heroui/react";
import { Mail, Clock, Check, GraduationCap, MessageSquare, Drama } from "lucide-react";
import { membresExample } from "@/types/Membre/Membre";
import type { MembreID } from "@/types/Membre/Membre";
import { div } from "framer-motion/client";

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-primary border border-default-200 shadow-sm dark:shadow-xl w-full max-w-md mx-auto">
            <CardBody className="p-6 flex flex-col items-center gap-6">
                {/* Avatar avec statut */}
                <div className="relative">
                <Avatar
                    src={membre.avatar}
                    name={`${membre.prenom} ${membre.nom}`}
                    className="w-32 h-32 text-2xl"
                    radius="lg"
                    isBordered
                    color="secondary"
                />
                <span
                    className={`absolute bottom-4 right-4 h-6 w-6 rounded-full flex items-center justify-center border-2 border-primary ${
                    membre.isActive
                        ? "bg-emerald-500"
                        : "bg-rose-500"
                    }`}
                    aria-label={membre.isActive ? "Actif" : "Inactif"}
                >
                    {membre.isActive && (
                    <Check className="w-4 h-4 text-white" />
                    )}
                </span>
                </div>

                {/* Nom */}
                <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground">
                    {membre.prenom} {membre.nom}
                </h2>
                <p className="text-lg text-secondary flex items-center justify-center gap-2 mt-2">
                    <Drama className="w-5 h-5"  />
                    {membre.clubNom}
                </p>
                </div>

                {/* Info Box */}
                <div className="w-full bg-background/30 border border-default-200 focus-within:border-primary rounded-lg p-4 space-y-3">
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
                <div className="w-full flex justify-around pt-4">
                <div className="text-center">
                    <div className="text-3xl font-bold text-secondary">
                    {membre.heuresValidees || 0}h
                    </div>
                    <div className="text-xs text-foreground/50 uppercase tracking-wide">
                    Heures validées
                    </div>
                </div>
                </div>

                {/* Contact Button */}
                <button className="w-full mt-4 bg-secondary/80 hover:bg-secondary-dark/70 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                <MessageSquare size={20} />
                Contacter l'étudiant
                </button>
            </CardBody>
        </Card>
    </div>
  );
}
