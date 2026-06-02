import { render, screen } from '@testing-library/react';
import Servicos from './page';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Servicos Page', () => {
  beforeEach(() => {
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it('deve utilizar linguagem relacional (Jornada) em vez de transacional', () => {
    render(<Servicos />);
    
    // Testa o novo título da seção de preços
    expect(screen.getByRole('heading', { name: /Escolha como iniciaremos sua Jornada/i })).toBeInTheDocument();
  });
});
