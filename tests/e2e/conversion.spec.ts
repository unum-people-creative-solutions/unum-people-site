import { test, expect } from '@playwright/test';

// O site principal não vende nem mostra preço: os botões levam ao LP Builder
// (unumpeople.app), onde o cliente monta a página e contrata. O teste confere
// o destino de cada botão sem sair do site (o LP Builder tem os próprios testes).
test.describe('Fluxo de conversão', () => {
  test('o botão principal da home leva ao configurador do LP Builder', async ({ page }) => {
    await page.goto('/');

    const hero = page.getByRole('region', { name: /O caminho mais curto/ });
    const montar = hero.getByRole('link', { name: 'Montar minha página' });
    await expect(montar).toBeVisible();
    await expect(montar).toHaveAttribute('href', /\/configurar\?ref=institucional$/);

    // O mesmo botão aparece mais abaixo e no rodapé: todos levam ao configurador.
    for (const link of await page.getByRole('link', { name: 'Montar minha página' }).all()) {
      await expect(link).toHaveAttribute('href', /\/configurar\?ref=institucional$/);
    }
  });

  test('os botões de planos levam à vitrine do LP Builder, sem preço no site', async ({ page }) => {
    await page.goto('/');

    const verPlanos = page.getByRole('link', { name: 'Ver planos e preços' });
    await expect(verPlanos.first()).toBeVisible();
    for (const link of await verPlanos.all()) {
      await expect(link).toHaveAttribute('href', /\/#planos$/);
    }
    await expect(page.getByText(/R\$\s?\d/)).toHaveCount(0);
  });

  test('/servicos redireciona para os planos do LP Builder', async ({ request }) => {
    const resposta = await request.get('/servicos', { maxRedirects: 0 });

    expect(resposta.status()).toBe(308);
    expect(resposta.headers()['location']).toMatch(/\/#planos$/);
  });
});
