'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Badge, Tabs, Tab } from '@heroui/react';
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';

interface HourValidationRecord {
  id: string;
  memberName: string;
  club: string;
  hours: number;
  date: string;
  titre: string;
  status: 'validated' | 'rejected';
  validatedDate: string;
  validatedBy: string;
}

export default function HoursValidationHistory() {
  const [records] = useState<HourValidationRecord[]>([
    {
      id: '1',
      memberName: 'Jean Dupont',
      club: 'Bureau des Sports',
      hours: 3,
      date: '2026-02-20',
      titre: 'Entraînement football',
      status: 'validated',
      validatedDate: '2026-02-21',
      validatedBy: 'Marie Admin',
    },
    {
      id: '2',
      memberName: 'Marie Martin',
      club: 'Tech & Code',
      hours: 4,
      date: '2026-02-18',
      titre: 'Workshop Python',
      status: 'validated',
      validatedDate: '2026-02-19',
      validatedBy: 'Paul Admin',
    },
    {
      id: '3',
      memberName: 'Pierre Durand',
      club: 'Bureau des Sports',
      hours: 2,
      date: '2026-02-15',
      titre: 'Événement non approuvé',
      status: 'rejected',
      validatedDate: '2026-02-16',
      validatedBy: 'Marie Admin',
    },
    {
      id: '4',
      memberName: 'Sophie Lefevre',
      club: 'Photo & Art',
      hours: 5,
      date: '2026-02-14',
      titre: 'Exposition photos',
      status: 'validated',
      validatedDate: '2026-02-15',
      validatedBy: 'Paul Admin',
    },
    {
      id: '5',
      memberName: 'Luc Bernard',
      club: 'Musique & Scène',
      hours: 3,
      date: '2026-02-10',
      titre: 'Concert sans autorisation',
      status: 'rejected',
      validatedDate: '2026-02-11',
      validatedBy: 'Marie Admin',
    },
  ]);

  const validatedRecords = records.filter(r => r.status === 'validated');
  const rejectedRecords = records.filter(r => r.status === 'rejected');

  const statusConfig = {
    validated: {
      label: 'Validée',
      color: 'success',
      icon: <CheckCircle size={16} />,
      bgColor: 'bg-success/10',
      borderColor: 'border-success/30',
    },
    rejected: {
      label: 'Rejetée',
      color: 'danger',
      icon: <XCircle size={16} />,
      bgColor: 'bg-danger/10',
      borderColor: 'border-danger/30',
    },
  };

  const RecordCard = ({ record }: { record: HourValidationRecord }) => {
    const config = statusConfig[record.status];
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className={`${config.bgColor} border ${config.borderColor} hover:border-${config.color}/60 p-4 transition-colors`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              {/* Header */}
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-foreground">{record.memberName}</span>
                <Badge size="sm" variant="flat" color="default">
                  {record.club}
                </Badge>
                <Badge size="sm" variant="flat" color={config.color}>
                  {config.label}
                </Badge>
              </div>

              {/* Title */}
              <h4 className="font-semibold text-foreground mb-2">{record.titre}</h4>

              {/* Details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-foreground/70">
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span>{new Date(record.date).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>{record.hours}h</span>
                </div>
                <div className="text-xs">
                  <span>Validé le {new Date(record.validatedDate).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="text-xs">
                  <span>Par {record.validatedBy}</span>
                </div>
              </div>
            </div>

            {/* Icon */}
            <div className={`text-${config.color} mt-1`}>
              {config.icon}
            </div>
          </div>
        </Card>
      </motion.div>
    );
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Historique des validations</h2>
        <p className="text-foreground/70">
          Suivi des heures validées et rejetées
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-success/10 to-success/5 border border-success/20 p-4">
          <div className="text-center">
            <p className="text-foreground/70 text-xs font-semibold mb-1">VALIDÉES</p>
            <p className="text-2xl font-bold text-success">{validatedRecords.length}</p>
            <p className="text-xs text-foreground/60">{validatedRecords.reduce((acc, r) => acc + r.hours, 0)}h total</p>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-danger/10 to-danger/5 border border-danger/20 p-4">
          <div className="text-center">
            <p className="text-foreground/70 text-xs font-semibold mb-1">REJETÉES</p>
            <p className="text-2xl font-bold text-danger">{rejectedRecords.length}</p>
            <p className="text-xs text-foreground/60">{rejectedRecords.reduce((acc, r) => acc + r.hours, 0)}h total</p>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 p-4">
          <div className="text-center">
            <p className="text-foreground/70 text-xs font-semibold mb-1">TOTAL</p>
            <p className="text-2xl font-bold text-secondary">{records.length}</p>
            <p className="text-xs text-foreground/60">{records.reduce((acc, r) => acc + r.hours, 0)}h total</p>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs 
        aria-label="Historique des validations"
        className="w-full"
        variant="bordered"
        color="secondary"
      >
        <Tab key="validated" title={`Validées (${validatedRecords.length})`}>
          <div className="space-y-3 mt-4">
            {validatedRecords.length === 0 ? (
              <Card className="bg-content1 border border-default-200 p-8">
                <p className="text-foreground/60 text-center">Aucune déclaration validée</p>
              </Card>
            ) : (
              validatedRecords.map((record) => (
                <RecordCard key={record.id} record={record} />
              ))
            )}
          </div>
        </Tab>
        <Tab key="rejected" title={`Rejetées (${rejectedRecords.length})`}>
          <div className="space-y-3 mt-4">
            {rejectedRecords.length === 0 ? (
              <Card className="bg-content1 border border-default-200 p-8">
                <p className="text-foreground/60 text-center">Aucune déclaration rejetée</p>
              </Card>
            ) : (
              rejectedRecords.map((record) => (
                <RecordCard key={record.id} record={record} />
              ))
            )}
          </div>
        </Tab>
        <Tab key="all" title={`Tous (${records.length})`}>
          <div className="space-y-3 mt-4">
            {records.length === 0 ? (
              <Card className="bg-content1 border border-default-200 p-8">
                <p className="text-foreground/60 text-center">Aucun historique</p>
              </Card>
            ) : (
              records.map((record) => (
                <RecordCard key={record.id} record={record} />
              ))
            )}
          </div>
        </Tab>
      </Tabs>
    </motion.div>
  );
}
