'use client';

import React, { useState } from 'react';
import PageTitle from '@/components/commons/PageTitle';
import { clubsExample } from '@/types/Club/Club';

const CLUBS_DATA = [
  { key: 'all', label: 'Tous les clubs' },
  ...clubsExample.map((c: any) => ({
    key: c.id.toString(),
    label: c.ClubNom,
  })),
];

export default function BudgetPage() {
  const [selectedClub, setSelectedClub] = useState<Set<string>>(new Set(['all']));
  const [searchTerm, setSearchTerm] = useState('');

  const handleClubFilterChange = (keys: Set<string>) => {
    setSelectedClub(keys);
  };

  return (
    <>
      <PageTitle 
        title="Trésorerie des Clubs" 
        description="Consultez les budgets alloués aux différents clubs du campus."
        type="budget"
        filterOptions={CLUBS_DATA}
        filterLabel="Club"
        selectedFilter={selectedClub}
        onFilterChange={handleClubFilterChange}
        onSearch={setSearchTerm}
        showSearch={false}
      />
    </>
  );
}