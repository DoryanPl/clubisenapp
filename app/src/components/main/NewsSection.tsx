"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface News {
  id: number;
  club: string;
  title: string;
  description: string;
  date: string;
}

interface NewsSectionProps {
  news: News[];
}

export default function NewsSection({ news }: NewsSectionProps) {
  const router = useRouter();

  return (
    <motion.div
      className="lg:col-span-2 bg-content1 border border-default-200 rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">Dernières actualités</h2>
        <span 
          onClick={() => router.push('/news')}
          className="text-secondary hover:text-secondary/80 font-semibold text-sm cursor-pointer"
        >
          Voir tout
        </span>
      </div>

      <div className="space-y-4">
        {news.map((item) => (
          <motion.div
            key={item.id}
            className="border-l-4 border-l-secondary/50 pl-4 py-3 hover:border-l-secondary transition-colors cursor-pointer"
            whileHover={{ x: 4 }}
          >
            <div className="flex justify-between items-start gap-2 mb-2">
              <p className="text-xs font-bold text-secondary uppercase">{item.club}</p>
              <span className="text-xs text-foreground/50">{item.date}</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">{item.title}</h3>
            <p className="text-sm text-foreground/70">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
