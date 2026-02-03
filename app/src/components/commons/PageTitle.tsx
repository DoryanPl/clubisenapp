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
  onSearch?: (value: string) => void;
  filterOptions?: FilterOption[];
  filterLabel?: string;
  onFilterChange?: (selectedKeys: Set<string>) => void;
  showSearch?: boolean;
  selectedFilter?: Set<string>;
}

function PageTitle({ 
  title, 
  description, 
  type, 
  onSearch,
  filterOptions = [],
  filterLabel = "Filtre",
  onFilterChange,
  showSearch = true,
  selectedFilter = new Set()
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
    </div>
  );
};

export default PageTitle;


