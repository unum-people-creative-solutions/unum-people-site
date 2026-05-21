# Feature Spec: CRM Lead Ingestion Integration

## Overview
Integração do site com o CRM Unum People para captura automática de leads e rastreamento de conversões (Google Ads/UTMs).

## Requirements

### R1: Tracking System
- [ ] **R1.1**: Capturar parâmetros da URL (`gclid`, `fbclid`, `msclkid`, `utm_source`, `utm_medium`, `utm_campaign`) no carregamento da página.
- [ ] **R1.2**: Persistir os parâmetros capturados no `sessionStorage` para garantir atribuição em navegações internas.
- [ ] **R1.3**: Implementar utilitário para recuperar esses dados no momento da conversão.

### R2: Lead Ingestion API
- [ ] **R2.1**: Implementar serviço de integração com o endpoint definido via variável de ambiente.
- [ ] **R2.2**: Utilizar o método `POST` com os cabeçalhos `Content-Type: application/json` e `X-API-Key`.
- [ ] **R2.3**: Configurar a `NEXT_PUBLIC_API_URL` e `NEXT_PUBLIC_API_KEY` via variáveis de ambiente.

### R3: LeadModal Integration
- [x] **R3.1**: Coletar os campos `nome`, `telefone` e `email` do formulário.
- [ ] **R3.2**: Implementar validação e formatação utilizando **React Hook Form** e **Zod**.
- [ ] **R3.3**: Garantir máscara de telefone para o padrão brasileiro.
- [ ] **R3.4**: Mesclar os dados do formulário com os dados de rastreamento (R1) e a origem (hostname).
- [ ] **R3.5**: Realizar a chamada à API antes de redirecionar para o WhatsApp.
- [ ] **R3.6**: Lidar com estados de carregamento e erros da API.

### R4: Testing & Validation
- [ ] **R4.1**: Teste unitário para o sistema de tracking (persistência e recuperação).
- [ ] **R4.2**: Teste de integração para o `LeadModal` validando a chamada da API (Mock).

## Constraints
- **Segurança**: Nunca expor a API Key diretamente no código (usar env).
- **Tracking**: Obrigatório o uso de `sessionStorage` conforme `rules.md`.
- **Acessibilidade**: Manter conformidade WCAG nos formulários.
- **Protocolo**: Seguir o `@landing-page-ingestion-guide.md`.
