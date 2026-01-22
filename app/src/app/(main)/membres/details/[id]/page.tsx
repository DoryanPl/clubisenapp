'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import PageTitle from '@/components/membres/details/PageTitle';
import CardInfoMembre from '@/components/membres/details/CardInfoMembre';
import type { MembrePage, MembreID, MembreSearchParams } from '@/types/Membre/Membre';
import HeureMembre from '@/components/membres/details/HeureMembre';


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
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      {/* <PageTitle {...memberPageProps} /> */}
      <div className='flex flex-col md:flex-row gap-8 px-4 sm:px-6 lg:px-8'>
        <div className='w-full lg:w-1/3'>
          <CardInfoMembre {...membreIDProps} />
        </div>
        <div className='w-full lg:w-2/3'>
          <HeureMembre {...membreIDProps} />
        </div>
      </div>
    </div>
  );
}