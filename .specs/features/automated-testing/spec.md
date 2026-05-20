# Feature Spec: Automated Testing Infrastructure

## Overview
Implementação da infraestrutura de testes automatizados e plano de testes para garantir a qualidade, acessibilidade e integridade dos fluxos críticos do site Unum People.

## Requirements

### R1: Infrastructure Setup
- [ ] **R1.1**: Instalar e configurar **Vitest** como runner de testes unitários e de integração.
- [ ] **R1.2**: Instalar e configurar **React Testing Library (RTL)** para testes de componentes.
- [ ] **R1.3**: Instalar e configurar **Playwright** para testes End-to-End (E2E).
- [ ] **R1.4**: Configurar mocks necessários (ex: `next/navigation`, `framer-motion`).

### R2: Component Testing (Unit/Integration)
- [ ] **R2.1**: **LeadModal**: Testar abertura, preenchimento de formulário, validação e submissão.
- [ ] **R2.2**: **Navigation**: Testar links do Header e Footer.
- [ ] **R2.3**: **PricingTable**: Testar se os preços e links de WhatsApp estão corretos conforme o pacote.

### R3: E2E Testing (Critical Paths)
- [ ] **R3.1**: **Conversion Flow**: Home -> Landing Page -> Seleção de Pacote -> LeadModal -> Redirecionamento WhatsApp.
- [ ] **R3.2**: **Responsive Check**: Verificar se os fluxos críticos funcionam em Mobile e Desktop.

### R4: Accessibility (A11y)
- [ ] **R4.1**: **Semantics**: Garantir uso correto de ARIA labels e roles.
- [ ] **R4.2**: **Keyboard Navigation**: Testar se o site é navegável via teclado (especialmente o Modal).
- [ ] **R4.3**: **Automated A11y**: Integrar `vitest-axe` ou similar para checks automáticos.

## Constraints
- **Proibido**: Assertivas baseadas em classes CSS (Tailwind).
- **Obrigatório**: Uso de `getByRole`, `getByLabelText` e `getByText` (padrão RTL/A11y).
- **Performance**: Testes devem ser rápidos e isolados.
- **Mocks**: Evitar excesso de mocks; preferir testar o comportamento real do componente.
