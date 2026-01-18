'use client';

import React from 'react';
import { Card, CardBody, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, 
    Input, Pagination, Select, SelectItem, Button } from '@heroui/react';
import { History, Funnel, Search } from 'lucide-react';
import { budgetExample, Budget } from '@/types/Budget/Budget';
import type { ClubID } from '@/types/Club/Club';

interface TransactionItemProps {
  transaction: Budget;
}

function TransactionItem({ transaction }: TransactionItemProps) {
  const isIncome = transaction.type === 'income';
  const colorClass = isIncome ? 'text-emerald-500' : 'text-red-500';
  const bgClass = isIncome ? 'bg-emerald-50 dark:bg-emerald-500/10' : 'bg-red-50 dark:bg-red-500/10';
  const borderClass = isIncome ? 'border-emerald-100 dark:border-emerald-500/20' : 'border-red-100 dark:border-red-500/20';
  
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 ${bgClass} rounded-lg sm:rounded-2xl border ${borderClass}`}>
      <div className="flex-1">
        <p className="font-bold text-foreground text-sm sm:text-base">{transaction.label}</p>
        <p className="text-xs text-foreground/50">{new Date(transaction.date).toLocaleDateString('fr-FR')}</p>
      </div>
      <span className={`font-black ${colorClass} text-sm sm:text-base mt-2 sm:mt-0`}>
        {isIncome ? '+' : '-'}{Math.abs(transaction.amount).toLocaleString('fr-FR')} €
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

  // Trier par date décroissante
  const sortedBudget = React.useMemo(() => {
    return [...budgetExample].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

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

    return filtered;
  }, [sortedBudget, filterValue, searchValue]);

  // Paginer
  const paginatedItems = React.useMemo(() => {
    return filteredBudget.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  }, [filteredBudget, page, rowsPerPage]);

  const pages = Math.ceil(filteredBudget.length / rowsPerPage);

  return (
    <Card className="bg-primary/90 border border-default-100 shadow-sm dark:shadow-xl my-3 pb-6">
      <CardBody className="gap-4">
        <div className="flex items-center gap-2 text-foreground pb-2">
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
              inputWrapper: 'border border-default-100 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20'
            }}
          />
          
          <Dropdown>
            <DropdownTrigger>
              <Button 
                className="bg-primary flex items-center gap-2 px-3 sm:px-4 py-2 border border-default-100 shadow-sm dark:shadow-xl rounded-lg hover:bg-default-100 transition-colors w-full sm:w-auto justify-center">
                <Funnel size={16} />
                <span className="text-sm sm:text-base">Filtre</span>
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              selectedKeys={filterValue}
              onSelectionChange={(keys) => setFilterValue(keys as Set<string>)}
              selectionMode="single"
              closeOnSelect={false}
              classNames={{
                list: "bg-primary",
            }}
            >
              <DropdownItem key="all">Tous</DropdownItem>
              <DropdownItem key="income">Recettes</DropdownItem>
              <DropdownItem key="expense">Dépenses</DropdownItem>
            </DropdownMenu>
          </Dropdown>
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
        <div className="grid grid-cols-3 items-center gap-4 py-2">
            <div className="flex flex-col items-center sm:items-start mt-3">
                <span className="text-foreground text-xs sm:text-sm">Total: </span>
                <span className="font-bold text-foreground text-xs sm:text-sm">{filteredBudget.length} transactions</span>
            </div>

            <div className="flex justify-center mt-3">
                <Pagination
                    isCompact
                    showControls
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                    size="sm"
                    classNames={{
                        wrapper: "border border-default-100 shadow-sm dark:shadow-xl gap-1",
                    }}
                />
            </div>
            
            <div className="flex flex-col items-center sm:items-end gap-1 sm:gap-2">
              <span className="text-foreground text-xs sm:text-sm whitespace-nowrap">Transactions/page: </span>
              <Select
                selectedKeys={new Set([rowsPerPage.toString()])}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setPage(1);
                }}
                size="sm"
                disallowEmptySelection
                className="w-20"
                classNames={{
                    listbox: "bg-primary",
                    trigger: "bg-primary border border-default-100 shadow-sm dark:shadow-xl",
                }}
              >
                {TransactionPerPage.map((num) => (
                  <SelectItem key={num}>
                    {num.toString()}
                  </SelectItem>
                ))}
              </Select>
            </div>
        </div>

      
      </CardBody>
    </Card>
  );
}
