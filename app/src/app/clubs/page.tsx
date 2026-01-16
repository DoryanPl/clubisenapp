'use client';

import React from 'react';
import PageTitle from '@/components/PageTitle';
import CardClub from '@/components/CardClub';

export default function ClubsPage() {

  return (
    <>
      <PageTitle 
        title="Tous les Clubs" 
        description="Découvrez et rejoignez les clubs du campus."
        type="club"
      />
      <CardClub />
    </>
  );
}