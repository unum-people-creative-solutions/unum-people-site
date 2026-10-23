import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Privacidade, { metadata } from './page';
import Contato from '../contato/page';

const notFoundMock = vi.fn(() => {
  throw new Error('NEXT_NOT_FOUND');
});

vi.mock('next/navigation', () => ({
  notFound: () => notFoundMock(),
}));

function respostaDaApi(status: number, corpo?: unknown) {
  return vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: async () => corpo,
  });
}

// termos-vigentes-e-aceitos: /privacidade mostra a política vigente publicada
// no painel (spec itens 6–9).
describe('Página de privacidade (/privacidade)', () => {
  beforeEach(() => {
    notFoundMock.mockClear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  // T08
  it('mostra o nome, a versão, a data e o conteúdo da política vigente', async () => {
    const fetchMock = respostaDaApi(200, {
      term_name: 'Política de Privacidade',
      version_number: 3,
      published_at: '2026-10-23T12:00:00Z',
      content_html: '<h2>1. Introdução</h2><p>Texto da política.</p>',
    });
    vi.stubGlobal('fetch', fetchMock);

    render(await Privacidade());

    expect(screen.getByRole('heading', { level: 1, name: 'Política de Privacidade' })).toBeInTheDocument();
    expect(screen.getByText('Versão 3, publicada em 23/10/2026')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: '1. Introdução' })).toBeInTheDocument();
    expect(screen.getByText('Texto da política.')).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringMatching(/\/public\/terms\/vigente\/politica_privacidade$/),
      expect.objectContaining({ next: { revalidate: 300 } }),
    );
  });

  // T09
  it('sem política vigente (404) responde 404', async () => {
    vi.stubGlobal('fetch', respostaDaApi(404, { error: 'term not found' }));

    await expect(Privacidade()).rejects.toThrow('NEXT_NOT_FOUND');
    expect(notFoundMock).toHaveBeenCalled();
  });

  it('falha da API (5xx) lança erro em vez de mostrar página vazia', async () => {
    vi.stubGlobal('fetch', respostaDaApi(500, { error: 'internal error' }));

    await expect(Privacidade()).rejects.toThrow();
    expect(notFoundMock).not.toHaveBeenCalled();
  });

  it('mantém o título e o endereço canônico', () => {
    expect(metadata.title).toBe('Política de privacidade | Unum People');
    expect(metadata.alternates?.canonical).toBe('/privacidade');
  });
});

describe('Página de contato', () => {
  it('expõe o atendimento na página de contato', () => {
    render(<Contato />);

    expect(screen.getByRole('heading', { name: 'Contato' })).toBeInTheDocument();
    const mail = screen.getByRole('link', { name: 'atendimento@unumpeople.com.br' });
    expect(mail).toHaveAttribute('href', 'mailto:atendimento@unumpeople.com.br');
    expect(screen.getByRole('link', { name: 'política de privacidade' })).toHaveAttribute('href', '/privacidade');
  });
});
