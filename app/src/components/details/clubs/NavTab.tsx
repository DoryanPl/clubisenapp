'use client';

import React from 'react';
import { Tabs, Tab, Card, CardBody } from '@heroui/react';
import { Eye, Users, Wallet } from 'lucide-react';
import TabMembre from './Membre/TabMembre';
import TabOverview from './Overview/TabOverview';
import TabBudget from './Budget/TabBudget';
import type { ClubID } from '@/types/Club/Club';

export default function ClubNavTab(props: ClubID) {
  const clubIDProps: ClubID = { id: props.id };

  const navItems = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: Eye, content: ( <TabOverview {...clubIDProps} />) },
    { id: 'members', label: 'Membres', icon: Users, content: ( <TabMembre {...clubIDProps} />) },  
    { id: 'budget', label: 'Budget', icon: Wallet, content: ( <TabBudget {...clubIDProps} />)  },
  ];


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Tabs 
        aria-label="Club sections" 
        items={navItems}
        variant="solid"
        color="secondary"
        className="w-full sm:w-auto"
        classNames={{
          tabList: "bg-primary rounded-3xl p-2 border border-foreground/10 shadow-sm dark:shadow-xl w-full sm:w-auto overflow-x-auto",
          tab: "px-6 py-3 rounded-xl whitespace-nowrap !opacity-100 transition-colors",
          cursor: "bg-secondary/80 rounded-xl shadow-md",
          tabContent: "text-foreground/70 group-data-[selected=true]:text-white group-hover:text-foreground font-bold transition-colors"
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
            <Card className="mt-4 bg-primary/50 border border-default-100 shadow-sm dark:shadow-xl">
              <CardBody>
                {item.content}
              </CardBody>
            </Card>
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
