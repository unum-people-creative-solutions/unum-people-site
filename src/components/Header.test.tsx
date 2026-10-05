import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import * as navigation from 'next/navigation';
import { lpConfigurar, lpEntrar, lpPlanos } from '@/lib/links';

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(navigation, 'usePathname').mockReturnValue('/');
  });

  it('deve renderizar o logo corretamente', () => {
    render(<Header />);

    // Verificamos pelo alt text definido no componente
    expect(screen.getByAltText(/Unum People - Símbolo/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Unum People Creative Solutions/i)).toBeInTheDocument();
  });

  it('deve mostrar Início, Sobre, Planos, Entrar e o botão "Montar minha página"', () => {
    render(<Header />);
    const nav = screen.getByRole('navigation', { name: 'Principal' });

    expect(screen.getByRole('link', { name: 'Início' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Sobre' })).toHaveAttribute('href', '/sobre');
    expect(screen.getByRole('link', { name: 'Planos' })).toHaveAttribute('href', lpPlanos());
    expect(screen.getByRole('link', { name: 'Entrar' })).toHaveAttribute('href', lpEntrar());
    expect(screen.getByRole('link', { name: 'Montar minha página' })).toHaveAttribute(
      'href',
      lpConfigurar('institucional'),
    );
    expect(nav).toContainElement(screen.getByRole('link', { name: 'Montar minha página' }));
  });

  it('não deve linkar para /servicos nem trazer o texto "Serviços"', () => {
    render(<Header />);
    screen.getAllByRole('link').forEach((link) => {
      expect(link.getAttribute('href')).not.toMatch(/servicos/);
    });
    expect(screen.queryByText(/Serviços/i)).not.toBeInTheDocument();
  });

  it('deve marcar a página atual com aria-current', () => {
    vi.spyOn(navigation, 'usePathname').mockReturnValue('/sobre');
    render(<Header />);
    expect(screen.getByRole('link', { name: 'Sobre' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Início' })).not.toHaveAttribute('aria-current');
  });

  it('deve abrir e fechar o menu no celular', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const botao = screen.getByRole('button', { name: 'Abrir menu' });
    expect(botao).toHaveAttribute('aria-expanded', 'false');

    await user.click(botao);
    expect(screen.getByRole('button', { name: 'Fechar menu' })).toHaveAttribute('aria-expanded', 'true');

    await user.click(screen.getByRole('link', { name: 'Sobre' }));
    expect(screen.getByRole('button', { name: 'Abrir menu' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('deve abrir só em nova aba com rel seguro, se algum link o fizer', () => {
    render(<Header />);
    screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('target') === '_blank')
      .forEach((link) => {
        expect(link.getAttribute('rel')).toContain('noopener');
        expect(link.getAttribute('rel')).toContain('noreferrer');
      });
  });
});
