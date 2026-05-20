'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isServicosPage = pathname === '/servicos';

  const handleScrollToPrecos = (e: React.MouseEvent) => {
    if (isServicosPage) {
      e.preventDefault();
      const element = document.getElementById('precos');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="w-full py-4 px-6 md:px-12 flex justify-between items-center glass sticky top-0 z-50">
      <div className="flex items-center">
        <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-[1.02] active:scale-95 group">
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

      <nav className="hidden md:flex items-center gap-8">
        <Link href="/" className="text-sm font-bold text-brand-dark hover:text-brand-blue transition-colors">
          Início
        </Link>
        
        {!isServicosPage && (
          <Link href="/servicos" className="text-sm font-bold text-brand-dark hover:text-brand-blue transition-colors">
            Serviços
          </Link>
        )}

        {isServicosPage ? (
          <a 
            href="#precos" 
            onClick={handleScrollToPrecos}
            className="px-5 py-2 text-xs font-black uppercase tracking-widest bg-brand-dark text-white rounded-full hover:bg-brand-blue transition-all"
          >
            Começar Agora
          </a>
        ) : (
          <Link 
            href="/servicos" 
            className="px-5 py-2 text-xs font-black uppercase tracking-widest bg-brand-dark text-white rounded-full hover:bg-brand-blue transition-all"
          >
            Começar Agora
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
