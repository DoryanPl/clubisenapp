import React from 'react';
import type { Budget } from '@/types/Budget/Budget';


interface TransactionItemProps {
  transaction: Budget;
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
  const isIncome = transaction.type === 'income';
  const colorClass = isIncome ? 'text-emerald-500' : 'text-red-500';
  const bgClass = isIncome ? 'bg-emerald-200 dark:bg-emerald-500/10' : 'bg-red-200 dark:bg-red-500/10';
  const borderClass = isIncome ? 'border-emerald-500/40 dark:border-emerald-500/20' : 'border-red-500/40 dark:border-red-500/20';
  
  return (
    <div className={`flex flex-row sm:items-center sm:justify-between p-3 sm:p-4 ${bgClass} rounded-lg sm:rounded-2xl border ${borderClass}`}>
      <div className="flex-1">
        <p className="font-bold text-foreground text-sm sm:text-base">{transaction.label}</p>
        <p className="text-xs text-foreground/50">{new Date(transaction.date).toLocaleDateString('fr-FR')}</p>
      </div>
      <span className={`font-black ${colorClass} text-sm sm:text-base mt-2 sm:mt-0 content-center`}>
        {isIncome ? '+' : '-'} {Math.abs(transaction.amount).toLocaleString('fr-FR')} €
      </span>
    </div>
  );
}