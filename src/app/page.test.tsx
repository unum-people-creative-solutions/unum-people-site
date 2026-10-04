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
      'Quem faz',
      'O que a gente acredita',
      'Monte sua página agora.',
    ]);

    expect(screen.getByText('Página com WhatsApp para profissionais e pequenos negócios')).toBeInTheDocument();
    expect(screen.getByText('Monte em minutos, veja como fica e só pague para publicar.')).toBeInTheDocument();
    expect(screen.getByText('Você só paga quando decidir publicar.')).toBeInTheDocument();
    expect(
      screen.getByText(
        'A Unum People já desenhou páginas sob medida para psicólogas, advogados, personal trainer e comunicação visual. Os modelos do configurador nasceram desse trabalho.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('Páginas que desenhamos')).toBeInTheDocument();
    expect(screen.getByText('Trabalhos feitos sob medida pela Unum.')).toBeInTheDocument();
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

  it('abre links externos em nova aba só com rel noopener noreferrer', () => {
    render(<Home />);
    const novaAba = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('target') === '_blank');
    expect(novaAba.length).toBeGreaterThan(0);
    novaAba.forEach((link) => {
      const rel = link.getAttribute('rel') ?? '';
      expect(rel).toContain('noopener');
      expect(rel).toContain('noreferrer');
    });
  });

  it('mostra as cinco páginas do portfólio, com link e descrição em palavras simples', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: /Psicóloga Andrielly Oliveira/ })).toHaveAttribute('href', 'https://psiandriellyoliveira.com.br/');
    expect(screen.getByRole('link', { name: /HS Personal Trainer/ })).toHaveAttribute('href', 'https://hernansampaio.com.br/');
    expect(screen.getByRole('link', { name: /Garagem Comunicação Visual/ })).toHaveAttribute('href', 'https://garagemcomunicacaovisual.com.br/');
    expect(screen.getByRole('link', { name: /Eliziario Advogados/ })).toHaveAttribute('href', 'https://eliziarioadv.com.br/');
    expect(screen.getByRole('link', { name: /Centro de Psicologia Recriar/ })).toHaveAttribute('href', 'https://centrorecriar.com.br/');
    expect(screen.getAllByText('Site institucional')).toHaveLength(4);
    expect(screen.getAllByText('Página de apresentação')).toHaveLength(1);
  });
});
