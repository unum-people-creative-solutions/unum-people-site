# Especificação e Backlog (Phase 4): Valores da Marca

| Campo | Valor |
| --- | --- |
| Documento | `SPEC-brand-values.md` |
| Base | `TECH-DESIGN-brand-values.md` |
| Status | Proposed |
| Data | 2026-06-02 |

## 1. Visão Geral
Este documento define o backlog técnico focado em testes automatizados (TDD-First/Red-First) para implementar a tangibilização dos Valores da Marca (Unidade, Conexão, Relacionamento, Jornada e Transformação) no site.

## 2. Backlog de Tarefas e Critérios de Aceite (Testes)

### Task 1: Criação do Componente `BrandValues`
- **Objetivo:** Criar e integrar um novo componente React na Home Page contendo os 5 valores da marca.
- **Plano de Teste (QA Agent):**
  - Criar `BrandValues.test.tsx`.
  - Asserir via `getByText` a presença exata das palavras: "Unidade", "Conexão", "Relacionamento", "Jornada" e "Transformação".
  - Asserir a presença do título da seção (ex: "Princípios Norteadores" ou similar).
  - Atualizar `page.test.tsx` para confirmar que o componente `BrandValues` está sendo renderizado dentro da Home Page.
- **Handoff (Executor):**
  - Desenvolver o componente visualmente usando Grid layout e ícones do `lucide-react`.
  - Integrar em `page.tsx` logo após a seção "Ecossistema".

### Task 2: Atualização de UX Writing na Página de Serviços
- **Objetivo:** Trocar a semântica transacional ("Preços") para relacional ("Jornada").
- **Plano de Teste (QA Agent):**
  - Se houver testes para a página de serviços, ou criar um novo arquivo `servicos.test.tsx`.
  - Asserir via `getByText` ou `getByRole('heading')` a nova frase âncora: "Escolha como iniciaremos sua Jornada".
  - Asserir que botões ou links que continham linguagens puramente transacionais agora refletem verbos de aproximação (ex: "Começar Jornada").
- **Handoff (Executor):**
  - Editar `src/app/servicos/page.tsx` alterando os copys da seção de Preços para a nova abordagem P2P.

### Task 3: Refinamento do Ecossistema na Home Page
- **Objetivo:** Amarrar os textos do Ecossistema aos valores de "Unidade" e "Conexão".
- **Plano de Teste (QA Agent):**
  - Atualizar `page.test.tsx` para buscar a presença do termo "convergência" ou "único ecossistema indivisível" na seção do Ecossistema.
- **Handoff (Executor):**
  - Modificar o subtítulo e parágrafos da seção "O Ecossistema Unum People" no arquivo `page.tsx`.

### Task 4: Banner Final "Transformação"
- **Objetivo:** Adicionar a seção de encerramento emocional antes do rodapé na Home Page.
- **Plano de Teste (QA Agent):**
  - Atualizar `page.test.tsx` garantindo a presença do texto "Pronto para gerar frutos reais?" (Call to Action de Transformação).
- **Handoff (Executor):**
  - Adicionar um bloco `<Section>` no final de `page.tsx` com o fundo `bg-gradient-brand` e tipografia contrastante apelando para a Transformação do negócio.

## 3. Protocolo de Transição (Fase 5)
1. Agente QA inicializa a Fase 5.
2. QA escreve todos os testes descritos acima e assegura o estado **RED** (falhas devido à não implementação).
3. Agente Executor assume e implementa o componente `BrandValues`, os ajustes de Copy e o Banner de Transformação, buscando o estado **GREEN**.
4. Agente Auditor inspeciona o resultado final e a hierarquia CSS criada.
