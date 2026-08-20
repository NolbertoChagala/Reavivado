"use client";

import { useState, useActionState } from "react";
import { login } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Lock, Eye, EyeOff, Mail } from "lucide-react";
import Image from "next/image";
import logoadventista from "@/assets/img/logoadventista.webp";
import JA from "@/assets/img/JA.webp";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null);
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f4f6f9] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative font-sans">

      <div className="fixed top-6 left-6 z-20">
        <button
          onClick={() => router.push("/")}
          className="group flex items-center gap-3 px-4 py-2.5 bg-white border border-slate-200 hover:border-brand-gold text-slate-655 hover:text-slate-900 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
        >
          <div className="bg-white/80 p-1.5 rounded-xl group-hover:bg-brand-gold group-hover:text-white transition-all duration-300 shadow-sm border border-slate-100">
            <ArrowLeft size={14} className="text-slate-500 group-hover:text-white" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-slate-900 transition-colors">
            Volver al Inicio
          </span>
        </button>
      </div>

      <div className="w-full max-w-[420px] space-y-6 relative z-10">

        <div className="bg-white pt-10 pb-10 px-8 sm:px-10 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.04)] rounded-3xl border border-slate-200/80 border-t-4 border-t-brand-gold w-full relative">

          <div className="space-y-6">

            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-28 h-20 select-none">
                <div className="absolute top-0 left-2 w-14 h-14 bg-white rounded-full border border-brand-gold/30 shadow-[0_6px_20px_rgba(0,0,0,0.06)] flex items-center justify-center hover:scale-105 hover:z-20 transition-all duration-300">
                  <Image
                    src={logoadventista}
                    alt="IASD"
                    width={34}
                    height={34}
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="absolute bottom-0 right-2 w-14 h-14 bg-white rounded-full border-4 border-white ring-1 ring-slate-200/80 shadow-[0_10px_28px_rgba(0,0,0,0.12)] flex items-center justify-center hover:scale-105 hover:z-20 transition-all duration-300">
                  <Image
                    src={JA}
                    alt="JA"
                    width={32}
                    height={32}
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              <div className="text-center space-y-1">
                <h1 className="text-2xl font-black text-slate-800 tracking-wider uppercase leading-none">
                  REAVIVADO
                </h1>
                <p className="text-[10px] text-brand-gold font-bold uppercase tracking-[0.25em] leading-none">
                  Villas Otoch 4
                </p>
              </div>
            </div>

            <div className="text-center border-t border-slate-200/40 pt-5">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Acceso Administrativo</h2>
              <p className="text-[11px] text-slate-400 mt-1">Ingresa tus credenciales autorizadas para continuar.</p>
            </div>

            <form action={formAction} className="space-y-6">

              {state?.error && (
                <div className="flex items-center gap-2.5 p-3.5 bg-red-55/90 border border-red-200/50 text-red-700 rounded-xl text-xs font-semibold animate-in fade-in duration-200">
                  <span className="leading-tight">{state.error}</span>
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-1.5 group/input">
                  <label className="text-[10px] font-bold uppercase text-slate-400 ml-1 tracking-[0.2em] block group-focus-within/input:text-slate-855 transition-colors">
                    Correo Electrónico
                  </label>
                  <div className="relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within/input:text-slate-855 transition-colors">
                      <Mail size={15} />
                    </div>
                    <input
                      name="email"
                      type="email"
                      className="w-full py-3 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:border-brand-gold/60 focus:ring-4 focus:ring-brand-gold/5 outline-none transition-all placeholder:text-slate-355"
                      placeholder="correo@ejemplo.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5 group/input">
                  <label className="text-[10px] font-bold uppercase text-slate-400 ml-1 tracking-[0.2em] block group-focus-within/input:text-slate-855 transition-colors">
                    Contraseña
                  </label>
                  <div className="relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within/input:text-slate-855 transition-colors">
                      <Lock size={15} />
                    </div>
                    <input
                      name="password"
                      type={mostrarPassword ? "text" : "password"}
                      className="w-full py-3 pl-10 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:border-brand-gold/60 focus:ring-4 focus:ring-brand-gold/5 outline-none transition-all placeholder:text-slate-355"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setMostrarPassword(!mostrarPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-brand-gold transition-colors cursor-pointer"
                      tabIndex={-1}
                    >
                      {mostrarPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full mt-4 bg-brand-gold hover:bg-brand-gold-hover disabled:bg-slate-200 disabled:text-slate-400 text-white py-4 rounded-xl font-bold uppercase tracking-[0.3em] text-[11px] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-brand-gold/10 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <Loader2 size={14} className="animate-spin text-white" />
                    <span>Procesando...</span>
                  </>
                ) : (
                  <>
                    <Lock size={13} className="text-white" />
                    <span>Iniciar Sesión</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2.5 mt-8 select-none z-10">
          <div className="h-[1px] w-6 bg-brand-gold" />
          <p className="text-[10px] font-extrabold text-slate-600 uppercase tracking-[0.3em] text-center leading-relaxed">
            Ministerio Juvenil • IASD Villas Otoch 4
          </p>
        </div>
      </div>
    </div>
  );
}