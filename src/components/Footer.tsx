'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();
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
    <footer className="w-full py-16 px-6 md:px-12 bg-brand-soft border-t border-brand-dark/5">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        {/* Logo & Description */}
        <div className="md:col-span-2">
          <Link href="/" className="relative h-12 w-48 mb-6 block transition-opacity hover:opacity-80">
            <Image 
              src="/images/logo_texto.png" 
              alt="Unum People Creative Solutions" 
              fill
              className="object-contain object-left"
            />
          </Link>
          <p className="text-brand-dark/60 max-w-sm leading-relaxed font-medium">
            Conectando e aproximando pessoas através de soluções tecnológicas criativas e inovadoras. Reduzindo distâncias, criando pontes.
          </p>
        </div>

        {/* Links: Navegação */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-widest text-brand-dark mb-6">Navegação</h4>
          <ul className="space-y-4">
            <li>
              <Link href="/" className="text-sm font-bold text-brand-dark/60 hover:text-brand-blue transition-colors">Início</Link>
            </li>
            <li>
              {isServicosPage ? (
                <a 
                  href="#precos" 
                  onClick={handleScrollToPrecos}
                  className="text-sm font-bold text-brand-dark/60 hover:text-brand-blue transition-colors"
                >
                  Serviços
                </a>
              ) : (
                <Link href="/servicos" className="text-sm font-bold text-brand-dark/60 hover:text-brand-blue transition-colors">
                  Serviços
                </Link>
              )}
            </li>
            <li>
              {isServicosPage ? (
                <a 
                  href="#precos" 
                  onClick={handleScrollToPrecos}
                  className="text-sm font-bold text-brand-dark/60 hover:text-brand-blue transition-colors"
                >
                  Pacotes & Preços
                </a>
              ) : (
                <Link href="/servicos" className="text-sm font-bold text-brand-dark/60 hover:text-brand-blue transition-colors">
                  Pacotes & Preços
                </Link>
              )}
            </li>
          </ul>
        </div>

        {/* Links: Ecossistema */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-widest text-brand-dark mb-6">Ecossistema</h4>
          <ul className="space-y-4">
            <li>
              <a href="https://crm.unumpeople.com.br" target="_blank" className="text-sm font-bold text-brand-dark/60 hover:text-brand-blue transition-colors">Unum People CRM</a>
            </li>
            <li>
              <a href="https://tools.unumpeople.com.br" target="_blank" className="text-sm font-bold text-brand-dark/60 hover:text-brand-blue transition-colors">Ferramentas</a>
            </li>
            <li>
              {isServicosPage ? (
                <a 
                  href="#precos" 
                  onClick={handleScrollToPrecos}
                  className="text-sm font-bold text-brand-dark/60 hover:text-brand-blue transition-colors"
                >
                  Gestão de Tráfego
                </a>
              ) : (
                <Link href="/servicos" className="text-sm font-bold text-brand-dark/60 hover:text-brand-blue transition-colors">
                  Gestão de Tráfego
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-brand-dark/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-brand-dark/40 font-bold uppercase tracking-widest">
        <div>
          &copy; {new Date().getFullYear()} Unum People Creative Solutions.
        </div>
        <div className="flex gap-8">
          <span>Brasil</span>
          <span>Sempre Conectados</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
