'use client';

import React, { useState } from 'react';
import { Button } from '@heroui/react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Calendar } from 'lucide-react';
import HeaderProfil from '@/components/profil/HeaderProfil';
import CardProfil from '@/components/profil/CardProfil';
import EditProfil from '@/components/profil/EditProfil';
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
    router.push('/');
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
    router.push('/');
  };

  const UserInfo = [
    { icon: Mail, label: 'Email', value: user.email, key: 'email' },
    { icon: Phone, label: 'Téléphone', value: profile.phone, key: 'phone' },
    { icon: MapPin, label: 'Ville', value: profile.city, key: 'city' },
    { icon: Calendar, label: 'Classe', value: profile.classe, key: 'classe' },
  ];

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-5xl mx-auto w-full">
        <div className="space-y-6">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HeaderProfil user={user} />
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <CardProfil club={club} />
          </motion.div>

          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <EditProfil
              isEditing={isEditing}
              onEdit={handleEdit}
              onSave={handleSave}
              onCancel={handleCancel}
              onInputChange={handleInputChange}
              userInfo={UserInfo}
              editedProfile={editedProfile}
            />
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
              className="bg-danger hover:bg-danger/90 text-foreground font-semibold"
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
