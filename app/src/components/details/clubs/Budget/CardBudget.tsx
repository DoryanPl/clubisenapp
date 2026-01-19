'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import {budgetSummaryExample } from '@/types/Budget/Budget';
import type { ClubID } from '@/types/Club/Club';
import { CardInfo } from '@/components/CardInfo';

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
    <div className="grid grid-cols-3 gap-2 sm:gap-4">
      <CardInfo
        title="Trésorerie"
        value={totalTresor}
        icon={<Wallet size={20} />}
        color="text-success"
        formatter={formatCurrency}
        cardClassName="bg-success/10 border border-success/50 shadow-sm dark:shadow-xl"
      />
      <CardInfo
        title="Recettes"
        value={totalIncome}
        icon={<TrendingUp size={20} />}
        color="text-blue-600"
        prefix="+"
        formatter={formatCurrency}
        cardClassName="bg-blue-600/10 border border-blue-600/50 shadow-sm dark:shadow-xl"
      />
      <CardInfo
        title="Dépenses"
        value={totalExpense}
        icon={<TrendingDown size={20} />}
        color="text-danger"
        prefix="-"
        formatter={formatCurrency}
        cardClassName="bg-danger/10 border border-danger/50 shadow-sm dark:shadow-xl"
      />
    </div>
  );
}
    
