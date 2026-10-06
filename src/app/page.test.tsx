import { render, screen, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from './page';
import { lpConfigurar, lpPlanos } from '@/lib/links';

const TITULO_HERO = 'O caminho mais curto entre você e o seu cliente é uma página no ar hoje.';

describe('Home', () => {
  it('tem um único h1, com o texto do hero', () => {
    render(<Home />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(TITULO_HERO);
  });

  it('mostra as três frases de "O que a gente acredita", como na spec', () => {
    render(<Home />);
    expect(screen.getByText('A tecnologia deve sumir para o negócio aparecer.')).toBeInTheDocument();
    expect(screen.getByText('Ferramentas simples, com preço na tela e sem conversa antes.')).toBeInTheDocument();
    expect(screen.getByText('O caminho mais curto entre você e o seu cliente.', { selector: 'p, li' })).toBeInTheDocument();
  });

  it('traz as cinco seções, na ordem e com os textos da spec', () => {
    render(<Home />);
    const h2s = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent);
    expect(h2s).toEqual([
      'Escolha o que o seu negócio precisa',
      'O que a gente acredita',
      'Monte sua página agora.',
    ]);

    expect(screen.getByText('Página com WhatsApp para profissionais e pequenos negócios')).toBeInTheDocument();
    expect(screen.getByText('Monte em minutos, veja como fica e só pague para publicar.')).toBeInTheDocument();
    expect(screen.getByText('Você só paga quando decidir publicar.')).toBeInTheDocument();
  });

  it('leva os dois botões "Montar minha página" (hero e fechamento) ao configurador com ref=institucional', () => {
    render(<Home />);
    const botoes = screen.getAllByRole('link', { name: 'Montar minha página' });
    expect(botoes).toHaveLength(2);
    botoes.forEach((botao) => {
      expect(botao).toHaveAttribute('href', lpConfigurar('institucional'));
    });
    expect(lpConfigurar('institucional')).toMatch(/\/configurar\?ref=institucional$/);
  });

  it('leva "Ver planos e preços" e os três cartões aos planos do LP Builder', () => {
    render(<Home />);
    const ver = screen.getAllByRole('link', { name: 'Ver planos e preços' });
    expect(ver.length).toBeGreaterThanOrEqual(2);
    ver.forEach((link) => expect(link).toHaveAttribute('href', lpPlanos()));

    const cartoes = [
      screen.getByRole('link', { name: /^Página\b.*Um endereço além do Instagram\./ }),
      screen.getByRole('link', { name: /^Presença\b.*Um blog para ser achado no Google\./ }),
      screen.getByRole('link', { name: /^Captação\b.*Um CRM no celular para não perder contato\./ }),
    ];
    cartoes.forEach((cartao) => expect(cartao).toHaveAttribute('href', lpPlanos()));
  });

  it('leva "Conheça a Unum" para /sobre', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: 'Conheça a Unum' })).toHaveAttribute('href', '/sobre');
  });

  it('desenha o celular do hero em HTML/CSS: aria-hidden e sem <img>', () => {
    render(<Home />);
    const hero = screen.getByRole('region', { name: TITULO_HERO });
    expect(hero.querySelector('img')).toBeNull();
    expect(within(hero).getByTestId('hero-ilustracao')).toHaveAttribute('aria-hidden', 'true');
  });

  it('não traz o manifesto nem os valores da marca (ficam em /sobre)', () => {
    render(<Home />);
    expect(screen.queryByText(/ponte invisível/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Princípios Norteadores/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Jornada/)).not.toBeInTheDocument();
  });

  // Páginas feitas sob medida pela Unum confundiam o comprador com o que o
  // configurador entrega. A home não mostra projetos personalizados.
  it('não mostra projetos feitos sob medida', () => {
    const { container } = render(<Home />);
    expect(screen.queryByRole('heading', { name: 'Quem faz' })).not.toBeInTheDocument();
    expect(container).not.toHaveTextContent(/sob medida/i);
    for (const dominio of [
      'psiandriellyoliveira.com.br',
      'hernansampaio.com.br',
      'garagemcomunicacaovisual.com.br',
      'eliziarioadv.com.br',
      'centrorecriar.com.br',
    ]) {
      expect(container.querySelector(`a[href*="${dominio}"]`)).toBeNull();
    }
  });
});
