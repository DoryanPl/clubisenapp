'use client';

import React from 'react';
import { Card, CardBody } from '@heroui/react';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { budgetExample } from '@/types/Budget/Budget';
import type { ClubID } from '@/types/Club/Club';

interface CardBudgetProps {
  title: string;
  amount: number;
  type: 'income' | 'expense' | 'treasury';
  icon?: React.ReactNode;
}

export function CardBudget({ title, amount, type, icon }: CardBudgetProps) {
  const colorClass = type === 'income' ? 'text-blue-600' : type === 'expense' ? 'text-danger' : 'text-success';
  
  return (
    <Card className="bg-primary/90 border border-default-100 shadow-sm dark:shadow-xl">
      <CardBody className="gap-2 p-3 sm:p-6">
        <div className="flex items-center gap-2 text-foreground">
          {icon && (<span className="inline-flex">{icon}</span>)}
          <span className="text-xs sm:text-sm font-bold">{title}</span>
        </div>
        <div className={`text-xl sm:text-3xl font-bold ${colorClass}`}>
          {type === 'expense' ? '-' : type === 'treasury' ? '' : '+'}{(amount ?? 0).toLocaleString('fr-FR')} €
        </div>
      </CardBody>
    </Card>
  );
}

export default function CardTotalBudget(props: ClubID) {
  const clubIDProps: ClubID = { id: props.id };

  const totalIncome = budgetExample
    .filter(b => b.type === 'income')
    .reduce((sum, b) => sum + b.amount, 0);

  const totalExpense = budgetExample
    .filter(b => b.type === 'expense')
    .reduce((sum, b) => sum + Math.abs(b.amount), 0);

  const totalTresor = totalIncome - totalExpense;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <CardBudget
          title="Trésorerie"
          amount={totalTresor}
          type="treasury"
          icon={<Wallet size={20} />}
        />
        <CardBudget
          title="Recettes"
          amount={totalIncome}
          type="income"
          icon={<TrendingUp size={20} />}
        />
        <CardBudget
          title="Dépenses"
          amount={totalExpense}
          type="expense"
          icon={<TrendingDown size={20} />}
        />
      </div>
    </div>
  );
}
    
