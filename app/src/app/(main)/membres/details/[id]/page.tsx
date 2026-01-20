'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import PageTitle from '@/components/membres/details/PageTitle';
import MembreNavTab from '@/components/membres/details/MembreNavTab';
import { membresExample } from '@/types/Membre/Membre';
import CardInfoMembre from '@/components/membres/details/CardInfoMembre';
import CardMembre from '@/components/membres/CardMembre';
import type { MembrePage, MembreID, MembreSearchParams } from '@/types/Membre/Membre';


export default function ClubsDetailsPage() {
  const params = useParams();
  const MembreID = Number(params.id);

  const memberPageProps: MembrePage = {
    id: MembreID,
    isAdmin: true,
  };
  
  const membreIDProps: MembreID = {
    id: MembreID,
  };

  const membreSearchParams: MembreSearchParams = {
    id: MembreID,
    search: '',
  };

  return (
    <div className='py-8'>
      {/* <PageTitle {...memberPageProps} /> */}
      {/* <MembreNavTab {...membreIDProps} /> */}
      <CardInfoMembre {...membreIDProps} />
      {/* <CardMembre {...membreSearchParams} /> */}


    </div>
  );
}