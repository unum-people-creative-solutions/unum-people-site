import { describe, it, expect } from 'vitest';
import nextConfig from '../../next.config';
import { lpPlanos } from '@/lib/links';

describe('redirecionamento de /servicos', () => {
  it('expõe redirects() com /servicos apontando permanentemente para os planos do LP Builder', async () => {
    expect(typeof nextConfig.redirects).toBe('function');
    const regras = await nextConfig.redirects!();
    const regra = regras.find((r) => r.source === '/servicos');

    expect(regra).toBeDefined();
    expect(regra!.destination).toBe(lpPlanos());
    expect(regra!.destination.endsWith('/#planos')).toBe(true);
    expect('permanent' in regra! && regra!.permanent).toBe(true);
  });

  it('tem destino fixo em https, sem parâmetros nem condições vindos da requisição', async () => {
    expect(typeof nextConfig.redirects).toBe('function');
    const regras = await nextConfig.redirects!();
    const regra = regras.find((r) => r.source === '/servicos');

    expect(regra).toBeDefined();
    expect(regra!.destination.startsWith('https://')).toBe(true);
    expect(regra!.destination).not.toMatch(/:[a-zA-Z]/);
    expect(regra!.has).toBeUndefined();
  });
});
