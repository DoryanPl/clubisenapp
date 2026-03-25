'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Input, Textarea, Select, SelectItem, Card } from '@heroui/react';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { clubsExample } from '@/types/Club/Club';

interface HourDeclaration {
  club: string;
  hours: number;
  date: string;
  description: string;
}

export default function HoursForm() {
  const [formData, setFormData] = useState<HourDeclaration>({
    club: '',
    hours: 0,
    date: new Date().toISOString().split('T')[0],
    description: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { name: string; value: string | number }
  ) => {
    const { name, value } = 'target' in e ? e.target : e;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.club) {
      setError('Veuillez sélectionner un club');
      return;
    }
    if (formData.hours <= 0 || formData.hours > 24) {
      setError('Les heures doivent être entre 1 et 24');
      return;
    }
    if (!formData.date) {
      setError('Veuillez sélectionner une date');
      return;
    }

    // Simuler une soumission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        club: '',
        hours: 0,
        date: new Date().toISOString().split('T')[0],
        description: '',
      });
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-content1 border border-default-200 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Déclarer des heures</h1>
          <p className="text-foreground/70">
            Enregistrez les heures que vous avez passées au sein de votre club.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Club Selection */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">
              Club <span className="text-red-500">*</span>
            </label>
            <Select
              label="Sélectionnez un club"
              placeholder="Choisir un club"
              name="club"
              value={formData.club}
              onChange={(e) => handleChange({ name: 'club', value: e.target.value })}
              className="w-full"
            >
              {clubsExample.map((club) => (
                <SelectItem key={club.id.toString()} value={club.id.toString()}>
                  {club.ClubNom}
                </SelectItem>
              ))}
            </Select>
          </div>

          {/* Date Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">
              Date <span className="text-red-500">*</span>
            </label>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Hours Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">
              Nombre d'heures <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2 items-end">
              <Input
                type="number"
                name="hours"
                min="1"
                max="24"
                value={formData.hours || ''}
                onChange={handleChange}
                placeholder="Nombre d'heures"
                className="flex-1"
              />
              <span className="text-foreground/70 font-medium">heures</span>
            </div>
            <p className="text-xs text-foreground/50">Maximum 24 heures par déclaration</p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Description (optionnel)</label>
            <Textarea
              name="description"
              placeholder="Décrivez brièvement vos activités..."
              value={formData.description}
              onChange={handleChange}
              minRows={4}
              className="w-full"
            />
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle size={20} className="text-red-500" />
              <span className="text-red-600 text-sm">{error}</span>
            </motion.div>
          )}

          {/* Success Message */}
          {submitted && (
            <motion.div
              className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <CheckCircle size={20} className="text-emerald-500" />
              <span className="text-emerald-600 text-sm">Heures déclarées avec succès! ✓</span>
            </motion.div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-secondary hover:bg-secondary/90 text-background font-semibold py-6 text-base"
            size="lg"
            startContent={<Clock size={20} />}
            isLoading={submitted}
          >
            {submitted ? 'En cours...' : 'Déclarer les heures'}
          </Button>
        </form>

        {/* Info Box */}
        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-foreground/70">
            <span className="font-semibold text-foreground">ℹ️ Info :</span> Les heures déclarées seront vérifiées par les
            responsables du club avant validation.
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
