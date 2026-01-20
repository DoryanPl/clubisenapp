'use client';

import React, { useState } from 'react';
import PageTitle from '@/components/PageTitle';
import CardClub from '@/components/clubs/CardClub';

export default function ClubsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <PageTitle 
        title="Tous les Clubs" 
        description="Découvrez et rejoignez les clubs du campus."
        type="club"
        onSearch={setSearchTerm}
      />
      <CardClub searchTerm={searchTerm} />
    </>
  );
}