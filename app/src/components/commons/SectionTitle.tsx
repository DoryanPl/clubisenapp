import React from 'react';

interface SectionTitleProps {
  icon: React.ReactNode;
  title: string;
  centered?: boolean;
}

export default function SectionTitle({ icon, title, centered = false }: SectionTitleProps) {
  return (
    <div className={`flex items-center gap-2 text-foreground ${centered ? 'justify-center' : 'sm:justify-start justify-center'}`}>
      <span className="inline-flex">{icon}</span>
      <span className="text-base sm:text-lg font-bold text-foreground">{title}</span>
    </div>
  );
}
