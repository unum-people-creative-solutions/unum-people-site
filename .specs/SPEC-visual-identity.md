# Especificação e Backlog (Phase 4): Atualização da Identidade Visual

| Campo | Valor |
| --- | --- |
| Documento | `SPEC-visual-identity.md` |
| Base | `TECH-DESIGN-visual-identity.md` |
| Status | Proposed |
| Data | 2026-06-02 |

## 1. Visão Geral
Este documento traduz as diretrizes do Tech Design Doc em um backlog técnico acionável focado em testes automatizados (TDD-First) que guiarão a Fase 5 (Execution). Nenhuma alteração no código de produção será feita antes que os testes falhem.

## 2. Backlog de Tarefas e Critérios de Aceite (Testes)

### Task 1: Substituição de Logos (Assets e Rotas)
- **Objetivo:** Adicionar os novos logos e garantir que componentes globais (`Header`, `Footer`) os renderizem corretamente com descrições semânticas.
- **Plano de Teste (QA Agent):**
  - Escrever/atualizar teste para `Header.tsx` verificando se as imagens presentes possuem as rotas `/images/logo_simbolo.png` e `/images/logo_texto.png` e possuem os `alt` attributes adequados (verificando presença na DOM).
  - Escrever/atualizar teste para `Footer.tsx` garantindo a presença do `/images/logo_texto.png`.
- **Handoff (Executor):**
  - Mover imagens da pasta `@identity/` local para `public/images/`.
  - Remover imagens obsoletas.
  - Atualizar metadados OpenGraph (`layout.tsx`) para usar a logo oficial.
  - Atualizar os caminhos nos componentes `Header` e `Footer`.

### Task 2: Migração Tipográfica (Geist -> Poppins)
- **Objetivo:** Remover a fonte provisória e integrar as fontes aprovadas no Tech Design Doc.
- **Plano de Teste (QA Agent):**
  - Como fontes são injetadas em SSR/CSS global, o teste automatizado em JS pode validar (via inspeção de estilos computados ou simples asserção na presença de classnames CSS criados pelas fontes) se o componente `body` em `layout.tsx` (ou o próprio `layout` quando renderizado) aplica a variável `--font-poppins`.
- **Handoff (Executor):**
  - Substituir importação de `next/font/google` no `layout.tsx`.
  - Substituir `--font-geist-sans` por `--font-poppins` no `globals.css` e limpar dependências residuais.

### Task 3: Tokens de Cores Tailwind v4
- **Objetivo:** Implementar o novo "Dinamismo Cromático".
- **Plano de Teste (QA Agent):**
  - Criar um teste E2E rápido ou teste de snapshot que renderize a página principal para verificar se as variáveis (`--color-brand-blue`, `--bg-gradient-brand`, etc.) estão declaradas na `:root`. Alternativamente, verificar propriedades estáticas na montagem do projeto.
- **Handoff (Executor):**
  - Atualizar `globals.css` e propriedades do `@theme`.
  - Percorrer componentes alterando as classes legadas (`text-brand-dark`, `bg-brand-soft`, etc) paras as novas (`text-brand-blue`, `bg-brand-purple`, `bg-support-grey`, etc).

### Task 4: Atualização de Posicionamento e Copywriting P2P
- **Objetivo:** Refletir o novo manifesto da marca na página principal e metadados.
- **Plano de Teste (QA Agent):**
  - Teste `page.test.tsx`: Garantir via `getByText` e regex que o slogan "A tecnologia é a ponte invisível" (ou variações do manifesto) esteja renderizado na Hero Section.
  - Teste `Footer.test.tsx`: Garantir via `getByText` que o disclaimer "© 2026 Unum People - Creative Solutions. Todos os direitos reservados." esteja exato.
- **Handoff (Executor):**
  - Aplicar as modificações textuais na Hero Section.
  - Atualizar o Footer.
  - Atualizar a `description` da Metadata no `layout.tsx`.

## 3. Protocolo de Transição (Fase 5)
1. O agente de QA inicializa a Fase 5.
2. O QA implementa os testes das Tarefas 1 e 4 (por serem mais unitárias com React Testing Library) e garante que quebrem (**RED**).
3. O Executor assume e resolve as falhas do código de produção, incluindo as alterações globais (Tarefas 2 e 3).
4. O Auditor finaliza com uma rodada de checagem.
