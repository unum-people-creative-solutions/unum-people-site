import { test, expect } from '@playwright/test';

test.describe('Contato e privacidade', () => {
  test('o rodapé leva às duas páginas e o atendimento está visível', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('contentinfo').getByRole('link', { name: 'Privacidade' }).click();
    await expect(page).toHaveURL('/privacidade');
    await expect(page.getByRole('heading', { name: 'Política de privacidade' })).toBeVisible();
    await expect(page.getByText('noreply@unumpeople.com.br')).toBeVisible();

    await page.getByRole('contentinfo').getByRole('link', { name: 'Contato' }).click();
    await expect(page).toHaveURL('/contato');
    const mail = page.getByRole('link', { name: 'atendimento@unumpeople.com.br' });
    await expect(mail).toBeVisible();
    await expect(mail).toHaveAttribute('href', 'mailto:atendimento@unumpeople.com.br');
  });
});
