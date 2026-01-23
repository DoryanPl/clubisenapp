'use client';

import React, { useState } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Input } from '@heroui/react';
import { Funnel, Search } from 'lucide-react';

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
  showSearch?: boolean;
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
  showSearch = true,
}: FilterButtonProps) {
  const [searchValue, setSearchValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className={className}>
        <Dropdown 
          className='bg-transparent border-0 shadow-none'
          isOpen={isOpen}
          onOpenChange={setIsOpen}
        >
            <DropdownTrigger>
                <Button className={buttonClassName}>
                {icon}
                <span className="text-sm sm:text-base">{label}</span>
                </Button>
            </DropdownTrigger>
            {isOpen && (
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
                  {showSearch ? (
                    <>
                      <DropdownItem 
                        key="search" 
                        textValue="search" 
                        className="mb-2 without-bg"
                        classNames={{
                        }}
                        isReadOnly
                      >
                          <Input
                            placeholder="Rechercher..."
                            startContent={<Search size={16} />}
                            value={searchValue}
                            onValueChange={setSearchValue}
                            size="sm"
                            isClearable
                            radius="lg"
                            classNames={{
                              inputWrapper: "border border-default-200 ",
                            }}
                          />
                      </DropdownItem>
                      {filteredOptions.map((option) => (
                        <DropdownItem 
                          key={option.key}
                        >
                          {option.label}
                        </DropdownItem>
                      ))}
                    </>
                  ) : (
                    <>
                      {filteredOptions.map((option) => (
                        <DropdownItem 
                          key={option.key}
                        >
                          {option.label}
                        </DropdownItem>
                      ))}
                    </>
                  )}
              </DropdownMenu>
            )}
        </Dropdown>
    </div>
  );
}
