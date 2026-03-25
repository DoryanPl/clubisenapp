import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

export default function HelpSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 pb-16 max-w-7xl mx-auto w-full">
      <motion.div
        className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex gap-4 items-start">
          <AlertCircle size={28} className="flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-2xl font-bold mb-2">Besoin d'aide ?</h3>
            <p className="text-blue-100">
              Consulte le guide de l'étudiant pour savoir comment déclarer les heures et obtenir tes crédits.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
