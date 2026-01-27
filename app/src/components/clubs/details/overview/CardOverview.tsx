'use client';

import React from 'react';
import { User, Crown, Wallet } from 'lucide-react';
import {budgetSummaryExample } from '@/types/Budget/Budget';
import { membresExample } from '@/types/Membre/Membre';
import type { ClubID } from '@/types/Club/Club';
import { CardInfo } from '@/components/commons/CardInfo';

export default function CardOverview(props: ClubID) {
    const clubID = props.id;

    const clubMembers = membresExample.filter(member => member.ClubID === clubID);
    const totalMembers = clubMembers.length;

    const clubSummary = budgetSummaryExample.find(summary => summary.ClubID === clubID);
    const totalIncome = clubSummary?.totalIncome ?? 0;
	const totalExpense = clubSummary?.totalExpense ?? 0;
    const totalTreasury = clubSummary?.totalTreasury ?? 0;
	const totalSolde = (totalTreasury + totalIncome) - totalExpense;

    const formatCurrency = (value: number | string) => {
        const numValue = typeof value === 'number' ? value : Number(value);
        return `${numValue.toLocaleString('fr-FR')} €`;
    };

    const nomPresident = clubMembers.find(member => member.role.toLowerCase() === 'présidente')?.nom || 'N/A';
    const prenomPresident = clubMembers.find(member => member.role.toLowerCase() === 'présidente')?.prenom || 'N/A';


  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full">
    <CardInfo
        title="Membres"
        value={totalMembers}
        icon={<User size={20} />}
        color="text-emerald-500"
        cardClassName="bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-500/20 dark:to-emerald-600/10 border-2 border-emerald-400 dark:border-emerald-500/40 shadow-lg"
    />
    <CardInfo
        title="Président"
        value={`${prenomPresident} ${nomPresident}`}
        icon={<Crown size={20} />}
        color="text-yellow-500"
        cardClassName="bg-gradient-to-br from-yellow-100 to-yellow-50 dark:from-yellow-500/20 dark:to-yellow-600/10 border-2 border-yellow-400 dark:border-yellow-500/40 shadow-lg"
    />
    <CardInfo
        title="Solde"
        value={totalSolde}
        icon={<Wallet size={20} />}
        color="text-blue-500"
        prefix="+"
        formatter={formatCurrency}
        cardClassName="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-500/20 dark:to-blue-600/10 border-2 border-blue-400 dark:border-blue-500/40 shadow-lg"
    />
    </div>
  );
}
    
