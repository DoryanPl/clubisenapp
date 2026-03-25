'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageTitle from '@/components/commons/PageTitle';
import CardClub from '@/components/clubs/CardClub';

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

export default function ClubsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <PageTitle 
        title="Tous les Clubs" 
        description="Découvrez et rejoignez les clubs du campus."
        type="club"
        onSearch={setSearchTerm}
      />
      <motion.div variants={itemVariants}>
        <CardClub searchTerm={searchTerm} />
      </motion.div>
    </motion.div>
  );
}