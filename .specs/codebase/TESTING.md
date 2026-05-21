# Testing Conventions - Unum People Sites

## Overview
Adotamos uma pirâmide de testes focada em comportamento e acessibilidade, garantindo que os fluxos de conversão (nosso maior ativo) sejam resilientes a mudanças.

## Test Types

### 1. Unit & Integration (Vitest + RTL)
- **Localização**: `src/**/*.test.tsx` ou `src/**/*.spec.tsx`.
- **Foco**: Lógica de componentes, hooks e utilitários.
- **Regra de Ouro**: Teste o que o usuário vê e interage, não os detalhes de implementação.
- **Acessibilidade**: Sempre use queries de acessibilidade (`getByRole`, etc.).

### 2. End-to-End (Playwright)
- **Localização**: `tests/e2e/**/*.spec.ts`.
- **Foco**: Fluxos críticos que atravessam múltiplas páginas ou dependem de navegação complexa.
- **Cenário Principal**: `LeadModal` -> Redirecionamento WhatsApp.

## Tooling Stack
- **Runner**: Vitest
- **DOM Testing**: React Testing Library
- **E2E**: Playwright
- **A11y**: vitest-axe
- **Mocks**: MSW (se necessário para APIs futuras)

## Best Practices
- **No CSS Selectors**: Nunca use classes Tailwind para encontrar elementos. Use roles ARIA ou texto.
- **Atomic Commits**: Testes devem acompanhar a implementação da feature.
- **Descriptive Naming**: `should redirect to WhatsApp with custom message when package X is selected`.
- **Arrange-Act-Assert**: Mantenha a estrutura clara nos blocos de teste.
