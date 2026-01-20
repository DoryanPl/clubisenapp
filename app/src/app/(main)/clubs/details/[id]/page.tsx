'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import PageTitle from '@/components/clubs/details/PageTitle';
import NavTab from '@/components/clubs/details/NavTab';
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
      <NavTab {...clubIDProps} />
    </>
  );
}