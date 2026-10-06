import { render, screen, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from './page';
import { lpConfigurar, lpPlanos } from '@/lib/links';

// spec: unum-people-docs/spec/features/unum-people-site/home-a-ponte/spec.md
const TITULO_HERO = 'Seu cliente está do outro lado. Sua página é a ponte.';

function hero() {
  return screen.getByRole('region', { name: TITULO_HERO });
}

function secao(tituloH2: string) {
  const h2 = screen.getByRole('heading', { level: 2, name: tituloH2 });
  const section = h2.closest('section');
  if (!section) throw new Error(`h2 "${tituloH2}" fora de <section>`);
  return section as HTMLElement;
}

describe('Home "A ponte" — hero (RF-01)', () => {
  it('T01: tem um único h1, com o título novo, e o hero nomeado por ele traz rótulo e apoio', () => {
    render(<Home />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(TITULO_HERO, { normalizeWhitespace: true });

    const regiao = hero();
    expect(within(regiao).getByText('Páginas com WhatsApp para profissionais e pequenos negócios')).toBeInTheDocument();
    expect(
      within(regiao).getByText(
        'Monte em minutos, com o modelo do seu tipo de negócio e o botão de WhatsApp pronto. Você vê como fica antes de pagar.',
      ),
    ).toBeInTheDocument();
  });

  it('T02: os botões do hero levam ao configurador e aos planos do LP Builder', () => {
    render(<Home />);
    const regiao = hero();
    expect(within(regiao).getByRole('link', { name: 'Montar minha página' })).toHaveAttribute(
      'href',
      lpConfigurar('institucional'),
    );
    expect(within(regiao).getByRole('link', { name: 'Ver planos' })).toHaveAttribute('href', lpPlanos());
  });

  it('T03: a ponte e o aviso de contato são decorativos (aria-hidden) e o hero não tem <img>', () => {
    render(<Home />);
    const regiao = hero();
    expect(regiao.querySelector('img')).toBeNull();

    const camadas = regiao.querySelectorAll('[data-ponte]');
    expect(camadas.length).toBeGreaterThan(0);
    camadas.forEach((camada) => expect(camada.closest('[aria-hidden="true"]')).not.toBeNull());

    const mensagem = within(regiao).getByText('Oi! Achei sua página no Google. Você atende no sábado?');
    const aviso = mensagem.closest('[aria-hidden="true"]');
    expect(aviso).not.toBeNull();
    expect(aviso).toHaveTextContent('Novo contato pela sua página');
    expect(aviso).toHaveTextContent('agora');
  });
});

describe('Home "A ponte" — estrutura (RF-05)', () => {
  it('T04: os h2 vêm na ordem da história', () => {
    render(<Home />);
    const h2s = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent?.replace(/\s+/g, ' ').trim());
    // O hero (h1) vem antes de todas as seções.
    const h1 = screen.getByRole('heading', { level: 1 });
    screen.getAllByRole('heading', { level: 2 }).forEach((h2) => {
      expect(h1.compareDocumentPosition(h2) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });
    expect(h2s).toEqual([
      'Entre você e o cliente sempre existe uma distância.',
      'Do modelo ao primeiro contato.',
      'A tecnologia é a ponte invisível.',
      'Do outro lado, alguém está procurando o que você faz.',
    ]);
  });
});

describe('Home "A ponte" — O vão (RF-02)', () => {
  const VAOS = [
    {
      rotulo: 'Ser encontrado',
      dor: 'O cliente procura você no Google e só acha um perfil de Instagram.',
      plano: 'Página',
      texto: 'Um endereço seu na internet, com botão de WhatsApp. Para ter onde mandar o cliente além do Instagram.',
    },
    {
      rotulo: 'Ser lembrado pelo que sabe',
      dor: 'Você explica bem o seu trabalho, mas o post some do feed em dois dias.',
      plano: 'Presença',
      texto: 'A página com blog no mesmo endereço. Cada texto vira mais uma porta para quem procura o assunto no Google.',
    },
    {
      rotulo: 'Não perder quem chega',
      dor: 'O contato chega e se perde entre as conversas do WhatsApp.',
      plano: 'Captação',
      texto: 'Formulário na página e CRM no celular, que avisa quando chega contato. Cada pessoa fica guardada até virar cliente.',
    },
  ];

  it('T05: apoio e uma lista ordenada com três vãos, cada um com a dor, o plano e o link', () => {
    render(<Home />);
    const vao = secao('Entre você e o cliente sempre existe uma distância.');
    expect(within(vao).getByText('O vão')).toBeInTheDocument();
    expect(
      within(vao).getByText(
        'Na engenharia, vão é o trecho que a ponte precisa vencer. No seu negócio, ele costuma aparecer em um destes três lugares.',
      ),
    ).toBeInTheDocument();

    const lista = within(vao).getByRole('list');
    expect(lista.tagName).toBe('OL');
    const itens = within(lista).getAllByRole('listitem');
    expect(itens).toHaveLength(3);

    VAOS.forEach((esperado, i) => {
      const item = itens[i];
      const rotulo = within(item).getByText(esperado.rotulo);
      const paragrafoDaDor = rotulo.closest('p');
      expect(paragrafoDaDor?.textContent).toBe(`${esperado.rotulo}${esperado.dor}`);
      const arco = item.querySelector('svg');
      expect(arco).not.toBeNull();
      expect(arco).toHaveAttribute('aria-hidden', 'true');
      expect(within(item).getByRole('heading', { level: 3, name: esperado.plano })).toBeInTheDocument();
      expect(within(item).getByText(esperado.texto)).toBeInTheDocument();
      expect(within(item).getByRole('link', { name: `Ver o plano ${esperado.plano}` })).toHaveAttribute('href', lpPlanos());
    });
  });
});

describe('Home "A ponte" — Como funciona (RF-03)', () => {
  it('T06: três passos em lista ordenada, com botão e a linha de apoio', () => {
    render(<Home />);
    const como = secao('Do modelo ao primeiro contato.');
    expect(within(como).getByText('Como funciona')).toBeInTheDocument();

    const lista = within(como).getByRole('list');
    expect(lista.tagName).toBe('OL');
    const itens = within(lista).getAllByRole('listitem');
    expect(itens).toHaveLength(3);

    const passos = [
      ['Escolha o modelo', 'Dez modelos, cada um pensado para um tipo de negócio, do chaveiro ao consultório.'],
      ['Escreva do seu jeito', 'Troque textos, fotos e cores. Você vê a página mudar enquanto escreve.'],
      ['Publique e receba', 'Pague só quando decidir publicar. O botão de WhatsApp já sai funcionando.'],
    ];
    passos.forEach(([titulo, texto], i) => {
      const numero = within(itens[i]).getByText(String(i + 1));
      expect(numero).toHaveAttribute('aria-hidden', 'true');
      expect(within(itens[i]).getByRole('heading', { level: 3, name: titulo })).toBeInTheDocument();
      expect(within(itens[i]).getByText(texto)).toBeInTheDocument();
    });

    expect(within(como).getByRole('link', { name: 'Montar minha página' })).toHaveAttribute(
      'href',
      lpConfigurar('institucional'),
    );
    expect(within(como).getByText('Você vê como fica antes de pagar.')).toBeInTheDocument();
  });
});

describe('Home "A ponte" — A ponte invisível e fechamento (RF-04)', () => {
  it('T07: manifesto com o texto aprovado, link para /sobre e o fechamento na mesma seção', () => {
    render(<Home />);
    const manifesto = secao('A tecnologia é a ponte invisível.');
    expect(within(manifesto).getByText('O que a gente acredita')).toBeInTheDocument();
    expect(
      within(manifesto).getByText(
        'Ninguém atravessa uma ponte pensando nos cabos. Pensa em quem está do outro lado. É assim que a gente faz tecnologia: você cuida do seu cliente, e a gente cuida do resto.',
      ),
    ).toBeInTheDocument();
    expect(within(manifesto).getByRole('link', { name: 'Conheça a Unum' })).toHaveAttribute('href', '/sobre');

    expect(
      within(manifesto).getByRole('heading', { level: 2, name: 'Do outro lado, alguém está procurando o que você faz.' }),
    ).toBeInTheDocument();
    expect(within(manifesto).getByText('Monte a sua página e veja como fica antes de pagar.')).toBeInTheDocument();
    expect(within(manifesto).getByRole('link', { name: 'Montar minha página' })).toHaveAttribute(
      'href',
      lpConfigurar('institucional'),
    );
  });
});

describe('Home "A ponte" — links e o que não pode aparecer', () => {
  it('T08: são três "Montar minha página", todos para o configurador com ref=institucional', () => {
    render(<Home />);
    const botoes = screen.getAllByRole('link', { name: 'Montar minha página' });
    expect(botoes).toHaveLength(3);
    botoes.forEach((botao) => expect(botao).toHaveAttribute('href', lpConfigurar('institucional')));
    expect(lpConfigurar('institucional')).toMatch(/\/configurar\?ref=institucional$/);
  });

  it('T09: sem portfólio, sem "sob medida", sem os sites antigos e sem o slogan na home', () => {
    const { container } = render(<Home />);
    expect(screen.queryByRole('heading', { name: 'Quem faz' })).not.toBeInTheDocument();
    expect(container).not.toHaveTextContent(/sob medida/i);
    expect(container).not.toHaveTextContent(/O caminho mais curto entre você e o seu cliente/i);
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
