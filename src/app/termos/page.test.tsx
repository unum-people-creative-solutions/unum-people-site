import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Termos from './page';

const redirectMock = vi.fn((url: string) => {
  throw new Error(`NEXT_REDIRECT ${url}`);
});

vi.mock('next/navigation', () => ({
  redirect: (url: string) => redirectMock(url),
}));

function planos(...termUrls: (string | null)[]) {
  return {
    ok: true,
    status: 200,
    json: async () => ({
      plans: termUrls.map((term_url, i) => ({ slug: `p${i}`, term_url })),
    }),
  };
}

// /termos leva ao termo de contratação vigente, que vem do catálogo público
// de planos (o mesmo termo que o cliente aceita ao contratar).
describe('Página /termos', () => {
  beforeEach(() => {
    redirectMock.mockClear();
  });
  afterEach(() => vi.unstubAllGlobals());

  it('redireciona para o termo vigente quando todos os planos usam o mesmo', async () => {
    const url = 'https://unumpeople.com.br/termos/8656db18-9ce2-4641-94f9-655a0cf4dfc2/v1';
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(planos(url, url, url)));

    await expect(Termos()).rejects.toThrow('NEXT_REDIRECT');
    expect(redirectMock).toHaveBeenCalledWith('/termos/8656db18-9ce2-4641-94f9-655a0cf4dfc2/v1');
  });

  it('lista os termos quando os planos usam termos diferentes', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        planos('https://unumpeople.com.br/termos/a/v1', 'https://unumpeople.com.br/termos/b/v2', null),
      ),
    );

    render(await Termos());

    expect(redirectMock).not.toHaveBeenCalled();
    expect(screen.getByRole('heading', { name: 'Termos de contratação' })).toBeInTheDocument();
    const links = screen.getAllByRole('link', { name: /Termo de contratação/ });
    expect(links.map((l) => l.getAttribute('href'))).toEqual(['/termos/a/v1', '/termos/b/v2']);
  });

  it('mostra o contato quando o catálogo não responde', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 503, json: async () => ({}) }));

    render(await Termos());

    expect(redirectMock).not.toHaveBeenCalled();
    expect(screen.getByText(/não conseguimos carregar/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'atendimento@unumpeople.com.br' })).toHaveAttribute(
      'href',
      'mailto:atendimento@unumpeople.com.br',
    );
  });
});
