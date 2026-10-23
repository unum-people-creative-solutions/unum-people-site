import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Section } from '@/components/Section';

export const metadata: Metadata = {
  title: 'Política de privacidade | Unum People',
  description:
    'Como a Unum People coleta dados no site e quais e-mails transacionais envia para quem contrata ou é convidado.',
  alternates: { canonical: '/privacidade' },
};

// O texto é a política vigente publicada no painel (termos-vigentes-e-aceitos).
// Gerada a cada visita, e não no build: o build (CI e Netlify) não depende da
// API. A busca fica em cache por 5 minutos.
export const dynamic = 'force-dynamic';

interface PoliticaVigente {
  term_name: string;
  version_number: number;
  content_html: string;
  published_at: string;
}

async function politicaVigente(): Promise<PoliticaVigente> {
  const resposta = await fetch(
    `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/public/terms/vigente/politica_privacidade`,
    { next: { revalidate: 300 } },
  );
  if (resposta.status === 404) {
    notFound();
  }
  if (!resposta.ok) {
    throw new Error(`Falha ao buscar a política vigente (status ${resposta.status})`);
  }
  return resposta.json();
}

function dataDePublicacao(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });
}

export default async function Privacidade() {
  const politica = await politicaVigente();

  return (
    <Section>
      <article className="max-w-3xl text-brand-dark/80 leading-relaxed">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mb-3">{politica.term_name}</h1>
        <p className="text-sm font-bold uppercase tracking-widest text-brand-dark/40 mb-10">
          Versão {politica.version_number}, publicada em {dataDePublicacao(politica.published_at)}
        </p>
        <div
          className="space-y-4 [&_h1]:hidden [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-brand-dark [&_h2]:mt-10 [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-brand-blue [&_a]:font-bold [&_strong]:text-brand-dark"
          dangerouslySetInnerHTML={{ __html: politica.content_html }}
        />
      </article>
    </Section>
  );
}
