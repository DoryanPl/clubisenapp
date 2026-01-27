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
    <div className="grid grid-cols-3 gap-2 sm:gap-4">
      <CardInfo
        title="Trésorerie"
        value={totalTresor}
        icon={<Wallet size={20} />}
        color="text-emerald-500"
        formatter={formatCurrency}
        cardClassName="bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-500/20 dark:to-emerald-600/10 border-2 border-emerald-400 dark:border-emerald-500/40 shadow-lg"
      />
      <CardInfo
        title="Recettes"
        value={totalIncome}
        icon={<TrendingUp size={20} />}
        color="text-blue-500"
        prefix="+"
        formatter={formatCurrency}
        cardClassName="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-500/20 dark:to-blue-600/10 border-2 border-blue-400 dark:border-blue-500/40 shadow-lg"
      />
      <CardInfo
        title="Dépenses"
        value={totalExpense}
        icon={<TrendingDown size={20} />}
        color="text-red-500"
        prefix="-"
        formatter={formatCurrency}
        cardClassName="bg-gradient-to-br from-red-100 to-red-50 dark:from-red-500/20 dark:to-red-600/10 border-2 border-red-400 dark:border-red-500/40 shadow-lg"
      />
    </div>
  );
}
    
