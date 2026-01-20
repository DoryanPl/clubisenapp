'use client';

import React from 'react';
import { Button, Calendar, Popover, PopoverTrigger, PopoverContent } from '@heroui/react';
import { Clock } from 'lucide-react';

interface DateSelectorProps {
  value: any;
  onChange: (date: any) => void;
  onClear?: () => void;
  placeholder?: string;
  desktopLabel?: string;
  mobileLabel?: string;
  showClearButton?: boolean;
  icon?: React.ReactNode;
  className?: string;
  buttonClassName?: string;
  popoverClassName?: string;
  calendarClassName?: string;
  formatDate?: (date: any) => string | null;
}

export function DateSelector({
  value,
  onChange,
  onClear,
  placeholder = 'Sélectionner date',
  desktopLabel,
  mobileLabel = 'Date',
  showClearButton = true,
  icon = <Clock size={16} />,
  className = '',
  buttonClassName = 'bg-default-100 flex items-center gap-2 px-3 sm:px-4 py-2 border border-default-200 shadow-sm dark:shadow-xl rounded-lg hover:bg-default-100 transition-colors sm:flex-none justify-center w-full',
  popoverClassName = 'bg-transparent border-0 shadow-none p-0',
  calendarClassName = 'cursor-pointer hover:bg-primary transition-colors rounded-full',
  formatDate = (date: any) => {
    if (!date) return null;
    if (date instanceof Date) {
      return date.toLocaleDateString('fr-FR');
    }
    return new Date(date.year, date.month - 1, date.day).toLocaleDateString('fr-FR');
  }
}: DateSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const displayLabel = desktopLabel || placeholder;
  const displayedDate = formatDate(value) || displayLabel;

  return (
    <div className={className}>
      <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger>
          <Button className={buttonClassName}>
            {icon}
            <span className="hidden sm:inline text-sm sm:text-base">{displayedDate}</span>
            <span className="sm:hidden text-sm">{formatDate(value) || mobileLabel}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className={popoverClassName}>
          <div className="flex flex-col gap-3">
            <Calendar
              value={value}
              onChange={(date) => {
                onChange(date);
                setIsOpen(false);
              }}
              classNames={{
                cell: calendarClassName,
              }}
            />
            {showClearButton && value && (
              <Button
                size="sm"
                color="danger"
                variant="flat"
                onPress={() => {
                  onClear?.();
                  setIsOpen(false);
                }}
                className="w-full"
              >
                Effacer la date
              </Button>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
