import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Sobre from './page';
import { lpConfigurar } from '@/lib/links';

describe('Página /sobre', () => {
  it('tem um único h1 "Sobre a Unum People"', () => {
    render(<Sobre />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent('Sobre a Unum People');
  });

  it('traz o manifesto da marca', () => {
    render(<Sobre />);
    expect(
      screen.getByRole('heading', { name: /Conexões genuínas não precisam de intermediários/ }),
    ).toBeInTheDocument();
    expect(screen.getByText(/ponte invisível/i)).toBeInTheDocument();
  });

  it('traz os cinco valores da marca', () => {
    render(<Sobre />);
    ['Unidade', 'Conexão', 'Relacionamento', 'Jornada', 'Transformação'].forEach((valor) => {
      expect(screen.getByRole('heading', { name: valor })).toBeInTheDocument();
    });
  });

  it('termina com o botão "Montar minha página" para o configurador', () => {
    render(<Sobre />);
    expect(screen.getByRole('link', { name: 'Montar minha página' })).toHaveAttribute(
      'href',
      lpConfigurar('institucional'),
    );
  });
});
