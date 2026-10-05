// Único módulo deste site que conhece o endereço do LP Builder (unumpeople.app).
// A URL vem só da env pública (embutida no build) ou do padrão: nunca de entrada
// do usuário.
const PADRAO = 'https://unumpeople.app';

export const LP_BUILDER_URL: string = (
  process.env.NEXT_PUBLIC_LP_BUILDER_URL || PADRAO
).replace(/\/+$/, '');

export function lpConfigurar(ref: string): string {
  return `${LP_BUILDER_URL}/configurar?ref=${encodeURIComponent(ref)}`;
}

export function lpPlanos(): string {
  return `${LP_BUILDER_URL}/#planos`;
}

export function lpEntrar(): string {
  return `${LP_BUILDER_URL}/minha-conta`;
}
