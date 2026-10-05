import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/Section';
import { BrandValues } from '@/components/BrandValues';
import { ManifestoSection } from '@/components/home/ManifestoSection';
import { lpConfigurar } from '@/lib/links';

export const metadata: Metadata = {
  title: 'Sobre a Unum People',
  alternates: {
    canonical: '/sobre',
  },
};

export default function Sobre() {
  return (
    <div className="flex flex-col w-full">
      <Section className="bg-white pb-8 md:pb-8">
        <h1 className="text-4xl md:text-6xl font-black text-brand-dark tracking-tighter text-center">
          Sobre a Unum People
        </h1>
      </Section>
      <ManifestoSection />
      <BrandValues />
      <Section className="bg-brand-dark text-white text-center">
        <a
          href={lpConfigurar('institucional')}
          className="inline-flex min-h-12 items-center gap-2 px-8 py-4 text-sm font-black uppercase tracking-widest bg-white text-brand-dark rounded-full hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors group"
        >
          Montar minha página
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </a>
      </Section>
    </div>
  );
}
