import { describe, it, expect, vi, afterEach } from 'vitest';

// A env é lida na carga do módulo (o Next a embute no build), então cada
// cenário reimporta o módulo com a env já preparada.
async function carregar(env?: string) {
  vi.resetModules();
  if (env === undefined) {
    vi.stubEnv('NEXT_PUBLIC_LP_BUILDER_URL', '');
    delete process.env.NEXT_PUBLIC_LP_BUILDER_URL;
  } else {
    vi.stubEnv('NEXT_PUBLIC_LP_BUILDER_URL', env);
  }
  return import('./links');
}

describe('links do LP Builder', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('usa https://unumpeople.app quando a env não está definida', async () => {
    const links = await carregar();
    expect(links.LP_BUILDER_URL).toBe('https://unumpeople.app');
  });

  it('usa a env quando definida', async () => {
    const links = await carregar('https://lp.example.test');
    expect(links.LP_BUILDER_URL).toBe('https://lp.example.test');
  });

  it('remove a barra final da env', async () => {
    const links = await carregar('https://lp.example.test/');
    expect(links.LP_BUILDER_URL).toBe('https://lp.example.test');
    expect(links.lpPlanos()).toBe('https://lp.example.test/#planos');
  });

  it('monta os links do configurador, dos planos e da conta', async () => {
    const links = await carregar();
    expect(links.lpConfigurar('institucional')).toBe('https://unumpeople.app/configurar?ref=institucional');
    expect(links.lpPlanos()).toBe('https://unumpeople.app/#planos');
    expect(links.lpEntrar()).toBe('https://unumpeople.app/minha-conta');
  });

  it('codifica o ref para que & e # não escapem da query', async () => {
    const links = await carregar();
    expect(links.lpConfigurar('a&b#c')).toBe('https://unumpeople.app/configurar?ref=a%26b%23c');
  });
});
