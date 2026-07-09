import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import TermPage, { generateMetadata } from './page';

const notFoundMock = vi.fn(() => {
  throw new Error('NEXT_NOT_FOUND');
});

vi.mock('next/navigation', () => ({
  notFound: () => notFoundMock(),
}));

const params = Promise.resolve({ termId: 'term-1', version: '2' });

describe('Term page (/termos/[termId]/[version])', () => {
  beforeEach(() => {
    notFoundMock.mockClear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  // T05 — renderiza o conteúdo retornado pela API pública
  it('renderiza o nome do termo, a versão e o content_html', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
          term_name: 'Termo de Contratação',
          version_number: 2,
          content_html: '<p>Conteúdo do termo</p>',
          published_at: '2026-05-01T12:00:00Z',
        }),
      })
    );

    const jsx = await TermPage({ params });
    render(jsx);

    expect(screen.getByRole('heading', { name: /Termo de Contratação — v2/i })).toBeInTheDocument();
    expect(screen.getByText('Conteúdo do termo')).toBeInTheDocument();
  });

  // T06 — busca sem cache (sem ISR)
  it('busca o endpoint público com cache: no-store', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        term_name: 'Termo',
        version_number: 1,
        content_html: '<p>x</p>',
        published_at: '2026-05-01T12:00:00Z',
      }),
    });
    vi.stubGlobal('fetch', fetchMock);

    await TermPage({ params });

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/public/terms/term-1/2'),
      expect.objectContaining({ cache: 'no-store' })
    );
  });

  // T07 — título reflete nome do termo e versão
  it('generateMetadata usa term_name e version_number no título', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
          term_name: 'Termo de Contratação',
          version_number: 3,
          content_html: '<p>x</p>',
          published_at: '2026-05-01T12:00:00Z',
        }),
      })
    );

    const metadata = await generateMetadata({ params });
    expect(metadata.title).toContain('Termo de Contratação');
    expect(metadata.title).toContain('3');
  });

  // T08 — 404 chama notFound()
  it('chama notFound() quando o endpoint retorna 404', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 404 })
    );

    await expect(TermPage({ params })).rejects.toThrow('NEXT_NOT_FOUND');
    expect(notFoundMock).toHaveBeenCalledTimes(1);
  });

  // Propagação de erro (base para T09 — error.tsx trata isso na árvore de componentes)
  it('propaga o erro quando o endpoint falha por outro motivo (não 404/4xx)', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 500 })
    );

    await expect(TermPage({ params })).rejects.toThrow(/status 500/);
  });

  // Regressão de produção: BuildSiteURL (backend) gera links como /termos/{id}/v1 —
  // o Next.js captura o segmento de versão literalmente como "v1", com o prefixo.
  // O fetch pro backend precisa remover esse prefixo antes de chamar
  // /public/terms/{id}/{version}, que espera um inteiro puro (strconv.Atoi).
  it('remove o prefixo "v" da versão da URL antes de chamar o endpoint público', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        term_name: 'Termo',
        version_number: 1,
        content_html: '<p>x</p>',
        published_at: '2026-05-01T12:00:00Z',
      }),
    });
    vi.stubGlobal('fetch', fetchMock);

    const paramsWithVPrefix = Promise.resolve({ termId: 'term-1', version: 'v1' });
    await TermPage({ params: paramsWithVPrefix });

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/public/terms/term-1/1'),
      expect.anything()
    );
    // Nunca deve sobrar o "v" no path chamado no backend.
    const calledUrl = fetchMock.mock.calls[0][0] as string;
    expect(calledUrl).not.toContain('/v1');
  });

  // Blindagem: qualquer 4xx (não só 404) deve virar "não encontrado", nunca a
  // tela de erro genérica — evita que um bug de formato de parâmetro (como o
  // desta regressão) apareça pro usuário como "erro 500", quando na real o
  // termo/versão só não bateu no formato esperado pelo backend.
  it('trata qualquer 4xx (ex: 400 de versão inválida) como não encontrado, não como erro', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 400 })
    );

    await expect(TermPage({ params })).rejects.toThrow('NEXT_NOT_FOUND');
    expect(notFoundMock).toHaveBeenCalledTimes(1);
  });
});
