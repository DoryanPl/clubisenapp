'use client';

import React from 'react';
import { Card, CardBody } from '@heroui/react';

interface CardInfoProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  color?: string;
  prefix?: string;
  suffix?: string;
  className?: string;
  cardClassName?: string;
  titleClassName?: string;
  valueClassName?: string;
  formatter?: (value: number | string) => string;
}

export function CardInfo({ 
  title, 
  value, 
  icon, 
  color = 'text-foreground',
  prefix = '',
  suffix = '',
  className = '',
  cardClassName = 'bg-primary/90 border border-default-200 shadow-sm dark:shadow-xl',
  titleClassName = 'text-xs sm:text-sm font-bold',
  valueClassName = 'text-lg sm:text-xl lg:text-3xl font-bold text-center sm:text-start',
  formatter = (v: number | string) => (typeof v === 'number' ? v.toLocaleString('fr-FR') : String(v))
}: CardInfoProps) {
  
  return (
    <Card className={cardClassName}>
      <CardBody className={`gap-2 p-3 sm:p-6 ${className}`}>
        <div className="flex items-center gap-1 sm:gap-2 text-foreground text-center justify-center sm:justify-start">
          {icon && (<span className="inline-flex">{icon}</span>)}
          <span className={titleClassName}>{title}</span>
        </div>
        <div className={`${valueClassName} ${color}`}>
          {prefix} {formatter(value)} {suffix}
        </div>
      </CardBody>
    </Card>
  );
}