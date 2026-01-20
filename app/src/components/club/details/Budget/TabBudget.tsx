'use client';

import React from 'react';
import CardBudget from '@/components/details/clubs/Budget/CardBudget';
import HistoryBudget from '@/components/details/clubs/Budget/HistoryBudget';
import ProgressBudget from '@/components/details/clubs/Budget/ProgressBudget';
import type { ClubID } from '@/types/Club/Club';


export default function TabBudget(props: ClubID) {
  const clubIDProps: ClubID = { id:  props.id };

  return (
    <div className="space-y-4">
      <CardBudget {...clubIDProps} />
      <ProgressBudget {...clubIDProps} />
      <HistoryBudget {...clubIDProps}  /> 
    </div>
  );
}