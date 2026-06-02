import { render, screen } from '@testing-library/react';
import Home from './page';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Home Page', () => {
  beforeEach(() => {
    // IntersectionObserver mock for Framer Motion inside Section
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it('deve renderizar a Hero Section com o novo manifesto (P2P)', () => {
    render(<Home />);
    
    // Testa o novo texto da Hero (baseado no manifesto: "A tecnologia é a ponte invisível")
    // Se usarmos a variação: "Encurtar distâncias, simplificar vendas." também pode ser o heading
    
    const elementsWithPonteInvisivel = screen.queryAllByText(/ponte invisível/i);
    expect(elementsWithPonteInvisivel.length).toBeGreaterThan(0);
  });

  it('deve renderizar a seção de Ecossistema com os valores de Unidade e Conexão', () => {
    render(<Home />);
    
    expect(screen.getByText(/um único ecossistema indivisível/i)).toBeInTheDocument();
    expect(screen.getAllByText(/estabelecer pontes legítimas/i).length).toBeGreaterThan(0);
  });

  it('deve renderizar o banner final de Transformação', () => {
    render(<Home />);
    
    expect(screen.getByText(/Pronto para gerar frutos reais\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Vamos transformar a realidade do seu negócio juntos/i)).toBeInTheDocument();
  });
});
