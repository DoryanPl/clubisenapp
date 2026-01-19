'use client';

import React from 'react';
import { Pagination, Select, SelectItem } from '@heroui/react';

interface PaginationSectionProps {
  totalItems: number;
  itemLabel: string; 
  rowsPerPage: number;
  rowsPerPageOptions: number[];
  onRowsPerPageChange: (value: number) => void;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationSection({
  totalItems,
  itemLabel,
  rowsPerPage,
  rowsPerPageOptions,
  onRowsPerPageChange,
  page,
  totalPages,
  onPageChange,
}: PaginationSectionProps) {
  return (
    <div className="flex flex-col gap-3 sm:gap-0">
        
        <div className="flex justify-center">
            <Pagination
            isCompact
            showControls
            color="primary"
            initialPage={1}
            page={page}
            total={totalPages}
            onChange={onPageChange}
            size="sm"
            classNames={{
                wrapper: 'border border-default-200 shadow-sm dark:shadow-xl gap-1',
            }}
            />
        </div>

        <div className="flex flex-row items-center px-3 justify-between">
            <div className="flex flex-col items-start">
                <span className="text-foreground text-xs sm:text-sm">Total: </span>
                <span className="font-bold text-foreground text-xs sm:text-sm">
                {totalItems} {itemLabel}
                </span>
            </div>

            <div className="flex flex-col items-end  gap-1">
                <span className="text-foreground text-xs sm:text-sm whitespace-nowrap">
                Nombre de lignes:{' '}
                </span>
                <Select
                selectedKeys={new Set([rowsPerPage.toString()])}
                onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
                size="sm"
                disallowEmptySelection
                className="w-20"
                classNames={{
                    listbox: 'bg-primary',
                    trigger: 'border border-default-200 shadow-sm dark:shadow-xl',
                }}
                >
                {rowsPerPageOptions.map((num) => (
                    <SelectItem key={num}>{num.toString()}</SelectItem>
                ))}
                </Select>
            </div>
        </div>
    </div>
  );
}
