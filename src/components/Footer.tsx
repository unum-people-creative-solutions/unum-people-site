import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full py-16 px-6 md:px-12 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Top Section: Logo and Description */}
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="relative h-48 w-full max-w-[768px] mb-8 transition-opacity hover:opacity-80">
            <Image 
              src="/images/logo.png" 
              alt="Unum People Logo" 
              fill
              className="object-contain"
            />
          </Link>
          <p className="text-lg text-brand-dark/70 max-w-2xl leading-relaxed font-medium">
            Conectando e aproximando pessoas através de soluções tecnológicas criativas e inovadoras.
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-100 flex justify-center items-center text-xs text-brand-dark/40 font-medium uppercase tracking-widest">
        <div>
          &copy; {new Date().getFullYear()} Unum People Creative Solutions. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
