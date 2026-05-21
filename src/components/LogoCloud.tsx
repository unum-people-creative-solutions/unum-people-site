'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Section } from './Section';
import { Globe } from 'lucide-react';

const clients = [
  { 
    name: 'Psicóloga Andrielly Oliveira', 
    url: 'https://psiandriellyoliveira.com.br/',
    description: 'Site Institucional & Gestão de Leads'
  },
  { 
    name: 'Centro de Psicologia Recriar', 
    url: 'https://centrorecriar.com.br/',
    description: 'Plataforma de Saúde & Conversão'
  },
];

export function LogoCloud() {
  return (
    <Section className="py-24 bg-brand-soft/30">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-brand-blue mb-4">Portfólio de Confiança</h2>
          <p className="text-3xl md:text-4xl font-black text-brand-dark tracking-tighter">
            Projetos que <span className="text-brand-blue">conectam</span> você ao seu cliente.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {clients.map((client, index) => (
            <motion.a
              key={index}
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative block"
            >
              <div className="relative aspect-video rounded-3xl overflow-hidden bg-brand-dark shadow-2xl transition-transform duration-500 group-hover:-translate-y-2 border border-brand-dark/10">
                {/* Real Website Screenshot using Microlink */}
                <div className="w-full h-full bg-brand-dark relative">
                  <Image 
                    src={`https://api.microlink.io?url=${encodeURIComponent(client.url)}&screenshot=true&meta=false&embed=screenshot.url`}
                    alt={`Preview do site ${client.name}`}
                    fill
                    className="object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-brand-blue/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-8 text-center backdrop-blur-sm">
                  <div className="text-white">
                    <div className="text-xs font-black uppercase tracking-widest mb-2">Visitar Projeto</div>
                    <div className="text-2xl font-black tracking-tighter leading-tight">
                      {client.url.replace('https://', '')}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center px-2">
                <div>
                  <h3 className="text-lg font-black text-brand-dark tracking-tight">{client.name}</h3>
                </div>
                <div className="w-10 h-10 rounded-full border border-brand-dark/10 flex items-center justify-center group-hover:bg-brand-dark group-hover:text-white transition-all duration-300">
                  <Globe className="w-4 h-4" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </Section>
  );
}
