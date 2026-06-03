'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, BarChart3, TrendingUp, ExternalLink } from 'lucide-react';
import { Section } from '@/components/Section';

const tools = [
  { title: "Análise de Portfólio", icon: LayoutGrid, desc: "Mapeamento Estratégico" },
  { title: "Precificação", icon: BarChart3, desc: "Margem de Lucro Real" },
  { title: "Viabilidade", icon: TrendingUp, desc: "Calculadora de ROI" }
];

export const ToolsSection = () => {
  return (
    <Section className="bg-brand-soft">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-black tracking-widest text-brand-blue uppercase mb-4 block">Inteligência & Produtividade</span>
          <h2 className="text-4xl md:text-6xl font-black text-brand-dark mb-8 tracking-tighter">
            Ferramentas que <span className="text-brand-blue">Impulsionam</span> sua Escala.
          </h2>
          <p className="text-xl text-brand-dark/70 mb-10 leading-relaxed font-medium">
            Nosso hub proprietário combina ferramentas avançadas e recursos gratuitos desenhados para trazer agilidade baseada em dados para o seu dia a dia.
          </p>
          <a 
            href="https://tools.unumpeople.com.br" 
            target="_blank"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-black uppercase tracking-widest bg-brand-blue text-white rounded-full hover:bg-brand-dark transition-all group"
          >
            Acessar Hub de Ferramentas
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {tools.map((tool, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 bg-white rounded-3xl border border-brand-dark/5 hover:shadow-lg transition-all"
            >
              <tool.icon className="w-6 h-6 text-brand-blue mb-4" />
              <h4 className="font-black text-brand-dark mb-1 tracking-tight">{tool.title}</h4>
              <p className="text-xs text-brand-dark/50 font-bold">{tool.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};
