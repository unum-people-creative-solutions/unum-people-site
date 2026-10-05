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

  it('expõe o atendimento na página de contato', () => {
    render(<Contato />);

    expect(screen.getByRole('heading', { name: 'Contato' })).toBeInTheDocument();
    const mail = screen.getByRole('link', { name: 'atendimento@unumpeople.com.br' });
    expect(mail).toHaveAttribute('href', 'mailto:atendimento@unumpeople.com.br');
    expect(screen.getByRole('link', { name: 'política de privacidade' })).toHaveAttribute('href', '/privacidade');
  });
});
