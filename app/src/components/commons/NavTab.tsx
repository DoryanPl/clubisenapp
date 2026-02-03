'use client';

import React, { ReactNode } from 'react';
import { Tabs, Tab, Card, CardBody } from '@heroui/react';
import { LucideIcon } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  content: ReactNode;
}

export interface NavTabsProps {
  items: NavItem[];
  ariaLabel?: string;
}

export default function NavTabs({ items, ariaLabel = "Tabs" }: NavTabsProps) {
  return (
    <Tabs 
      aria-label={ariaLabel}
      items={items}
      color ="secondary"
      className="w-full sm:w-auto "
      classNames={{
        tabList: "bg-primary rounded-3xl p-2 border border-foreground/10 shadow-sm dark:shadow-xl w-full sm:w-auto overflow-x-auto",
        tab: "px-6 py-3 rounded-xl whitespace-nowrap !opacity-100 transition-colors" ,
        tabContent: "text-foreground/70 group-data-[selected=true]:text-background group-data-[selected=true]:font-semibold group-hover:text-foreground font-bold transition-colors",
     }}
    >
      {(item) => (
        <Tab 
          key={item.id} 
          title={
            <div className="flex items-center gap-2">
              <item.icon size={18} />
              <span>{item.label}</span>
            </div>
          }
        >
          <Card className="mt-4 bg-transparent shadow-none">
            <CardBody className="p-0">
              {item.content}
            </CardBody>
          </Card>
        </Tab>
      )}
    </Tabs>
  );
}
