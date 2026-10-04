import { describe, it, expect } from 'vitest';
import { EMPRESA } from './empresa';

describe('EMPRESA', () => {
  it('traz a identificação da empresa que o rodapé exibe', () => {
    expect(EMPRESA).toEqual({
      razaoSocial: 'Unum People Creative Solutions Ltda.',
      cnpj: '67.294.461/0001-95',
      endereco: 'Rua Bom Jesus, nº 212, 19º andar, sala 1904, Juvevê, Curitiba - PR',
      email: 'atendimento@unumpeople.com.br',
    });
  });
});
