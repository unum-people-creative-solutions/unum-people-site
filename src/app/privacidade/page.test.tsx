import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Privacidade from './page';
import Contato from '../contato/page';

describe('Páginas de privacidade e contato', () => {
  it('explica o remetente transacional e o endereço que alguém lê', () => {
    render(<Privacidade />);

    expect(screen.getByRole('heading', { name: 'Política de privacidade' })).toBeInTheDocument();
    expect(screen.getByText(/noreply@unumpeople.com.br/)).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'atendimento@unumpeople.com.br' }).length).toBeGreaterThan(0);
    expect(screen.getByText(/Não enviamos newsletter/)).toBeInTheDocument();
  });

  it('descreve o site atual: sem formulário de contato e sem lista de leads', () => {
    const { container } = render(<Privacidade />);
    const texto = container.textContent ?? '';

    expect(texto).not.toMatch(/formulário de interesse/i);
    expect(texto).not.toMatch(/\blead\b/i);
    expect(texto).not.toMatch(/WhatsApp/);
    expect(screen.getByText(/O site não tem formulário/)).toBeInTheDocument();
  });

  it('explica o que acontece com endereço que devolve falha ou reclama', () => {
    render(<Privacidade />);

    expect(screen.getByText(/marca a mensagem como spam/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'termos de contratação' })).toHaveAttribute('href', '/termos');
  });

  // lp-google-tag (spec US 6): o Configurador carrega a tag do Google Ads; a página
  // publicada do cliente, não.
  it('divulga a tag de anúncios do Google no configurador e o Google entre quem recebe dados', () => {
    const { container } = render(<Privacidade />);
    const texto = container.textContent ?? '';

    expect(texto).toMatch(/tag de anúncios do Google/);
    expect(texto).toMatch(/cookies do Google/);
    expect(texto).toMatch(/páginas publicadas para clientes não carregam/);
    expect(texto).toMatch(/Google, que recebe/);
    // achado B1 do Verifier: o escopo real (domínio e as quatro superfícies)
    expect(screen.getByRole('link', { name: 'unumpeople.app' })).toHaveAttribute('href', 'https://unumpeople.app');
    expect(texto).toMatch(/apresentação, configurador, contratação e área do cliente/);
    // achado I1: prazo, base legal e como recusar
    expect(texto).toMatch(/_gcl_au, _gcl_aw e _gcl_gb\), que duram até 90 dias/);
    // rodada 2: cookies de terceiro com o prazo oficial e recusa que funciona
    expect(texto).toMatch(/IDE em doubleclick\.net, que\s+dura até 24 meses/);
    expect(texto).toMatch(/apague ou bloqueie no navegador os cookies de unumpeople\.app e de doubleclick\.net/);
    expect(texto).toMatch(/legítimo interesse/);
    expect(screen.getByRole('link', { name: 'Minha Central de Anúncios do Google' })).toHaveAttribute('href', 'https://myadcenter.google.com/');
    expect(screen.getByText(/Atualizada em 22 de outubro de 2026/)).toBeInTheDocument();
  });

  it('expõe o atendimento na página de contato', () => {
    render(<Contato />);

    expect(screen.getByRole('heading', { name: 'Contato' })).toBeInTheDocument();
    const mail = screen.getByRole('link', { name: 'atendimento@unumpeople.com.br' });
    expect(mail).toHaveAttribute('href', 'mailto:atendimento@unumpeople.com.br');
    expect(screen.getByRole('link', { name: 'política de privacidade' })).toHaveAttribute('href', '/privacidade');
  });

  // funil-configurador-f2 RF-18: o rastreamento e os dados da contratação vão ao CRM,
  // e o Google recebe o gclid, o valor e o contato cifrado (sem "Google Ads": copy-lancamento).
  it('diz que a contratação leva os identificadores ao CRM e o que o Google Ads recebe', () => {
    const { container } = render(<Privacidade />);
    const texto = container.textContent ?? '';

    expect(texto).not.toMatch(/ficam só no navegador/);
    expect(texto).toMatch(/Ao contratar, o gclid, o fbclid e os parâmetros utm_source, utm_medium e utm_campaign vão com os dados informados para o CRM da Unum/);
    expect(texto).toMatch(/o Google recebe o identificador do clique \(gclid\), o valor da venda e o e-mail e o telefone cifrados \(hash\)/);
  });
});
