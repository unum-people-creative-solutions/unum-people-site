'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, Database, TrendingUp } from 'lucide-react';
import { Section } from '@/components/Section';
import { cn } from '@/lib/utils';

const ecosystemItems = [
  {
    title: "Sites & LPs",
    desc: "Interfaces vanguardistas focadas em performance e experiência do usuário.",
    icon: LayoutGrid,
    color: "text-blue-500",
    bg: "bg-blue-50"
  },
  {
    title: "Unum People CRM",
    desc: "Gestão inteligente de leads para máxima proximidade e agilidade no fechamento.",
    icon: Database,
    color: "text-brand-dark",
    bg: "bg-brand-soft"
  },
  {
    title: "Ads & Atribuição",
    desc: "Gestão de tráfego com inteligência de dados conectada ao seu faturamento real.",
    icon: TrendingUp,
    color: "text-brand-accent",
    bg: "bg-[#FBF8F3]"
  }
];

export const EcosystemSection = () => {
  return (
    <Section className="bg-white">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-black text-brand-dark mb-6 tracking-tighter">
          O Ecossistema <span className="text-brand-blue">Unum People</span>
        </h2>
        <p className="text-xl text-brand-dark/60 max-w-2xl mx-auto font-medium">
          Um único ecossistema indivisível trabalhando em harmonia para estabelecer pontes legítimas e o crescimento do seu negócio.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {ecosystemItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn("p-10 rounded-3xl border border-brand-dark/5 flex flex-col items-start gap-6 hover:shadow-xl transition-all group", item.bg)}
          >
            <div className={cn("p-4 rounded-2xl", item.color, "bg-white shadow-sm")}>
              <item.icon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-brand-dark tracking-tight">{item.title}</h3>
            <p className="text-brand-dark/70 font-medium leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
