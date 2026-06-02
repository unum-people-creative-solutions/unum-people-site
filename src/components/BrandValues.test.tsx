import { render, screen } from '@testing-library/react';
import { BrandValues } from './BrandValues';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('BrandValues Component', () => {
  beforeEach(() => {
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it('deve renderizar o título da seção', () => {
    render(<BrandValues />);
    expect(screen.getByText(/Princípios Norteadores/i)).toBeInTheDocument();
  });

  it('deve renderizar todos os 5 valores da marca', () => {
    render(<BrandValues />);
    expect(screen.getByText('Unidade')).toBeInTheDocument();
    expect(screen.getByText('Conexão')).toBeInTheDocument();
    expect(screen.getByText('Relacionamento')).toBeInTheDocument();
    expect(screen.getByText('Jornada')).toBeInTheDocument();
    expect(screen.getByText('Transformação')).toBeInTheDocument();
  });
});
