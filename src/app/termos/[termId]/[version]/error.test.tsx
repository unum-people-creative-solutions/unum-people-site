import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import TermError from './error';

// T09 — erro de rede/backend mostra página amigável, sem detalhe técnico
describe('Term page error boundary', () => {
  it('mostra mensagem amigável e nunca expõe detalhe técnico do erro', () => {
    const error = Object.assign(new Error('failed to get html from S3: connection refused'), {
      digest: 'abc123',
    });
    render(<TermError error={error} reset={() => {}} />);

    expect(screen.getByRole('heading', { name: /não foi possível carregar o termo/i })).toBeInTheDocument();
    expect(screen.queryByText(/connection refused/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/S3/i)).not.toBeInTheDocument();
  });

  it('chama reset() ao clicar em "Tentar novamente"', async () => {
    const resetMock = vi.fn();
    const user = userEvent.setup();
    render(<TermError error={new Error('x')} reset={resetMock} />);

    await user.click(screen.getByRole('button', { name: /tentar novamente/i }));
    expect(resetMock).toHaveBeenCalledTimes(1);
  });
});
