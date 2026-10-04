import { render, screen, within } from '@testing-library/react';
import Footer from './Footer';
import { describe, it, expect } from 'vitest';
import { lpConfigurar, lpEntrar, lpPlanos } from '@/lib/links';

describe('Footer', () => {
  it('deve renderizar a logo texto', () => {
    render(<Footer />);
    expect(screen.getByAltText(/Unum People Creative Solutions/i)).toBeInTheDocument();
  });

  it('deve exibir o novo posicionamento P2P (slogan)', () => {
    render(<Footer />);
    expect(screen.getByText(/O caminho mais curto entre você e o seu cliente./i)).toBeInTheDocument();
  });

  it('deve exibir o copyright exato conforme o manual da marca', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2026 Unum People - Creative Solutions. Todos os direitos reservados./i)).toBeInTheDocument();
  });

  it('deve exibir a identificação completa da empresa', () => {
    render(<Footer />);
    expect(screen.getByText(/Unum People Creative Solutions Ltda\./)).toBeInTheDocument();
    expect(screen.getByText(/67\.294\.461\/0001-95/)).toBeInTheDocument();
    expect(
      screen.getByText(/Rua Bom Jesus, nº 212, 19º andar, sala 1904, Juvevê, Curitiba - PR/),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'atendimento@unumpeople.com.br' })).toHaveAttribute(
      'href',
      'mailto:atendimento@unumpeople.com.br',
    );
  });

  it('deve trazer a coluna Navegação com os links internos e os planos do LP Builder', () => {
    render(<Footer />);
    const navegacao = screen.getByRole('navigation', { name: 'Navegação' });
    expect(within(navegacao).getByRole('link', { name: 'Início' })).toHaveAttribute('href', '/');
    expect(within(navegacao).getByRole('link', { name: 'Sobre' })).toHaveAttribute('href', '/sobre');
    expect(within(navegacao).getByRole('link', { name: 'Planos' })).toHaveAttribute('href', lpPlanos());
    expect(within(navegacao).getByRole('link', { name: 'Contato' })).toHaveAttribute('href', '/contato');
    expect(within(navegacao).getByRole('link', { name: 'Privacidade' })).toHaveAttribute('href', '/privacidade');
  });

  it('deve trazer a coluna Produto com central de ajuda, conta, CRM e ferramentas', () => {
    render(<Footer />);
    const produto = screen.getByRole('navigation', { name: 'Produto' });
    expect(within(produto).getByRole('link', { name: 'Montar minha página' })).toHaveAttribute(
      'href',
      lpConfigurar('institucional'),
    );
    expect(within(produto).getByRole('link', { name: 'Central de ajuda' })).toHaveAttribute(
      'href',
      'https://docs.unumpeople.com.br/paginas/',
    );
    expect(within(produto).getByRole('link', { name: 'Entrar' })).toHaveAttribute('href', lpEntrar());
    expect(within(produto).getByRole('link', { name: 'CRM' })).toHaveAttribute('href', 'https://crm.unumpeople.com.br');
    expect(within(produto).getByRole('link', { name: 'Ferramentas' })).toHaveAttribute(
      'href',
      'https://tools.unumpeople.com.br',
    );
  });

  it('deve abrir os links externos em nova aba com rel noopener noreferrer', () => {
    render(<Footer />);
    const novaAba = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('target') === '_blank');
    expect(novaAba.length).toBeGreaterThanOrEqual(3);
    novaAba.forEach((link) => {
      expect(link.getAttribute('rel')).toContain('noopener');
      expect(link.getAttribute('rel')).toContain('noreferrer');
    });
  });

  it('não deve mencionar Gestão de Tráfego nem linkar para /servicos', () => {
    render(<Footer />);
    expect(screen.queryByText(/Gestão de Tráfego/i)).not.toBeInTheDocument();
    screen.getAllByRole('link').forEach((link) => {
      expect(link.getAttribute('href')).not.toMatch(/servicos/);
    });
  });
});
