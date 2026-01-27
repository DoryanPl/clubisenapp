import React from 'react';
import HeureItem from '@/components/commons/HeureItem';
import SectionTitle from '@/components/commons/SectionTitle';
import { MembreID } from '@/types/Membre/Membre';
import { heureExample } from '@/types/Heure/Heure';
import { History } from 'lucide-react';
import { Card, CardBody, CardFooter, Link } from '@heroui/react';



export default function HeureMembre(props : MembreID) {
    const membreID = props.id;
    const HeureItems = heureExample.filter(h => h.MembreID === membreID);

    return (
        <Card className="bg-primary/60 border border-default-200 shadow-xl">
            <CardBody className="gap-6 p-3 sm:p-6">
                
                {/* Titre */}
                <SectionTitle icon={<History size={16} className="sm:w-5 sm:h-5" />} title="Heures d'activité récentes" />

                {/* Heures List */}
                <div className="flex flex-col gap-2">
                {HeureItems.length > 0 ? (
                    HeureItems.map((item) => (
                        <HeureItem key={item.HeureID} heure={item} />
                    ))
                ) : (
                    <p className="text-center text-foreground/50 py-6">Aucune heure trouvée</p>
                )}
                </div>
            </CardBody>
            <CardFooter className="py-0 px-6 flex justify-end">
                <div className="w-full border-t border-default-200 !py-5 flex justify-end">
                    <Link underline="hover" href='#' className="text-sm font-semibold text-secondary hover:text-secondary/80">
                        Voir l'historique complet
                    </Link>
                </div>
            </CardFooter>

        </Card> 
    );
}
