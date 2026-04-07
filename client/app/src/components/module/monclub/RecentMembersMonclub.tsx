'use client';

import React from 'react';
import { Users } from 'lucide-react';
import RecentMembers, { Member } from '@/components/commons/RecentMembers';

export default function RecentMembersMonclub() {
  const recentMembers: Member[] = [
    {
      id: 1,
      name: 'Marie Dupont',
      role: 'Membre',
      avatar: 'https://i.pravatar.cc/150?img=1',
      status: 'actif',
      joinDate: '2024-02-18',
    },
    {
      id: 2,
      name: 'Thomas Martin',
      role: 'Trésorier',
      avatar: 'https://i.pravatar.cc/150?img=2',
      status: 'actif',
      joinDate: '2024-02-15',
    },
    {
      id: 3,
      name: 'Sophie Bernard',
      role: 'Membre',
      avatar: 'https://i.pravatar.cc/150?img=3',
      status: 'actif',
      joinDate: '2024-02-12',
    },
    {
      id: 4,
      name: 'Lucas Petit',
      role: 'Membre',
      avatar: 'https://i.pravatar.cc/150?img=4',
      status: 'actif',
      joinDate: '2024-02-10',
    }, {
      id: 5,
      name: 'Lucas Petit',
      role: 'Membre',
      avatar: 'https://i.pravatar.cc/150?img=4',
      status: 'actif',
      joinDate: '2024-02-10',
    }, {
      id: 6,
      name: 'Lucas Petit',
      role: 'Membre',
      avatar: 'https://i.pravatar.cc/150?img=4',
      status: 'actif',
      joinDate: '2024-02-10',
    }, {
      id: 6,
      name: 'Lucas Petit',
      role: 'Membre',
      avatar: 'https://i.pravatar.cc/150?img=4',
      status: 'actif',
      joinDate: '2024-02-10',
    }, {
      id: 6,
      name: 'Lucas Petit',
      role: 'Membre',
      avatar: 'https://i.pravatar.cc/150?img=4',
      status: 'actif',
      joinDate: '2024-02-10',
    }, {
      id: 6,
      name: 'Lucas Petit',
      role: 'Membre',
      avatar: 'https://i.pravatar.cc/150?img=4',
      status: 'actif',
      joinDate: '2024-02-10',
    }, {
      id: 6,
      name: 'Lucas Petit',
      role: 'Membre',
      avatar: 'https://i.pravatar.cc/150?img=4',
      status: 'actif',
      joinDate: '2024-02-10',
    }, {
      id: 6,
      name: 'Lucas Petit',
      role: 'Membre',
      avatar: 'https://i.pravatar.cc/150?img=4',
      status: 'actif',
      joinDate: '2024-02-10',
    }, {
      id: 6,
      name: 'Lucas Petit',
      role: 'Membre',
      avatar: 'https://i.pravatar.cc/150?img=4',
      status: 'actif',
      joinDate: '2024-02-10',
    }, {
      id: 6,
      name: 'Lucas Petit',
      role: 'Membre',
      avatar: 'https://i.pravatar.cc/150?img=4',
      status: 'actif',
      joinDate: '2024-02-10',
    }, {
      id: 6,
      name: 'Lucas Petit',
      role: 'Membre',
      avatar: 'https://i.pravatar.cc/150?img=4',
      status: 'actif',
      joinDate: '2024-02-10',
    }, {
      id: 6,
      name: 'Lucas Petit',
      role: 'Membre',
      avatar: 'https://i.pravatar.cc/150?img=4',
      status: 'actif',
      joinDate: '2024-02-10',
    }, {
      id: 6,
      name: 'Lucas Petit',
      role: 'Membre',
      avatar: 'https://i.pravatar.cc/150?img=4',
      status: 'actif',
      joinDate: '2024-02-10',
    }
  ];

  return (
    <RecentMembers
      titleIcon={<Users size={20} />}
      members={recentMembers}
      showViewAll={false}
      maxItems={4}
    />
  );
}
