import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/Section';

const frases = [
  'A tecnologia deve sumir para o negócio aparecer.',
  'Ferramentas simples, com preço na tela e sem conversa antes.',
  'O caminho mais curto entre você e o seu cliente.',
];

export const Acreditamos = () => {
  return (
    <Section className="bg-white">
      <h2 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tighter text-center mb-12">
        O que a gente acredita
      </h2>
      <ul className="max-w-3xl mx-auto space-y-6 mb-12">
        {frases.map((frase) => (
          <li
            key={frase}
            className="text-xl md:text-2xl font-bold text-brand-dark leading-snug border-l-4 border-brand-blue pl-6"
          >
            {frase}
          </li>
        ))}
      </ul>
      <div className="text-center">
        <Link
          href="/sobre"
          className="inline-flex min-h-12 items-center justify-center gap-2 px-8 py-4 text-sm font-black uppercase tracking-widest border-2 border-brand-dark text-brand-dark rounded-full hover:bg-brand-dark hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue transition-colors group"
        >
          Conheça a Unum
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </Link>
      </div>
    </Section>
  );
};
