'use client';

import React from 'react';
import { Eye, Users, Wallet } from 'lucide-react';
import NavTabs from '../../commons/NavTab';
import TabMembre from './membre/TabMembre';
import TabOverview from './overview/TabOverview';
import TabBudget from './budget/TabBudget';
import TabHeure from './heure/TabHeure';
import type { ClubID } from '@/types/Club/Club';

export default function ClubNavTab(props: ClubID) {
  const clubIDProps: ClubID = { id: props.id };

  const navItems = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: Eye, content: <TabOverview {...clubIDProps} /> },
    { id: 'members', label: 'Membres', icon: Users, content: <TabMembre {...clubIDProps} /> },
    { id: 'budget', label: 'Budget', icon: Wallet, content: <TabBudget {...clubIDProps} /> },
    { id: 'heure', label: 'Heures', icon: Wallet, content: <TabHeure {...clubIDProps} /> },
  ];

  return <NavTabs items={navItems} ariaLabel="Club sections" />;
}
