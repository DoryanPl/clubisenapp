'use client';

import React from "react";
import {Button, Popover, PopoverTrigger, PopoverContent, Calendar} from "@heroui/react";
import {today, getLocalTimeZone} from "@internationalized/date";
import { Calendar as CalendarIcon } from 'lucide-react';

interface CalendarRangeProps {
  value?: {start: any; end: any} | null;
  onChange?: (value: {start: any; end: any} | null) => void;
}

export default function CalendarRange({ value, onChange }: CalendarRangeProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState(value?.start || today(getLocalTimeZone()).add({days: -7}));
  const [endDate, setEndDate] = React.useState(value?.end || today(getLocalTimeZone()));
  const [focusedStart, setFocusedStart] = React.useState(value?.start || today(getLocalTimeZone()).add({days: -7}));
  const [focusedEnd, setFocusedEnd] = React.useState(value?.end || today(getLocalTimeZone()));
  
  // États temporaires pour les changements en cours
  const [tempStartDate, setTempStartDate] = React.useState(value?.start || today(getLocalTimeZone()).add({days: -7}));
  const [tempEndDate, setTempEndDate] = React.useState(value?.end || today(getLocalTimeZone()));

  const now = today(getLocalTimeZone());

  const handleQuickSelect = (start: any, end: any) => {
    setTempStartDate(start);
    setTempEndDate(end);
    setFocusedStart(start);
    setFocusedEnd(end);
  };

  const getSemesterDates = () => {
    const currentMonth = now.month;
    const currentYear = now.year;
    
    if (currentMonth >= 9) {

        const semesterStart = today(getLocalTimeZone()).set({month: 9, day: 1});
      return { start: semesterStart, end: now };
    } else if (currentMonth >= 3 && currentMonth <= 8) {

        const semesterStart = today(getLocalTimeZone()).set({month: 3, day: 1});
      return { start: semesterStart, end: now };
    } else {

        const semesterStart = today(getLocalTimeZone()).set({year: currentYear - 1, month: 9, day: 1});
      return { start: semesterStart, end: now };
    }
  };

  const getPreviousSemesterDates = () => {
    const currentMonth = now.month;
    const currentYear = now.year;
    
    if (currentMonth >= 9) {

        const semesterStart = today(getLocalTimeZone()).set({month: 3, day: 1});
      const semesterEnd = today(getLocalTimeZone()).set({month: 8, day: 31});
      return { start: semesterStart, end: semesterEnd };
    } else if (currentMonth >= 3 && currentMonth <= 8) {

        const semesterStart = today(getLocalTimeZone()).set({year: currentYear - 1, month: 9, day: 1});
      const semesterEnd = today(getLocalTimeZone()).set({year: currentYear, month: 2, day: 28});
      return { start: semesterStart, end: semesterEnd };
    } else {
      // Janvier-février (semestre 1) -> semestre 2 précédent: mars à août
      const semesterStart = today(getLocalTimeZone()).set({year: currentYear - 1, month: 3, day: 1});
      const semesterEnd = today(getLocalTimeZone()).set({year: currentYear - 1, month: 8, day: 31});
      return { start: semesterStart, end: semesterEnd };
    }
  };

  const handleApply = () => {
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
    onChange?.({start: tempStartDate, end: tempEndDate});
    setIsOpen(false);
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setTempStartDate(null);
    setTempEndDate(null);
    setFocusedStart(today(getLocalTimeZone()));
    setFocusedEnd(today(getLocalTimeZone()));
    onChange?.(null);
    setIsOpen(false);
  };

  const formatDateRange = (start: any, end: any) => {
    if (!start || !end) return 'Sélectionner une plage';
    
    const formatDate = (d: any) => {
      if (d?.toDate) d = d.toDate();
      if (d instanceof Date) {
        return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
      }
      return d?.toString?.()?.slice(0, 5) || '';
    };
    
    const startStr = formatDate(start);
    const endStr = formatDate(end);
    
    if (!startStr || !endStr) return 'Sélectionner une plage';
    return `${startStr} → ${endStr}`;
  };

  return (
    <div className="flex flex-col gap-4">
      <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger>
          <Button 
            startContent={<CalendarIcon size={16} />}
            className="bg-default-100 flex items-center gap-2 px-3 sm:px-4 py-2 border border-default-200 shadow-sm dark:shadow-xl rounded-lg hover:bg-default-100 transition-colors sm:flex-none justify-center w-full"
          >
            {formatDateRange(startDate, endDate)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full bg-primary border border-default-200 shadow-sm dark:shadow-xl rounded-lg">
          <div className="flex gap-4 p-4">

            {/* Options rapides à gauche */}
            <div className="flex flex-col gap-2 min-w-fit">
              <p className="text-xs font-semibold text-default-600 px-2">Rapide</p>
              <Button
                size="sm"
                variant="flat"
                className="justify-start"
                onPress={() => handleQuickSelect(now.add({days: -7}), now)}
              >
                Dernière semaine
              </Button>
              <Button
                size="sm"
                variant="flat"
                className="justify-start"
                onPress={() => handleQuickSelect(now.add({days: -14}), now)}
              >
                2 dernières semaines
              </Button>
              <Button
                size="sm"
                variant="flat"
                className="justify-start"
                onPress={() => handleQuickSelect(now.set({day: 1}), now)}
              >
                Ce mois ci
              </Button>
              <Button
                size="sm"
                variant="flat"
                className="justify-start"
                onPress={() => handleQuickSelect(now.add({days: -30}), now)}
              >
                Dernier mois
              </Button>
              <Button
                size="sm"
                variant="flat"
                className="justify-start"
                onPress={() => handleQuickSelect(now.add({days: -90}), now)}
              >
                3 derniers mois
              </Button>
              <Button
                size="sm"
                variant="flat"
                className="justify-start"
                onPress={() => {
                  const dates = getSemesterDates();
                  handleQuickSelect(dates.start, dates.end);
                }}
              >
                Premier semestre
              </Button>
              <Button
                size="sm"
                variant="flat"
                className="justify-start"
                onPress={() => {
                  const dates = getPreviousSemesterDates();
                  handleQuickSelect(dates.start, dates.end);
                }}
              >
                Deuxième semestre
              </Button>
            </div>

            {/* Calendriers au centre/droite */}
            <div className="flex flex-col gap-4 flex-1">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <p className="text-xs font-semibold text-default-600 mb-1">Date de début</p>
                  <p className="text-sm font-medium mb-2">
                    {tempStartDate?.toDate?.()?.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }) || 'Sélectionner'}
                  </p>
                  <Calendar
                    value={tempStartDate}
                    onChange={setTempStartDate}
                    focusedValue={focusedStart}
                    onFocusChange={setFocusedStart}
                    visibleMonths={1}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-xs font-semibold text-default-600 mb-1">Date de fin</p>
                  <p className="text-sm font-medium mb-2">
                    {tempEndDate?.toDate?.()?.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }) || 'Sélectionner'}
                  </p>
                  <Calendar
                    value={tempEndDate}
                    onChange={setTempEndDate}
                    focusedValue={focusedEnd}
                    onFocusChange={setFocusedEnd}
                    visibleMonths={1}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  color="primary"
                  className="flex-1 bg-default-100 border border-default-200 shadow-sm dark:shadow-xl rounded-lg hover:bg-default-100 transition-colors"
                  onPress={handleApply}
                >
                  Appliquer
                </Button>
                <Button
                  variant="bordered"
                  className="flex-1 shadow-sm dark:shadow-xl rounded-lg hover:bg-default-100 transition-colors "
                  onPress={handleReset}
                >
                  Réinitialiser
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
