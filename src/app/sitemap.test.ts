import { describe, it, expect } from 'vitest';
import sitemap from './sitemap';

describe('sitemap', () => {
  const urls = sitemap().map((entrada) => entrada.url);

  it('não lista mais /servicos', () => {
    expect(urls).not.toContain('https://unumpeople.com.br/servicos');
  });

  it('lista /sobre e as páginas que já constavam', () => {
    expect(urls).toContain('https://unumpeople.com.br/sobre');
    expect(urls).toContain('https://unumpeople.com.br');
    expect(urls).toContain('https://unumpeople.com.br/contato');
    expect(urls).toContain('https://unumpeople.com.br/privacidade');
  });
});
