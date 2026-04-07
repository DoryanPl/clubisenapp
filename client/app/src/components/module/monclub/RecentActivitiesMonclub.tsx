'use client';

import React from 'react';
import { Calendar, TrendingUp, Users, Clock } from 'lucide-react';
import RecentActivities, { Activity } from '@/components/commons/RecentActivities';

const activityIcons = {
  event: <Calendar size={20} />,
  budget: <TrendingUp size={20} />,
  member: <Users size={20} />,
  hours: <Clock size={20} />,
};

const activityColors = {
  event: 'text-blue-500 bg-blue-500/20',
  budget: 'text-green-500 bg-green-500/20',
  member: 'text-purple-500 bg-purple-500/20',
  hours: 'text-orange-500 bg-orange-500/20',
};

export default function RecentActivitiesMonclub() {
  const activities: Activity[] = [
    {
      id: 1,
      title: 'Nouvel événement créé',
      description: 'Tournoi de Gaming - Samedi 14h',
      date: '2024-02-20',
      icon: activityIcons.event,
      color: activityColors.event,
    },
    {
      id: 2,
      title: 'Transaction approuvée',
      description: 'Achat matériel - 250€',
      date: '2024-02-19',
      icon: activityIcons.budget,
      color: activityColors.budget,
    },
    {
      id: 3,
      title: 'Nouveau membre',
      description: 'Marie Dupont a rejoint le club',
      date: '2024-02-18',
      icon: activityIcons.member,
      color: activityColors.member,
    },
    {
      id: 4,
      title: 'Heures validées',
      description: '15h validées pour 3 membres',
      date: '2024-02-17',
      icon: activityIcons.hours,
      color: activityColors.hours,
    },
  ];

  return (
    <RecentActivities
      title="Activités Récentes"
      titleIcon={<Calendar size={20} />}
      activities={activities}
    />
  );
}
