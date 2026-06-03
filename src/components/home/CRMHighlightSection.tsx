'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Smartphone, ArrowRight } from 'lucide-react';
import { Section } from '@/components/Section';

const crmFeatures = [
  "Notificações em Tempo Real",
  "Feedback para Google Ads (Smart Bidding)",
  "Gestão de Pipeline Kanban",
  "App Android"
];

export const CRMHighlightSection = () => {
  return (
    <Section className="bg-brand-dark text-white overflow-hidden">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-brand-blue rounded-xl">
              <Smartphone className="w-6 h-6" />
            </div>
            <span className="font-bold tracking-widest uppercase text-xs text-brand-accent">Exclusivo Unum People CRM</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">
            Seu negócio no <span className="text-brand-accent">bolso</span>.
          </h2>
          <p className="text-xl text-white/70 mb-10 leading-relaxed font-medium">
            Receba notificações push instantâneas no seu Android assim que um novo lead chegar. Atendimento em segundos, conexão imediata.
          </p>
          <ul className="space-y-4 mb-12">
            {crmFeatures.map((text, i) => (
              <li key={i} className="flex items-center gap-3 font-bold">
                <div className="w-2 h-2 rounded-full bg-brand-accent" />
                {text}
              </li>
            ))}
          </ul>
          <Link 
            href="/servicos" 
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-black uppercase tracking-widest bg-brand-accent text-brand-dark rounded-full hover:bg-white transition-all group"
          >
            Conhecer Pacotes
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="bg-gradient-to-b from-brand-blue/20 to-transparent absolute inset-0 rounded-full blur-3xl" />
          <div className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-4 aspect-[9/16] shadow-2xl overflow-hidden max-w-[320px] mx-auto">
            {/* Mockup do App */}
            <div className="bg-[#121212] w-full h-full rounded-[2.5rem] overflow-hidden flex flex-col p-6">
              <div className="flex justify-between items-center mb-8">
                <div className="text-[10px] font-bold text-white/40">UNUM PEOPLE CRM</div>
                <div className="w-8 h-1 bg-white/10 rounded-full" />
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="flex justify-between items-center mb-2">
                      <div className="w-20 h-2 bg-white/20 rounded-full" />
                      <div className="w-8 h-2 bg-brand-blue/40 rounded-full" />
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full" />
                  </div>
                ))}
                <div className="bg-brand-blue p-4 rounded-2xl animate-pulse">
                  <div className="flex justify-between items-center mb-2">
                    <div className="w-24 h-2 bg-white/40 rounded-full" />
                    <div className="w-8 h-2 bg-white/60 rounded-full" />
                  </div>
                  <div className="w-full h-2 bg-white/20 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};
