import { beforeEach, describe, expect, it } from 'vitest';
import { vi } from 'vitest';
import { captureTrackingParams, getStoredTrackingData, linkComRastreamento } from './tracking';

// O site só guarda os parâmetros de campanha que chegam na URL. O envio só
// faz sentido para quem tem CRM (páginas do LP Builder), que tem a própria captura.
describe('tracking', () => {
  beforeEach(() => {
    sessionStorage.clear();
    window.history.replaceState({}, '', '/');
  });

  it('guarda gclid, fbclid, msclkid e utm da URL na sessão', () => {
    window.history.replaceState(
      {},
      '',
      '/?gclid=g1&fbclid=f1&msclkid=m1&utm_source=google&utm_medium=cpc&utm_campaign=lancamento&utm_content=a&utm_term=pagina',
    );

    captureTrackingParams();

    expect(getStoredTrackingData()).toEqual({
      gclid: 'g1',
      fbclid: 'f1',
      msclkid: 'm1',
      utm_source: 'google',
      utm_medium: 'cpc',
      utm_campaign: 'lancamento',
      utm_content: 'a',
      utm_term: 'pagina',
    });
  });

  it('ignora parâmetros que não são de campanha', () => {
    window.history.replaceState({}, '', '/?gclid=g1&ref=institucional&outro=x');

    captureTrackingParams();

    expect(getStoredTrackingData()).toEqual({ gclid: 'g1' });
  });

  it('mantém o que já estava guardado quando a página seguinte chega sem parâmetros', () => {
    window.history.replaceState({}, '', '/?gclid=g1');
    captureTrackingParams();

    window.history.replaceState({}, '', '/sobre');
    captureTrackingParams();

    expect(getStoredTrackingData()).toEqual({ gclid: 'g1' });
  });

  it('devolve objeto vazio quando nada foi guardado', () => {
    expect(getStoredTrackingData()).toEqual({});
  });
});

// funil-configurador-f2 RF-17 (D7): o link para o Configurador leva o rastreamento,
// porque a sessão não atravessa domínios.
describe('linkComRastreamento', () => {
  const ORIGEM = 'https://unumpeople.app';

  beforeEach(() => {
    sessionStorage.clear();
    window.history.replaceState({}, '', '/?gclid=g1&msclkid=m1&utm_source=google&utm_content=a');
    captureTrackingParams();
  });

  it('acrescenta só gclid, fbclid e os três utm ao link do Configurador', () => {
    const url = new URL(linkComRastreamento('https://unumpeople.app/configurar?ref=home', ORIGEM));
    expect(url.searchParams.get('ref')).toBe('home');
    expect(url.searchParams.get('gclid')).toBe('g1');
    expect(url.searchParams.get('utm_source')).toBe('google');
    expect(url.searchParams.has('msclkid')).toBe(false);
    expect(url.searchParams.has('utm_content')).toBe(false);
  });

  it('não sobrescreve parâmetro que o link já tem', () => {
    const url = new URL(linkComRastreamento('https://unumpeople.app/configurar?gclid=do-link', ORIGEM));
    expect(url.searchParams.getAll('gclid')).toEqual(['do-link']);
  });

  it('mantém o âncora depois dos parâmetros', () => {
    expect(linkComRastreamento('https://unumpeople.app/#planos', ORIGEM)).toBe('https://unumpeople.app/?gclid=g1&utm_source=google#planos');
  });

  // Verifier M-7: endereço do Configurador inválido na env não vira erro no clique.
  it('endereço do Configurador inválido devolve o link igual', async () => {
    vi.resetModules();
    vi.stubEnv('NEXT_PUBLIC_LP_BUILDER_URL', 'nao-e-url');
    const { linkComRastreamento: comEnvRuim } = await import('./tracking');
    expect(() => comEnvRuim('https://unumpeople.app/configurar')).not.toThrow();
    expect(comEnvRuim('https://unumpeople.app/configurar')).toBe('https://unumpeople.app/configurar');
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it('link para outro destino não muda', () => {
    for (const href of ['https://customer.unumpeople.com.br/', 'https://unumpeople.app.evil.com/x', '/termos', 'mailto:a@b.com']) {
      expect(linkComRastreamento(href, ORIGEM)).toBe(href);
    }
  });

  it('sem nada guardado ou com armazenamento que lança, o link não muda', () => {
    sessionStorage.clear();
    expect(linkComRastreamento('https://unumpeople.app/configurar', ORIGEM)).toBe('https://unumpeople.app/configurar');
    captureTrackingParams();
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('bloqueado');
    });
    expect(linkComRastreamento('https://unumpeople.app/configurar', ORIGEM)).toBe('https://unumpeople.app/configurar');
    vi.restoreAllMocks();
  });
});
