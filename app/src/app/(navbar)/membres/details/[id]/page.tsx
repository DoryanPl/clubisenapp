'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import PageTitle from '@/components/membres/details/PageTitle';
import CardInfoMembre from '@/components/membres/details/CardInfoMembre';
import type { MembrePage, MembreID, MembreSearchParams } from '@/types/Membre/Membre';
import HeureMembre from '@/components/membres/details/HeureMembre';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
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

export default function ClubsDetailsPage() {
  const params = useParams();
  const MembreID = Number(params.id);

  const memberPageProps: MembrePage = {
    id: MembreID,
    isAdmin: true,
  };
  
  const membreIDProps: MembreID = {
    id: MembreID,
  };

  const membreSearchParams: MembreSearchParams = {
    id: MembreID,
    search: '',
  };

  return (
    <motion.div
      className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* <PageTitle {...memberPageProps} /> */}
      <motion.div className='flex flex-col md:flex-row gap-8 px-4 sm:px-6 lg:px-8' variants={itemVariants}>
        <motion.div className='w-full lg:w-1/3' variants={itemVariants}>
          <CardInfoMembre {...membreIDProps} />
        </motion.div>
        <motion.div className='w-full lg:w-2/3' variants={itemVariants}>
          <HeureMembre {...membreIDProps} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}