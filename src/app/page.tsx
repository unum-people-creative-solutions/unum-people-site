import React from 'react';
import { Section } from '@/components/Section';
import { LogoCloud } from '@/components/LogoCloud';
import { Hero } from '@/components/home/Hero';
import { ComecarDeTresJeitos } from '@/components/home/ComecarDeTresJeitos';
import { Acreditamos } from '@/components/home/Acreditamos';
import { FinalCTABanner } from '@/components/home/FinalCTABanner';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <ComecarDeTresJeitos />
      <Section className="bg-white pb-8 md:pb-8">
        <h2 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tighter text-center mb-6">
          Quem faz
        </h2>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-brand-dark/80 text-center leading-relaxed font-medium">
          A Unum People já desenhou páginas sob medida para psicólogas, advogados, personal trainer e comunicação visual. Os modelos do configurador nasceram desse trabalho.
        </p>
      </Section>
      <LogoCloud />
      <Acreditamos />
      <FinalCTABanner />
    </div>
  );
}
