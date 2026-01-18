export interface Budget {
  id: string;
  clubId: string;
  label: string;
  amount: number;
  type: 'income' | 'expense';
  date: Date;
  description?: string;
}

export const budgetExample: Budget[] = [
  {
    id: '1',
    clubId: 'club-1',
    label: 'Cotisations membres',
    amount: 1500,
    type: 'income',
    date: new Date('2024-01-15'),
    description: 'Cotisations mensuelles',
  },
  {
    id: '2',
    clubId: 'club-1',
    label: 'Location salle',
    amount: 500,
    type: 'expense',
    date: new Date('2024-01-10'),
    description: 'Location pour janvier',
  },
  {
    id: '3',
    clubId: 'club-1',
    label: 'Matériel',
    amount: 200,
    type: 'expense',
    date: new Date('2024-01-05'),
  },
];
