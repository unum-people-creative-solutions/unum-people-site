import { fireEvent, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { LP_BUILDER_URL } from '@/lib/links';
import { TrackingInitializer } from './TrackingInitializer';

// funil-configurador-f2 RF-17: o clique no link do Configurador leva o rastreamento.
describe('TrackingInitializer', () => {
  beforeEach(() => {
    sessionStorage.clear();
    window.history.replaceState({}, '', '/?gclid=g1');
  });
  afterEach(() => window.history.replaceState({}, '', '/'));

  function link(href: string) {
    const a = document.createElement('a');
    a.href = href;
    a.textContent = 'ir';
    a.addEventListener('click', (e) => e.preventDefault());
    document.body.appendChild(a);
    return a;
  }

  it('acrescenta o gclid ao link do Configurador no clique', () => {
    render(<TrackingInitializer />);
    const a = link(`${LP_BUILDER_URL}/configurar?ref=home`);
    fireEvent.click(a);
    expect(new URL(a.href).searchParams.get('gclid')).toBe('g1');
    a.remove();
  });

  it('o clique num elemento dentro do link também conta', () => {
    render(<TrackingInitializer />);
    const a = link(`${LP_BUILDER_URL}/configurar`);
    const span = document.createElement('span');
    a.appendChild(span);
    fireEvent.click(span);
    expect(new URL(a.href).searchParams.get('gclid')).toBe('g1');
    a.remove();
  });

  // Verifier M-8: clique do meio e menu de contexto (abrir em nova aba).
  it.each(['auxclick', 'contextmenu'])('%s também leva o gclid', (evento) => {
    render(<TrackingInitializer />);
    const a = link(`${LP_BUILDER_URL}/configurar`);
    fireEvent(a, new MouseEvent(evento, { bubbles: true, button: 1 }));
    expect(new URL(a.href).searchParams.get('gclid')).toBe('g1');
    a.remove();
  });

  it('link para outro site não muda', () => {
    render(<TrackingInitializer />);
    const a = link('https://customer.unumpeople.com.br/');
    fireEvent.click(a);
    expect(a.href).toBe('https://customer.unumpeople.com.br/');
    a.remove();
  });

  it('desmontado, não mexe mais nos links', () => {
    const { unmount } = render(<TrackingInitializer />);
    unmount();
    const a = link(`${LP_BUILDER_URL}/configurar`);
    fireEvent.click(a);
    expect(new URL(a.href).searchParams.has('gclid')).toBe(false);
    a.remove();
  });
});
