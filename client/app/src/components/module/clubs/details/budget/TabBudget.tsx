'use client';

import React from 'react';
import CardBudget from '@/components/module/clubs/details/budget/CardBudget';
import HistoryBudget from '@/components/module/clubs/details/budget/HistoryBudget';
import ProgressBudget from '@/components/module/clubs/details/budget/ProgressBudget';
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