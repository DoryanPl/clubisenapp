import React from 'react';
import type { Budget } from '@/types/Budget/Budget';


interface TransactionItemProps {
  transaction: Budget;
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
  const isIncome = transaction.type === 'income';
  const colorClass = isIncome ? 'text-emerald-500' : 'text-red-500';
  const bgClass = isIncome ? 'bg-gradient-to-br from-emerald-200 to-emerald-100 dark:from-emerald-500/20 dark:to-emerald-600/10' : 'bg-gradient-to-br from-red-200 to-red-100 dark:from-red-500/20 dark:to-red-600/10';
  const borderClass = isIncome ? 'border-emerald-400 dark:border-emerald-500/40' : 'border-red-400 dark:border-red-500/40';
  
  return (
    <div className={`flex flex-row shadow-sm sm:items-center sm:justify-between p-3 sm:p-4 ${bgClass} rounded-lg sm:rounded-2xl border-2 ${borderClass}`}>
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