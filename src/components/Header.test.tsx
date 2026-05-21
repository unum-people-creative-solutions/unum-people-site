import { render, screen } from '@testing-library/react';
import Header from './Header';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import * as navigation from 'next/navigation';

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar o logo corretamente', () => {
    render(<Header />);
    
    // Verificamos pelo alt text definido no componente
    expect(screen.getByAltText(/Unum People - Símbolo/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Unum People Creative Solutions/i)).toBeInTheDocument();
  });

  it('deve mostrar links de navegação padrão quando não estiver na página de serviços', () => {
    // Mock do pathname como '/'
    vi.spyOn(navigation, 'usePathname').mockReturnValue('/');
    
    render(<Header />);
    
    expect(screen.getByText(/Início/i)).toBeInTheDocument();
    expect(screen.getByText(/Serviços/i)).toBeInTheDocument();
  });

  it('deve esconder link "Serviços" quando estiver na página de serviços', () => {
    // Mock do pathname como '/servicos'
    vi.spyOn(navigation, 'usePathname').mockReturnValue('/servicos');
    
    render(<Header />);
    
    expect(screen.getByText(/Início/i)).toBeInTheDocument();
    expect(screen.queryByText(/Serviços/i)).not.toBeInTheDocument();
    
    // O botão "Começar Agora" deve ser um link interno (#precos)
    const cta = screen.getByText(/Começar Agora/i);
    expect(cta.tagName).toBe('A');
    expect(cta).toHaveAttribute('href', '#precos');
  });
});
