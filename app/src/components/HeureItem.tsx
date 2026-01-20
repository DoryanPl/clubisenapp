import React from 'react';
import { CircleCheck, CircleX, Clock } from 'lucide-react';
import type { Heure } from '@/types/Heure/Heure';

interface HeureItemProps {
  heure: Heure;
}

const heureStatus = {
  accepted: {
    icon: <CircleCheck size={20} className="text-emerald-500 font-bold" />,
    background: 'bg-emerald-100 dark:bg-emerald-500/10',
    color: 'text-emerald-500',
    label: 'Accepté',
  },
  waited: {
    icon: <Clock size={20} className="text-yellow-500 font-bold" />,
    background: 'bg-yellow-100 dark:bg-yellow-500/10',
    color: 'text-yellow-500',
    label: 'En attente',
  },
  rejected: {
    icon: <CircleX size={20} className="text-red-500 font-bold" />,
    background: 'bg-red-100 dark:bg-red-500/10',
    color: 'text-red-500',
    label: 'Refusé',
  },
};

export default function HeureItem({ heure }: HeureItemProps) {
 
  return (
    <div className={`border border-default-200 shadow-sm dark:shadow-xl flex flex-row items-center gap-3 p-3 sm:p-4 rounded-lg sm:rounded-2xl border`}>
      {/* Status Icon with background */}
      <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg ${heureStatus[heure.type].background}`}>
        {heureStatus[heure.type].icon}
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-foreground text-sm sm:text-base truncate">{heure.membreName}</p>
        <div className="flex flex-col gap-1 text-xs text-foreground/70 mt-1">
          <p>{new Date(heure.dateHeure).toLocaleDateString('fr-FR')}</p>
        </div>
      </div>
      
      {/* Hours and Status */}
      <div className="flex flex-col items-end">
        <span className="font-bold text-foreground text-sm sm:text-base">
          {heure.duree}h
        </span>
        <span className={`uppercase font-bold text-xs ${heureStatus[heure.type].color}`}>
          {heureStatus[heure.type].label}
        </span>
      </div>
      
    </div>
  );
}