import { test, expect } from '@playwright/test';

test.describe('Fluxo de Conversão', () => {
  test('deve navegar até a página de serviços e completar o fluxo de lead até o WhatsApp', async ({ page }) => {
    // 1. Ir para a Home
    await page.goto('/');
    
    // 2. Navegar para Serviços
    // No mobile o header pode estar oculto, então verificamos a visibilidade
    const servicosLink = page.getByRole('navigation').getByRole('link', { name: 'Serviços', exact: true });
    if (await servicosLink.isVisible()) {
      await servicosLink.click();
    } else {
      await page.goto('/servicos');
    }
    await expect(page).toHaveURL('/servicos');

    // 3. Escolher o Pacote Avançado na Pricing Table
    // Usamos um seletor mais específico para o card (div filha direta do grid)
    const cardAvancado = page.locator('.grid > div').filter({ 
      has: page.getByRole('heading', { name: 'Avançado', exact: true }) 
    });
    const ctaAvancado = cardAvancado.getByRole('button', { name: /Selecionar Pacote/i });
    await ctaAvancado.click();

    // 4. Verificar se o Modal de Lead abriu
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText(/Avançado/i);

    // 5. Preencher o formulário
    await modal.getByLabel(/Seu Nome/i).fill('Usuário de Teste E2E');
    await modal.getByLabel(/Seu E-mail/i).fill('teste@e2e.com');
    await modal.getByLabel(/Seu WhatsApp/i).fill('11988887777');

    // 6. Submeter e verificar se tenta abrir o WhatsApp
    // Como o WhatsApp abre em uma nova aba (_blank), podemos monitorar o evento de 'popup'
    const [popup] = await Promise.all([
      page.waitForEvent('popup'),
      modal.getByRole('button', { name: /Continuar para WhatsApp/i }).click(),
    ]);

    // Verificamos se a URL contém o domínio do WhatsApp e os dados corretos
    const url = popup.url();
    expect(url).toMatch(/whatsapp\.com|wa\.me/);
    expect(url).toContain('5511988887777');
    expect(decodeURIComponent(url)).toContain('Avançado');
    
    // 7. O modal deve ter fechado na página original
    await expect(modal).not.toBeVisible();
  });
});
