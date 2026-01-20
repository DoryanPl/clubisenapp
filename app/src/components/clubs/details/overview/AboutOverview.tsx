'use client';

import React from 'react';
import { Card, CardBody } from '@heroui/react';
import { Info, Users, Calendar, Crown } from 'lucide-react';
import type { ClubID } from '@/types/Club/Club';
import { clubsExample } from '@/types/Club/Club';

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
                <div className="flex items-center gap-2 text-foreground justify-center sm:justify-start" style={{ paddingBottom: '12px' }}>
                    <span className="inline-flex"><Info size={16} className="sm:w-5 sm:h-5" /></span>
                    <span className="text-base sm:text-lg font-bold text-foreground">Informations utiles</span>
        	    </div>

                {/* Informations utiles en grille */}
                <div>
                    <p className="text-sm text-foreground">{usefulInfo.description}</p>
                </div>
            </CardBody>
        </Card>
    );
}
