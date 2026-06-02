# Tech Design Doc: Integração de Valores da Marca (Unum People)

| Campo | Valor |
| --- | --- |
| Documento | `TECH-DESIGN-brand-values.md` |
| Status | Proposed |
| Data | 2026-06-02 |
| Tech Lead | Gemini CLI (Branding Expert) |
| Base de Referência | `@identity/brand_manual.md` (Seção 02. Valores da Marca) |

## 1. Objetivo
Tangibilizar os 5 pilares fundamentais da marca Unum People (Unidade, Conexão, Relacionamento, Jornada e Transformação) através da arquitetura de UI, experiência (UX) e copywriting no site institucional, consolidando o posicionamento P2P (People to People).

## 2. Escopo Arquitetural

### 2.1 Nova Seção: Componente `BrandValues`
- **Responsabilidade:** Renderizar um grid apresentando os 5 valores da marca na Home Page (`page.tsx`), logo após a seção "Ecossistema".
- **Localização Física:** `src/components/BrandValues.tsx`
- **Mapeamento de Ícones (`lucide-react`) & Copy:**
  1. **Unidade:** `Layers` (Representando convergência e ecossistema indivisível).
  2. **Conexão:** `Link` ou `Cable` (Representando pontes autênticas).
  3. **Relacionamento:** `Heart` ou `Users` (Pessoas antes de transações).
  4. **Jornada:** `Route` ou `Map` (Caminhar lado a lado, evolução).
  5. **Transformação:** `Sparkles` ou `Sprout` (Renovação, gerar frutos).
- **Design de Componente:**
  - Layout em Grid responsivo (ex: 1 coluna no mobile, 3 colunas no desktop, com a última linha centralizada ou distribuída de forma fluida).
  - Cards minimalistas (fundo `bg-white`, bordas leves) utilizando o dinamismo cromático nos ícones ou nos títulos (texto com a classe `bg-clip-text text-transparent bg-[linear-gradient(...)]`).

### 2.2 Reestruturação Semântica: Página de Serviços (`servicos/page.tsx`)
- **Responsabilidade:** Modificar a linguagem transacional para linguagem relacional (P2P).
- **Alterações de Copy (UX Writing):**
  - **Título da Tabela de Preços:** Substituir de nomenclaturas como "Planos/Preços" para "Escolha como iniciaremos sua Jornada".
  - **Cards (Intermediário e Avançado):** Os descritivos devem reforçar o "acompanhamento".
  - **CTAs Internos:** Componentes que chamam para ação no site não devem usar "Comprar" ou "Contratar", mas sim verbos de aproximação: "Começar Jornada", "Agendar Diagnóstico" ou "Falar com Consultor".

### 2.3 Refinamento: Ecossistema (`page.tsx`)
- **Responsabilidade:** Vincular os produtos aos valores de Unidade e Conexão.
- **Alterações de Copy:**
  - O texto introdutório da seção `O Ecossistema Unum People` deve ser atualizado para afirmar explicitamente que a integração destas três ferramentas é o que garante a "Unidade" e a verdadeira "Conexão" com o lead.

### 2.4 Banner de Transformação (Call to Action Final)
- **Responsabilidade:** O último toque antes do rodapé deve apelar para a Transformação.
- **Localização:** Criar ou adaptar a seção final da Home Page (antes do Footer) para atuar como o ápice da jornada.
- **Copy:** "Pronto para gerar frutos reais? Vamos transformar a realidade do seu negócio juntos."
- **Implementação:** Componente `Section` na `page.tsx` contendo o fundo com o gradiente da marca (`--bg-gradient-brand`) e tipografia branca/negativa.

## 3. Impacto Operacional e Testabilidade

**Riscos de Regressão:**
- A inserção da nova seção `BrandValues` no layout da Home pode afetar o espaçamento e a hierarquia visual.
- A responsividade do grid de 5 itens pode quebrar em resoluções intermediárias (tablets) se não for bem parametrizada via Flex/Grid.

**Plano de Qualidade (Fase 4 - TDD First):**
- Testes unitários para `BrandValues.tsx` garantindo a renderização dos 5 títulos exatos presentes no manual.
- Testes E2E/Integração na `page.tsx` para assegurar que a nova seção foi montada e está entre o Ecossistema e o Footer.
- Atualização dos testes da página de `servicos` para asserir os novos headings de "Jornada".

## 4. Considerações Finais
Esta etapa exige forte aderência aos padrões do Tailwind v4 já configurados e o reuso do componente abstrato `<Section>` criado previamente no repositório. O design P2P repudia agressividade comercial, favorecendo a elegância institucional.
