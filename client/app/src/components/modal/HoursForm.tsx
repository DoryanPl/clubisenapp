'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Input, Textarea, Select, SelectItem } from '@heroui/react';
import { CalendarSelector } from '@/components/commons/CalendarSelector';
import { Clock, CheckCircle, AlertCircle, Pencil, Check } from 'lucide-react';
import { clubsExample } from '@/types/Club/Club';
import { today, getLocalTimeZone } from '@internationalized/date';

interface HourDeclaration {
  club: number;
  hours: number;
  date: any;
  titre: string;
  description: string;
}

interface HoursFormProps {
  onSuccess?: () => void;
  defaultClubId: number;
}

const isAdmin = false;

export default function HoursForm({ onSuccess, defaultClubId }: HoursFormProps) {
  const [formData, setFormData] = useState<HourDeclaration>({
    club: defaultClubId,
    hours: 0,
    date: today(getLocalTimeZone()),
    titre: '',
    description: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isEditingClub, setIsEditingClub] = useState(false);

  const getClubName = () => {
    const club = clubsExample.find(c => c.id === formData.club);
    return club ? club.ClubNom : 'Aucun club sélectionné';
  };

  const handleClubChange = (value: string) => {
    setFormData((prev) => ({ ...prev, club: parseInt(value) }));
    setError('');
  };

  const toggleClubEdit = () => {
    setIsEditingClub(!isEditingClub);
  };

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
    // if (!formData.club) {
    //   setError('Veuillez sélectionner un club');
    //   return;
    // }
    if (!formData.titre.trim()) {
      setError('Veuillez entrer un titre');
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
        club: defaultClubId,
        hours: 0,
        date: today(getLocalTimeZone()),
        titre: '',
        description: '',
      });
      setIsEditingClub(false);
      onSuccess?.();
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-8">
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
            {!isEditingClub ? (
              <div className="flex items-center gap-3 p-2 bg-default-100 rounded-lg">
                <span className="flex-1 text-foreground">
                  {getClubName()}
                </span>
                {isAdmin && (
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    className="text-foreground/70 hover:text-foreground hover:bg-default-200"
                    onPress={toggleClubEdit}
                  >
                    <Pencil size={18} />
                  </Button>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Select
                  label="Sélectionnez un club"
                  placeholder="Choisir un club"
                  selectedKeys={formData.club ? [formData.club] : []}
                  onSelectionChange={(keys) => {
                    const value = Array.from(keys)[0] as string;
                    handleClubChange(value);
                  }}
                  className="flex-1"
                >
                  {clubsExample.map((club) => (
                    <SelectItem key={club.id.toString()} value={club.id.toString()}>
                      {club.ClubNom}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            )}
          </div>

          {/* Date Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">
              Date <span className="text-red-500">*</span>
            </label>
            <CalendarSelector
              value={formData.date}
              onChange={(date) => handleChange({ name: 'date', value: date })}
              onClear={() => handleChange({ name: 'date', value: today(getLocalTimeZone()) })}
            />
          </div>

          {/* Titre */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">
              Titre <span className="text-red-500">*</span>
            </label>
            <Input
              name="titre"
              placeholder="Titre de votre activité"
              value={formData.titre}
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
      </div>
    </motion.div>
  );
}
