# Unum People - Regras de Engenharia e Segurança (Standard Rules)

Este documento contém as regras mandatórias que todos os Agentes de IA devem seguir ao trabalhar em qualquer projeto deste workspace.

## 🛡️ Segurança e Privacidade
1.  **Proteção de Credenciais**: Jamais exponha chaves de API, segredos ou variáveis de ambiente em código estático. Utilize sempre `.env.local`.
2.  **Privacidade (LGPD)**: Formulários de captura de leads devem conter avisos de transparência sobre o uso de dados.
3.  **Integridade de Dados**: Dados sensíveis de clientes (nomes, e-mails, telefones) enviados ao CRM devem ser tratados com o máximo sigilo profissional.

## ⚙️ Protocolos de Engenharia Defensiva
1.  **Fluxo de Conversão**: Em sites de clientes, botões de WhatsApp nunca devem redirecionar diretamente. É mandatório disparar o `LeadModal` para captura e rastreamento antes do redirecionamento.
2.  **Rastreamento (Tracking)**: Captura de `GCLID`, `FBCLID`, `MSCLKID` e `UTMs` é obrigatória para atribuição correta no CRM.
3.  **Persistência**: Utilize `sessionStorage` para manter o tracking durante a navegação do usuário.

## 🧪 Qualidade e Testes (Mandatório)
1.  **Testes como Critério de Aceite**: Toda alteração de código deve ser acompanhada de testes que validem o comportamento e previnam regressões.
2.  **Acessibilidade (A11y)**: Testes de UI devem obrigatoriamente usar queries de acessibilidade (`getByRole`, `getByLabelText`). O uso de seletores CSS para testes é proibido.
3.  **Fluxos Críticos**: Mudanças no `LeadModal`, `Header` ou fluxos de checkout/contato devem passar obrigatoriamente por testes E2E (Playwright) antes da entrega.
4.  **Reprodução de Bugs**: Para correções de bugs, é obrigatório criar um teste que reproduza a falha antes de aplicar a correção.

## ⚡ Performance e SEO
1.  **Otimização de Imagens**: Uso obrigatório do componente `next/image` com dimensões adequadas e formatos modernos (WebP/Avif).
2.  **Fontes**: Utilizar `next/font` para evitar Cumulative Layout Shift (CLS).
3.  **SEO Técnico**: Todos os sites devem manter `robots.ts`, `sitemap.ts` e metadados OpenGraph/Twitter atualizados.
4.  **Dados Estruturados**: Implementar JSON-LD (ex: `MedicalBusiness`, `ProfessionalService`) para melhorar a visibilidade em buscas.

## 🎨 Design e UX
1.  **Coerência de Marca**: Respeite rigorosamente a paleta de cores e tipografias definidas no `AGENTS.md` de cada projeto.
2.  **Surgical Updates**: Evite refatorações globais desnecessárias. Foque em alterações cirúrgicas que mantenham a estética original.
3.  **Acessibilidade**: Garanta contraste adequado, labels em inputs e navegabilidade via teclado.
