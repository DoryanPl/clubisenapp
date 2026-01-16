import React from "react";
import { clubsExample } from "@/types/Club";
import {Card, CardBody, CardFooter, Image} from "@heroui/react";
import { Users } from "lucide-react";


function CardClub() {
  return(
    <div className="gap-8 grid grid-cols-2 sm:grid-cols-4 pt-6 px-4 sm:px-6 lg:px-8">
      {clubsExample.map((item, index) => (
        <Card key={index} isPressable shadow="sm" className="border border-secondary relative transition-all hover:shadow-[0_0_15px_rgba(250,210,1,0.3)]" onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible p-0 relative">
            <Image
              alt={item.ClubNom}
              className="w-full object-cover h-[140px]"
              radius="lg"
              shadow="sm"
              src={item.ClubImage}
              width="100%"
            />
            <div className="absolute top-2 right-2 bg-secondary rounded-lg px-2 py-1 flex items-center gap-1">
              <Users size={12} className="text-background" />
              <span className="text-xs font-bold text-background">{item.memberCount}</span>
            </div>
          </CardBody>
          <CardFooter className="text-small">
            <div className="flex flex-col gap-2 text-left">
              <b className="text-foreground">{item.ClubNom}</b>
              <p className="text-sm text-foreground/70">{item.ClubDesc}</p>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
export default CardClub;