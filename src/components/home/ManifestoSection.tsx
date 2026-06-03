'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/Section';

export const ManifestoSection = () => {
  return (
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
  );
};
