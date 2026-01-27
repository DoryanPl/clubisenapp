"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-content1 px-4">
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-9xl font-bold text-secondary mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          404
        </motion.h1>

        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
          Page non trouvée
        </h2>
        
        <p className="text-lg text-foreground/70 mb-8">
          Désolé, la page que vous recherchez n'existe pas ou a été supprimée.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => router.back()}
            className="bg-foreground/10 text-foreground hover:bg-foreground/20"
            size="lg"
            startContent={<ArrowLeft size={20} />}
          >
            Retour
          </Button>
          
          <Button
            onClick={() => router.push("/")}
            className="bg-secondary hover:bg-secondary/90 text-background font-semibold"
            size="lg"
            startContent={<Home size={20} />}
          >
            Accueil
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
