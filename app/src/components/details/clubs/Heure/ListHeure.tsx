'use client';

import React from 'react';
import { Card, CardBody, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, 
    Input, Pagination, Select, SelectItem, Button } from '@heroui/react';
import { Clock, Funnel, Search, CircleCheck, CircleX } from 'lucide-react';
import { heureExample, Heure } from '@/types/Heure/Heure';
import type { ClubID } from '@/types/Club/Club';

interface HeureItemProps {
  heure: Heure;
}

const statusIcons = {
  accepted: <CircleCheck size={20} className="text-emerald-500 font-bold" />,
  waited: <Clock size={20} className="text-yellow-500 font-bold" />,
  rejected: <CircleX size={20} className="text-red-500 font-bold" />,
};

const statusBackgrounds = {
  accepted: 'bg-emerald-50 dark:bg-emerald-500/10',
  waited: 'bg-yellow-50 dark:bg-yellow-500/10',
  rejected: 'bg-red-50 dark:bg-red-500/10',
};

function HeureCard({ heure }: HeureItemProps) {
 
  return (
    <div className={`border border-default-200 shadow-sm dark:shadow-xl flex flex-row items-center gap-3 p-3 sm:p-4 rounded-lg sm:rounded-2xl border`}>
      {/* Status Icon with background */}
      <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg ${statusBackgrounds[heure.type]}`}>
        {statusIcons[heure.type]}
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-foreground text-sm sm:text-base truncate">{heure.membreName}</p>
        <div className="flex flex-col gap-1 text-xs text-foreground/70 mt-1">
          <p>{new Date(heure.dateHeure).toLocaleDateString('fr-FR')}</p>    
        </div>
      </div>
      
      {/* Hours */}
      <span className="flex-shrink-0 font-bold text-foreground text-sm sm:text-base">
        {heure.duree}h
      </span>
    </div>
  );
}

const HeurePerPage = [5, 10, 15];
const defaultRowsPerPage = 5;

const heureTypes = [
  { key: 'all', label: 'Tous' },
  { key: 'accepted', label: 'Accepté' },
  { key: 'waited', label: 'Attente' },
  { key: 'rejected', label: 'Refusé' },
];


export default function ListHeure(props: ClubID) {
  const clubID = props.id;
  const [filterValue, setFilterValue] = React.useState<Set<string>>(new Set(['all']));
  const [searchValue, setSearchValue] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultRowsPerPage);

  // Filtrer par club et trier par date décroissante
  const sortedHeure = React.useMemo(() => {
    return heureExample
      .filter(h => h.ClubID === clubID)
      .sort((a, b) => new Date(b.dateHeure).getTime() - new Date(a.dateHeure).getTime());
  }, [clubID]);

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

    return filtered;
  }, [sortedHeure, filterValue, searchValue]);

  // Paginer
  const paginatedItems = React.useMemo(() => {
    return filteredHeure.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  }, [filteredHeure, page, rowsPerPage]);

  const pages = Math.ceil(filteredHeure.length / rowsPerPage);

  return (
    <Card className="bg-primary/90 border border-default-200 shadow-sm dark:shadow-xl my-3">
      <CardBody className="gap-4 p-6">
        <div className="flex items-center gap-2 text-foreground pb-2">
          <span className="inline-flex"><Clock size={16} className="sm:w-5 sm:h-5" /></span>
          <span className="text-base sm:text-lg font-bold text-foreground">Activités des heures</span>
        </div>

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
          
          <Dropdown>
            <DropdownTrigger>
              <Button 
                className="bg-default-100 flex items-center gap-2 px-3 sm:px-4 py-2 border border-default-200 shadow-sm dark:shadow-xl rounded-lg hover:bg-default-100 transition-colors w-full sm:w-auto justify-center">
                <Funnel size={16} />
                <span className="text-sm sm:text-base">Type</span>
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
              {heureTypes.map((type) => {
                return <DropdownItem key={type.key}>{type.label}</DropdownItem>;
              })}
            </DropdownMenu>
          </Dropdown>
        </div>

        {/* Heures List */}
        <div className="flex flex-col gap-2">
          {paginatedItems.length > 0 ? (
            paginatedItems.map((item) => (
              <HeureCard key={item.HeureID} heure={item} />
            ))
          ) : (
            <p className="text-center text-foreground/50 py-6">Aucune heure trouvée</p>
          )}
        </div>

        {/* Bottom (Pagination/count/nb per page)  */}
        <div className="grid grid-cols-3 items-center gap-4 py-2">
            <div className="flex flex-col items-center sm:items-start mt-3">
                <span className="text-foreground text-xs sm:text-sm">Total: </span>
                <span className="font-bold text-foreground text-xs sm:text-sm">{filteredHeure.length} heures</span>
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
                        wrapper: "border border-default-200 shadow-sm dark:shadow-xl gap-1",
                    }}
                />
            </div>
            
            <div className="flex flex-col items-center sm:items-end gap-1 sm:gap-2">
              <span className="text-foreground hidden sm:block sm:text-sm whitespace-nowrap">Heures/page: </span>
              <Select
                selectedKeys={new Set([rowsPerPage.toString()])}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setPage(1);
                }}
                size="sm"
                disallowEmptySelection
                className="w-20 pt-2 sm:pt-0"
                classNames={{
                    listbox: "bg-default-100",
                    trigger: "bg-default-100 border border-default-200 shadow-sm dark:shadow-xl",
                }}
              >
                {HeurePerPage.map((num) => (
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
