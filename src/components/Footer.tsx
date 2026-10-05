import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { EMPRESA } from '@/lib/empresa';
import { lpConfigurar, lpEntrar, lpPlanos } from '@/lib/links';

const linkClasse =
  'inline-flex min-h-11 items-center text-sm font-bold text-brand-dark/60 hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue transition-colors';
const tituloClasse = 'text-xs font-black uppercase tracking-widest text-brand-dark mb-4';

const Footer = () => {
  return (
    <footer className="w-full py-16 px-6 md:px-12 bg-brand-soft border-t border-brand-dark/5">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        {/* Logo, slogan e identificação da empresa */}
        <div className="md:col-span-2">
          <Link href="/" className="relative h-12 w-48 mb-6 block transition-opacity hover:opacity-80">
            <Image 
              src="/images/logo_texto.png" 
              alt="Unum People Creative Solutions" 
              fill
              className="object-contain object-left"
            />
          </Link>
          <p className="text-brand-dark/60 max-w-sm leading-relaxed font-medium mb-6">
            O caminho mais curto entre você e o seu cliente.
          </p>
          <address className="not-italic text-sm text-brand-dark/60 font-medium leading-relaxed space-y-1">
            <p>{EMPRESA.razaoSocial}</p>
            <p>CNPJ {EMPRESA.cnpj}</p>
            <p>{EMPRESA.endereco}</p>
            <p>
              <a
                href={`mailto:${EMPRESA.email}`}
                className="underline underline-offset-2 hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              >
                {EMPRESA.email}
              </a>
            </p>
          </address>
        </div>

        {/* Links: Navegação */}
        <nav aria-label="Navegação">
          <h2 className={tituloClasse}>Navegação</h2>
          <ul className="space-y-1">
            <li><Link href="/" className={linkClasse}>Início</Link></li>
            <li><Link href="/sobre" className={linkClasse}>Sobre</Link></li>
            <li><a href={lpPlanos()} className={linkClasse}>Planos</a></li>
            <li><Link href="/contato" className={linkClasse}>Contato</Link></li>
            <li><Link href="/privacidade" className={linkClasse}>Privacidade</Link></li>
          </ul>
        </nav>

        {/* Links: Produto */}
        <nav aria-label="Produto">
          <h2 className={tituloClasse}>Produto</h2>
          <ul className="space-y-1">
            <li><a href={lpConfigurar('institucional')} className={linkClasse}>Montar minha página</a></li>
            <li>
              <a href="https://docs.unumpeople.com.br/paginas/" target="_blank" rel="noopener noreferrer" className={linkClasse}>
                Central de ajuda
              </a>
            </li>
            <li><a href={lpEntrar()} className={linkClasse}>Entrar</a></li>
            <li>
              <a href="https://crm.unumpeople.com.br" target="_blank" rel="noopener noreferrer" className={linkClasse}>
                CRM
              </a>
            </li>
            <li>
              <a href="https://tools.unumpeople.com.br" target="_blank" rel="noopener noreferrer" className={linkClasse}>
                Ferramentas
              </a>
            </li>
          </ul>
        </nav>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-brand-dark/5 text-[10px] text-brand-dark/40 font-bold uppercase tracking-widest">
        &copy; 2026 Unum People - Creative Solutions. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
