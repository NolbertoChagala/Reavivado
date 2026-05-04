"use client";

import { useActionState } from "react";
import { crearUsuario } from "@/app/actions/usuarios";
import { UserPlus, Shield } from "lucide-react";

export default function FormularioUsuario() {
  const [state, formAction, isPending] = useActionState(crearUsuario, null);

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-4">
        {/* INPUT: NOMBRE */}
        <div className="space-y-1 group">
          <label className="text-[9px] font-bold uppercase text-slate-400 ml-1 tracking-widest group-focus-within:text-blue-500 transition-colors">
            Nombre del Administrador
          </label>
          <input
            name="nombre"
            type="text"
            placeholder="Ej: Nolberto Chagala"
            className="w-full py-3 px-1 border-b border-slate-200 focus:border-slate-900 outline-none text-sm font-semibold text-slate-800 transition-all bg-transparent placeholder:text-slate-300"
            required
          />
        </div>

        {/* INPUT: EMAIL */}
        <div className="space-y-1 group">
          <label className="text-[9px] font-bold uppercase text-slate-400 ml-1 tracking-widest group-focus-within:text-blue-500 transition-colors">
            Correo Electrónico
          </label>
          <input
            name="email"
            type="email"
            placeholder="admin@ejemplo.com"
            className="w-full py-3 px-1 border-b border-slate-200 focus:border-slate-900 outline-none text-sm font-semibold text-slate-800 transition-all bg-transparent placeholder:text-slate-300"
            required
          />
        </div>

        {/* INPUT: PASSWORD */}
        <div className="space-y-1 group">
          <label className="text-[9px] font-bold uppercase text-slate-400 ml-1 tracking-widest group-focus-within:text-blue-500 transition-colors">
            Contraseña de Acceso
          </label>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            className="w-full py-3 px-1 border-b border-slate-200 focus:border-slate-900 outline-none text-sm font-semibold text-slate-800 transition-all bg-transparent placeholder:text-slate-300"
            required
          />
        </div>

        {/* SELECT: ROL (FIJO COMO ADMINISTRADOR) */}
        <div className="space-y-1 opacity-60">
          <label className="text-[9px] font-bold uppercase text-slate-400 ml-1 tracking-widest">
            Privilegios del Sistema
          </label>
          <div className="relative">
            <select
              name="rol"
              className="w-full py-3 px-1 border-b border-slate-200 bg-transparent outline-none text-xs font-black text-slate-900 uppercase tracking-tighter appearance-none cursor-not-allowed"
              defaultValue="ADMIN"
            >
              <option value="ADMIN">Nivel: Administrador Total</option>
            </select>
            <Shield size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500" />
          </div>
        </div>
      </div>

      {/* MENSAJES DE ESTADO */}
      {state?.message && (
        <div className={`p-3 rounded-xl text-[10px] font-bold uppercase tracking-widest text-center ${
          state.success ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
        }`}>
          {state.message}
        </div>
      )}

      {/* BOTÓN DE ACCIÓN */}
      <button
        type="submit"
        disabled={isPending}
        className="flex items-center justify-center gap-3 w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-blue-600 transition-all disabled:bg-slate-200 disabled:text-slate-400 shadow-lg shadow-slate-100"
      >
        <UserPlus size={14} />
        {isPending ? "Procesando..." : "Autorizar nuevo acceso"}
      </button>
    </form>
  );
}