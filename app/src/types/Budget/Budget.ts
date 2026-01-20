export interface Budget {
  BudgetID: string;
  ClubID: number;
  label: string;
  amount: number;
  type: 'income' | 'expense';
  date: Date;
  description?: string;
}

export interface BudgetSummary {
  ClubID: number;
  totalIncome: number;
  totalExpense: number;
  totalTreasury: number;
}

export const budgetExample: Budget[] = [
  {
    BudgetID: '1',
    ClubID: 1,
    label: 'Cotisations membres',
    amount: 1500,
    type: 'income',
    date: new Date('2026-01-15'),
    description: 'Cotisations mensuelles',
  },
  {
    BudgetID: '2',
    ClubID: 1,
    label: 'Location salle',
    amount: 500,
    type: 'expense',
    date: new Date('2026-01-10'),
    description: 'Location pour janvier',
  },
  {
    BudgetID: '3',
    ClubID: 1,
    label: 'Matériel',
    amount: 200,
    type: 'expense',
    date: new Date('2026-01-05'),
  },
  {
    BudgetID: '4',
    ClubID: 1,
    label: 'Sponsoring',
    amount: 800,
    type: 'income',
    date: new Date('2026-01-20'),
    description: 'Sponsoring local',
  },
  {
    BudgetID: '5',
    ClubID: 1,
    label: 'Uniforme',
    amount: 300,
    type: 'expense',
    date: new Date('2026-01-08'),
  },
  // Club 2 examples
  {
    BudgetID: '6',
    ClubID: 2,
    label: 'Cotisations membres',
    amount: 1200,
    type: 'income',
    date: new Date('2026-01-15'),
    description: 'Cotisations mensuelles',
  },
  {
    BudgetID: '7',
    ClubID: 2,
    label: 'Location équipement',
    amount: 400,
    type: 'expense',
    date: new Date('2026-01-12'),
  },
  {
    BudgetID: '8',
    ClubID: 2,
    label: 'Frais administratifs',
    amount: 150,
    type: 'expense',
    date: new Date('2026-01-10'),
  },
  {
    BudgetID: '9',
    ClubID: 2,
    label: 'Subvention',
    amount: 600,
    type: 'income',
    date: new Date('2026-01-18'),
    description: 'Subvention municipale',
  },
];

export const budgetSummaryExample: BudgetSummary[] = [
  {
    ClubID: 1,
    totalIncome: 2300,
    totalExpense: 1000,
    totalTreasury: 1300,
  },
  {
    ClubID: 2,
    totalIncome: 1800,
    totalExpense: 550,
    totalTreasury: 1250,
  },
];
