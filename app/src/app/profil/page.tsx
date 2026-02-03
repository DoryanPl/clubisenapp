'use client';

import React, { useState } from 'react';
import { Card, CardBody, Button, Input, Tabs, Tab, Avatar, Badge, Divider } from '@heroui/react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Calendar, Edit2, Save, X, Briefcase, Clock } from 'lucide-react';
import PageTitle from '@/components/commons/PageTitle';
import { CardInfo } from '@/components/commons/CardInfo';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

interface Club {
  id: string;
  name: string;
  role: string;
  joinDate: string;
  hoursCount: number;
}

export default function ProfilPage() {
  const { user, logout, isLoggedIn } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    phone: user?.phone || '+33 6 12 34 56 78',
    city: user?.city || 'Brest',
    classe: 'FISA 4f',
    bio: 'Passionné par les technologies et les sports collectifs',
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  // Un utilisateur ne peut avoir qu'un seul club
  const [club] = useState<Club>({
    id: '1',
    name: 'Bureau des Sports',
    role: 'Responsable',
    joinDate: '2023-09-15',
    hoursCount: 42,
  });

  if (!isLoggedIn || !user) {
    router.push('/login');
    return null;
  }

  const handleEdit = () => {
    setEditedProfile(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedProfile({
      ...editedProfile,
      [field]: value,
    });
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <>
      <PageTitle title="Mon Profil" description="Gérez vos informations personnelles" />
      
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-5xl mx-auto w-full">
        <div className="space-y-6">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-primary/90 border border-default-200 shadow-lg dark:shadow-xl">
              <CardBody className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                  <div className="flex gap-4 items-center w-full sm:w-auto">
                    <Badge
                      content={user.firstName.charAt(0).toUpperCase()}
                      color="secondary"
                      shape="circle"
                      placement="bottom-right"
                      classNames={{ badge: 'w-10 h-10 text-lg font-bold' }}
                    >
                      <Avatar
                        isBordered
                        color="secondary"
                        size="lg"
                        name={`${user.firstName} ${user.lastName}`}
                        className="w-20 h-20"
                      />
                    </Badge>
                    <div className="flex-1">
                      <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                        {user.firstName} {user.lastName}
                      </h2>
                      <p className="text-foreground/60 flex items-center gap-1 mt-1">
                        <Briefcase size={16} /> {user.role}
                      </p>
                    </div>
                  </div>
                  {!isEditing && (
                    <Button
                      isIconOnly
                      className="bg-secondary hover:bg-secondary/90 text-background"
                      onClick={handleEdit}
                      size="lg"
                    >
                      <Edit2 size={20} />
                    </Button>
                  )}
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <CardInfo
              title="Club"
              value={club.name}
              icon={<Briefcase size={20} />}
              color="text-blue-500"
            />
            <CardInfo
              title="Heures Total"
              value={club.hoursCount}
              suffix="h"
              icon={<Clock size={20} />}
              color="text-emerald-500"
            />
            <CardInfo
              title="Rôle"
              value={club.role}
              icon={<Briefcase size={20} />}
              color="text-purple-500"
            />
          </motion.div>

          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="bg-primary/90 border border-default-200 shadow-lg dark:shadow-xl">
              <CardBody className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-foreground">
                    Informations Personnelles
                  </h3>
                  {isEditing && (
                    <div className="flex gap-2">
                      <Button
                        isIconOnly
                        className="bg-secondary hover:bg-secondary/90 text-background"
                        onClick={handleSave}
                        size="sm"
                      >
                        <Save size={18} />
                      </Button>
                      <Button
                        isIconOnly
                        className="bg-default-200 hover:bg-default-300 text-foreground"
                        onClick={handleCancel}
                        size="sm"
                      >
                        <X size={18} />
                      </Button>
                    </div>
                  )}
                </div>

                {!isEditing ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail size={20} className="text-secondary" />
                      <div>
                        <p className="text-sm text-foreground/60">Email</p>
                        <p className="text-foreground font-medium">{user.email}</p>
                      </div>
                    </div>
                    <Divider />
                    <div className="flex items-center gap-3">
                      <Phone size={20} className="text-secondary" />
                      <div>
                        <p className="text-sm text-foreground/60">Téléphone</p>
                        <p className="text-foreground font-medium">{profile.phone}</p>
                      </div>
                    </div>
                    <Divider />
                    <div className="flex items-center gap-3">
                      <MapPin size={20} className="text-secondary" />
                      <div>
                        <p className="text-sm text-foreground/60">Ville</p>
                        <p className="text-foreground font-medium">{profile.city}</p>
                      </div>
                    </div>
                    <Divider />
                    <div className="flex items-center gap-3">
                      <Calendar size={20} className="text-secondary" />
                      <div>
                        <p className="text-sm text-foreground/60">Classe</p>
                        <p className="text-foreground font-medium">{profile.classe}</p>
                      </div>
                    </div>
                    <Divider />
                    <div>
                      <p className="text-sm text-foreground/60 mb-2">Biographie</p>
                      <p className="text-foreground font-medium">{profile.bio || 'Aucune biographie'}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Input
                      label="Email"
                      type="email"
                      value={user.email}
                      disabled
                      classNames={{
                        input: 'bg-transparent text-foreground',
                        inputWrapper: 'bg-default-200/50 border border-default-300',
                      }}
                    />
                    <Input
                      label="Téléphone"
                      value={editedProfile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      classNames={{
                        input: 'bg-transparent text-foreground',
                        inputWrapper: 'bg-default-200/50 border border-default-300',
                      }}
                    />
                    <Input
                      label="Ville"
                      value={editedProfile.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      classNames={{
                        input: 'bg-transparent text-foreground',
                        inputWrapper: 'bg-default-200/50 border border-default-300',
                      }}
                    />
                    <Input
                      label="Classe"
                      value={editedProfile.classe}
                      onChange={(e) => handleInputChange('classe', e.target.value)}
                      classNames={{
                        input: 'bg-transparent text-foreground',
                        inputWrapper: 'bg-default-200/50 border border-default-300',
                      }}
                    />
                    <Input
                      label="Biographie"
                      value={editedProfile.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      classNames={{
                        input: 'bg-transparent text-foreground',
                        inputWrapper: 'bg-default-200/50 border border-default-300',
                      }}
                    />
                  </div>
                )}
              </CardBody>
            </Card>
          </motion.div>

          {/* Logout Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex justify-center"
          >
            <Button
              onClick={handleLogout}
              className="bg-danger hover:bg-danger/90 text-background font-semibold"
              size="lg"
            >
              Se Déconnecter
            </Button>
          </motion.div>
        </div>
      </div>
    </>
  );
}
