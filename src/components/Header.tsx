import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="w-full py-4 px-6 md:px-12 border-b border-gray-100 flex justify-start items-center bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center">
        <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-[1.02] active:scale-95 group">
          <div className="relative h-10 w-10">
            <Image 
              src="/images/logo_simbolo.png" 
              alt="Unum People Símbolo" 
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="relative h-6 w-32 mt-1">
            <Image 
              src="/images/logo_texto.png" 
              alt="Unum People" 
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
