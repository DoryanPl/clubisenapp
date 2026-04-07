'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Badge } from '@heroui/react';
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';

interface HourRecord {
  id: string;
  club: string;
  hours: number;
  date: string;
  status: 'pending' | 'validated' | 'rejected';
}

export default function HoursHistory() {
  const [hours] = useState<HourRecord[]>([
    {
      id: '1',
      club: 'Bureau des Sports',
      hours: 3,
      date: '2024-01-15',
      status: 'validated',
    },
    {
      id: '2',
      club: 'Tech & Code',
      hours: 2,
      date: '2024-01-18',
      status: 'pending',
    },
    {
      id: '3',
      club: 'Photo & Art',
      hours: 4,
      date: '2024-01-10',
      status: 'validated',
    },
    {
      id: '4',
      club: 'Musique & Scène',
      hours: 1.5,
      date: '2024-01-08',
      status: 'rejected',
    },
  ]);

  const statusConfig = {
    validated: {
      label: 'Validée',
      color: 'success',
      icon: <CheckCircle size={16} />,
    },
    pending: {
      label: 'En attente',
      color: 'warning',
      icon: <Clock size={16} />,
    },
    rejected: {
      label: 'Rejetée',
      color: 'danger',
      icon: <XCircle size={16} />,
    },
  };

  const totalHours = hours
    .filter((h) => h.status === 'validated')
    .reduce((acc, h) => acc + h.hours, 0);

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {/* Summary Card */}
      <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 p-6">
        <div className="text-center">
          <p className="text-foreground/70 text-sm font-semibold mb-2">HEURES VALIDÉES</p>
          <p className="text-4xl font-bold text-secondary mb-2">{totalHours}h</p>
          <p className="text-xs text-foreground/60">sur {hours.filter(h => h.status === 'pending').length + hours.filter(h => h.status === 'validated').length} déclarations</p>
        </div>
      </Card>

      {/* History List */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">Historique</h3>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {hours.length === 0 ? (
            <p className="text-foreground/60 text-sm text-center py-8">Aucune déclaration d'heures pour le moment.</p>
          ) : (
            hours.map((record) => {
              const config = statusConfig[record.status];
              return (
                <motion.div
                  key={record.id}
                  className="bg-content1 border border-default-200 rounded-lg p-4 hover:border-secondary/50 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="font-semibold text-foreground text-sm">{record.club}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-foreground/60">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(record.date).toLocaleDateString('fr-FR')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {record.hours}h
                        </span>
                      </div>
                    </div>
                    <Badge
                      color={config.color as any}
                      variant="flat"
                      className="flex items-center gap-1"
                      startContent={config.icon}
                    >
                      {config.label}
                    </Badge>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>

      {/* Stats */}
      <Card className="bg-content1 border border-default-200 p-4 space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-foreground/70">Validées</span>
          <Badge color="success" variant="flat">
            {hours.filter((h) => h.status === 'validated').length}
          </Badge>
        </div>
        <div className="flex justify-between items-center text-sm border-t border-default-200 pt-3">
          <span className="text-foreground/70">En attente</span>
          <Badge color="warning" variant="flat">
            {hours.filter((h) => h.status === 'pending').length}
          </Badge>
        </div>
        <div className="flex justify-between items-center text-sm border-t border-default-200 pt-3">
          <span className="text-foreground/70">Rejetées</span>
          <Badge color="danger" variant="flat">
            {hours.filter((h) => h.status === 'rejected').length}
          </Badge>
        </div>
      </Card>
    </motion.div>
  );
}
