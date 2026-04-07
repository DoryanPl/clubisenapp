'use client';

import React from 'react';
import CardOverview from './CardOverview';
import AboutOverview from './AboutOverview';
import type { ClubID } from '@/types/Club/Club';

export default function TabOverview(props: ClubID) {
  const clubIDProps: ClubID = { id:  props.id };

  return (
    <div className="space-y-4">
      <CardOverview {...clubIDProps} />
      <AboutOverview {...clubIDProps} />
    </div>
  );
}