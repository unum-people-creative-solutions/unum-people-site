# TDD - Site Institucional e Landing Page de Serviços Unum People

| Campo           | Valor                        |
| --------------- | ---------------------------- |
| Tech Lead       | @Gemini-CLI                  |
| Produto         | Unum People Sites            |
| Status          | Approved                     |
| Criado          | 2026-05-20                   |
| Última Atualização | 2026-05-20                   |

## 1. Contexto

A Unum People Creative Solutions é uma empresa focada em conectar e aproximar pessoas. Acreditamos que as verdadeiras oportunidades surgem através de conexões genuínas. Este projeto visa a criação do site institucional (`unumpeople.com.br`) e de uma Landing Page de serviços de alta performance.

**Visão Estratégica**: A tecnologia deve servir como uma ponte humanizada. Nossas ferramentas (Sites, Unum People CRM e Gestão de Tráfego) são desenhadas para reduzir a distância entre empresas e seus clientes ideais, proporcionando agilidade e proximidade no atendimento.

## 2. Definição do Problema e Motivação

### Problemas Resolvidos
- **Fragmentação de Leads**: Muitas empresas perdem leads por falta de uma centralização eficiente (Unum People CRM).
- **Distanciamento do Cliente**: A demora no atendimento esfria as conexões humanas.
- **Atribuição Ineficiente**: Dificuldade em conectar o fechamento de vendas à performance dos anúncios (Google Ads).

### Motivação
Estabelecer uma presença digital sólida que não apenas venda serviços, mas que demonstre na prática a eficiência do ecossistema Unum People (Site + Unum People CRM + Ads).

## 3. Escopo

### ✅ In Scope (V1)
- **Site Institucional**: Apresentação da marca, visão do fundador e hub de acesso para Unum People CRM e Ferramentas.
- **Landing Page de Serviços**: Focada em conversão consultiva dos 3 pacotes comerciais.
- **Integração de Preços**: Tabela comparativa com Pacote Básico, Intermediário e Avançado.
- **Estratégia de CTAs**: Botões direcionando para o WhatsApp de vendas com mensagens personalizadas.
- **Seção Unum People CRM**: Destaque para o App Android e retroalimentação do Google Ads.

### ❌ Out of Scope
- Desenvolvimento do backend do Unum People CRM (já existente).
- Dashboard de métricas de tráfego interno (delegado para ferramentas externas).

## 4. Solução Técnica

### Arquitetura de Informação

#### Site Institucional
1. **Hero**: Proposta de valor humanizada.
2. **Manifesto**: Visão do fundador sobre conexões.
3. **Ecossistema**:
   - **Sites**: Design e performance.
   - **Tools**: Link para `tools.unumpeople.com.br`.
   - **Unum People CRM**: Link para `crm.unumpeople.com.br`.
4. **Destaque Técnico Unum People CRM**: Explicação sobre notificações push Android e otimização de IA para Google Ads.

#### Landing Page de Serviços
1. **Problem/Agitation**: O custo da falta de conexão com o lead.
2. **Solution**: O combo Unum People (Site + Unum People CRM + Ads).
3. **Social Proof/Benefits**: Kanban visual, LTV, App Android.
4. **Pricing Table**:
   - **Básico**: R$ 97/mês (Ativação R$ 295) - Suporte via WhatsApp.
   - **Intermediário**: R$ 229/mês (Ativação R$ 449) - Inclui Unum People CRM, 1 LP e Integração com o Google Ads (mediante taxa adicional).
   - **Avançado**: R$ 495/mês (Ativação R$ 799) - Inclui Gestão de Tráfego e Bônus de 1 LP Extra.

### Fluxo de Conversão
`Usuário -> Landing Page -> Escolha do Pacote -> CTA WhatsApp -> Venda Consultiva`

## 5. Considerações de Copywriting (Destaques)

- **Humanização**: Evitar termos puramente técnicos; focar em "proximidade", "agilidade" e "conexão".
- **Ancoragem de Preço**: No pacote Avançado, destacar o preço original de R$ 599,00 para gerar percepção de valor no preço promocional de R$ 495,00.
- **O Diferencial Unum People CRM**: Enfatizar que o input de dados de venda melhora a IA do Google Ads, tornando o investimento em anúncios mais inteligente.

## 6. Riscos

| Risco | Impacto | Probabilidade | Mitigação |
|-------|---------|-------------|------------|
| Baixa taxa de conversão na LP | Alto | Média | Testes A/B na Hero Section e ajuste no copy consultivo. |
| Confusão entre Site e CRM | Médio | Baixa | Hierarquia visual clara separando o site institucional das ferramentas de gestão. |

## 7. Plano de Implementação (Desenvolvimento Ágil)

1. **Fase 1**: Definição de Tokens de Design (Cores e Tipografia) diretamente no `tailwind.config.ts`.
2. **Fase 2**: Implementação do Site Institucional (Next.js) com foco na narrativa de "Conexões".
3. **Fase 3**: Implementação da Landing Page de Serviços, integrando a tabela de preços e os links de WhatsApp.
4. **Fase 4**: Criação dos fluxos de navegação (Interligação Site <-> Landing Page).
5. **Fase 5**: Homologação mobile-first e lançamento.

---
**Observação**: Este TDD foi gerado conforme as instruções do fundador e as diretrizes de marketing digital da Unum People Creative Solutions.
