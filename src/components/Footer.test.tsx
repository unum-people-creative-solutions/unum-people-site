import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import * as navigation from 'next/navigation';

describe('Footer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(navigation, 'usePathname').mockReturnValue('/');
  });

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
});
