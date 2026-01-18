'use client';

import { useParams } from 'next/navigation';
import { clubsExample } from '@/types/Club/Club';
import {Image} from "@heroui/react";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ClubDetails() {
  const params = useParams();
  const clubId = params.id as string;

  const club = clubsExample.find(c => c.id === clubId);

  if (!club) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Club non trouvé</h1>
          <Link href="/clubs" className="flex items-center gap-2 text-primary hover:underline w-fit">
            <ArrowLeft size={20} />
            Retour aux clubs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/clubs" className="flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft size={20} />
          Retour aux clubs
        </Link>

        <div className="rounded-lg overflow-hidden border border-default-200">
          <Image
            src={club.ClubImage}
            alt={club.ClubNom}
            className="w-full h-[400px] object-cover"
          />
        </div>

        <div className="mt-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">{club.ClubNom}</h1>
          <p className="text-lg text-foreground/70 mb-6">{club.ClubDesc}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-default-200">
            <div>
              <p className="text-sm text-foreground/70 mb-1">Membres</p>
              <p className="text-2xl font-bold text-foreground">{club.memberCount}</p>
            </div>
            <div>
              <p className="text-sm text-foreground/70 mb-1">Date de création</p>
              <p className="text-2xl font-bold text-foreground">{club.dateInscription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
                 
