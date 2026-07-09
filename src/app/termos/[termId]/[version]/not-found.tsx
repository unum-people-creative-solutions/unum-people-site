import Link from 'next/link';
import { Section } from '@/components/Section';

export default function TermNotFound() {
  return (
    <Section className="text-center">
      <h1 className="text-2xl font-bold text-brand-dark mb-4">Termo não encontrado</h1>
      <p className="text-brand-dark/60 mb-8">
        Este termo não existe ou a versão solicitada não está mais disponível.
      </p>
      <Link href="/" className="text-brand-blue font-bold hover:underline">
        Voltar para a página inicial
      </Link>
    </Section>
  );
}
