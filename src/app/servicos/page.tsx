'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/Section';
import { LeadModal } from '@/components/LeadModal';
import { Check, ArrowRight, Zap, Shield, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LogoCloud } from '@/components/LogoCloud';

interface Package {
  name: string;
  price: string;
  originalPrice?: string;
  activation: string;
  description: string;
  features: string[];
  footerLegend?: string;
  icon: React.ElementType;
  color: string;
  popular: boolean;
}

const packages: Package[] = [
  {
    name: "Básico",
    price: "97",
    activation: "295",
    description: "Presença digital sólida para quem está começando.",
    features: [
      "Site Institucional One-Page",
      "Design Responsivo",
      "Estrutura Otimizada para SEO",
      "Hospedagem Inclusa",
      "Certificado SSL (Segurança)",
      "Suporte via WhatsApp"
    ],
    icon: Shield,
    color: "text-brand-dark",
    popular: false
  },
  {
    name: "Intermediário",
    price: "229",
    activation: "549",
    description: "O combo perfeito para escala: Site + Gestão de Leads.",
    features: [
      "Site Institucional Completo",
      "Estrutura Otimizada para SEO",
      "Unum People CRM (App Android Incluso)",
      "Notificações Push em Tempo Real",
      "1 Landing Page de Alta Conversão",
      "Integração com o Google Ads",
      "Suporte via WhatsApp"
    ],
    icon: Zap,
    color: "text-brand-blue",
    popular: true
  },
  {
    name: "Avançado",
    price: "495",
    originalPrice: "599",
    activation: "799",
    description: "Performance total com gestão de tráfego integrada.",
    features: [
      "Tudo do Intermediário",
      "Gestão de Tráfego (Google Ads)",
      "Atribuição Inteligente CRM <-> Ads",
      "1 Landing Page Extra"
    ],
    icon: Crown,
    color: "text-brand-accent",
    popular: false
  }
];

export default function Servicos() {
  const [selectedPackage, setSelectedPackage] = useState<null | Package>(null);

  const handleSelect = (pkg: Package) => {
    setSelectedPackage(pkg);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero LP */}
      <Section className="pt-32 pb-12 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black text-brand-dark mb-6 tracking-tighter"
        >
          Soluções que <span className="text-brand-blue">Escalam</span>.
        </motion.h1>
        <p className="text-xl text-brand-dark/60 max-w-2xl mx-auto font-medium">
          Escolha o pacote que melhor se adapta ao momento da sua empresa e comece a converter mais hoje mesmo.
        </p>
      </Section>

      {/* Trust Section */}
      <LogoCloud />

      {/* Pricing Table */}
      <Section id="precos" className="pb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-brand-dark tracking-tighter">
            Escolha como iniciaremos sua <span className="text-brand-blue">Jornada</span>.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative p-10 rounded-[3rem] border transition-all duration-300 flex flex-col",
                pkg.popular 
                  ? "bg-brand-blue text-white border-brand-blue shadow-2xl scale-105 z-10" 
                  : "bg-white text-brand-dark border-brand-dark/5 hover:border-brand-blue/20 shadow-xl"
              )}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-orange text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  Mais Popular
                </div>
              )}

              <div className="flex items-center gap-4 mb-8">
                <div className={cn("p-3 rounded-2xl bg-white/10", !pkg.popular && "bg-brand-soft")}>
                  <pkg.icon className={cn("w-6 h-6", pkg.popular ? "text-white" : pkg.color)} />
                </div>
                <h3 className="text-2xl font-black tracking-tight">{pkg.name}</h3>
              </div>

              <div className="mb-8">
                {pkg.originalPrice && (
                  <span className="text-sm line-through opacity-40 font-bold block mb-1">
                    R$ {pkg.originalPrice}/mês
                  </span>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-bold opacity-60">R$</span>
                  <span className="text-5xl font-black tracking-tighter">{pkg.price}</span>
                  <span className="text-sm font-bold opacity-60">/mês</span>
                </div>
                <div className="mt-2 text-xs font-black uppercase tracking-widest opacity-40">
                  Ativação: R$ {pkg.activation}
                </div>
              </div>

              <p className={cn("mb-8 font-medium leading-relaxed", pkg.popular ? "text-white/70" : "text-brand-dark/60")}>
                {pkg.description}
              </p>

              <div className="space-y-4 mb-10 flex-grow">
                {pkg.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className={cn("w-5 h-5 mt-0.5 shrink-0", pkg.popular ? "text-brand-accent" : "text-brand-blue")} />
                    <span className="text-sm font-bold opacity-90 leading-tight">{feature}</span>
                  </div>
                ))}
                {pkg.footerLegend && (
                  <p className={cn(
                    "text-[10px] mt-4 font-medium italic",
                    pkg.popular ? "text-white/50" : "text-brand-dark/40"
                  )}>
                    {pkg.footerLegend}
                  </p>
                )}
              </div>

              <button
                onClick={() => handleSelect(pkg)}
                className={cn(
                  "w-full py-5 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 group",
                  pkg.popular
                    ? "bg-white text-brand-dark hover:bg-brand-accent hover:text-white"
                    : "bg-brand-dark text-white hover:bg-brand-blue"
                )}
              >
                Começar Jornada
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Lead Modal */}
      {selectedPackage && (
        <LeadModal 
          isOpen={!!selectedPackage}
          onClose={() => setSelectedPackage(null)}
          packageName={selectedPackage.name}
          whatsappLink={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Olá! Gostaria de saber mais sobre o pacote ${selectedPackage.name} da Unum People.`}
        />
      )}
    </div>
  );
}
