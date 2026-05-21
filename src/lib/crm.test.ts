import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ingestLead } from './crm';

describe('crm integration', () => {
  const mockLead = {
    nome: 'João Teste',
    telefone: '11999998888',
    email: 'joao@teste.com',
    origem: 'Teste Unitário'
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('fetch', vi.fn());
  });

  it('should append /ingest to the gateway URL if missing', async () => {
    process.env.NEXT_PUBLIC_API_GATEWAY_URL = 'https://api.test.com';
    process.env.NEXT_PUBLIC_API_KEY = 'test-key';
    
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: async () => 'OK'
    } as Response);

    await ingestLead(mockLead);

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.test.com/ingest',
      expect.any(Object)
    );
  });

  it('should not duplicate /ingest if already present', async () => {
    process.env.NEXT_PUBLIC_API_GATEWAY_URL = 'https://api.test.com/ingest';
    process.env.NEXT_PUBLIC_API_KEY = 'test-key';
    
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: async () => 'OK'
    } as Response);

    await ingestLead(mockLead);

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.test.com/ingest',
      expect.any(Object)
    );
  });

  it('should handle trailing slash in gateway URL correctly', async () => {
    process.env.NEXT_PUBLIC_API_GATEWAY_URL = 'https://api.test.com/';
    process.env.NEXT_PUBLIC_API_KEY = 'test-key';
    
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: async () => 'OK'
    } as Response);

    await ingestLead(mockLead);

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.test.com/ingest',
      expect.any(Object)
    );
  });

  it('should use NEXT_PUBLIC_API_KEY as X-API-Key header', async () => {
    process.env.NEXT_PUBLIC_API_GATEWAY_URL = 'https://api.test.com';
    process.env.NEXT_PUBLIC_API_KEY = 'REAL_SECRET_KEY';
    
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: async () => 'OK'
    } as Response);

    await ingestLead(mockLead);

    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          'X-API-Key': 'REAL_SECRET_KEY'
        })
      })
    );
  });

  it('should return false if configuration is missing', async () => {
    process.env.NEXT_PUBLIC_API_GATEWAY_URL = '';
    process.env.NEXT_PUBLIC_API_KEY = 'test-key';
    expect(await ingestLead(mockLead)).toBe(false);

    process.env.NEXT_PUBLIC_API_GATEWAY_URL = 'https://api.test.com';
    process.env.NEXT_PUBLIC_API_KEY = '';
    expect(await ingestLead(mockLead)).toBe(false);
  });
});
