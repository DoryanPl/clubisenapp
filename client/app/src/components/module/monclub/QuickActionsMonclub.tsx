'use client';

import React from 'react';
import { UserPlus, FileText, Calendar, DollarSign } from 'lucide-react';
import QuickActions, { QuickAction } from '@/components/commons/QuickActions';

export default function QuickActionsMonclub() {
  const quickActions: QuickAction[] = [
    {
      id: 'AddMember',
      title: 'Ajouter un membre',
      description: 'Inviter de nouveaux membres au club',
      icon: <UserPlus size={24} />,
      color: 'bg-blue-500',
      action: () => console.log('Ajouter membre'),
    },
    {
      id: 'CreateEvent',
      title: 'Créer un événement',
      description: 'Organiser une nouvelle activité',
      icon: <Calendar size={24} />,
      color: 'bg-purple-500',
      action: () => console.log('Créer événement'),
    },
    {
      id: 'ManageBudget',
      title: 'Gérer le budget',
      description: 'Ajouter une transaction',
      icon: <DollarSign size={24} />,
      color: 'bg-green-500',
      action: () => console.log('Gérer budget'),
    },
    {
      id: 'GenerateReport',
      title: 'Rapport mensuel',
      description: 'Générer un rapport d&apos;activité',
      icon: <FileText size={24} />,
      color: 'bg-orange-500',
      action: () => console.log('Rapport'),
    },
  ];

  return (
    <QuickActions
      title="Actions Rapides"
      titleIcon={<FileText size={20} />}
      actions={quickActions}
      columns={2}
    />
  );
}
