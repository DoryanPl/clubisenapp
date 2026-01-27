'use client';

import React from 'react';
import { Card, CardBody, Input } from '@heroui/react';
import { History, Search } from 'lucide-react';
import { budgetExample, Budget } from '@/types/Budget/Budget';
import type { ClubID } from '@/types/Club/Club';
import { DateSelector } from '@/components/DateSelector';
import { FilterButton } from '@/components/FilterButton';
import { PaginationSection } from '@/components/PaginationSection';
import TransactionItem from '@/components/TransactionItem';
import SectionTitle from '@/components/SectionTitle';


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
    <Card className="bg-primary/60 border border-default-200 shadow-sm dark:shadow-xl">
      <CardBody className="gap-4 p-3 sm:p-6">
     
			  <SectionTitle icon={<History size={16} className="sm:w-5 sm:h-5" />} title="Historique des transactions" />

        {/* Search and Filter Bar */}
        <div className="flex gap-2 sm:gap-3 flex-col sm:flex-row sm:items-center sm:justify-between">
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
              <TransactionItem key={item.BudgetID} transaction={item} />
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
