import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { lpConfigurar, lpPlanos } from '@/lib/links';

// Celular desenhado só com HTML/CSS: uma página genérica (barra de título, uma
// linha de manchete e o botão verde de WhatsApp). Decorativo, por isso aria-hidden.
const CelularIlustracao = () => (
  <div
    data-testid="hero-ilustracao"
    aria-hidden="true"
    className="mx-auto w-60 sm:w-64 rounded-[2.5rem] border-4 border-white/25 bg-white p-3 shadow-2xl"
  >
    <div className="overflow-hidden rounded-[2rem] bg-brand-soft">
      <div className="flex items-center gap-1.5 bg-white px-4 py-3 border-b border-brand-dark/10">
        <span className="h-2 w-2 rounded-full bg-brand-dark/20" />
        <span className="h-2 w-2 rounded-full bg-brand-dark/20" />
        <span className="h-2 w-2 rounded-full bg-brand-dark/20" />
        <span className="ml-2 h-2.5 flex-1 rounded-full bg-brand-dark/10" />
      </div>
      <div className="space-y-3 px-5 py-8">
        <div className="h-4 w-4/5 rounded bg-brand-dark" />
        <div className="h-4 w-3/5 rounded bg-brand-dark" />
        <div className="h-2.5 w-full rounded bg-brand-dark/15" />
        <div className="h-2.5 w-5/6 rounded bg-brand-dark/15" />
      </div>
      <div className="px-5 pb-8">
        <div className="flex items-center justify-center gap-2 rounded-full bg-green-500 py-3 text-sm font-bold text-white">
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </div>
      </div>
    </div>
  </div>
);

export const Hero = () => {
  return (
    <section
      aria-labelledby="hero-titulo"
      className="bg-brand-dark text-white px-6 md:px-12 py-16 md:py-28"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-16 items-center">
        <div>
          <span className="inline-block px-5 py-2 mb-8 text-xs font-black tracking-widest uppercase bg-white/10 rounded-full border border-white/15">
            Página com WhatsApp para profissionais e pequenos negócios
          </span>
          <h1
            id="hero-titulo"
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-tight mb-6"
          >
            O caminho mais curto entre você e o seu cliente é uma página no ar hoje.
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed font-medium max-w-xl">
            Monte em minutos, veja como fica e só pague para publicar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={lpConfigurar('institucional')}
              className="inline-flex min-h-12 items-center justify-center gap-2 px-8 py-4 text-sm font-black uppercase tracking-widest bg-white text-brand-dark rounded-full hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors group"
            >
              Montar minha página
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
            <a
              href={lpPlanos()}
              className="inline-flex min-h-12 items-center justify-center px-8 py-4 text-sm font-black uppercase tracking-widest border-2 border-white/40 text-white rounded-full hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
            >
              Ver planos e preços
            </a>
          </div>
        </div>
        <CelularIlustracao />
      </div>
    </section>
  );
};
