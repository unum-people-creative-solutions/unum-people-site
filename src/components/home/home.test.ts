import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// spec: unum-people-docs/spec/features/unum-people-site/home-a-ponte/spec.md
// Lê o código-fonte: o jsdom não roda CSS nem animação, e o Vitest mocka o
// framer-motion. O Vitest roda a partir da raiz do repositório.
const RAIZ = process.cwd();
const HOME = join(RAIZ, 'src/components/home');
const ler = (caminho: string) => readFileSync(caminho, 'utf8');

const COMPONENTES = ['Hero.tsx', 'OVao.tsx', 'ComoFunciona.tsx', 'PonteInvisivel.tsx'].map((nome) => join(HOME, nome));
const ARQUIVOS_DA_HOME = [...COMPONENTES, join(RAIZ, 'src/app/page.tsx')];

/** Conteúdo entre as chaves do primeiro bloco que começa em `inicio`. */
function bloco(css: string, inicio: string): string {
  const abre = css.indexOf('{', css.indexOf(inicio));
  if (css.indexOf(inicio) === -1 || abre === -1) return '';
  let nivel = 0;
  for (let i = abre; i < css.length; i++) {
    if (css[i] === '{') nivel++;
    if (css[i] === '}') nivel--;
    if (nivel === 0) return css.slice(abre + 1, i);
  }
  return '';
}

/** Declarações das regras cujo seletor contém `classe`, dentro de `css`. */
function regras(css: string, classe: string): string {
  const achadas: string[] = [];
  const re = /([^{}]+)\{([^{}]*)\}/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(css))) {
    if (m[1].includes(`.${classe}`)) achadas.push(m[2]);
  }
  return achadas.join('\n');
}

describe('Home "A ponte" — fronteira servidor (RNF-03, T10)', () => {
  it.each(ARQUIVOS_DA_HOME)('%s existe, não declara use client e não importa framer-motion', (caminho) => {
    expect(existsSync(caminho)).toBe(true);
    const texto = ler(caminho);
    // Flag m: a diretiva vale também depois de um comentário no topo.
    expect(texto).not.toMatch(/^\s*(['"])use client\1/m);
    expect(texto).not.toMatch(/['"]framer-motion(\/[^'"]*)?['"]/);
  });
});

describe('Home "A ponte" — máscara e movimento (RNF-01, T10)', () => {
  const css = existsSync(join(HOME, 'home.module.css')) ? ler(join(HOME, 'home.module.css')) : '';

  it('o CSS usa a máscara da ponte, e o arquivo existe em public/images', () => {
    expect(css).toContain('/images/ponte-alpha.webp');
    expect(existsSync(join(RAIZ, 'public/images/ponte-alpha.webp'))).toBe(true);
  });

  it('varredura, aviso e "invisível" animam no mesmo ciclo de 9 s, com keyframes que existem', () => {
    for (const [classe, nome] of [['varredura', 'atravessa'], ['contato', 'chega'], ['invisivel', 'revela']]) {
      expect(regras(css, classe), `.${classe} sem animação de 9s`).toMatch(new RegExp(`animation:\\s*${nome}\\s+9s`));
      expect(bloco(css, `@keyframes ${nome}`), `@keyframes ${nome} ausente`).not.toBe('');
    }
  });

  it('com movimento reduzido, a varredura some, o aviso fica fixo e "invisível" fica preenchida', () => {
    const reduzido = bloco(css, 'prefers-reduced-motion: reduce');
    expect(reduzido).not.toBe('');
    expect(regras(reduzido, 'varredura')).toMatch(/display:\s*none/);
    expect(regras(reduzido, 'contato')).toMatch(/animation:\s*none/);
    expect(regras(reduzido, 'contato')).toMatch(/opacity:\s*1/);
    expect(regras(reduzido, 'invisivel')).toMatch(/animation:\s*none/);
    // "invisível" deixa de ser só contorno: preenchida inteira, sem traço.
    expect(regras(reduzido, 'invisivel')).toMatch(/background-size:\s*100% 100%/);
    expect(regras(reduzido, 'invisivel')).toMatch(/background-position:\s*0 0/);
    expect(regras(reduzido, 'invisivel')).toMatch(/-webkit-text-stroke:\s*0/);
    // A ponte fica acesa, parada: a camada base sobe de opacidade.
    expect(regras(reduzido, 'base')).toMatch(/opacity:\s*\.55/);
  });

  it('o anel de foco tem contraste de 3:1 nas seções claras (WCAG 1.4.11)', () => {
    expect(regras(css, 'home a:focus-visible')).toMatch(/outline:\s*3px solid var\(--azul\)/);
    // Nas seções escuras o anel continua claro.
    expect(regras(css, 'hero a:focus-visible')).toMatch(/#7D96FF/i);
    expect(regras(css, 'noite a:focus-visible')).toMatch(/#7D96FF/i);
  });
});

describe('Home "A ponte" — limpeza (RF-06, T11)', () => {
  it.each([
    'src/components/LogoCloud.tsx',
    'src/components/home/ComecarDeTresJeitos.tsx',
    'src/components/home/Acreditamos.tsx',
    'src/components/home/FinalCTABanner.tsx',
    'public/images/bridge-mask.webp',
  ])('%s não existe mais', (caminho) => {
    expect(existsSync(join(RAIZ, caminho))).toBe(false);
  });

  it('next.config.ts não libera mais o microlink', () => {
    expect(ler(join(RAIZ, 'next.config.ts'))).not.toContain('microlink');
  });
});

describe('Home "A ponte" — fonte (RF-07, T12)', () => {
  it('a Poppins carrega os pesos 500 e 800, usados no título e nos destaques', () => {
    const layout = ler(join(RAIZ, 'src/app/layout.tsx'));
    const pesos = layout.match(/weight:\s*\[([^\]]*)\]/)?.[1] ?? '';
    expect(pesos).toMatch(/["']500["']/);
    expect(pesos).toMatch(/["']800["']/);
  });
});
