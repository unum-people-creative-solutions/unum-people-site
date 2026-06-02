'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Section } from '@/components/Section';
import { BrandValues } from '@/components/BrandValues';
import { LayoutGrid, Database, TrendingUp, Smartphone, ArrowRight, BarChart3, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <Section className="min-h-[85vh] flex items-center justify-center pt-32 md:pt-40">
        <div className="text-center max-w-4xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-5 py-2 mb-8 text-xs font-black tracking-widest text-brand-blue uppercase bg-brand-blue/10 rounded-full"
          >
            Unum People
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-6xl md:text-8xl font-black text-brand-dark mb-8 tracking-tighter leading-tight"
          >
            A tecnologia é a <span className="text-brand-blue">ponte invisível</span>.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-brand-dark/70 mb-12 leading-relaxed max-w-2xl mx-auto font-medium"
          >
            Encurtar distâncias, simplificar vendas. O caminho mais curto entre você e o seu cliente.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/servicos" className="px-8 py-4 text-sm font-black uppercase tracking-widest bg-brand-dark text-white rounded-full hover:bg-brand-blue transition-all flex items-center justify-center gap-2 group">
              Nossos Serviços
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#manifesto" className="px-8 py-4 text-sm font-black uppercase tracking-widest border-2 border-brand-dark/10 text-brand-dark rounded-full hover:bg-brand-soft transition-all">
              Nosso Manifesto
            </Link>
          </motion.div>
        </div>
      </Section>

      {/* Manifesto Section */}
      <Section id="manifesto" className="bg-brand-soft">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-brand-dark mb-8 tracking-tighter">
              Conexões genuínas não precisam de <span className="text-brand-blue">intermediários</span>.
            </h2>
            <div className="space-y-6 text-lg text-brand-dark/80 leading-relaxed font-medium">
              <p>
                Acreditamos que a complexidade técnica não deve ser uma barreira entre você e o seu cliente. O verdadeiro papel da tecnologia é eliminar a fricção do microempreendedor.
              </p>
              <p>
                Não construímos apenas sites ou sistemas de gestão. Nós criamos ferramentas utilitárias e diretas que devolvem a você o controle sobre as suas vendas.
              </p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-full rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center p-8 bg-[linear-gradient(135deg,var(--brand-blue)_0%,var(--brand-purple)_50%,var(--brand-orange)_100%)] min-h-[300px]"
          >
            <p className="text-3xl md:text-4xl font-light italic text-center text-white/90 leading-tight">
              &quot;A tecnologia é a ponte invisível; a relação direta e o resultado prático são o foco.&quot;
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Ecosystem Section */}
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
          {[
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
          ].map((item, index) => (
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

      {/* Unum People Tools Section */}
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
            {[
              { title: "Análise de Portfólio", icon: LayoutGrid, desc: "Mapeamento Estratégico" },
              { title: "Precificação", icon: BarChart3, desc: "Margem de Lucro Real" },
              { title: "Viabilidade", icon: TrendingUp, desc: "Calculadora de ROI" }
            ].map((tool, i) => (
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

      {/* CRM Highlight */}
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
              {[
                "Notificações em Tempo Real",
                "Feedback para Google Ads (Smart Bidding)",
                "Gestão de Pipeline Kanban",
                "App Android"
              ].map((text, i) => (
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

      <BrandValues />

      {/* Final CTA Banner */}
      <Section className="bg-[linear-gradient(135deg,var(--brand-blue)_0%,var(--brand-purple)_50%,var(--brand-orange)_100%)] text-white text-center py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">
            Pronto para gerar frutos reais?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed font-medium">
            Vamos transformar a realidade do seu negócio juntos.
          </p>
          <Link 
            href="/servicos" 
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-black uppercase tracking-widest bg-white text-brand-dark rounded-full hover:bg-brand-soft transition-all group"
          >
            Começar Jornada
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Section>
    </div>
  );
}
