"use client";

import { useActionState } from "react";
import { crearUsuario } from "@/app/actions/usuarios";
import { UserPlus, Shield, User, Mail, Lock } from "lucide-react";

export default function FormularioUsuario() {
  const [state, formAction, isPending] = useActionState(crearUsuario, null);

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-4">
        {/* INPUT: NOMBRE */}
        <div className="space-y-1.5 group">
          <label className="text-[9px] font-bold text-slate-400 ml-1 group-focus-within:text-slate-900 transition-colors">
            Nombre del administrador
          </label>
          <div className="relative flex items-center">
            <User size={14} className="absolute left-3.5 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
            <input
              name="nombre"
              type="text"
              placeholder="Ej: Nolberto Chagala"
              className="w-full py-3.5 pl-10 pr-4 border border-slate-200/80 focus:border-brand-gold/60 focus:ring-0 focus:outline-none outline-none text-xs font-semibold text-slate-800 transition-all bg-transparent rounded-2xl placeholder:text-slate-350"
              required
            />
          </div>
        </div>

        {/* INPUT: EMAIL */}
        <div className="space-y-1.5 group">
          <label className="text-[9px] font-bold text-slate-400 ml-1 group-focus-within:text-slate-900 transition-colors">
            Correo electrónico
          </label>
          <div className="relative flex items-center">
            <Mail size={14} className="absolute left-3.5 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
            <input
              name="email"
              type="email"
              placeholder="admin@ejemplo.com"
              className="w-full py-3.5 pl-10 pr-4 border border-slate-200/80 focus:border-brand-gold/60 focus:ring-0 focus:outline-none outline-none text-xs font-semibold text-slate-800 transition-all bg-transparent rounded-2xl placeholder:text-slate-350"
              required
            />
          </div>
        </div>

        {/* INPUT: PASSWORD */}
        <div className="space-y-1.5 group">
          <label className="text-[9px] font-bold text-slate-400 ml-1 group-focus-within:text-slate-900 transition-colors">
            Contraseña de acceso
          </label>
          <div className="relative flex items-center">
            <Lock size={14} className="absolute left-3.5 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full py-3.5 pl-10 pr-4 border border-slate-200/80 focus:border-brand-gold/60 focus:ring-0 focus:outline-none outline-none text-xs font-semibold text-slate-800 transition-all bg-transparent rounded-2xl placeholder:text-slate-350"
              required
            />
          </div>
        </div>

        {/* SELECT: ROL (FIJO COMO ADMINISTRADOR) */}
        <div className="space-y-1.5 opacity-60 group">
          <label className="text-[9px] font-bold text-slate-400 ml-1">
            Privilegios del sistema
          </label>
          <div className="relative flex items-center">
            <Shield size={14} className="absolute left-3.5 text-slate-400" />
            <select
              name="rol"
              className="w-full py-3.5 pl-10 pr-4 border border-slate-200 bg-transparent outline-none focus:outline-none focus:ring-0 text-xs font-bold text-slate-900 appearance-none cursor-not-allowed rounded-2xl"
              defaultValue="ADMIN"
            >
              <option value="ADMIN">Nivel: Administrador total</option>
            </select>
          </div>
        </div>
      </div>

      {/* MENSAJES DE ESTADO */}
      {state?.message && (
        <div className={`p-3.5 rounded-xl text-[10px] font-bold text-center ${
          state.success ? "bg-green-50 text-green-700 border border-green-200/50" : "bg-red-50 text-red-655 border border-red-200/50"
        }`}>
          {state.message}
        </div>
      )}

      {/* BOTÓN DE ACCIÓN */}
      <button
        type="submit"
        disabled={isPending}
        className="flex items-center justify-center gap-2.5 w-full bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-0 disabled:bg-slate-100 disabled:text-slate-400 text-white py-4 rounded-2xl font-bold text-[10px] transition-all cursor-pointer shadow-md disabled:cursor-not-allowed mt-2"
      >
        <UserPlus size={14} className="text-brand-gold shrink-0" />
        <span>{isPending ? "Procesando..." : "Autorizar nuevo acceso"}</span>
      </button>
    </form>
  );
}