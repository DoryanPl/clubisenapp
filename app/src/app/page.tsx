'use client';

import React, { useState } from 'react';
import GreetingSection from '@/components/main/GreetingSection';
import StatsCards from '@/components/main/StatsCards';
import NewsSection from '@/components/main/NewsSection';
import FavoriteClubsCard from '@/components/main/FavoriteClubsCard';
import HelpSection from '@/components/main/HelpSection';

interface News {
  id: number;
  club: string;
  title: string;
  description: string;
  date: string;
}

interface Club {
  name: string;
  percentage: number;
  color: string;
}

export default function Main() {
  const [userStats] = useState({
    name: 'Alexandre',
    clubsCount: 2,
    hoursValidated: 42,
    budget: 450,
  });

  const [clubsFavoris] = useState<Club[]>([
    { name: 'Bureau des Sports', percentage: 35, color: '#3B82F6' },
    { name: 'Tech & Code', percentage: 40, color: '#10B981' },
    { name: 'Arts & Culture', percentage: 13, color: '#F59E0B' },
    { name: 'Environnement', percentage: 12, color: '#8B5CF6' },

  ]);

  const [news] = useState<News[]>([
    {
      id: 1,
      club: 'BUREAU DES SPORTS (BDS)',
      title: 'Tournoi Inter-Écoles',
      description: 'Inscriptions ouvertes pour le tournoi de foot.',
      date: '2024-05-12',
    },
    {
      id: 2,
      club: 'TECH & CODE',
      title: 'Atelier Python',
      description: 'Rejoignez-nous ce jeudi pour une intro à Python.',
      date: '2024-04-02',
    }
  ]);

  return (
    <main className="w-full bg-background min-h-screen">
      <GreetingSection name={userStats.name} />
      <StatsCards 
        clubsCount={userStats.clubsCount}
        hoursValidated={userStats.hoursValidated}
        budget={userStats.budget}
      />

      {/* Main Content Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <NewsSection news={news} />
          <FavoriteClubsCard clubsFavoris={clubsFavoris} />
        </div>
      </section>

      <HelpSection />
    </main>
  );
}