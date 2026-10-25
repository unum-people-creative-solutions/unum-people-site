// Único módulo deste site que conhece o endereço do LP Builder (unumpeople.app)
// e o do Portal do Cliente.
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

// As páginas de produto do configurador: o blog (plano Presença) e o CRM
// (plano Captação). Cada uma abre com o card do seu plano.
export function lpBlog(): string {
  return `${LP_BUILDER_URL}/blog`;
}

export function lpCrm(): string {
  return `${LP_BUILDER_URL}/crm`;
}

// "Entrar" leva ao Portal do Cliente, a porta de entrada de todos os produtos
// (de lá a pessoa abre o CRM, o blog e as páginas). Mesmo cuidado: só env ou padrão.
const PORTAL_PADRAO = 'https://customer.unumpeople.com.br';

export const PORTAL_URL: string = (
  process.env.NEXT_PUBLIC_PORTAL_URL || PORTAL_PADRAO
).replace(/\/+$/, '');

export function portalEntrar(): string {
  return PORTAL_URL;
}
