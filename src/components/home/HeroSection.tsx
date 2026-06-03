'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/Section';

const NeonBridgeBackground = () => {
  return (
    <div className="absolute inset-0 z-0 bg-[#020408] overflow-hidden">
      {/* Background image removed as requested, keeping only the neon effect */}
      
      {/* 2. Optimized Neon Effect: Nested masks for scanner + bridge shape */}
      <motion.div 
        className="absolute inset-0 z-10 will-change-[mask-position]"
        animate={{
          maskPosition: ["200% 0", "-100% 0"]
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          // Scanner Mask (Reveals the neon)
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,1) 80%, rgba(0,0,0,1) 85%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,1) 80%, rgba(0,0,0,1) 85%, transparent 100%)',
          WebkitMaskSize: '200% 100%',
          maskSize: '200% 100%',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat'
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            // The actual bridge shape mask
            WebkitMaskImage: 'url(/images/bridge-mask.webp)',
            maskImage: 'url(/images/bridge-mask.webp)',
            WebkitMaskSize: 'cover',
            maskSize: 'cover',
            // Focal point: 80% for mobile (perspective without empty space), center for desktop
            WebkitMaskPosition: 'var(--bridge-pos, center)',
            maskPosition: 'var(--bridge-pos, center)',
            maskMode: 'luminance',
            WebkitMaskMode: 'luminance'
          } as React.CSSProperties & { maskMode?: string; WebkitMaskMode?: string }}
        >
          <style jsx>{`
            div { --bridge-pos: 80% center; }
            @media (min-width: 768px) { div { --bridge-pos: center; } }
          `}</style>
          {/* Layer 1: The Core Sharp Lines */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-orange opacity-100 mix-blend-screen" />
          
          {/* Layer 2: The Neon Bloom (Blurred glow around the lines) */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-orange blur-[3px] opacity-80 mix-blend-screen scale-[1.002]" />
          
          {/* Layer 3: Inner White Highlight for extra "spark" */}
          <div className="absolute inset-0 bg-white opacity-20 mix-blend-overlay" />
        </div>
      </motion.div>
      
      {/* 3. Global Glow (Restored for more impact) */}
      <div className="absolute inset-0 pointer-events-none backdrop-blur-[2px] bg-brand-blue/5 mix-blend-screen opacity-40" />
    </div>
  );
};

export const HeroSection = () => {
  return (
    <Section className="min-h-[85vh] flex items-center justify-center pt-32 md:pt-40 relative overflow-hidden bg-black">
      <NeonBridgeBackground />
      
      <div className="text-center max-w-4xl mx-auto relative z-20">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block px-5 py-2 mb-8 text-xs font-black tracking-widest text-white uppercase bg-white/10 backdrop-blur-md rounded-full border border-white/10"
        >
          Unum People
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]"
        >
          A tecnologia é a <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4D7CFF] via-white to-[#FFB800] animate-text-gradient drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">ponte invisível</span>.
        </motion.h1>

        <style jsx>{`
          @keyframes text-gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-text-gradient {
            background-size: 200% auto;
            animation: text-gradient 3s linear infinite;
            will-change: background-position;
          }
        `}</style>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed max-w-2xl mx-auto font-medium"
        >
          Encurtar distâncias, simplificar vendas. O caminho mais curto entre você e o seu cliente.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/servicos" className="px-8 py-4 text-sm font-black uppercase tracking-widest bg-white text-brand-dark rounded-full hover:bg-brand-blue hover:text-white transition-all flex items-center justify-center gap-2 group shadow-xl shadow-white/5">
            Nossos Serviços
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="#manifesto" className="px-8 py-4 text-sm font-black uppercase tracking-widest border-2 border-white/20 text-white rounded-full hover:bg-white/10 backdrop-blur-sm transition-all">
            Nosso Manifesto
          </Link>
        </motion.div>
      </div>
    </Section>
  );
};
