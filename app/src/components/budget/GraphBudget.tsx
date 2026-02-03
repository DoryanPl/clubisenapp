'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardBody } from '@heroui/react';
import { ChartNoAxesCombined } from 'lucide-react';
import { LineChart } from '@mui/x-charts/LineChart';
import SectionTitle from '@/components/commons/SectionTitle';
import CalendarRange from '@/components/commons/CalendarRange';

interface GraphBudgetProps {
  balanceData: { date: string; income: number; expense: number; balance: number }[];
  isDarkMode: boolean;
  dateRange: { start: any; end: any } | null;
  onDateRangeChange: (range: { start: any; end: any } | null) => void;
}

export default function GraphBudget({
  balanceData,
  isDarkMode,
  dateRange,
  onDateRangeChange,
}: GraphBudgetProps) {
  const [chartWidth, setChartWidth] = useState(1200);
  const [chartHeight, setChartHeight] = useState(400);

  useEffect(() => {
    const updateChartSize = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        
        if (width < 640) {
          // Mobile
          setChartWidth(width - 32); // 16px padding on each side
          setChartHeight(300);
        } else if (width < 1024) {
          // Tablet
          setChartWidth(width - 48); // 24px padding on each side
          setChartHeight(350);
        } else {
          // Desktop
          setChartWidth(1200);
          setChartHeight(400);
        }
      }
    };

    updateChartSize();
    window.addEventListener('resize', updateChartSize);
    return () => window.removeEventListener('resize', updateChartSize);
  }, []);

  return (
    <Card className="bg-primary/60 border border-default-200 shadow-sm dark:shadow-xl">
    <CardBody className="gap-4 p-3 sm:p-6">
        <SectionTitle icon={<ChartNoAxesCombined size={16} className="sm:w-5 sm:h-5"/>} title="Évolution du solde" />
        <div className="flex gap-2 w-full sm:w-auto justify-end flex-col sm:flex-row">
        <CalendarRange value={dateRange} onChange={onDateRangeChange} />
        </div>
        {balanceData.length > 0 ? (
        <div className="w-full overflow-x-auto -mx-3 sm:mx-0 px-3 sm:px-0">
            <LineChart
            width={Math.max(chartWidth, 300)}
            height={chartHeight}
            dataset={balanceData}
            xAxis={[
                {
                dataKey: 'date',
                scaleType: 'band',
                label: 'Date',
                },
            ]}
            yAxis={[
                { label: 'Solde (€)' },
            ]}
            series={[
                {
                dataKey: 'balance',
                label: 'Solde cumulé',
                color: '#10b981',
                curve: 'monotoneX',
                valueFormatter: (value: number | null) => `${value?.toLocaleString('fr-FR') ?? 0} €`,
                },
                {
                dataKey: 'income',
                label: 'Recettes',
                color: isDarkMode ? '#60a5fa' : '#1976d2',
                curve: 'monotoneX',
                valueFormatter: (value: number | null) => `${value?.toLocaleString('fr-FR') ?? 0} €`,
                },
                {
                dataKey: 'expense',
                label: 'Dépenses',
                color: '#ef4444',
                curve: 'monotoneX',
                valueFormatter: (value: number | null) => `${value?.toLocaleString('fr-FR') ?? 0} €`,
                },
            ]}
            sx={{
                '& .MuiChartsAxis-left .MuiChartsAxis-tickLabelStyle': {
                fill: isDarkMode ? 'white' : 'black',
                },
                '& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabelStyle': {
                fill: isDarkMode ? 'white' : 'black',
                },
                '& .MuiChartsAxis-root text': {
                fill: isDarkMode ? 'white' : 'black',
                },
            }}
            slotProps={{
                legend: { hidden: true },
            }}
            />
        </div>
        ) : (
        <p className="text-center text-foreground/50 py-8">Aucune donnée disponible</p>
        )}
    </CardBody>
    </Card>
  );
}
