import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LeadModal } from './LeadModal';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import * as crm from '@/lib/crm';
import * as tracking from '@/lib/tracking';

describe('LeadModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    packageName: 'Pacote Avançado',
    whatsappLink: 'https://wa.me/123',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock do window.open
    global.window.open = vi.fn();
    // Mock do CRM
    vi.spyOn(crm, 'ingestLead').mockResolvedValue(true);
    // Mock do Tracking
    vi.spyOn(tracking, 'getStoredTrackingData').mockReturnValue({
      gclid: 'test_gclid',
      utm_source: 'test_source',
    });
  });

  it('deve renderizar o modal corretamente quando aberto', () => {
    render(<LeadModal {...defaultProps} />);
    
    expect(screen.getByText(/Falta pouco para sua/i)).toBeInTheDocument();
    expect(screen.getByText(/nova conexão/i)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.packageName)).toBeInTheDocument();
  });

  it('deve exibir erros de validação ao tentar submeter vazio', async () => {
    const user = userEvent.setup();
    render(<LeadModal {...defaultProps} />);
    
    const submitButton = screen.getByRole('button', { name: /Continuar para WhatsApp/i });
    await user.click(submitButton);

    expect(await screen.findByText(/Nome deve ter pelo menos 3 caracteres/i)).toBeInTheDocument();
    expect(await screen.findByText(/E-mail inválido/i)).toBeInTheDocument();
    expect(await screen.findByText(/Telefone incompleto/i)).toBeInTheDocument();
  });

  it('deve submeter o formulário e abrir o WhatsApp após preenchimento', async () => {
    const user = userEvent.setup();
    render(<LeadModal {...defaultProps} />);
    
    const nameInput = screen.getByLabelText(/Seu Nome/i);
    const emailInput = screen.getByLabelText(/Seu E-mail/i);
    const phoneInput = screen.getByLabelText(/Seu WhatsApp/i);
    const submitButton = screen.getByRole('button', { name: /Continuar para WhatsApp/i });

    await user.type(nameInput, 'Test User');
    await user.type(emailInput, 'test@example.com');
    await user.type(phoneInput, '11999999999');
    
    await user.click(submitButton);

    await waitFor(() => {
      expect(crm.ingestLead).toHaveBeenCalledWith(expect.objectContaining({
        nome: 'Test User',
        telefone: '(11) 99999-9999',
        email: 'test@example.com',
        gclid: 'test_gclid',
        utm_source: 'test_source',
      }));
      expect(global.window.open).toHaveBeenCalledWith(defaultProps.whatsappLink, '_blank');
      expect(defaultProps.onClose).toHaveBeenCalled();
    }, { timeout: 3000 });
  });

  it('deve exibir erros de validação para campos inválidos', async () => {
    const user = userEvent.setup();
    render(<LeadModal {...defaultProps} />);
    
    const nameInput = screen.getByLabelText(/Seu Nome/i);
    const emailInput = screen.getByLabelText(/Seu E-mail/i);
    const phoneInput = screen.getByLabelText(/Seu WhatsApp/i);
    const submitButton = screen.getByRole('button', { name: /Continuar para WhatsApp/i });

    await user.type(nameInput, 'Jo');
    await user.type(emailInput, 'email-invalido');
    await user.type(phoneInput, '119'); // Incompleto
    
    await user.click(submitButton);

    expect(await screen.findByText(/Nome deve ter pelo menos 3 caracteres/i)).toBeInTheDocument();
    expect(await screen.findByText(/E-mail inválido/i)).toBeInTheDocument();
    expect(await screen.findByText(/Telefone incompleto/i)).toBeInTheDocument();
  });

  it('deve chamar onClose ao clicar no botão de fechar', async () => {
    const user = userEvent.setup();
    render(<LeadModal {...defaultProps} />);
    
    const closeButton = screen.getByRole('button', { name: /Fechar modal/i });
    await user.click(closeButton);
    
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
