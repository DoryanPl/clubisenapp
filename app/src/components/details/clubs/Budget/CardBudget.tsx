'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import {budgetSummaryExample } from '@/types/Budget/Budget';
import type { ClubID } from '@/types/Club/Club';
import { CardInfo } from '@/components/CardInfo';

export default function CardTotalBudget(props: ClubID) {
  const clubID = props.id;

  // Utiliser BudgetSummary pour obtenir les données du club
  const clubSummary = budgetSummaryExample.find(summary => summary.ClubID === clubID);

  const totalIncome = clubSummary?.totalIncome ?? 0;
  const totalExpense = clubSummary?.totalExpense ?? 0;
  const totalTresor = clubSummary?.totalTreasury ?? 0;

  const formatCurrency = (value: number | string) => {
    const numValue = typeof value === 'number' ? value : Number(value);
    return `${numValue.toLocaleString('fr-FR')} €`;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <CardInfo
          title="Trésorerie"
          value={totalTresor}
          icon={<Wallet size={20} />}
          color="text-success"
          formatter={formatCurrency}
        />
        <CardInfo
          title="Recettes"
          value={totalIncome}
          icon={<TrendingUp size={20} />}
          color="text-blue-600"
          prefix="+"
          formatter={formatCurrency}
        />
        <CardInfo
          title="Dépenses"
          value={totalExpense}
          icon={<TrendingDown size={20} />}
          color="text-danger"
          prefix="-"
          formatter={formatCurrency}
        />
      </div>
    </div>
  );
}
    
