'use client';

import React from 'react';
import { Card, CardBody, Input } from '@heroui/react';
import { Search } from 'lucide-react';
import { CalendarSelector } from '@/components/commons/CalendarSelector';
import { FilterButton } from '@/components/commons/FilterButton';
import { PaginationSection } from '@/components/commons/PaginationSection';
import SectionTitle from '@/components/commons/SectionTitle';
import CalendarRange from '@/components/commons/CalendarRange';

interface FilterOption {
  key: string;
  label: string;
}

interface HistoryListProps<T> {
  icon: React.ReactNode;
  title: string;
  items: T[];
  itemsPerPageOptions?: number[];
  defaultItemsPerPage?: number;
  filterOptions?: FilterOption[];
  onRenderItem: (item: T) => React.ReactNode;
  onGetItemSearchText?: (item: T) => string;
  onGetItemType?: (item: T) => string;
  onGetItemDate?: (item: T) => Date | null;
  emptyMessage?: string;
  itemLabel?: string;
  formatDate?: (date: any) => string | null;
}

const defaultItemsPerPageOptions = [5, 10, 15];
const defaultItemsPerPage = 5;

export default function HistoryList<T>({
  icon,
  title,
  items,
  itemsPerPageOptions = defaultItemsPerPageOptions,
  defaultItemsPerPage: defaultItemsPerPageProp = defaultItemsPerPage,
  filterOptions = [],
  onRenderItem,
  onGetItemSearchText = () => '',
  onGetItemType = () => 'all',
  onGetItemDate = () => null,
  emptyMessage = 'Aucun élément trouvé',
  itemLabel = 'éléments',
  formatDate = (date) => {
    if (!date) return null;
    if (date instanceof Date) {
      return date.toLocaleDateString('fr-FR');
    }
    return new Date(date.year, date.month - 1, date.day).toLocaleDateString('fr-FR');
  },
}: HistoryListProps<T>) {
  const [filterValue, setFilterValue] = React.useState<Set<string>>(
    new Set(filterOptions.length > 0 ? ['all'] : [])
  );
  const [searchValue, setSearchValue] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultItemsPerPageProp);
  const [selectedDate, setSelectedDate] = React.useState<any>(null);
  const [dateRange, setDateRange] = React.useState<{start: any; end: any} | null>(null);

  // SORT BY TIME
  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const dateA = onGetItemDate(a);
      const dateB = onGetItemDate(b);
      if (!dateA || !dateB) return 0;
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
  }, [items, onGetItemDate]);

  // FILTER TYPE/SEARCH/DATE
  const filteredItems = React.useMemo(() => {
    let filtered = sortedItems;

    // Filter by type
    if (filterOptions.length > 0) {
      const filterArray = Array.from(filterValue);
      if (!filterArray.includes('all')) {
        filtered = filtered.filter((item) => filterArray.includes(onGetItemType(item)));
      }
    }

    // Search
    if (searchValue) {
      filtered = filtered.filter((item) =>
        onGetItemSearchText(item).toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    // Filter by date
    if (selectedDate) {
      const selectedDateStr = formatDate(selectedDate);
      filtered = filtered.filter((item) => {
        const itemDate = onGetItemDate(item);
        return formatDate(itemDate) === selectedDateStr;
      });
    }

    // Filter by date range
    if (dateRange) {
      filtered = filtered.filter((item) => {
        const itemDate = onGetItemDate(item);
        if (!itemDate) return false;
        const itemTime = itemDate.getTime();
        const startTime = dateRange.start?.toDate?.().getTime?.() || new Date(dateRange.start).getTime();
        const endTime = dateRange.end?.toDate?.().getTime?.() || new Date(dateRange.end).getTime();
        return itemTime >= startTime && itemTime <= endTime;
      });
    }

    return filtered;
  }, [sortedItems, filterValue, searchValue, selectedDate, dateRange, filterOptions, onGetItemSearchText, onGetItemType, onGetItemDate, formatDate]);

  // PAGINATION
  const paginatedItems = React.useMemo(() => {
    return filteredItems.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  }, [filteredItems, page, rowsPerPage]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  return (
    <Card className="bg-primary/60 border border-default-200 shadow-sm dark:shadow-xl">
      <CardBody className="gap-4 p-3 sm:p-6">
        <SectionTitle icon={icon} title={title} />

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
              inputWrapper:
                'bg-default-200/50 border border-default-200 hover:border-default-400',
            }}
          />

          <div className="flex gap-2 w-full sm:w-auto flex-row">
            {/* <CalendarSelector
              value={selectedDate}
              onChange={setSelectedDate}
              onClear={() => setSelectedDate(null)}
              className="flex-1 sm:flex-none"
              desktopLabel={formatDate(selectedDate) || 'Sélectionner date'}
              mobileLabel={formatDate(selectedDate) || 'Date'}
              formatDate={formatDate}
            /> */}

            <div className="w-full sm:w-auto">
              <CalendarRange value={dateRange} onChange={setDateRange} />
            </div>

            {filterOptions.length > 0 && (
              <div className="w-full sm:w-auto">
                <FilterButton
                  label="Type"
                  options={filterOptions}
                  selectedKeys={filterValue}
                  onSelectionChange={setFilterValue}
                  closeOnSelect={false}
                  className="w-full sm:w-auto"
                />
              </div>
            )}
          </div>
        </div>

        {/* Items List */}
        <div className="flex flex-col gap-2">
          {paginatedItems.length > 0 ? (
            paginatedItems.map((item) => (
              <React.Fragment key={JSON.stringify(item)}>
                {onRenderItem(item)}
              </React.Fragment>
            ))
          ) : (
            <p className="text-center text-foreground/50 py-6">{emptyMessage}</p>
          )}
        </div>

        {/* Bottom (Pagination/count/nb per page) */}
        <PaginationSection
          totalItems={filteredItems.length}
          itemLabel={itemLabel}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={itemsPerPageOptions}
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
