'use client';

import React from 'react';
import { Card, CardBody, Input } from '@heroui/react';
import { History, Search } from 'lucide-react';
import { heureExample } from '@/types/Heure/Heure';
import type { ClubID } from '@/types/Club/Club';
import { CalendarSelector } from '@/components/commons/CalendarSelector';
import { FilterButton } from '@/components/commons/FilterButton';
import { PaginationSection } from '@/components/commons/PaginationSection';
import HeureItem from '@/components/commons/HeureItem';
import SectionTitle from '@/components/commons/SectionTitle';


const HeurePerPage = [5, 10, 15];
const defaultRowsPerPage = 5;

const heureTypes = [
  { key: 'all', label: 'Tous' },
  { key: 'accepted', label: 'Accepté' },
  { key: 'waited', label: 'En attente' },
  { key: 'rejected', label: 'Refusé' },
];


export default function ListHeure(props: ClubID) {
  const clubID = props.id;
  const [filterValue, setFilterValue] = React.useState<Set<string>>(new Set(['all']));
  const [searchValue, setSearchValue] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultRowsPerPage);
  const [selectedDate, setSelectedDate] = React.useState<any>(null);

  // Filtrer par club et trier par date décroissante
  const sortedHeure = React.useMemo(() => {
    return heureExample
      .filter(h => h.ClubID === clubID)
      .sort((a, b) => new Date(b.dateHeure).getTime() - new Date(a.dateHeure).getTime());
  }, [clubID]);

  const formatDate = (date: any) => {
    if (!date) return null;

    if (date instanceof Date) {
      return date.toLocaleDateString('fr-FR');
    }

    return new Date(date.year, date.month - 1, date.day).toLocaleDateString('fr-FR');
  };

  // Filtrer et rechercher
  const filteredHeure = React.useMemo(() => {
    let filtered = sortedHeure;

    // Filtre par type
    const filterArray = Array.from(filterValue);
    if (!filterArray.includes('all')) {
      filtered = filtered.filter((item) =>
        filterArray.includes(item.type)
      );
    }

    // Recherche par nom du membre
    if (searchValue) {
      filtered = filtered.filter((item) =>
        item.membreName.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    // Filtre par date
    if (selectedDate) {
      const selectedDateStr = formatDate(selectedDate);
      filtered = filtered.filter((item) =>
        formatDate(new Date(item.dateHeure)) === selectedDateStr
      );
    }

    return filtered;
  }, [sortedHeure, filterValue, searchValue, selectedDate]);

  // Paginer
  const paginatedItems = React.useMemo(() => {
    return filteredHeure.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  }, [filteredHeure, page, rowsPerPage]);

  const pages = Math.ceil(filteredHeure.length / rowsPerPage);


  return (
    <Card className="bg-primary/90 border border-default-200 shadow-sm dark:shadow-xl">
      <CardBody className="gap-4 p-3 sm:p-6">
      
        <SectionTitle icon={<History size={16} className="sm:w-5 sm:h-5" />} title="Historique d'heures d'activités" />

        {/* Search and Filter Bar */}
        <div className="flex flex-col gap-2 sm:gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Input
            isClearable
            radius="lg"
            placeholder="Rechercher un membre..."
            startContent={<Search size={16} />}
            value={searchValue}
            onValueChange={setSearchValue}
            className="w-full lg:w-96"
            classNames={{
              inputWrapper: 'border border-default-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20'
            }}
          />

          <div className="flex gap-2 w-full sm:w-auto">
            <CalendarSelector
              value={selectedDate}
              onChange={setSelectedDate}
              onClear={() => setSelectedDate(null)}
              desktopLabel={formatDate(selectedDate) || 'Sélectionner date'}
              mobileLabel={formatDate(selectedDate) || 'Date'}
              formatDate={formatDate}
              className="flex-1 sm:flex-none"
            />
            
            <FilterButton
              label="Type"
              options={heureTypes}
              selectedKeys={filterValue}
              onSelectionChange={setFilterValue}
              closeOnSelect={false}
              className="flex-1 sm:flex-none"
            />
          </div>
        </div>

        {/* Heures List */}
        <div className="flex flex-col gap-2">
          {paginatedItems.length > 0 ? (
            paginatedItems.map((item) => (
              <HeureItem key={item.HeureID} heure={item} />
            ))
          ) : (
            <p className="text-center text-foreground/50 py-6">Aucune heure trouvée</p>
          )}
        </div>

        {/* Bottom (Pagination/count/nb per page)  */}
        <PaginationSection
          totalItems={filteredHeure.length}
          itemLabel="heures"
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={HeurePerPage}
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
