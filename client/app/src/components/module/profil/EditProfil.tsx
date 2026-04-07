'use client';

import React from 'react';
import { Card, CardBody, Button, Input, Divider } from '@heroui/react';
import { Edit2, Save, X } from 'lucide-react';

interface UserInfoItem {
  icon: React.ComponentType<{ size: number; className?: string }>;
  label: string;
  value: string;
  key: string;
}

interface EditProfile {
  phone: string;
  city: string;
  classe: string;
  bio: string;
}

interface EditProfilProps {
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onInputChange: (field: string, value: string) => void;
  userInfo: UserInfoItem[];
  editedProfile?: EditProfile;
}

export default function EditProfil({
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onInputChange,
  userInfo,
  editedProfile,
}: EditProfilProps) {
  return (
    <Card className="bg-primary/90 border border-default-200 shadow-lg dark:shadow-xl">
        <CardBody className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-foreground">
              Informations Personnelles
            </h3>
            {isEditing ? (
              <div className="flex gap-2">
                <Button
                  isIconOnly
                  className="bg-secondary hover:bg-secondary/90 text-background"
                  onClick={onSave}
                  size="sm"
                >
                  <Save size={18} />
                </Button>
                <Button
                  isIconOnly
                  className="bg-default-200 hover:bg-default-300 text-foreground"
                  onClick={onCancel}
                  size="sm"
                >
                  <X size={18} />
                </Button>
              </div>
            ) : (
              <Button
                isIconOnly
                className="bg-secondary hover:bg-secondary/90 text-background"
                onClick={onEdit}
                size="sm"
              >
                <Edit2 size={18} />
              </Button>
            )}
          </div>

          {!isEditing ? (
            <div className="space-y-4">
              {userInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <React.Fragment key={info.key}>
                    <div className="flex items-center gap-3">
                      <IconComponent size={20} className="text-secondary" />
                      <div>
                        <p className="text-sm text-foreground/60">{info.label}</p>
                        <p className="text-foreground font-medium">{info.value}</p>
                      </div>
                    </div>
                    {index < userInfo.length - 1 && <Divider />}
                  </React.Fragment>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {userInfo.map((info) => {
                const fieldValue = info.key === 'email' ? userInfo.find(i => i.key === 'email')?.value : (editedProfile as any)?.[info.key];
                return (
                  <Input
                    key={info.key}
                    label={info.label}
                    type={info.key === 'email' ? 'email' : 'text'}
                    value={fieldValue || ''}
                    disabled={info.key === 'email'}
                    onChange={(e) => onInputChange(info.key, e.target.value)}
                    classNames={{
                      input: 'bg-transparent text-foreground',
                      inputWrapper: 'bg-default-200/50 border border-default-300',
                    }}
                  />
                );
              })}
            </div>
          )}
        </CardBody>
      </Card>
  );
}
