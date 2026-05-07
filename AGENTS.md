# Unum People Creative Solutions - Guia do Agente

Este arquivo contém as diretrizes fundamentais para o desenvolvimento e manutenção do site institucional da Unum People. **Agente: Leia este arquivo sempre que iniciar uma sessão ou após comandos de compressão de contexto.**

## 🎯 Contexto do Projeto
Site principal da Unum People Creative Solutions. Focado em transmitir a missão da empresa (conectar pessoas através da tecnologia) com um design ultra-minimalista e elegante.

## 🏗️ Arquitetura e Componentes
- **Framework**: Next.js (App Router).
- **Estilização**: Tailwind CSS.
- **Componentes**: 
  - Header com efeito *glassmorphism*.
  - Footer com logotipo expandido.
- **Identidade Visual**:
  - `Brand Blue` (#3D5D97)
  - `Brand Dark` (#44516F)
  - `Brand Accent` (#CCBB9F)

## 🛠️ Padrões de Desenvolvimento & Segurança
- **Minimalismo**: Evitar excesso de elementos visuais. Focar em tipografia robusta e espaçamento generoso.
- **Performance**: Utilizar `next/image` para todos os ativos gráficos da marca.
- **Responsividade**: Layout limpo e adaptável para qualquer resolução.

### 🛡️ Protocolo de Engenharia Defensiva
- **Coerência da Marca**: Respeitar rigorosamente a paleta de cores e o uso modular do logotipo.
- **Surgical Updates**: Alterações devem ser cirúrgicas para não quebrar a estética "Em construção" (V1).

## 🧠 Persistência de Contexto (Context Anchor)
- **Recuperação**: Execute `cat AGENTS.md` para se reorientar.

## 📝 Comandos Úteis
- `npm run dev`: Ambiente de desenvolvimento.
- `npm run build`: Build de produção.
