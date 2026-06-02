import React from 'react';
import { Layers, Link as LinkIcon, Heart, Route, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const values = [
  {
    title: 'Unidade',
    description: 'Atuar em convergência. Trabalhamos para que o empreendedor e seu cliente estejam alinhados, eliminando divisões.',
    icon: Layers,
  },
  {
    title: 'Conexão',
    description: 'Estabelecer pontes legítimas. A tecnologia não é um fim, mas o meio para criar vínculos autênticos.',
    icon: LinkIcon,
  },
  {
    title: 'Relacionamento',
    description: 'Priorizar as pessoas antes das transações. Negócios são sustentados pela confiança.',
    icon: Heart,
  },
  {
    title: 'Jornada',
    description: 'Caminhar lado a lado. O crescimento é contínuo e nos comprometemos a apoiar seu desenvolvimento.',
    icon: Route,
  },
  {
    title: 'Transformação',
    description: 'Gerar frutos reais. O trabalho deve renovar a realidade à nossa volta de forma justa e sustentável.',
    icon: Sparkles,
  },
];

export const BrandValues = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-brand-blue mb-4">
            Princípios Norteadores
          </h2>
          <p className="text-3xl md:text-5xl font-black text-brand-dark tracking-tighter">
            Os valores que guiam nossa <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,var(--brand-blue)_0%,var(--brand-purple)_50%,var(--brand-orange)_100%)]">tecnologia</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-brand-soft border border-brand-dark/5 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <value.icon className="w-6 h-6 text-brand-orange" />
              </div>
              <h3 className="text-xl font-black text-brand-dark mb-3 tracking-tight">
                {value.title}
              </h3>
              <p className="text-brand-dark/70 font-medium leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
