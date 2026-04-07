'use client';

import React from 'react';
import { History } from 'lucide-react';
import { budgetExample, Budget } from '@/types/Budget/Budget';
import type { ClubID } from '@/types/Club/Club';
import TransactionItem from '@/components/commons/TransactionItem';
import HistoryList from '@/components/commons/HistoryList';

const budgetTypes = [
  { key: 'all', label: 'Tous' },
  { key: 'income', label: 'Recettes' },
  { key: 'expense', label: 'Dépenses' },
];
const formatDate = (date: any) => {
  if (!date) return null;
  if (date instanceof Date) {
    return date.toLocaleDateString('fr-FR');
  }
  return new Date(date.year, date.month - 1, date.day).toLocaleDateString('fr-FR');
};


export default function HistoryBudget(props: ClubID) {
  
  const ClubID = props.id;
  const transactionsClubs = budgetExample.filter(budget => budget.ClubID === Number(ClubID));

  return (
    <HistoryList<Budget>
      icon={<History size={16} className="sm:w-5 sm:h-5" />}
      title="Historique des transactions"
      items={transactionsClubs}
      filterOptions={budgetTypes}
      itemsPerPageOptions={[5, 10, 15]}
      defaultItemsPerPage={5}
      itemLabel="transactions"
      emptyMessage="Aucune transaction trouvée"
      onGetItemSearchText={(item) => item.label}
      onGetItemType={(item) => item.type}
      onGetItemDate={(item) => new Date(item.date)}
      formatDate={formatDate}
      onRenderItem={(item) => <TransactionItem key={item.BudgetID} transaction={item} />}
    />
  );
}
