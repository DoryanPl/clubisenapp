'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, Button, Card } from '@heroui/react';
import { Calendar, Clock, XCircle, CheckCircle2 } from 'lucide-react';

interface HourDeclarationToValidate {
    id: string;
    memberName: string;
    club: string;
    hours: number;
    date: string;
    titre: string;
    description: string;
    submittedDate: string;
    status: 'pending' | 'approved' | 'rejected';
}

export default function HoursToValidate() {
  const [hours, setHours] = useState<HourDeclarationToValidate[]>([
    {
      id: '1',
      memberName: 'Jean Dupont',
      club: 'Bureau des Sports',
      hours: 3,
      date: '2026-02-25',
      titre: 'Entraînement football',
      description: 'Entraînement de l\'équipe de foot',
      submittedDate: '2026-02-26',
      status: 'pending',
    },
    {
      id: '2',
      memberName: 'Marie Martin',
      club: 'Tech & Code',
      hours: 4,
      date: '2026-02-24',
      titre: 'Workshop Python',
      description: 'Animation d\'un atelier Python pour les débutants',
      submittedDate: '2026-02-25',
      status: 'pending',
    },
    {
      id: '3',
      memberName: 'Paul Bernard',
      club: 'Bureau des Sports',
      hours: 2,
      date: '2026-02-23',
      titre: 'Réunion organisation',
      description: 'Réunion d\'organisation pour le tournoi',
      submittedDate: '2026-02-25',
      status: 'pending',
    },
  ]);

  const handleAction = (id: string, status: 'approved' | 'rejected') => {
    setHours((prev) => prev.map(h => h.id === id ? { ...h, status } : h));
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      
        {/* Hours List */}
        <div className="space-y-3">
            {hours.length === 0 ? (
                <Card className="bg-content1 border border-default-200 p-8">
                    <p className="text-foreground/60 text-center">Aucune déclaration en attente de validation</p>
                </Card>
            ) : (
            
            <div className="space-y-3">
                 {hours.map((item) => (
                     <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={item.id}
                    className="bg-primary/60 relative border border-default-200 shadow-lg dark:shadow-xl rounded-2xl p-6"
                  >
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Left Content */}
                      <div className="flex-1">
                        {/* Header */}
                        <div className="flex items-start gap-4 mb-4">
                            {/* Avatar */}
                            <Avatar
                                isBordered
                                color="secondary"
                                size="lg"
                                name={item.memberName}
                                className="w-12 h-12"
                            />

                            {/* Nom, Club et Date */}
                            <div className="flex-1">
                                <h4 className="text-foreground font-bold">{item.memberName}</h4>
                                <div className="flex items-center gap-2 flex-wrap mt-1">
                                    <span className="px-2 py-1 rounded-md bg-secondary text-background text-xs font-bold uppercase">
                                        {item.club}
                                    </span>
                                    <span className="text-foreground/60 text-xs font-medium flex items-center gap-2">
                                        <Calendar size={12} />
                                        {item.date}
                                    </span>
                                </div>
                            </div>

                          {/* Heure */}
                          <div className="text-center">
                            <div className="px-2 py-1 rounded-md bg-secondary text-background text-2xl font-bold">{item.hours}h</div>
                          </div>
                        </div>

                        {/* Title and Description */}
                        <div className="bg-foreground/5 border border-default-200 rounded-xl p-4 mb-4">
                          <h3 className="text-foreground font-bold mb-1">{item.titre}</h3>
                          <p className="text-foreground/60 text-sm italic">&quot;{item.description}&quot;</p>
                        </div>
                        
                        {/* Submitted Date */}
                        <div className="text-foreground/60 text-xs font-medium flex items-center gap-2">
                          <Clock size={14} />
                          <span>Soumis le {item.submittedDate}</span>
                        </div>
                      </div>

                      {/* Right Actions */}
                      <div className="flex lg:flex-col gap-2 justify-center lg:border-l border-default-200 pt-4 lg:pt-0 lg:pl-4">
                        {item.status === 'pending' ? (
                          <>
                            <Button
                              size="sm"
                              onPress={() => handleAction(item.id, 'approved')}
                              className="flex-1 lg:w-32 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 text-emerald-500 border border-emerald-500/20 hover:border-emerald-500/40 rounded-lg font-semibold text-sm px-3 active:scale-95"
                              startContent={<CheckCircle2 size={16} />}
                            >
                              Valider
                            </Button>
                            <Button
                              size="sm"
                              onPress={() => handleAction(item.id, 'rejected')}
                              variant="bordered"
                              className="flex-1 lg:w-32 bg-gradient-to-br from-red-500/10 to-red-600/5 text-red-500 border border-red-500/20 hover:border-red-500/40 rounded-lg font-semibold text-sm px-3 active:scale-95"
                              startContent={<XCircle size={16} />}
                            >
                              Refuser
                            </Button>
                          </>
                        ) : (
                          <div className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold ${item.status === 'approved' ? 'bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 text-emerald-500 border border-emerald-500/20' : 'bg-gradient-to-br from-red-500/10 to-red-600/5 text-red-500 border border-red-500/20'}`}>
                            {item.status === 'approved' ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                            <span className="capitalize">{item.status === 'approved' ? 'Approuvé' : 'Refusé'}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
            )}
        </div>
    </motion.div>
  );
}
