import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Club {
  name: string;
  percentage: number;
  color: string;
}

interface FavoriteClubsCardProps {
  clubsFavoris: Club[];
}

export default function FavoriteClubsCard({ clubsFavoris }: FavoriteClubsCardProps) {
  const segments = useMemo(() => {
    let currentAngle = 0;
    return clubsFavoris.map((club) => {
      const sliceAngle = (club.percentage / 100) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + sliceAngle;
      currentAngle = endAngle;

      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;
      const r = 60;
      const innerR = 45;

      const x1 = 75 + r * Math.cos(startRad);
      const y1 = 75 + r * Math.sin(startRad);
      const x2 = 75 + r * Math.cos(endRad);
      const y2 = 75 + r * Math.sin(endRad);

      const largeArc = sliceAngle > 180 ? 1 : 0;

      const path = [
        `M ${75 + innerR * Math.cos(startRad)} ${75 + innerR * Math.sin(startRad)}`,
        `L ${x1} ${y1}`,
        `A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`,
        `L ${75 + innerR * Math.cos(endRad)} ${75 + innerR * Math.sin(endRad)}`,
        `A ${innerR} ${innerR} 0 ${largeArc} 0 ${75 + innerR * Math.cos(startRad)} ${75 + innerR * Math.sin(startRad)}`,
        'Z'
      ].join(' ');

      return { ...club, path };
    });
  }, [clubsFavoris]);

  return (
    <motion.div
      className="bg-content1 border border-default-200 rounded-2xl p-6 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h2 className="text-xl font-bold text-foreground mb-6">Mes Clubs Favoris</h2>

      {/* Donut Chart */}
      <div className="flex justify-center mb-6 flex-1 flex items-center">
        <svg width="150" height="150" viewBox="0 0 150 150" className="max-w-full">
          {segments.map((segment, idx) => (
            <path
              key={idx}
              d={segment.path}
              fill={segment.color}
              opacity="0.8"
              className="hover:opacity-100 transition-opacity"
            />
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="space-y-2">
        {segments.map((club, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: club.color }}
            ></div>
            <span className="text-sm text-foreground/70">{club.name}</span>
            <span className="text-sm font-semibold text-foreground ml-auto">{club.percentage}%</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
