'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { lpConfigurar, lpEntrar, lpPlanos } from '@/lib/links';

const linkClasse =
  'inline-flex min-h-11 items-center text-sm font-bold text-brand-dark hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue transition-colors';

const Header = () => {
  const pathname = usePathname();
  const [aberto, setAberto] = useState(false);
  const fechar = () => setAberto(false);

  return (
    <header className="w-full py-4 px-6 md:px-12 flex flex-wrap justify-between items-center glass sticky top-0 z-50">
      <div className="flex items-center">
        <Link href="/" onClick={fechar} className="flex items-center gap-3 transition-transform hover:scale-[1.02] active:scale-95 group">
          <div className="relative h-10 w-10">
            <Image 
              src="/images/logo_simbolo.png" 
              alt="Unum People - Símbolo de Criatividade e Conexão" 
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="relative h-6 w-32 mt-1">
            <Image 
              src="/images/logo_texto.png" 
              alt="Unum People Creative Solutions" 
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>
      </div>

      <button
        type="button"
        aria-expanded={aberto}
        aria-controls="menu-principal"
        aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
        onClick={() => setAberto((valor) => !valor)}
        className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
      >
        {aberto ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
      </button>

      <nav
        id="menu-principal"
        aria-label="Principal"
        className={cn(
          'w-full flex-col items-start gap-1 pt-4 md:w-auto md:flex md:flex-row md:items-center md:gap-8 md:pt-0',
          aberto ? 'flex' : 'hidden',
        )}
      >
        <Link href="/" onClick={fechar} aria-current={pathname === '/' ? 'page' : undefined} className={linkClasse}>
          Início
        </Link>
        <Link href="/sobre" onClick={fechar} aria-current={pathname === '/sobre' ? 'page' : undefined} className={linkClasse}>
          Sobre
        </Link>
        <a href={lpPlanos()} className={linkClasse}>
          Planos
        </a>
        <a href={lpEntrar()} className={linkClasse}>
          Entrar
        </a>
        <a
          href={lpConfigurar('institucional')}
          className="inline-flex min-h-11 items-center px-5 py-2 text-xs font-black uppercase tracking-widest bg-brand-dark text-white rounded-full hover:bg-brand-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue transition-all"
        >
          Montar minha página
        </a>
      </nav>
    </header>
  );
};

export default Header;
