'use client';

import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@heroui/react';
import { Funnel } from 'lucide-react';

interface FilterOption {
  key: string;
  label: string;
}

interface FilterButtonProps {
  label?: string;
  options: FilterOption[];
  selectedKeys: Set<string>;
  onSelectionChange: (keys: Set<string>) => void;
  icon?: React.ReactNode;
  className?: string;
  buttonClassName?: string;
  dropdownMenuClassName?: string;
  selectionMode?: 'single' | 'multiple';
  disallowEmptySelection?: boolean;
  closeOnSelect?: boolean;
}

export function FilterButton({
  label = 'Filtre',
  options,
  selectedKeys,
  onSelectionChange,
  icon = <Funnel size={16} />,
  className = '',
  buttonClassName = 'bg-default-100 flex items-center gap-2 px-3 sm:px-4 py-2 border border-default-200 shadow-sm dark:shadow-xl rounded-lg hover:bg-default-100 transition-colors sm:flex-none justify-center w-full',
  dropdownMenuClassName = 'bg-primary p-2 rounded-lg shadow-lg border border-default-200',
  selectionMode = 'single',
  disallowEmptySelection = true,
  closeOnSelect = false,
}: FilterButtonProps) {
  return (
    <div className={className}>
        <Dropdown className='bg-transparent border-0 shadow-none'>
            <DropdownTrigger>
                <Button className={buttonClassName}>
                {icon}
                <span className="text-sm sm:text-base">{label}</span>
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                selectedKeys={selectedKeys}
                onSelectionChange={(keys) => onSelectionChange(keys as Set<string>)}
                selectionMode={selectionMode}
                disallowEmptySelection={disallowEmptySelection}
                closeOnSelect={closeOnSelect}
                classNames={{
                    list: dropdownMenuClassName,
                }}
            >
                {options.map((option) => (
                <DropdownItem key={option.key}>{option.label}</DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    </div>
  );
}
