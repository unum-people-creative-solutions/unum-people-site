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

  it('expõe o atendimento na página de contato', () => {
    render(<Contato />);

    expect(screen.getByRole('heading', { name: 'Contato' })).toBeInTheDocument();
    const mail = screen.getByRole('link', { name: 'atendimento@unumpeople.com.br' });
    expect(mail).toHaveAttribute('href', 'mailto:atendimento@unumpeople.com.br');
    expect(screen.getByRole('link', { name: 'política de privacidade' })).toHaveAttribute('href', '/privacidade');
  });
});
