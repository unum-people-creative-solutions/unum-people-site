import React from 'react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-8 text-center bg-white">
      <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <span className="inline-block px-4 py-1.5 mb-8 text-xs font-bold tracking-widest text-brand-blue uppercase bg-brand-blue/10 rounded-full">
          Em breve
        </span>
        <h1 className="text-5xl md:text-7xl font-black text-brand-dark mb-8 tracking-tighter leading-tight">
          Estamos construindo algo <span className="text-brand-blue">incrível</span>.
        </h1>
        <p className="text-lg md:text-xl text-brand-dark/70 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
          Na <span className="text-brand-dark font-bold">Unum People Creative Solutions</span>, nossa missão é conectar e aproximar pessoas através da tecnologia. Estamos trabalhando duro para trazer soluções SaaS inovadoras.
        </p>
      </div>
    </div>
  );
}
