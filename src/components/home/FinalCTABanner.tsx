'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/Section';

export const FinalCTABanner = () => {
  return (
    <Section className="bg-[linear-gradient(135deg,var(--brand-blue)_0%,var(--brand-purple)_50%,var(--brand-orange)_100%)] text-white text-center py-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">
          Pronto para gerar frutos reais?
        </h2>
        <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed font-medium">
          Vamos transformar a realidade do seu negócio juntos.
        </p>
        <Link 
          href="/servicos" 
          className="inline-flex items-center gap-2 px-8 py-4 text-sm font-black uppercase tracking-widest bg-white text-brand-dark rounded-full hover:bg-brand-soft transition-all group"
        >
          Começar Jornada
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </Section>
  );
};
