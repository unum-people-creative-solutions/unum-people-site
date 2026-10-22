'use client';

import { useEffect } from 'react';
import { captureTrackingParams, linkComRastreamento } from '@/lib/tracking';

export function TrackingInitializer() {
  useEffect(() => {
    captureTrackingParams();

    // clique, clique do meio e menu de contexto ("abrir em nova aba")
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const a = (event.target as Element).closest('a[href]');
      if (!(a instanceof HTMLAnchorElement)) return;
      const destino = linkComRastreamento(a.href);
      if (destino !== a.href) a.href = destino;
    };

    const eventos = ['click', 'auxclick', 'contextmenu'] as const;
    for (const nome of eventos) document.addEventListener(nome, onClick, true);
    return () => {
      for (const nome of eventos) document.removeEventListener(nome, onClick, true);
    };
  }, []);

  return null;
}
