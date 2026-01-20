import React from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, Users } from 'lucide-react';

interface StatCardData {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'blue' | 'emerald' | 'purple';
}

interface StatsCardsProps {
  clubsCount: number;
  hoursValidated: number;
  budget: number;
}

const colorStyles: Record<'blue' | 'emerald' | 'purple', { bg: string; border: string; icon: string }> = {
  blue: {
    bg: 'from-blue-500/10 to-blue-600/5',
    border: 'border-blue-500/20 hover:border-blue-500/40',
    icon: 'text-blue-500 bg-blue-500/20',
  },
  emerald: {
    bg: 'from-emerald-500/10 to-emerald-600/5',
    border: 'border-emerald-500/20 hover:border-emerald-500/40',
    icon: 'text-emerald-500 bg-emerald-500/20',
  },
  purple: {
    bg: 'from-purple-500/10 to-purple-600/5',
    border: 'border-purple-500/20 hover:border-purple-500/40',
    icon: 'text-purple-500 bg-purple-500/20',
  },
};

const stats: Array<StatCardData & { color: 'blue' | 'emerald' | 'purple' }> = [
  { label: 'Clubs', value: '', icon: <Users size={24} />, color: 'blue' },
  { label: 'Heures Validées', value: '', icon: <Clock size={24} />, color: 'emerald' },
  { label: 'Budget', value: '', icon: <TrendingUp size={24} />, color: 'purple' },
];

export default function StatsCards({
  clubsCount,
  hoursValidated,
  budget,
}: StatsCardsProps) {
  const statsData = [
    { ...stats[0], value: clubsCount },
    { ...stats[1], value: `${hoursValidated}h` },
    { ...stats[2], value: `${budget}€` },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 pb-12 max-w-7xl mx-auto w-full">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {statsData.map((stat, idx) => {
          const style = colorStyles[stat.color];
          return (
            <motion.div
              key={idx}
              className={`bg-gradient-to-br ${style.bg} border ${style.border} rounded-2xl p-6 transition-colors`}
              variants={itemVariants}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`${style.icon} rounded-lg p-3`}>{stat.icon}</div>
                <span className="text-sm font-semibold text-foreground/70 uppercase">{stat.label}</span>
              </div>
              <p className="text-4xl font-bold text-foreground">{stat.value}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
