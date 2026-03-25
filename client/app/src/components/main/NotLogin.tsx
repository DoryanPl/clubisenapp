'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, CardBody } from '@heroui/react';
import { motion } from 'framer-motion';
import { LogIn, Drama } from 'lucide-react';

export default function NotLogin() {
  const router = useRouter();

  return (
    <main className="w-full bg-background min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-20 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">
        <motion.div
          className="space-y-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Bienvenue sur <span className="text-secondary">ClubIsen</span>
            </h1>
            <p className="text-lg sm:text-xl text-foreground/70 mb-8">
              Découvrez et explorez les clubs de votre campus
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card className="bg-primary/90 border border-default-200 shadow-lg dark:shadow-xl h-full hover:border-secondary/50 transition-colors">
                <CardBody className="p-6 space-y-4 text-center">
                  <div className="flex justify-center">
                    <div className="bg-secondary/20 p-4 rounded-lg">
                      <Drama size={32} className="text-secondary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Découvrir les clubs</h3>
                  <p className="text-foreground/70 text-sm">
                    Parcourez tous les clubs disponibles et trouvez ceux qui vous intéressent
                  </p>
                  <Button
                    onClick={() => router.push('/clubs')}
                    className="bg-secondary hover:bg-secondary/90 text-background font-semibold w-full"
                  >
                    Voir les clubs
                  </Button>
                </CardBody>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Card className="bg-primary/90 border border-default-200 shadow-lg dark:shadow-xl h-full hover:border-secondary/50 transition-colors">
                <CardBody className="p-6 space-y-4 text-center">
                  <div className="flex justify-center">
                    <div className="bg-secondary/20 p-4 rounded-lg">
                      <LogIn size={32} className="text-secondary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Se connecter</h3>
                  <p className="text-foreground/70 text-sm">
                    Connectez-vous pour accéder à votre profil et vos clubs
                  </p>
                  <Button
                    onClick={() => router.push('/login')}
                    className="bg-secondary hover:bg-secondary/90 text-background font-semibold w-full"
                  >
                    Se connecter
                  </Button>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
