"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from '@heroui/react';

interface GreetingSectionProps {
  name: string;
}

export default function GreetingSection({ name }: GreetingSectionProps) {
  const router = useRouter();

  return (
    <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-12 max-w-7xl mx-auto w-full">
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
            Bonjour, {name} 👋
          </h1>
          <p className="text-lg text-foreground/70">
            Voici l'essentiel de ta vie associative.
          </p>
        </div>
        <Button
          onClick={() => router.push('/hours')}
          className="bg-secondary hover:bg-secondary/90 text-background font-semibold whitespace-nowrap"
          size="lg"
          startContent={<Plus size={20} />}
        >
          Déclarer des heures
        </Button>
      </motion.div>
    </section>
  );
}
