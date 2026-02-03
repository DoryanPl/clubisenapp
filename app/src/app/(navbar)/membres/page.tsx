'use client';

import React from 'react';
import { motion } from 'framer-motion';
import PageTitle from '@/components/commons/PageTitle';
import CardMembre from '@/components/membres/CardMembre';

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
    transition: {
      duration: 0.5,
    },
  },
};

export default function MembresPage() {
  const [searchTerm, setSearchTerm] = React.useState('');

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <PageTitle 
        title="Annuaire des membres" 
        description=" étudiants actifs dans les différents clubs du campus."
        type="membre"
        onSearch={setSearchTerm}
      />
      <motion.div variants={itemVariants}>
        <CardMembre searchTerm={searchTerm}/>
      </motion.div>
    </motion.div>
  );
}