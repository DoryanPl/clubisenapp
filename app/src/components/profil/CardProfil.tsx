'use client';

import React from 'react';
import { Briefcase, Clock } from 'lucide-react';
import { CardInfo } from '@/components/commons/CardInfo';

interface Club {
  id: string;
  name: string;
  role: string;
  joinDate: string;
  hoursCount: number;
}

interface CardProfilProps {
  club: Club;
}

export default function CardProfil({ club }: CardProfilProps) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full">
      <CardInfo
        title="Club"
        value={club.name}
        valueClassName='text-sm sm:text-xl font-bold text-center sm:text-start'
        icon={<Briefcase size={20} />}
        color="text-blue-500"
      />
      <CardInfo
        title="Heures Total"
        value={club.hoursCount}
        valueClassName='text-sm sm:text-xl font-bold text-center sm:text-start'
        suffix="h"
        icon={<Clock size={20} />}
        color="text-emerald-500"
      />
      <CardInfo
        title="Rôle"
        value={club.role}
        valueClassName='text-sm sm:text-xl font-bold text-center sm:text-start'
        color="text-purple-500"
      />
    </div>
  );
}
