'use client';

import React from 'react';
import ListMembre from './ListMembre';
import type { ClubID } from '@/types/Club/Club';

export default function TabMembre(props: ClubID) {
  const clubIDProps: ClubID = { id:  props.id };

  return (
    <>
      <ListMembre {...clubIDProps} />
    </>
  );
}