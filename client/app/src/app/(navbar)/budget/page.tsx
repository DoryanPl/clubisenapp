'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet, History } from 'lucide-react';
import { clubsExample } from '@/types/Club/Club';
import { budgetExample, budgetSummaryExample, Budget} from '@/types/Budget/Budget';
import { CardInfo } from '@/components/commons/CardInfo';
import PageTitle from '@/components/commons/PageTitle';
import TransactionItem from '@/components/commons/TransactionItem';
import HistoryList from '@/components/commons/HistoryList';
import GraphBudget from '@/components/budget/GraphBudget';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};


const CLUBS_DATA = [
  { key: 'all', label: 'Tous les clubs' },
  ...clubsExample.map((c: any) => ({
    key: c.id.toString(),
    label: c.ClubNom,
  })),
];

const formatCurrency = (value: number | string) => {
  const numValue = typeof value === 'number' ? value : Number(value);
  return `${numValue.toLocaleString('fr-FR')} €`;
};

const formatDate = (date: any) => {
  if (!date) return null;
  if (date instanceof Date) {
    return date.toLocaleDateString('fr-FR');
  }
  return new Date(date.year, date.month - 1, date.day).toLocaleDateString('fr-FR');
};

export default function BudgetPage() {
  const [selectedClub, setSelectedClub] = useState<Set<string>>(new Set(['all']));
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [dateRange, setDateRange] = useState<{start: any; end: any} | null>(null);

  {/* Dark mode */}
  useEffect(() => {
    const updateDarkMode = () => {
      const darkModeEnabled = document.documentElement.classList.contains('dark');
      setIsDarkMode(darkModeEnabled);
    };

    updateDarkMode();

    const observer = new MutationObserver(updateDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  {/* Card info */}
  let totalIncome: number;
  let totalExpense: number;
  const clubSummary = budgetSummaryExample.find(summary => summary.ClubID === Number(Array.from(selectedClub)[0]));

  if (Array.from(selectedClub)[0] === 'all') {
    totalIncome = budgetSummaryExample.reduce((sum, summary) => sum + summary.totalIncome, 0);
    totalExpense = budgetSummaryExample.reduce((sum, summary) => sum + summary.totalExpense, 0);
  }
  else {
    totalIncome = clubSummary?.totalIncome ?? 0;
    totalExpense = clubSummary?.totalExpense ?? 0;
  }
  const totalSolde = totalIncome - totalExpense;

  const transactionsClubs = selectedClub.has('all')
    ? budgetExample
    : budgetExample.filter(budget => budget.ClubID === Number(Array.from(selectedClub)[0]));

  const budgetTypes = [
    { key: 'all', label: 'Tous' },
    { key: 'income', label: 'Recettes' },
    { key: 'expense', label: 'Dépenses' },
  ];


  {/* Solde par jour */}
  const balanceData = useMemo(() => {
    const sorted = [...transactionsClubs].sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );

    let filtered = sorted;
    if (dateRange?.start && dateRange?.end) {
      const startTime = dateRange.start?.toDate?.().getTime?.() || new Date(dateRange.start).getTime();
      const endTime = dateRange.end?.toDate?.().getTime?.() || new Date(dateRange.end).getTime();
      filtered = sorted.filter(t => {
        const tTime = t.date.getTime();
        return tTime >= startTime && tTime <= endTime;
      });
    }

    let cumulativeBalance = 0;
    const dateMap = new Map<string, { income: number; expense: number; balance: number }>();

    filtered.forEach((t) => {
      const dateKey = t.date.toISOString().split('T')[0];
      const existing = dateMap.get(dateKey) || { income: 0, expense: 0, balance: 0 };
      
      if (t.type === 'income') {
        existing.income += t.amount;
        cumulativeBalance += t.amount;
      } else {
        existing.expense += t.amount;
        cumulativeBalance -= t.amount;
      }
      existing.balance = cumulativeBalance;
      dateMap.set(dateKey, existing);
    });

    const result: { date: string; income: number; expense: number; balance: number }[] = [];
    Array.from(dateMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([date, data]) => {
        const [year, month, day] = date.split('-');
        const formattedDate = `${day}/${month}/${year}`;
        result.push({ 
          date: formattedDate, 
          income: data.income,
          expense: data.expense,
          balance: data.balance 
        });
      });

    return result;
  }, [transactionsClubs, dateRange]);


  {/* Filtre by Club */}
  const handleClubFilterChange = (keys: Set<string>) => {
    setSelectedClub(keys);
  };


  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <PageTitle 
        title="Trésorerie des Clubs" 
        description="Consultez les budgets alloués aux différents clubs du campus."
        type="budget"
        filterOptions={CLUBS_DATA}
        filterLabel="Club"
        selectedFilter={selectedClub}
        onFilterChange={handleClubFilterChange}
        showSearch={false}
      />

      <motion.div className="pt-6 px-4 sm:px-6 lg:px-8 grid grid-cols-3 gap-2 sm:gap-4" variants={itemVariants}>
        <motion.div variants={itemVariants}>
          <CardInfo
            title="Solde"
            value={totalSolde}
            icon={<Wallet size={20} />}
            color="text-emerald-500"
            formatter={formatCurrency}
            cardClassName="bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-500/20 dark:to-emerald-600/10 border-2 border-emerald-400 dark:border-emerald-500/40 shadow-lg"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <CardInfo
            title="Total Recettes"
            value={totalIncome}
            icon={<TrendingUp size={20} />}
            color="text-blue-500"
            prefix="+"
            formatter={formatCurrency}
            cardClassName="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-500/20 dark:to-blue-600/10 border-2 border-blue-400 dark:border-blue-500/40 shadow-lg"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <CardInfo
            title="Total Dépenses"
            value={totalExpense}
            icon={<TrendingDown size={20} />}
            color="text-red-500"
            prefix="-"
            formatter={formatCurrency}
            cardClassName="bg-gradient-to-br from-red-100 to-red-50 dark:from-red-500/20 dark:to-red-600/10 border-2 border-red-400 dark:border-red-500/40 shadow-lg"
          />
        </motion.div>
      </motion.div>

      <motion.div className="pt-8 px-4 sm:px-6 lg:px-8" variants={itemVariants}>
        <GraphBudget
          balanceData={balanceData}
          isDarkMode={isDarkMode}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
      </motion.div>

      <motion.div className="pt-8 px-4 sm:px-6 lg:px-8" variants={itemVariants}>
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
      </motion.div>
    </motion.div>
  );
}