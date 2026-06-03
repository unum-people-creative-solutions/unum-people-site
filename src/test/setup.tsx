import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extende os matchers do Vitest com os do Testing Library
expect.extend(matchers);

// Limpa o DOM após cada teste
afterEach(() => {
  cleanup();
});

// Mock do Framer Motion para evitar problemas com animações nos testes
vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal<typeof import('framer-motion')>();
  return {
    ...actual,
    motion: {
      ...actual.motion,
      div: (props: React.HTMLAttributes<HTMLDivElement>) => <div {...props} />,
      header: (props: React.HTMLAttributes<HTMLElement>) => <header {...props} />,
      footer: (props: React.HTMLAttributes<HTMLElement>) => <footer {...props} />,
      section: (props: React.HTMLAttributes<HTMLElement>) => <section {...props} />,
      h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 {...props} />,
      h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 {...props} />,
      p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p {...props} />,
      a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props} />,
      button: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => <button {...props} />,
      span: (props: React.HTMLAttributes<HTMLSpanElement>) => <span {...props} />,
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

// Mock do Next.js Navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));
