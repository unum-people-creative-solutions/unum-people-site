import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Section } from '@/components/Section';

export const metadata: Metadata = {
  title: 'Termos de contratação | Unum People',
  description: 'O termo de contratação vigente dos planos da Unum People.',
  alternates: { canonical: '/termos' },
};

interface PlanoPublico {
  term_url?: string | null;
}

// O termo vigente é o que o catálogo público de planos aponta: o mesmo que o
// cliente aceita ao contratar. O caminho é relativo para valer em qualquer
// ambiente (term_url vem com o domínio de produção).
async function termosVigentes(): Promise<string[] | null> {
  try {
    const resposta = await fetch(`${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/public/plans`, {
      next: { revalidate: 300 },
    });
    if (!resposta.ok) return null;
    const { plans } = (await resposta.json()) as { plans?: PlanoPublico[] };
    const caminhos = (plans ?? [])
      .map((p) => p.term_url)
      .filter((u): u is string => typeof u === 'string' && u !== '')
      .map((u) => new URL(u, 'https://unumpeople.com.br').pathname);
    return [...new Set(caminhos)];
  } catch {
    return null;
  }
}

export default async function Termos() {
  const caminhos = await termosVigentes();

  if (caminhos && caminhos.length === 1) {
    redirect(caminhos[0]);
  }

  return (
    <Section>
      <article className="max-w-3xl text-brand-dark/80 leading-relaxed">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6">Termos de contratação</h1>
        {caminhos && caminhos.length > 1 ? (
          <ul className="list-disc pl-6 space-y-2">
            {caminhos.map((caminho) => (
              <li key={caminho}>
                <Link href={caminho} className="text-brand-blue font-bold">
                  Termo de contratação ({caminho.split('/').pop()})
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            Agora não conseguimos carregar o termo vigente. Peça uma cópia em{' '}
            <a className="text-brand-blue font-bold" href="mailto:atendimento@unumpeople.com.br">
              atendimento@unumpeople.com.br
            </a>
            .
          </p>
        )}
      </article>
    </Section>
  );
}
