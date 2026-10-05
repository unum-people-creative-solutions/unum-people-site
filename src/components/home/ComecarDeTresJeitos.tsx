import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/Section';
import { lpPlanos } from '@/lib/links';

const jeitos = [
  { titulo: 'Página', texto: 'Um endereço além do Instagram.' },
  { titulo: 'Presença', texto: 'Um blog para ser achado no Google.' },
  { titulo: 'Captação', texto: 'Um CRM no celular para não perder contato.' },
];

export const ComecarDeTresJeitos = () => {
  return (
    <Section className="bg-white">
      <h2 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tighter text-center mb-12">
        Escolha o que o seu negócio precisa
      </h2>
      <ul className="grid md:grid-cols-3 gap-6 mb-12">
        {jeitos.map((jeito) => (
          <li key={jeito.titulo}>
            <a
              href={lpPlanos()}
              className="flex h-full flex-col gap-3 p-8 rounded-3xl bg-brand-soft border border-brand-dark/10 hover:border-brand-blue/40 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue transition-all"
            >
              <h3 className="text-2xl font-black text-brand-dark tracking-tight">{jeito.titulo}</h3>
              <p className="text-lg text-brand-dark/70 font-medium leading-relaxed">{jeito.texto}</p>
            </a>
          </li>
        ))}
      </ul>
      <div className="text-center">
        <a
          href={lpPlanos()}
          className="inline-flex min-h-12 items-center justify-center gap-2 px-8 py-4 text-sm font-black uppercase tracking-widest bg-brand-dark text-white rounded-full hover:bg-brand-purple focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue transition-colors group"
        >
          Ver planos e preços
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </a>
      </div>
    </Section>
  );
};
