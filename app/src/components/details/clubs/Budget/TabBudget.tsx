'use client';

import React from 'react';
import type { ClubID } from '@/types/Club/Club';


export default function TabBudget(props: ClubID) {
  const clubID = props.id;

  return (
    <>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Budget</h2>
        <p>Informations sur le budget du club...</p>
      </div>
    </>
  );
}