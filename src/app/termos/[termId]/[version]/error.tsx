'use client';

import { Section } from '@/components/Section';

export default function TermError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Section className="text-center">
      <h1 className="text-2xl font-bold text-brand-dark mb-4">Não foi possível carregar o termo</h1>
      <p className="text-brand-dark/60 mb-8">
        Tente novamente em instantes. Se o problema continuar, entre em contato com o suporte.
      </p>
      <button
        onClick={() => reset()}
        className="px-5 py-2 text-xs font-black uppercase tracking-widest bg-brand-dark text-white rounded-full hover:bg-brand-blue transition-all"
      >
        Tentar novamente
      </button>
    </Section>
  );
}
