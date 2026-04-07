'use client';

import { Button, Card, CardBody, Modal, ModalContent, ModalBody, useDisclosure } from "@heroui/react";
import { Plus, Zap, X } from 'lucide-react';
import HoursForm from '@/components/modal/HoursForm';

export default function HoursMonclub() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <div className="max-w-full">
      <Card className="bg-primary/60 border border-default-200 shadow-xl">
        <CardBody className="p-6 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/15 flex items-center justify-center">
              <Zap size={20} className="text-secondary" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-foreground">
                Déclarer des heures d&apos;activité
              </h2>
              <p className="text-sm text-foreground/70 leading-relaxed mt-1">
                Ajoute tes heures de bénévolat à ton club.
              </p>
            </div>
            <Button
              onPress={onOpen}
              className="bg-secondary text-background font-semibold hover:bg-secondary/90 w-fit"
              size="md"
              radius="lg"
              startContent={<Plus size={20} />}
            >
              Ouvrir le formulaire
            </Button>
          </div>
        </CardBody>
      </Card>

      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
        size="3xl" 
        classNames={{
          closeButton: "mr-4 mt-2 cursor-pointer bg-secondary hover:bg-secondary/90 text-background shadow-lg hover:shadow-xl transition-shadow"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              
              <ModalBody className="bg-primary/60 border-default-200">
                <HoursForm 
                  onSuccess={onClose}
                  defaultClubId={userClubId}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
