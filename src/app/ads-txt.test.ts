import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, it, expect } from 'vitest';

// O AdSense só aceita o domínio raiz como site e lê o ads.txt daqui, inclusive
// para os anúncios de tools.unumpeople.com.br. A conta é a da empresa (pessoa
// jurídica), criada em 2026-10-15 no lugar da conta de pessoa física.
describe('ads.txt', () => {
  it('autoriza só a conta do AdSense da empresa', () => {
    const adsTxt = readFileSync(path.resolve(__dirname, '../../public/ads.txt'), 'utf-8');
    expect(adsTxt.trim().split('\n')).toEqual(['google.com, pub-6348382549206741, DIRECT, f08c47fec0942fa0']);
  });
});
