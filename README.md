
## 📚 Documentação Oficial (Arquitetura e TDDs)

**Nota Importante:** A documentação técnica detalhada, as regras de IA (Harness), os Technical Design Documents (TDDs) e o log de estado contínuo deste projeto **não ficam armazenados neste repositório**. 

Para obter o contexto arquitetural completo e consultar o *Single Source of Truth* do ecossistema, acesse o repositório centralizado de documentação:
👉 **[unum-people-docs](https://github.com/unum-people-creative-solutions/unum-people-docs.git)**

# Unum People Creative Solutions

A Unum People foca em conectar e aproximar pessoas. Acreditamos que as verdadeiras oportunidades surgem através de conexões genuínas.

## 🚀 O que este site é
Casa institucional da marca (`unumpeople.com.br`) e porta de entrada para o configurador de páginas (LP Builder, em `unumpeople.app`). O site **não escreve preço**: planos e valores vivem só na vitrine do LP Builder.

### Rotas
| Rota | Conteúdo |
|---|---|
| `/` | Home "A ponte": hero com a ponte que acende e o contato que chega, O vão (uma dor e um plano por linha), Como funciona, a ponte invisível e o fechamento. Componentes em `src/components/home/` (Server Components, estilos em `home.module.css`, animação só em CSS e desligada com movimento reduzido) |
| `/sobre` | Manifesto e valores da marca |
| `/contato`, `/privacidade` | Páginas institucionais e legais |
| `/termos/[termId]/[version]` | Termo de contratação (montado pelo checkout do LP Builder) |
| `/servicos` | Redirecionamento permanente (308) para `{LP}/#planos`; não é mais página |

### Variáveis de ambiente
| Variável | Padrão | Uso |
|---|---|---|
| `NEXT_PUBLIC_LP_BUILDER_URL` | `https://unumpeople.app` | Endereço do LP Builder (sem barra final). Lida só em `src/lib/links.ts`; é embutida no build, então muda com novo build. |

A identificação da empresa exibida no rodapé fica em `src/lib/empresa.ts` (cópia da constante do LP Builder).

## 🛠️ Stack Técnica
- **Framework**: [Next.js](https://nextjs.org/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/); a home usa CSS Module (`src/components/home/home.module.css`), com a máscara da ponte em `public/images/ponte-alpha.webp`
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)

## 📖 Documentação
Consulte a pasta `unum-people-docs/spec/` para detalhes sobre a implementação, roadmap e regras de engenharia.
- [Visão do Projeto](unum-people-docs/spec/project/PROJECT.md)
- [Roadmap](unum-people-docs/spec/project/ROADMAP.md)
- [Guia do Agente](AGENTS.md)

## 🏁 Como começar
```bash
npm install
npm run dev
```

---
*Unum People Creative Solutions - Todos os direitos reservados.*
