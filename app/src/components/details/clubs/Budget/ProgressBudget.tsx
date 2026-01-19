'use client';

import React from "react";
import { Progress, Card, CardBody } from "@heroui/react";
import { budgetSummaryExample } from "@/types/Budget/Budget";
import { Landmark } from "lucide-react";
import type { ClubID } from '@/types/Club/Club';

export default function ProgressBudget(props: ClubID) {
	const clubID = props.id;

	// Récupérer les données du club depuis BudgetSummary
	const clubSummary = budgetSummaryExample.find(summary => summary.ClubID === clubID);
	
	const totalIncome = clubSummary?.totalIncome ?? 0;
	const totalExpense = clubSummary?.totalExpense ?? 0;
	const totalTreasury = clubSummary?.totalTreasury ?? 0;
	const totalSolde = (totalTreasury + totalIncome) - totalExpense;

	// Pourcentage d'utilisation du budget par rapport à la base (Trésorerie + Revenus)
	const budgetBase = totalTreasury + totalIncome;
	const percentageUsed = budgetBase > 0 ? (totalExpense / budgetBase) * 100 : 0;
	const percentageRemaining = 100 - percentageUsed;

	return (
		<Card className="w-full bg-primary border border-default-200 shadow-sm dark:shadow-xl mt-3">
			<CardBody className="gap-3 p-3 sm:gap-4 sm:p-6">
				{/* Titre et Trésorerie */}
				<div className="flex items-center gap-2">
					<Landmark size={20} className="text-foreground" />
					<h3 className="text-base sm:text-lg font-semibold text-foreground"> Budget</h3>
				</div>

				{/* Barre de progression */}
				<div className="space-y-2">
					<div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm">
						<span className="text-foreground">Dépenses: {percentageUsed.toFixed(1)}% (- {(totalExpense).toLocaleString('fr-FR')} €)</span>
						<span className="text-foreground">Restant: {percentageRemaining.toFixed(1)}% ({(totalSolde).toLocaleString('fr-FR')} €)</span>
					</div>
					<Progress
						aria-label="Budget used"
						className="w-full"
						value={percentageUsed}
						color={percentageUsed > 80 ? "danger" : percentageUsed > 60 ? "warning" : "success"}
						size="sm"
					/>
				</div>
			</CardBody>
		</Card>
	);
}
