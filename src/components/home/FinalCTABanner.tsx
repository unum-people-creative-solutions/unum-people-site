import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/Section';
import { lpConfigurar } from '@/lib/links';

export const FinalCTABanner = () => {
  return (
    <Section className="bg-brand-dark text-white text-center py-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">
          Monte sua página agora.
        </h2>
        <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed font-medium">
          Você só paga quando decidir publicar.
        </p>
        <a
          href={lpConfigurar('institucional')}
          className="inline-flex min-h-12 items-center gap-2 px-8 py-4 text-sm font-black uppercase tracking-widest bg-white text-brand-dark rounded-full hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors group"
        >
          Montar minha página
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </a>
      </div>
    </Section>
  );
};
