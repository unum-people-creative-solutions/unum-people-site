'use client';

import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Send, AlertCircle } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PatternFormat } from 'react-number-format';
import { cn } from '@/lib/utils';
import { ingestLead } from '@/lib/crm';
import { getStoredTrackingData } from '@/lib/tracking';

const leadSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().refine((val) => {
    const digits = val.replace(/\D/g, '');
    return digits.length >= 10;
  }, 'Telefone incompleto (mínimo 10 dígitos com DDD)'),
});

type LeadFormData = z.infer<typeof leadSchema>;

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName: string;
  whatsappLink: string;
}

export const LeadModal = ({ isOpen, onClose, packageName, whatsappLink }: LeadModalProps) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    mode: 'all',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    }
  });

  const onSubmit = async (data: LeadFormData) => {
    console.log('Formulário submetido:', data);
    setLoading(true);
    
    // Captura dados de rastreamento persistidos no sessionStorage
    const trackingData = getStoredTrackingData();
    console.log('Dados de rastreamento:', trackingData);
    
    // Ingestão no CRM Unum People
    const success = await ingestLead({
      nome: data.name,
      telefone: data.phone,
      email: data.email,
      origem: `Site Principal - ${packageName}`,
      ...trackingData
    });

    console.log('Resultado da ingestão CRM:', success);

    setLoading(false);
    reset();
    window.open(whatsappLink, '_blank');
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] animate-in fade-in" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-lg bg-white rounded-3xl p-8 shadow-2xl z-[101] animate-in zoom-in-95 duration-200">
          <div className="flex justify-between items-start mb-6">
            <div>
              <Dialog.Title className="text-2xl font-black text-brand-dark tracking-tighter">
                Falta pouco para sua <span className="text-brand-blue">nova conexão</span>.
              </Dialog.Title>
              <Dialog.Description className="text-brand-dark/60 font-medium mt-2">
                Você selecionou o <span className="text-brand-blue font-bold">{packageName}</span>. Preencha os dados para iniciarmos o atendimento.
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button 
                aria-label="Fechar modal"
                className="p-2 hover:bg-brand-soft rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-brand-dark/40" />
              </button>
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label 
                htmlFor="name"
                className="block text-xs font-black uppercase tracking-widest text-brand-dark/40 mb-2"
              >
                Seu Nome
              </label>
              <input 
                {...register('name')}
                id="name"
                type="text" 
                placeholder="Ex: João Silva"
                className={cn(
                  "w-full px-5 py-4 bg-brand-soft border rounded-2xl focus:outline-none focus:ring-2 transition-all font-medium",
                  errors.name ? "border-red-500 focus:ring-red-200" : "border-brand-dark/5 focus:ring-brand-blue/20"
                )}
              />
              {errors.name && (
                <span className="flex items-center gap-1 mt-1 text-xs text-red-500 font-bold">
                  <AlertCircle className="w-3 h-3" /> {errors.name.message}
                </span>
              )}
            </div>

            <div>
              <label 
                htmlFor="email"
                className="block text-xs font-black uppercase tracking-widest text-brand-dark/40 mb-2"
              >
                Seu E-mail
              </label>
              <input 
                {...register('email')}
                id="email"
                type="email" 
                placeholder="exemplo@email.com"
                className={cn(
                  "w-full px-5 py-4 bg-brand-soft border rounded-2xl focus:outline-none focus:ring-2 transition-all font-medium",
                  errors.email ? "border-red-500 focus:ring-red-200" : "border-brand-dark/5 focus:ring-brand-blue/20"
                )}
              />
              {errors.email && (
                <span className="flex items-center gap-1 mt-1 text-xs text-red-500 font-bold">
                  <AlertCircle className="w-3 h-3" /> {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <label 
                htmlFor="phone"
                className="block text-xs font-black uppercase tracking-widest text-brand-dark/40 mb-2"
              >
                Seu WhatsApp
              </label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PatternFormat
                    {...field}
                    id="phone"
                    format="(##) #####-####"
                    mask="_"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    onValueChange={(values) => {
                      field.onChange(values.value ? values.formattedValue : '');
                    }}
                    className={cn(
                      "w-full px-5 py-4 bg-brand-soft border rounded-2xl focus:outline-none focus:ring-2 transition-all font-medium",
                      errors.phone ? "border-red-500 focus:ring-red-200" : "border-brand-dark/5 focus:ring-brand-blue/20"
                    )}
                  />
                )}
              />
              {errors.phone && (
                <span className="flex items-center gap-1 mt-1 text-xs text-red-500 font-bold">
                  <AlertCircle className="w-3 h-3" /> {errors.phone.message}
                </span>
              )}
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-5 bg-brand-dark text-white rounded-2xl font-black uppercase tracking-widest hover:bg-brand-blue transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? "Processando..." : (
                <>
                  Continuar para WhatsApp
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-[10px] text-center text-brand-dark/40 font-bold uppercase tracking-wider mt-6">
            Ao continuar, você concorda com nossa política de privacidade.
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
