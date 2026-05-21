/**
 * Serviço de integração com o CRM Unum People.
 * Baseado no Guia de Ingestão de Leads.
 */

export interface LeadData {
  nome: string;
  telefone: string;
  email?: string;
  origem?: string;
  gclid?: string;
  fbclid?: string;
  msclkid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

export const ingestLead = async (data: LeadData): Promise<boolean> => {
  const gatewayUrl = process.env.NEXT_PUBLIC_API_GATEWAY_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  if (!gatewayUrl || !apiKey) {
    console.error('Configuração do CRM incompleta: NEXT_PUBLIC_API_GATEWAY_URL ou NEXT_PUBLIC_API_KEY não configurados.');
    return false;
  }

  // Garante que o endpoint termina com /ingest
  const endpoint = gatewayUrl.endsWith('/ingest') ? gatewayUrl : `${gatewayUrl.replace(/\/$/, '')}/ingest`;

  console.log('Iniciando ingestão de lead para:', endpoint);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify({
        ...data,
        origem: data.origem || (typeof window !== 'undefined' ? window.location.hostname : 'Site Principal'),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Erro na ingestão do lead CRM (${response.status}):`, errorText);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Falha na requisição ao CRM:', error);
    return false;
  }
};
