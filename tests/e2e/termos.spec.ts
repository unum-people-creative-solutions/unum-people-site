import { test, expect } from '@playwright/test';

test.describe('Rota /termos/[termId]/[version]', () => {
  test('termo inexistente mostra 404 com a identidade visual do site, nunca download ou tela em branco', async ({ page }) => {
    const response = await page.goto('/termos/e2e-test-nonexistent-term/1');

    expect(response?.status()).toBe(404);
    expect(response?.headers()['content-disposition']).toBeUndefined();

    // Header/Footer do layout raiz devem continuar presentes mesmo na 404.
    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeVisible();
  });
});
