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
    <>
      <PageTitle {...clubPageProps} />
      <ClubNavTab {...clubIDProps} />
    </>
  );
}