'use client';

import React from 'react';
import { Card, CardBody, Avatar } from '@heroui/react';
import { Briefcase } from 'lucide-react';

interface HeaderProfilProps {
  user: {
    firstName: string;
    lastName: string;
    role: string;
    avatar?: string;
  };
}

export default function HeaderProfil({ user }: HeaderProfilProps) {
  return (
    <Card className="bg-primary/90 border border-default-200 shadow-lg dark:shadow-xl">
        <CardBody className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
            <div className="flex gap-4 items-center w-full sm:w-auto">
              <Avatar
                isBordered
                color="secondary"
                size="lg"
                name={`${user.firstName} ${user.lastName}`}
                className="w-20 h-20"
                src={user.avatar}
              />
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-foreground/60 flex items-center gap-1 mt-1">
                  <Briefcase size={16} /> {user.role}
                </p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
  );
}
