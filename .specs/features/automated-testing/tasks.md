# Tasks: Automated Testing Infrastructure

## Phase 1: Infrastructure Setup

- [x] **T1.1: Install Core Dependencies**
  - **Action**: Instalar vitest, @testing-library/react, @testing-library/jest-dom, jsdom, vitest-axe, @types/react, @types/react-dom.
  - **Verification**: `npm list vitest` deve mostrar a versão instalada.
  - **Gate**: N/A.

- [x] **T1.2: Configure Vitest**
  - **Action**: Criar `vitest.config.ts` e `src/test/setup.ts`.
  - **Verification**: Rodar `npx vitest --run` (deve passar mesmo sem testes).
  - **Gate**: `npx vitest --run`.

- [x] **T1.3: Configure Playwright**
  - **Action**: Instalar `@playwright/test` e rodar `npx playwright install --with-deps`. Criar `playwright.config.ts`.
  - **Verification**: `npx playwright --version`.
  - **Gate**: N/A.

## Phase 2: Component Testing (Unit/Integration)

- [x] **T2.1: Test LeadModal Component**
  - **Action**: Criar `src/components/LeadModal.test.tsx`. Testar renderização, campos obrigatórios e submissão.
  - **Verification**: `npx vitest LeadModal.test.tsx`.
  - **Gate**: Teste passando.

- [x] **T2.2: Test Header Navigation**
  - **Action**: Criar `src/components/Header.test.tsx`. Testar links de navegação.
  - **Verification**: `npx vitest Header.test.tsx`.
  - **Gate**: Teste passando.

## Phase 3: E2E Testing

- [x] **T3.1: Test Conversion Flow**
  - **Action**: Criar `tests/e2e/conversion.spec.ts`. Simular fluxo completo até o WhatsApp.
  - **Verification**: `npx playwright test`.
  - **Gate**: Teste passando.

## Phase 4: Finalization

- [x] **T4.1: Update package.json scripts**
  - **Action**: Adicionar `test`, `test:watch`, `test:e2e` scripts.
  - **Verification**: `npm run test` funciona.
  - **Gate**: N/A.
