'use client';

import { LP_BUILDER_URL } from '@/lib/links';

/**
 * Utilitário para captura e persistência de parâmetros de rastreamento (GCLID, UTMs).
 * Segue as regras de engenharia da Unum People para uso de sessionStorage.
 */

const TRACKING_PARAMS = [
  'gclid',
  'fbclid',
  'msclkid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const;

type TrackingData = {
  [key in typeof TRACKING_PARAMS[number]]?: string;
};

const STORAGE_KEY = 'unum_tracking_data';

const PARAMS_NO_LINK = ['gclid', 'fbclid', 'utm_source', 'utm_medium', 'utm_campaign'] as const;

/**
 * Captura parâmetros da URL e salva no sessionStorage.
 * Deve ser chamado no carregamento da aplicação.
 */
export const captureTrackingParams = () => {
  if (typeof window === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const existingData = getStoredTrackingData();
  const newData: TrackingData = { ...existingData };

  let hasNew = false;
  TRACKING_PARAMS.forEach((param) => {
    const value = urlParams.get(param);
    if (value) {
      newData[param] = value;
      hasNew = true;
    }
  });

  if (hasNew) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  }
};

/**
 * Recupera os dados de rastreamento persistidos.
 */
export const getStoredTrackingData = (): TrackingData => {
  if (typeof window === 'undefined') return {};

  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (!stored) return {};

  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error('Erro ao ler dados de rastreamento:', e);
    return {};
  }
};

/** A sessão não atravessa domínios (funil-configurador-f2, D7). */
export function linkComRastreamento(href: string, origemConfigurador?: string): string {
  let url: URL;
  let origem: string;
  try {
    url = new URL(href);
    origem = origemConfigurador ?? new URL(LP_BUILDER_URL).origin;
  } catch {
    return href;
  }

  if (url.origin !== origem) return href;

  let dados: TrackingData;
  try {
    dados = getStoredTrackingData();
  } catch {
    return href;
  }

  let acrescentou = false;
  for (const param of PARAMS_NO_LINK) {
    const value = dados[param];
    if (value && !url.searchParams.has(param)) {
      url.searchParams.append(param, value);
      acrescentou = true;
    }
  }

  if (!acrescentou) return href;
  return url.toString();
}
