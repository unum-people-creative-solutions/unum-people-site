# Tasks: CRM Lead Ingestion Integration

## Phase 1: Core Utilities

- [x] **T1.1: Create Tracking Utility**
  - **Action**: Criar `src/lib/tracking.ts` com funções para capturar parâmetros da URL e salvar/recuperar do `sessionStorage`.
  - **Verification**: Teste unitário passando.
  - **Gate**: N/A.

- [x] **T1.2: Create CRM API Service**
  - **Action**: Criar `src/lib/crm.ts` para encapsular a chamada `POST /ingest`.
  - **Verification**: N/A.
  - **Gate**: N/A.

- [x] **T1.3: Setup Environment Variables**
  - **Action**: Configurar `NEXT_PUBLIC_API_URL` e `NEXT_PUBLIC_API_KEY` no `.env.local`.
  - **Verification**: Variáveis acessíveis no código.
  - **Gate**: N/A.

## Phase 2: Global Implementation

- [x] **T2.1: Initialize Tracking in Layout**
  - **Action**: Adicionar componente ou hook no `src/app/layout.tsx` para rodar o tracking em todas as páginas.
  - **Verification**: Verificar `sessionStorage` no console do navegador após carregar página com UTMs.
  - **Gate**: N/A.

## Phase 3: Component Integration

- [x] **T3.1: Install Form and Validation Libraries**
  - **Action**: Instalar `react-hook-form`, `zod`, `@hookform/resolvers`.
  - **Verification**: `npm list` mostra as libs.
  - **Gate**: N/A.

- [x] **T3.2: Refactor LeadModal with Form Validation**
  - **Action**: Implementar esquema Zod, adicionar campo de email e aplicar máscara no telefone.
  - **Verification**: Testes de unidade passando e validando erros de formulário.
  - **Gate**: `npm run test`.

## Phase 4: Finalization

- [x] **T4.1: Final Validation**
  - **Action**: Revisar conformidade com o guia de ingestão e regras de engenharia.
  - **Verification**: Todos os testes passando.
  - **Gate**: `npm run test`.
