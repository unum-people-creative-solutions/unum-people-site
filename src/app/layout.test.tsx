import { renderToStaticMarkup } from 'react-dom/server';
import { describe, it, expect, vi } from 'vitest';

// next/font/google só funciona dentro do compilador do Next.
vi.mock('next/font/google', () => ({
  Poppins: () => ({ variable: 'poppins-variavel', className: 'poppins' }),
}));

import RootLayout, { metadata } from './layout';

const TITULO = 'Unum People — página com WhatsApp para o seu negócio';
const DESCRICAO =
  'Monte sua página, veja como fica e só pague para publicar. O caminho mais curto entre você e o seu cliente.';

function lerJsonLd(): Record<string, unknown> {
  const html = renderToStaticMarkup(
    <RootLayout>
      <p>conteúdo</p>
    </RootLayout>,
  );
  const achado = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  expect(achado).not.toBeNull();
  return JSON.parse(achado![1]);
}

describe('metadados do layout', () => {
  it('usa o título e a descrição novos', () => {
    expect(metadata.title).toBe(TITULO);
    expect(metadata.description).toBe(DESCRICAO);
  });

  it('repete título e descrição em openGraph e twitter', () => {
    expect(metadata.openGraph?.title).toBe(TITULO);
    expect(metadata.openGraph?.description).toBe(DESCRICAO);
    expect(metadata.twitter?.title).toBe(TITULO);
    expect(metadata.twitter?.description).toBe(DESCRICAO);
  });

  it('tem keywords sem Google Ads, Gestão de Tráfego nem Sites de Alta Performance', () => {
    const keywords = metadata.keywords as string[];
    expect(Array.isArray(keywords)).toBe(true);
    expect(keywords).toContain('Unum People');
    const texto = keywords.join(' | ').toLowerCase();
    expect(texto).not.toContain('google ads');
    expect(texto).not.toContain('gestão de tráfego');
    expect(texto).not.toContain('alta performance');
  });
});

describe('dados estruturados (JSON-LD)', () => {
  it('é JSON válido com os serviços que a Unum oferece hoje', () => {
    const jsonLd = lerJsonLd();
    expect(jsonLd['@type']).toBe('ProfessionalService');
    expect(jsonLd.serviceType).toEqual(['Páginas para negócios', 'CRM para pequenos negócios']);
  });
});
