import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/Section';

export const metadata: Metadata = {
  title: 'Contato | Unum People',
  description: 'Fale com a Unum People pelo atendimento@unumpeople.com.br.',
  alternates: { canonical: '/contato' },
};

export default function Contato() {
  return (
    <Section>
      <article className="max-w-3xl text-brand-dark/80 leading-relaxed">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mb-8">
          Contato
        </h1>
        <p className="mb-6">
          Escreva para{' '}
          <a className="text-brand-blue font-bold" href="mailto:atendimento@unumpeople.com.br">
            atendimento@unumpeople.com.br
          </a>
          . Essa caixa é lida pela equipe.
        </p>
        <p className="mb-6">
          Mensagens de conta — convite, senha temporária, boas-vindas, site
          publicado e avisos de cobrança — saem de noreply@unumpeople.com.br.
          Esse remetente não recebe resposta.
        </p>
        <p>
          O uso desses dados está na{' '}
          <Link href="/privacidade" className="text-brand-blue font-bold">
            política de privacidade
          </Link>
          .
        </p>
      </article>
    </Section>
  );
}
