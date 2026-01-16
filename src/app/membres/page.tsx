'use client';

import React from 'react';
import PageTitle from '@/components/PageTitle';
import CardMembre from '@/components/CardMembre';

export default function MembresPage() {

  return (
    <>
      <PageTitle 
        title="Annuaire des membres" 
        description=" étudiants actifs dans les différents clubs du campus."
        type="membre"
      />
      <CardMembre />
    </>
  );
}