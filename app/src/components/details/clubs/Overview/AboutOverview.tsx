'use client';

import React from 'react';
import { Card, CardBody } from '@heroui/react';
import { Info } from 'lucide-react';
import type { ClubID } from '@/types/Club/Club';

export default function AboutOverview(props: ClubID) {
    const clubID = props.id;

    // Placeholder for club about data
    const clubAbout = {
        description: "Description du club",
        founded: 2020,
        president: "Nom du président",
        objectives: "Objectifs et missions du club"
    };

    return (
        <Card className="bg-primary/90 border border-default-200 shadow-sm dark:shadow-xl">
            <CardBody className="gap-3 p-4 sm:p-6">
                <div className="flex items-center gap-2 text-foreground">
                    <Info size={20} />
                    <h3 className="text-sm sm:text-base font-bold">À propos du club</h3>
                </div>
                
                <div className="space-y-3 text-sm">
                    <div>
                        <p className="text-xs font-semibold text-foreground/60">Description</p>
                        <p className="text-foreground">{clubAbout.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <p className="text-xs font-semibold text-foreground/60">Fondé en</p>
                            <p className="text-foreground font-semibold">{clubAbout.founded}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-foreground/60">Président</p>
                            <p className="text-foreground font-semibold">{clubAbout.president}</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-semibold text-foreground/60">Objectifs</p>
                        <p className="text-foreground">{clubAbout.objectives}</p>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}
