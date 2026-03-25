'use client';

import React from 'react';
import type { ClubID } from '@/types/Club/Club';
import ListHeure from '@/components/clubs/details/heure/ListHeure';


export default function TabHeure(props: ClubID) {
  const clubIDProps: ClubID = { id:  props.id };

  return (
    <>
      <ListHeure {...clubIDProps} />
    </>
  );
}