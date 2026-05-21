# Unum People Creative Solutions - Guia do Agente

Este arquivo orienta a atuação da IA neste repositório.

## 🎯 Contexto do Projeto
Site principal da Unum People. Focado em transmitir a missão da empresa com um design ultra-minimalista, elegante e "vanguardista".

## 🛠️ Metodologia e Regras
1.  **Metodologia**: Utilize estritamente o `tlc-spec-driven` para qualquer nova funcionalidade ou refatoração. Consulte os specs em `.specs/`.
2.  **Testes Obrigatórios**: NENHUMA funcionalidade é considerada "concluída" sem testes automatizados correspondentes.
    - Use **Vitest/RTL** para componentes e lógica (acessibilidade primeiro).
    - Use **Playwright** para fluxos críticos de conversão.
3.  **Visão e Roadmap**: Consulte [.specs/project/PROJECT.md](.specs/project/PROJECT.md) e [.specs/project/ROADMAP.md](.specs/project/ROADMAP.md).
4.  **Estado do Projeto**: Consulte [.specs/project/STATE.md](.specs/project/STATE.md) para decisões e pendências.
5.  **Regras Globais**: Siga rigorosamente as regras de engenharia e segurança da Unum People. (Referência: [rules.md](rules.md)).

## 🧰 Skills Recomendadas
- `tlc-spec-driven`: Gestão de ciclo de vida do desenvolvimento.
- `codenavi`: Para explorar a estrutura minimalista e reuso de componentes de marca.
- `tailwind-expert`: Para manter a precisão do design ultra-minimalista.
- `web-design-guidelines`: Para auditar a UX sofisticada do site.

## 📝 Comandos Úteis
- `npm run dev`: Ambiente de desenvolvimento.
- `npm run build`: Build de produção.
