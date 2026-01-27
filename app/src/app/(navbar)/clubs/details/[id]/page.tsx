'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import PageTitle from '@/components/clubs/details/PageTitle';
import ClubNavTab from '@/components/clubs/details/ClubNavTab';
import type { ClubPage, ClubID } from '@/types/Club/Club';

export default function ClubsDetailsPage() {
  const params = useParams();
  const clubId = Number(params.id);

  const clubPageProps: ClubPage = {
    id: clubId,
    isAdmin: true,
  };
  
  const clubIDProps: ClubID = {
    id: clubId,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className='pb-6'>
        <PageTitle {...clubPageProps} />
      </div>
      <ClubNavTab {...clubIDProps} />
    </div>
  );
}