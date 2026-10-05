import { beforeEach, describe, expect, it } from 'vitest';
import { captureTrackingParams, getStoredTrackingData } from './tracking';

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
