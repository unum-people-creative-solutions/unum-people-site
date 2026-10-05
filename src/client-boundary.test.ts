import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

// framer-motion só roda em client component. Os testes mockam a biblioteca, então
// um componente que a importa sem 'use client' passa no Vitest e derruba a página
// (500) quando um Server Component o renderiza. Esta guarda lê o código-fonte.
const RAIZ_SRC = join(process.cwd(), 'src');

function listar(dir: string): string[] {
  return readdirSync(dir).flatMap((nome) => {
    const caminho = join(dir, nome);
    if (statSync(caminho).isDirectory()) return listar(caminho);
    return /\.tsx?$/.test(nome) && !/\.test\.tsx?$/.test(nome) ? [caminho] : [];
  });
}

describe('fronteira cliente/servidor', () => {
  it('todo arquivo que importa framer-motion declara use client', () => {
    const usam = listar(RAIZ_SRC).filter((c) => /from ['"]framer-motion['"]/.test(readFileSync(c, 'utf8')));
    expect(usam.length).toBeGreaterThan(0);

    const semDiretiva = usam
      .filter((c) => !/^\s*(['"])use client\1/.test(readFileSync(c, 'utf8')))
      .map((c) => relative(RAIZ_SRC, c).split(sep).join('/'));
    expect(semDiretiva).toEqual([]);
  });
});
