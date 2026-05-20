import { render, screen } from '@testing-library/react';
import { LogoCloud } from './LogoCloud';
import { describe, it, expect } from 'vitest';

// Mock framer-motion to avoid issues with animations in tests
import { vi } from 'vitest';
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode }) => <div {...props}>{children}</div>,
    p: ({ children, ...props }: { children: React.ReactNode }) => <p {...props}>{children}</p>,
    a: ({ children, ...props }: { children: React.ReactNode }) => <a {...props}>{children}</a>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('LogoCloud', () => {
  it('deve renderizar o título da seção corretamente', () => {
    render(<LogoCloud />);
    expect(screen.getByText(/Portfólio de Confiança/i)).toBeInTheDocument();
  });

  it('deve renderizar todos os nomes dos clientes reais', () => {
    render(<LogoCloud />);
    const clients = [
      'Psicóloga Andrielly Oliveira',
      'Centro de Psicologia Recriar',
    ];
    
    clients.forEach(clientName => {
      const elements = screen.getAllByText(new RegExp(clientName, 'i'));
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  it('deve conter links para os sites dos clientes', () => {
    render(<LogoCloud />);
    expect(screen.getByRole('link', { name: /Psicóloga Andrielly Oliveira/i })).toHaveAttribute('href', 'https://psiandriellyoliveira.com.br/');
    expect(screen.getByRole('link', { name: /Centro de Psicologia Recriar/i })).toHaveAttribute('href', 'https://centrorecriar.com.br/');
  });
});
