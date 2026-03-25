'use client';

import { Input, Button } from "@heroui/react"; 
import { Plus, Search } from "lucide-react";
import { FilterButton } from "./FilterButton";
import { useState } from "react";

interface FilterOption {
  key: string;
  label: string;
}

interface PageTitleProps {
  title: string;
  description?: string;
  type?: string;
  selectedFilter?: Set<string>;
  filterOptions?: FilterOption[];
  filterLabel?: string;
  onFilterChange?: (selectedKeys: Set<string>) => void;
  showSearch?: boolean;
  onSearch?: (value: string) => void;
  showButton?: boolean;
}

function PageTitle({ 
  title, 
  description, 
  type, 
  selectedFilter = new Set(),
  filterOptions = [],
  filterLabel = "Filtre",
  onFilterChange,
  showSearch = true,
  onSearch,
  showButton = true,
}: PageTitleProps) {
  const [filterValue, setFilterValue] = useState<Set<string>>(selectedFilter);

  const handleFilterChange = (keys: Set<string>) => {
    setFilterValue(keys);
    onFilterChange?.(keys);
  };

  return (
    <div className="pt-6 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center gap-8">
      <div className="flex-1">
        <h1 className="text-xl sm:text-2xl font-bold">
          {title}
        </h1>
        {description && (
          <p className="text-base">
            {description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto sm:min-w-fit">
        {showSearch ? (
          <div className="flex-1 sm:w-80 flex flex-col sm:flex-row gap-2">
            {filterOptions.length > 0 && (
              <FilterButton
                label={filterLabel}
                options={filterOptions}
                selectedKeys={filterValue}
                onSelectionChange={handleFilterChange}
                closeOnSelect={false}
                disallowEmptySelection={false}
                selectionMode="single" 
                className="flex-1 sm:flex-none"
              />
            )}

            <Input
              isClearable
              radius="lg"
              placeholder={`Rechercher un ${type}...`}
              startContent={<Search size={18} />}
              onValueChange={(value) => onSearch?.(value)}
              classNames={{
                inputWrapper: "bg-default-200/50 border border-default-200 hover:border-default-400",
              }}
            />
          </div>
        ) : (
          filterOptions.length > 0 && (
            <FilterButton
              label={filterLabel}
              options={filterOptions}
              selectedKeys={filterValue}
              onSelectionChange={handleFilterChange}
              closeOnSelect={false}
              className="flex-1 sm:flex-none"
            />
          )
        )}

        {showButton && (
          <Button className="bg-secondary hover:bg-secondary/90 text-background font-semibold whitespace-nowrap flex-shrink-0" startContent={<Plus size={20} />}>
            <span className="hidden sm:inline">Créer un {type}</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default PageTitle;


