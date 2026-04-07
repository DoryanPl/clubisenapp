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
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
        
    <CardInfo
        title="Membres"
        value={totalMembers}
        icon={<User size={20} />}
        color="emerald"
    />
    <CardInfo
        title="Président"
        value={`${prenomPresident} ${nomPresident}`}
        icon={<Crown size={20} />}
        color="yellow"
    />
    <CardInfo
        title="Solde"
        value={totalSolde}
        icon={<Wallet size={20} />}
        color="blue"
        prefix="+"
        formatter={formatCurrency}
    />
    </div>
  );
}
    
