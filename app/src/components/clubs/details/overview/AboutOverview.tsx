'use client';

import React from 'react';
import { Card, CardBody } from '@heroui/react';
import { Info } from 'lucide-react';
import type { ClubID } from '@/types/Club/Club';
import { clubsExample } from '@/types/Club/Club';
import SectionTitle from '@/components/commons/SectionTitle';

export default function AboutOverview(props: ClubID) {
    const clubID = props.id;

    // Récupérer les données du club
    const club = clubsExample.find(c => c.id === clubID);

    // Informations utiles
    const usefulInfo = {
        president: "Jean Martin",
        description: club?.ClubDesc || "Description du club"
    };

    return (
        <Card className="bg-primary/90 border border-default-200 shadow-sm dark:shadow-xl">
            <CardBody className="gap-4 p-3 sm:p-6">

                <SectionTitle icon={<Info size={16} className="sm:w-5 sm:h-5" />} title="Informations utiles" />

                {/* Informations utiles en grille */}
                <div>
                    <p className="text-sm text-foreground">{usefulInfo.description}</p>
                </div>
            </CardBody>
        </Card>
    );
}
