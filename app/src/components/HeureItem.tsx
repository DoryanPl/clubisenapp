import React from 'react';
import { CircleCheck, CircleX, Clock } from 'lucide-react';
import type { Heure } from '@/types/Heure/Heure';

interface HeureItemProps {
  heure: Heure;
}

const heureStatus = {
  accepted: {
    icon: <CircleCheck size={20} className="text-emerald-600 font-bold" />,
    background: 'bg-gradient-to-br from-emerald-200 to-emerald-100 dark:from-emerald-500/20 dark:to-emerald-600/10',
    color: 'text-emerald-500',
    border: 'border-emerald-200 dark:border-emerald-500/40',
    label: 'Accepté',
  },
  waited: {
    icon: <Clock size={20} className="text-yellow-600 font-bold" />,
    background: 'bg-gradient-to-br from-yellow-200 to-yellow-100 dark:from-yellow-500/20 dark:to-yellow-600/10',
    color: 'text-yellow-500',
    border: 'border-yellow-200 dark:border-yellow-500/40',
    label: 'En attente',
  },
  rejected: {
    icon: <CircleX size={20} className="text-red-600 font-bold" />,
    background: 'bg-gradient-to-br from-red-200 to-red-100 dark:from-red-500/20 dark:to-red-600/10',
    color: 'text-red-500',
    border: 'border-red-200 dark:border-red-500/40',
    label: 'Refusé',
  },
};

export default function HeureItem({ heure }: HeureItemProps) {
  return (
    <div className={`bg-background/70 border-1 dark:border-2 shadow-sm dark:shadow-xl flex flex-row items-center gap-3 p-3 sm:p-4 rounded-lg sm:rounded-2xl ${heureStatus[heure.type].border}`}>
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