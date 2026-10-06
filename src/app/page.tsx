import React from 'react';
import { Hero } from '@/components/home/Hero';
import { ComecarDeTresJeitos } from '@/components/home/ComecarDeTresJeitos';
import { Acreditamos } from '@/components/home/Acreditamos';
import { FinalCTABanner } from '@/components/home/FinalCTABanner';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <ComecarDeTresJeitos />
      <Acreditamos />
      <FinalCTABanner />
    </div>
  );
}
