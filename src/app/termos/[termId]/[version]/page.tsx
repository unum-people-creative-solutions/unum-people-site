import { notFound } from 'next/navigation';
import { Section } from '@/components/Section';

interface TermParams {
  termId: string;
  version: string;
}

interface PublicTermResponse {
  term_name: string;
  version_number: number;
  content_html: string;
  published_at: string;
}

async function fetchTerm(termId: string, version: string): Promise<PublicTermResponse | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/public/terms/${termId}/${version}`,
    { cache: 'no-store' }
  );

  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error(`Falha ao buscar o termo (status ${response.status})`);
  }

  return response.json();
}

export async function generateMetadata({ params }: { params: Promise<TermParams> }) {
  const { termId, version } = await params;

  try {
    const term = await fetchTerm(termId, version);
    if (!term) {
      return { title: 'Termo não encontrado' };
    }
    return { title: `${term.term_name} — v${term.version_number}` };
  } catch {
    return { title: 'Termo não encontrado' };
  }
}

export default async function TermPage({ params }: { params: Promise<TermParams> }) {
  const { termId, version } = await params;
  const term = await fetchTerm(termId, version);

  if (!term) {
    notFound();
  }

  return (
    <Section>
      <h1 className="text-3xl font-bold text-brand-dark mb-8">
        {term.term_name} — v{term.version_number}
      </h1>
      <div
        className="max-w-none text-brand-dark/80 leading-relaxed space-y-4 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-bold [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6"
        dangerouslySetInnerHTML={{ __html: term.content_html }}
      />
    </Section>
  );
}
