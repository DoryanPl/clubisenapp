'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';
import PageTitle from '@/components/commons/PageTitle';
import HoursMonclub from '@/components/module/hours/HoursMonclub';
import { CardInfo } from '@/components/commons/CardInfo';
import { Users, Clock, TrendingUp, Award } from 'lucide-react';
import RecentActivitiesMonclub from '@/components/module/monclub/RecentActivitiesMonclub';
import QuickActionsMonclub from '@/components/module/monclub/QuickActionsMonclub';
import RecentMembersMonclub from '@/components/module/monclub/RecentMembersMonclub';
import { ClubID } from '@/types/Club/Club';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function MonclubPage(props: any) {
  const clubIDProps: ClubID = { id:  props.id };


  const [clubStats] = useState({
    membersCount: 42,
    totalHours: 350,
    budget: 2450,
    events: 8,
  });

  return (
    <motion.div
      variants={containerVariants}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-8 flex flex-col"
      initial="hidden"
      animate="visible"
    >
        <PageTitle 
        title="Mon Club" 
        description="Bienvenue sur votre tableau de bord club"
        type="club"
        showButton={false}
        showSearch={false}
        />

        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <CardInfo
            title="Membres Actifs"
            value={clubStats.membersCount}
            icon={<Users size={24} />}
            color="blue"
            />
            <CardInfo
            title="Heures Totales"
            value={clubStats.totalHours}
            icon={<Clock size={24} />}
            color="emerald"
            suffix="h"
            />
            <CardInfo
            title="Budget Disponible"
            value={clubStats.budget}
            icon={<TrendingUp size={24} />}
            color="purple"
            suffix="€"
            />
            <CardInfo
            title="Événements"
            value={clubStats.events}
            icon={<Award size={24} />}
            color="orange"
            />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6 ">
                <motion.div variants={itemVariants}>
                    <HoursMonclub />
                </motion.div>

                <motion.div variants={itemVariants}>
                    <QuickActionsMonclub />
                </motion.div>

                <motion.div variants={itemVariants}>
                    <RecentActivitiesMonclub />
                </motion.div>
            </div>

            <div className="lg:col-span-1">
                <motion.div variants={itemVariants}>
                    <RecentMembersMonclub />
                </motion.div>
            </div>
        </div>
    </motion.div>
  );
}