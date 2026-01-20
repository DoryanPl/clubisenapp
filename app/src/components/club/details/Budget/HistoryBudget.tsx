'use client';

import React from 'react';
import { Card, CardBody, Input } from '@heroui/react';
import { History, Search } from 'lucide-react';
import { budgetExample, Budget } from '@/types/Budget/Budget';
import type { ClubID } from '@/types/Club/Club';
import { DateSelector } from '@/components/DateSelector';
import { FilterButton } from '@/components/FilterButton';
import { PaginationSection } from '@/components/PaginationSection';


interface TransactionItemProps {
  transaction: Budget;
}

function TransactionItem({ transaction }: TransactionItemProps) {
  const isIncome = transaction.type === 'income';
  const colorClass = isIncome ? 'text-emerald-500' : 'text-red-500';
  const bgClass = isIncome ? 'bg-emerald-200 dark:bg-emerald-500/10' : 'bg-red-200 dark:bg-red-500/10';
  const borderClass = isIncome ? 'border-emerald-500/40 dark:border-emerald-500/20' : 'border-red-500/40 dark:border-red-500/20';
  
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 ${bgClass} rounded-lg sm:rounded-2xl border ${borderClass}`}>
      <div className="flex-1">
        <p className="font-bold text-foreground text-sm sm:text-base">{transaction.label}</p>
        <p className="text-xs text-foreground/50">{new Date(transaction.date).toLocaleDateString('fr-FR')}</p>
      </div>
      <span className={`font-black ${colorClass} text-sm sm:text-base mt-2 sm:mt-0`}>
        {isIncome ? '+' : '-'} {Math.abs(transaction.amount).toLocaleString('fr-FR')} €
      </span>
    </div>
  );
}

const TransactionPerPage = [5, 10, 15];
const defaultRowsPerPage = 5;

export default function HistoryBudget(props: ClubID) {
  const [filterValue, setFilterValue] = React.useState<Set<string>>(new Set(['all']));
  const [searchValue, setSearchValue] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultRowsPerPage);
  const [selectedDate, setSelectedDate] = React.useState<any>(null);

  const budgetTypes = [
    { key: 'all', label: 'Tous' },
    { key: 'income', label: 'Recettes' },
    { key: 'expense', label: 'Dépenses' },
  ];

  // Trier par date décroissante
  const sortedBudget = React.useMemo(() => {
    return [...budgetExample].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  const formatDate = (date: any) => {
    if (!date) return null;

    if (date instanceof Date) {
      return date.toLocaleDateString('fr-FR');
    }

    return new Date(date.year, date.month - 1, date.day).toLocaleDateString('fr-FR');
  };

  // Filtrer et rechercher
  const filteredBudget = React.useMemo(() => {
    let filtered = sortedBudget;

    // Filtre par type
    const filterArray = Array.from(filterValue);
    if (!filterArray.includes('all')) {
      filtered = filtered.filter((item) =>
        filterArray.includes(item.type)
      );
    }

    // Recherche par label
    if (searchValue) {
      filtered = filtered.filter((item) =>
        item.label.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (selectedDate) {
      const selectedDateStr = formatDate(selectedDate);
      filtered = filtered.filter((item) =>
        formatDate(new Date(item.date)) === selectedDateStr
      );
    }

    return filtered;
  }, [sortedBudget, filterValue, searchValue, selectedDate]);

  // Paginer
  const paginatedItems = React.useMemo(() => {
    return filteredBudget.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  }, [filteredBudget, page, rowsPerPage]);

  const pages = Math.ceil(filteredBudget.length / rowsPerPage);

  return (
    <Card className="bg-primary/90 border border-default-200 shadow-sm dark:shadow-xl">
      <CardBody className="gap-4 p-3 sm:p-6">
        <div className="flex items-center gap-2 text-foreground justify-center sm:justify-start">
          <span className="inline-flex"><History size={16} className="sm:w-5 sm:h-5" /></span>
          <span className="text-base sm:text-lg font-bold text-foreground">Historique des transactions</span>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col gap-2 sm:gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Input
            isClearable
            radius="lg"
            placeholder="Rechercher..."
            startContent={<Search size={16} />}
            value={searchValue}
            onValueChange={setSearchValue}
            className="w-full lg:w-96"
            classNames={{
              inputWrapper: 'border border-default-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20'
            }}
          />
          
          <div className="flex gap-2 w-full sm:w-auto">
              <DateSelector
                value={selectedDate}
                onChange={setSelectedDate}
                onClear={() => setSelectedDate(null)}
                className="flex-1 sm:flex-none"
                desktopLabel={formatDate(selectedDate) || 'Sélectionner date'}
                mobileLabel={formatDate(selectedDate) || 'Date'}
                formatDate={formatDate}
              />

              <FilterButton
                label="Type"
                options={budgetTypes}
                selectedKeys={filterValue}
                onSelectionChange={setFilterValue}
                closeOnSelect={false}
                className="flex-1 sm:flex-none"
              />
          </div>
        </div>

        {/* Transactions List */}
        <div className="flex flex-col gap-2">
          {paginatedItems.length > 0 ? (
            paginatedItems.map((item) => (
              <TransactionItem key={item.id} transaction={item} />
            ))
          ) : (
            <p className="text-center text-foreground/50 py-6">Aucune transaction trouvée</p>
          )}
        </div>

        {/* Bottom (Pagination/count/nb per page)  */}
        <PaginationSection
          totalItems={filteredBudget.length}
          itemLabel="transactions"
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={TransactionPerPage}
          onRowsPerPageChange={(value) => {
            setRowsPerPage(value);
            setPage(1);
          }}
          page={page}
          totalPages={pages}
          onPageChange={setPage}
        />
      </CardBody>
    </Card>
  );
}
