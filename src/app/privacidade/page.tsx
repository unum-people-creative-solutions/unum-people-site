import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/Section';

export const metadata: Metadata = {
  title: 'Política de privacidade | Unum People',
  description:
    'Como a Unum People coleta dados no site e quais e-mails transacionais envia para quem contrata ou é convidado.',
  alternates: { canonical: '/privacidade' },
};

export default function Privacidade() {
  return (
    <Section>
      <article className="max-w-3xl text-brand-dark/80 leading-relaxed">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mb-3">
          Política de privacidade
        </h1>
        <p className="text-sm font-bold uppercase tracking-widest text-brand-dark/40 mb-10">
          Atualizada em 2 de outubro de 2026
        </p>

        <h2 className="text-xl font-bold text-brand-dark mt-10 mb-3">Quem é o responsável</h2>
        <p>
          A Unum People Creative Solutions opera o site unumpeople.com.br e os
          produtos ligados a ele, entre eles o CRM, os sites publicados para
          clientes e as ferramentas. Para falar sobre estes dados, escreva para{' '}
          <a className="text-brand-blue font-bold" href="mailto:atendimento@unumpeople.com.br">
            atendimento@unumpeople.com.br
          </a>
          .
        </p>

        <h2 className="text-xl font-bold text-brand-dark mt-10 mb-3">O que o site coleta</h2>
        <p className="mb-3">
          O formulário de interesse em um pacote pede nome, e-mail e telefone.
          Junto com o pacote escolhido, esses dados entram no CRM da Unum para
          que a equipe responda o pedido. O envio também abre uma conversa no
          WhatsApp.
        </p>
        <p>
          Se a visita chegou por anúncio, o navegador guarda na sessão os
          identificadores dessa origem (gclid, fbclid, msclkid e parâmetros
          utm). Eles seguem com o lead e não são usados para montar lista de
          e-mail.
        </p>

        <h2 className="text-xl font-bold text-brand-dark mt-10 mb-3">E-mails que enviamos</h2>
        <p className="mb-3">
          Não enviamos newsletter, promoção em massa nem mensagem para lista
          comprada ou coletada fora do cadastro. O remetente das mensagens de
          conta é <strong className="text-brand-dark">noreply@unumpeople.com.br</strong>.
          Essa caixa não recebe resposta. Para falar com a Unum, use o endereço
          de atendimento acima.
        </p>
        <p className="mb-3">
          O destinatário é só o e-mail que a própria pessoa informou ao
          contratar, ou o e-mail que um administrador da empresa digitou ao
          convidar alguém para a conta. Cada evento gera uma mensagem:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>convite de acesso, com senha temporária e o link do produto;</li>
          <li>nova senha temporária, quando um administrador redefine a senha;</li>
          <li>boas-vindas depois que o pagamento é confirmado, com o modo de cobrança da assinatura;</li>
          <li>aviso de que o site daquela conta foi publicado, com o link;</li>
          <li>avisos de cobrança para o mesmo contato: fatura em aberto e risco de exclusão da conta.</li>
        </ul>
        <p className="mt-3">
          Endereço que devolve falha permanente sai da fila e não é tentado de
          novo. Encerrar a conta interrompe esses envios.
        </p>

        <h2 className="text-xl font-bold text-brand-dark mt-10 mb-3">Com quem os dados passam</h2>
        <p>
          O lead fica no CRM da Unum. A entrega dos e-mails transacionais usa a
          Amazon SES. O WhatsApp só entra quando a pessoa segue para a conversa
          a partir do formulário.
        </p>

        <h2 className="text-xl font-bold text-brand-dark mt-10 mb-3">Seus pedidos</h2>
        <p>
          Você pode pedir acesso, correção ou exclusão dos dados ligados ao seu
          e-mail escrevendo para{' '}
          <a className="text-brand-blue font-bold" href="mailto:atendimento@unumpeople.com.br">
            atendimento@unumpeople.com.br
          </a>
          . A página de{' '}
          <Link href="/contato" className="text-brand-blue font-bold">
            contato
          </Link>{' '}
          repete esse endereço.
        </p>
      </article>
    </Section>
  );
}
