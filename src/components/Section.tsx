import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  containerClassName?: string;
}

export const Section = ({ children, className, id, containerClassName }: SectionProps) => {
  return (
    <section 
      id={id} 
      className={cn("py-16 md:py-24 px-6 md:px-12", className)}
    >
      <div className={cn("max-w-7xl mx-auto", containerClassName)}>
        {children}
      </div>
    </section>
  );
};
