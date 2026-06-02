# Tech Design Doc: Atualização da Identidade Visual (Unum People)

| Campo | Valor |
| --- | --- |
| Documento | `TECH-DESIGN-visual-identity.md` |
| Status | Proposed |
| Data | 2026-06-02 |
| Tech Lead | Gemini CLI |
| Base de Referência | `@identity/brand_manual.md` e `@identity/brand_manual.html` |

## 1. Objetivo
Atualizar a identidade visual do projeto `unum-people-site` para se adequar ao novo manual da marca Unum People. A atualização abrangerá: Logotipos, Tipografia, Dinamismo Cromático (Tokens Tailwind/CSS) e Copywriting Institucional.

## 2. Escopo Arquitetural

### 2.1 Gestão de Assets (Logotipos)
- **Origem:** Diretório externo `@identity/`.
- **Destino:** Diretório público do repositório `public/images/`.
- **Ação:** 
  - Adicionar os arquivos `logo.png`, `logo_simbolo.png` e `logo_texto.png`.
  - Remover imagens antigas (`logo_completa.png`, `logo_fundo_branco.jpeg`) para limpar o repositório.
- **Implementação Técnica:** Componentes `next/image` em `Header.tsx`, `Footer.tsx` e meta tags `OpenGraph` em `layout.tsx` deverão apontar para as novas rotas. A área de respiro (2X) definida no manual deve ser gerida via classes Tailwind de espaçamento e layout ao redor da tag de imagem, não embutida no asset físico.

### 2.2 Substituição Tipográfica
- **Origem:** O projeto atualmente utiliza a fonte `Geist` em `layout.tsx`.
- **Ação:** Substituir inteiramente por `Poppins`.
- **Implementação Técnica:**
  - `src/app/layout.tsx`: Modificar a importação de `next/font/google` para buscar apenas `Poppins` com os pesos permitidos (`300`, `400`, `600`, `700`).
  - `src/app/globals.css`: Substituir a declaração da variável `--font-geist-sans` por `--font-poppins`. Atualizar o seletor `body` para depender primariamente da nova variável de fonte. A fonte display do logotipo (hastes grossas/rounded) não deve ser importada no CSS, seu uso é estrito à imagem do logotipo.

### 2.3 Dinamismo Cromático e Tokens de Design
- **Origem:** O arquivo `globals.css` declara raízes de variáveis como `--brand-blue`, `--brand-dark`, `--brand-accent`.
- **Ação:** Atualizar o escopo de variáveis CSS e sincronizar com o Tailwind v4.
- **Implementação Técnica:**
  - Inserir no `:root` as seguintes cores:
    - `--color-brand-blue`: `#0A1C82` (Azul Profundo)
    - `--color-brand-purple`: `#6B00D7` (Roxo Transição)
    - `--color-brand-orange`: `#FF3D00` (Laranja Vibrante)
    - `--color-support-grey`: `#6E7191`
    - `--color-absolute-white`: `#FFFFFF`
  - Criar um gradiente customizado (`--bg-gradient-brand`) aplicando a transição angular explícita de `135deg` do `#0A1C82` ao `#FF3D00` passando por `#6B00D7` aos 50%.
  - Substituir nos componentes globais (`Header`, `Footer`, `Section`, `page.tsx`) a chamadas obsoletas de temas antigos por suas devidas correspondentes cromáticas, garantindo contraste acessível (WCAG AA mínimo para textos principais).

### 2.4 Posicionamento e Copywriting
- **Ação:** Adoção da narrativa "People to People" (P2P).
- **Implementação Técnica:**
  - Modificar as tags de metadata no `layout.tsx` para adotar o slogan: "O caminho mais curto entre você e o seu cliente."
  - Hero Section (`page.tsx`): Alinhar a mensagem central à "ponte invisível" para a aproximação dos usuários.

## 3. Impacto Operacional e Testabilidade

**Riscos de Regressão:** Alterar tokens base de cores pode afetar botões ou áreas de fundo (contrastes). A remoção das imagens antigas requer varredura em todo o projeto.

**Plano de Qualidade (Fase 4):**
- Testes automatizados deverão cobrir as rotas físicas de assets da interface gráfica, confirmando sua existência.
- Varredura de CSS para certificar que instâncias e remanescentes do `Geist` não vazam pela compilação CSS.

## 4. Considerações Finais
A abordagem não criará componentes novos do zero a não ser que estritamente necessário. O esforço é centrado na transposição (replacing) segura dos identificadores base (fonts, colors, paths) segurando o compromisso com o Tech Design atual.
