'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import {budgetSummaryExample } from '@/types/Budget/Budget';
import type { ClubID } from '@/types/Club/Club';
import { CardInfo } from '@/components/commons/CardInfo';

export default function CardBudget(props: ClubID) {
  const clubID = props.id;

  const clubSummary = budgetSummaryExample.find(summary => summary.ClubID === clubID);

  const totalIncome = clubSummary?.totalIncome ?? 0;
  const totalExpense = clubSummary?.totalExpense ?? 0;
  const totalTresor = clubSummary?.totalTreasury ?? 0;

  const formatCurrency = (value: number | string) => {
    const numValue = typeof value === 'number' ? value : Number(value);
    return `${numValue.toLocaleString('fr-FR')} €`;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">

      <CardInfo
        title="Trésorerie"
        value={totalTresor}
        icon={<Wallet size={20} />}
        color="emerald"
        formatter={formatCurrency}
      />
      <CardInfo
        title="Recettes"
        value={totalIncome}
        icon={<TrendingUp size={20} />}
        color="blue"
        prefix="+"
        formatter={formatCurrency}
      />
      <CardInfo
        title="Dépenses"
        value={totalExpense}
        icon={<TrendingDown size={20} />}
        color="red"
        prefix="-"
        formatter={formatCurrency}
      />
    </div>
  );
}
    
