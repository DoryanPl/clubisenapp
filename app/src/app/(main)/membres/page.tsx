'use client';

import React from 'react';
import PageTitle from '@/components/main/PageTitle';
import CardMembre from '@/components/main/CardMembre';

export default function MembresPage() {
  const [searchTerm, setSearchTerm] = React.useState('');

  return (
    <>
      <PageTitle 
        title="Annuaire des membres" 
        description=" étudiants actifs dans les différents clubs du campus."
        type="membre"
        onSearch={setSearchTerm}
      />
      <CardMembre searchTerm={searchTerm}/>

    </>
  );
}