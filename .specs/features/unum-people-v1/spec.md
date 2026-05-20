# Feature Spec: Unum People V1 Implementation

## Overview
Implementação do site institucional e da Landing Page de serviços conforme definido no TDD.md.

## Requirements

### R1: Design Tokens & Styling
- [ ] **R1.1**: Configurar tokens de design (paleta de cores Unum e tipografia) no `tailwind.config.ts`.
- [ ] **R1.2**: Garantir que todos os componentes sigam a estética "ultra-minimalista" e "vanguardista".

### R2: Institutional Site Sections
- [ ] **R2.1**: **Hero Section**: Mensagem de valor humanizada sobre conexões.
- [ ] **R2.2**: **Manifesto**: Texto sobre a visão do fundador.
- [ ] **R2.3**: **Ecosystem**: Apresentação dos pilares (Sites, Tools, Unum People CRM).
- [ ] **R2.4**: **Unum People CRM Technical Highlight**: Destaque para App Android e integração com Ads.

### R3: Services Landing Page (LP)
- [ ] **R3.1**: **Pricing Table**: Tabela comparativa com os 3 pacotes (Básico, Intermediário, Avançado).
- [ ] **R3.2**: **Package Details**: Descrição clara de cada oferta e ativação.
- [ ] **R3.3**: **Lead Conversion Flow**: Implementar `LeadModal` antes do redirecionamento para o WhatsApp.
- [ ] **R3.4**: **WhatsApp Personalization**: Mensagens customizadas por pacote.

### R4: Technical & SEO
- [ ] **R4.1**: **SEO & Metadata**: Atualizar metadados para todas as páginas.
- [ ] **R4.2**: **Structured Data**: Adicionar JSON-LD `ProfessionalService`.
- [ ] **R4.3**: **Mobile-First**: Garantir performance e usabilidade em dispositivos móveis.

## Constraints
- Seguir as regras de engenharia da Unum People (Segurança, Tracking, Performance).
- Usar `next/image` e `next/font`.
- Manter o código idiomático e limpo.
