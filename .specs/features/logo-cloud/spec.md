# Spec: Seção de Clientes (LogoCloud)

## 🎯 Objetivo
Aumentar a autoridade e confiança (social proof) na página de serviços através da exibição de logotipos de empresas que já utilizam as soluções da Unum People.

## 📋 Requisitos

### Visual & UX
- [x] **Design Vanguardista**: Layout minimalista, logos em grayscale (escala de cinza) com opacidade reduzida (ex: 40%).
- [x] **Interatividade**: Hover effect que restaura a opacidade/cor original suavemente.
- [x] **Animação**: Entrada suave usando `framer-motion` (fade-in + slide up).
- [x] **Responsividade**: Grid adaptável (2 colunas mobile, 4-6 colunas desktop).
- [x] **Placeholders**: Uso de ícones `lucide-react` e texto estilizado enquanto logos reais não são fornecidos.

### Técnico
- [x] **Componente**: Criar `src/components/LogoCloud.tsx`.
- [x] **Integração**: Inserir na `src/app/servicos/page.tsx` entre o Hero e a Tabela de Preços.
- [x] **Acessibilidade**: Atributos `alt` descritivos e `aria-hidden` para elementos decorativos.
- [x] **Performance**: Uso de `next/image` (quando houver assets) e componentes leves.

### Testes
- [x] **Unitário**: Validar renderização e acessibilidade do componente.
- [x] **Visual**: Garantir que a seção não quebre o layout minimalista existente.

## 🛠️ Critérios de Aceite
- A seção deve aparecer logo após o Hero da página de serviços.
- O estilo deve ser coerente com as seções existentes (`brand-soft` ou `white`).
- A animação de entrada deve ser fluida.
