"use client";

import { login } from "@/app/actions/auth";
import { ArrowLeft, Loader2, Lock } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import Image from "next/image";
import logoadventista from "@/assets/img/logoadventista.webp";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col justify-center px-6 relative font-sans">
      
      {/* BOTÓN VOLVER: Rediseño Elegante y Visible */}
      <div className="fixed top-8 left-8 z-20">
        <Link 
          href="/" 
          className="group flex items-center gap-3 px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-[#D4AF37] transition-all duration-300"
        >
          <div className="bg-slate-50 p-1.5 rounded-lg group-hover:bg-[#D4AF37] group-hover:text-white transition-all duration-300">
            <ArrowLeft size={14} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-slate-900 transition-colors">
            Volver al Inicio
          </span>
        </Link>
      </div>

      <div className="w-full max-w-sm mx-auto space-y-10 relative">
        
        {/* IDENTIDAD: Logo Institucional Protagonista */}
        <div className="flex flex-col items-center space-y-6">
          <div className="relative h-20 w-44 transition-transform duration-500 hover:scale-105">
            <Image 
              src={logoadventista} 
              alt="IASD Logo" 
              fill 
              className="object-contain"
              priority 
            />
          </div>
          
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
              REAVIVADO<span className="text-[#D4AF37] not-italic">.</span>
            </h1>
            <div className="flex items-center justify-center gap-3">
              <div className="h-[1px] w-6 bg-[#D4AF37] opacity-30" />
              <p className="text-[9px] text-[#A68A56] font-bold uppercase tracking-[0.4em]">
                Acceso Reservado
              </p>
              <div className="h-[1px] w-6 bg-[#D4AF37] opacity-30" />
            </div>
          </div>
        </div>

        {/* LOGIN CARD: Diseño Minimalista con Acento Dorado */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden group">
          {/* Borde superior dorado sutil */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60" />
          
          <form action={formAction} className="space-y-8">
            
            {state?.error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border-l-2 border-red-500 text-red-600 rounded-r-xl text-[11px] font-bold animate-in fade-in slide-in-from-top-1">
                <span className="uppercase tracking-tight">{state.error}</span>
              </div>
            )}

            <div className="space-y-6">
              {/* CAMPO: IDENTIFICADOR */}
              <div className="space-y-2 group/input">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-[0.2em] group-focus-within/input:text-[#D4AF37] transition-colors">
                  Identificador
                </label>
                <div className="relative">
                  <input 
                    name="email" 
                    type="email" 
                    className="w-full py-4 px-5 bg-slate-50 border-2 border-transparent rounded-2xl text-sm font-bold text-slate-900 focus:bg-white focus:border-[#D4AF37]/30 outline-none transition-all placeholder:text-slate-300"
                    placeholder="admin@villasotoch.com"
                    required 
                  />
                </div>
              </div>

              {/* CAMPO: PASSWORD */}
              <div className="space-y-2 group/input">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-[0.2em] group-focus-within/input:text-[#D4AF37] transition-colors">
                  Contraseña
                </label>
                <div className="relative">
                  <input 
                    name="password" 
                    type="password" 
                    className="w-full py-4 px-5 bg-slate-50 border-2 border-transparent rounded-2xl text-sm font-bold text-slate-900 focus:bg-white focus:border-[#D4AF37]/30 outline-none transition-all placeholder:text-slate-300"
                    placeholder="••••••••"
                    required 
                  />
                </div>
              </div>
            </div>

            {/* BOTÓN: ACCIÓN GOLD & BLACK */}
            <button 
              type="submit" 
              disabled={isPending}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.4em] text-[10px] hover:bg-[#D4AF37] active:scale-[0.98] transition-all shadow-xl shadow-slate-100 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isPending ? (
                <Loader2 size={16} className="animate-spin text-white" />
              ) : (
                <>
                  <Lock size={14} className="text-[#D4AF37]" />
                  <span>Entrar al Sistema</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* PIE DE PÁGINA */}
        <div className="flex flex-col items-center gap-4 opacity-40">
          <div className="h-[1px] w-8 bg-[#D4AF37]" />
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.5em] text-center leading-relaxed">
            Ministerio Juvenil<br />
            IASD Villas Otoch 4
          </p>
        </div>
      </div>
    </div>
  );
}