import { describe, it, expect } from 'vitest';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

// Guarda do lançamento: o site principal não fala mais de serviços que a Unum
// não oferece, não escreve preço e não linka para a página removida.
// O Vitest roda a partir da raiz do repositório.
const RAIZ_SRC = join(process.cwd(), 'src');

const EXTENSOES = ['.ts', '.tsx', '.css', '.md', '.json'];

function listar(dir: string): string[] {
  return readdirSync(dir).flatMap((nome) => {
    const caminho = join(dir, nome);
    if (statSync(caminho).isDirectory()) return listar(caminho);
    return EXTENSOES.some((ext) => nome.endsWith(ext)) ? [caminho] : [];
  });
}

const arquivos = listar(RAIZ_SRC).map((caminho) => ({
  caminho,
  relativo: relative(RAIZ_SRC, caminho).split(sep).join('/'),
  texto: readFileSync(caminho, 'utf8'),
}));

const ehTeste = (relativo: string) => /\.test\.(ts|tsx)$/.test(relativo);

// Onde a marca ainda pode falar da "ponte invisível" e da "Jornada".
const EXCECOES_DA_MARCA = [
  'app/sobre/',
  'components/BrandValues.tsx',
  'components/home/ManifestoSection.tsx',
  // Manifesto da home "A ponte": a frase do manual fecha a história da página.
  'components/home/PonteInvisivel.tsx',
];
const ehExcecaoDaMarca = (relativo: string) => EXCECOES_DA_MARCA.some((e) => relativo.startsWith(e) || relativo === e);

const PROIBIDOS = [
  'gestão de tráfego',
  'android',
  'alta performance',
  'começar jornada',
  'mais popular',
  'google ads',
  'ponte invisível',
];

describe('texto proibido no lançamento', () => {
  it('varre os arquivos de src/ (o varredor enxerga o código de produção)', () => {
    const producao = arquivos.filter((a) => !ehTeste(a.relativo));
    expect(producao.length).toBeGreaterThan(20);
    expect(producao.map((a) => a.relativo)).toContain('components/Footer.tsx');
  });

  PROIBIDOS.forEach((expressao) => {
    it(`nenhum arquivo de produção (fora de /sobre e da marca) contém "${expressao}"`, () => {
      const culpados = arquivos
        .filter((a) => !ehTeste(a.relativo) && !ehExcecaoDaMarca(a.relativo))
        .filter((a) => a.texto.toLowerCase().includes(expressao))
        .map((a) => a.relativo);
      expect(culpados).toEqual([]);
    });
  });

  it('nenhum arquivo contém R$ seguido de dígito', () => {
    const culpados = arquivos.filter((a) => /R\$\s*\d/.test(a.texto)).map((a) => a.relativo);
    expect(culpados).toEqual([]);
  });

  it('nenhum arquivo de produção promete "sem taxa de ativação"', () => {
    const culpados = arquivos
      .filter((a) => !ehTeste(a.relativo))
      .filter((a) => /sem taxa/i.test(a.texto))
      .map((a) => a.relativo);
    expect(culpados).toEqual([]);
  });

  it('nenhum arquivo de produção linka para /servicos (a página foi removida)', () => {
    const culpados = arquivos
      .filter((a) => !ehTeste(a.relativo))
      .filter((a) => a.texto.includes('/servicos'))
      .map((a) => a.relativo);
    expect(culpados).toEqual([]);
  });
});

describe('links para o LP Builder', () => {
  // RF-01: o endereço do LP Builder vive num módulo só. Um link escrito à mão
  // (no Header, no redirecionamento, em qualquer componente) divergiria da env
  // NEXT_PUBLIC_LP_BUILDER_URL sem ninguém notar.
  it('nenhum arquivo de produção, fora de lib/links.ts, escreve o endereço do LP Builder', () => {
    const culpados = arquivos
      .filter((a) => !ehTeste(a.relativo) && a.relativo !== 'lib/links.ts')
      .filter((a) => a.texto.includes('unumpeople.app'))
      .map((a) => a.relativo);
    expect(culpados).toEqual([]);
  });

  it('next.config.ts não escreve o endereço do LP Builder (usa lib/links)', () => {
    const texto = readFileSync(join(process.cwd(), 'next.config.ts'), 'utf8');
    expect(texto).not.toContain('unumpeople.app');
  });
});

describe('páginas legais intactas', () => {
  it('termos, privacidade e contato continuam existindo', () => {
    expect(existsSync(join(RAIZ_SRC, 'app/termos/[termId]/[version]/page.tsx'))).toBe(true);
    expect(existsSync(join(RAIZ_SRC, 'app/privacidade/page.tsx'))).toBe(true);
    expect(existsSync(join(RAIZ_SRC, 'app/contato/page.tsx'))).toBe(true);
  });
});
