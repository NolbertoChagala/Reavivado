import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, Info } from "lucide-react";

interface AuthCredentialsFormProps {
  formAction: (payload: FormData) => void;
  isPending: boolean;
  error?: string | null;
}

export default function AuthCredentialsForm({
  formAction,
  isPending,
  error,
}: AuthCredentialsFormProps) {
  const [mostrarPassword, setMostrarPassword] = useState(false);

  return (
    <div className="w-full max-w-sm mx-auto my-2 lg:my-auto space-y-5">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Iniciar Sesión
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Accede al panel de gestión con tus credenciales autorizadas
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-md text-xs font-semibold animate-in fade-in duration-200">
          <AlertCircle size={15} className="shrink-0 text-rose-600" />
          <span className="leading-tight">{error}</span>
        </div>
      )}

      <form action={formAction} className="space-y-4">
        {/* Campo: Correo */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs font-semibold text-slate-700 block">
            Correo electrónico
          </label>
          <div className="relative flex items-center">
            <Mail size={15} className="absolute left-3 text-slate-400 pointer-events-none" />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="admin@ejemplo.com"
              required
              className="w-full bg-white border border-slate-300 focus:border-[#0d2b56] focus:ring-2 focus:ring-[#0d2b56]/10 rounded-md py-2.5 pl-9 pr-3 text-xs font-medium text-slate-900 focus:outline-none placeholder:text-slate-400 transition-colors"
            />
          </div>
        </div>

        {/* Campo: Contraseña */}
        <div className="space-y-1.5">
          <label htmlFor="password" className="text-xs font-semibold text-slate-700 block">
            Contraseña
          </label>
          <div className="relative flex items-center">
            <Lock size={15} className="absolute left-3 text-slate-400 pointer-events-none" />
            <input
              id="password"
              name="password"
              type={mostrarPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              required
              className="w-full bg-white border border-slate-300 focus:border-[#0d2b56] focus:ring-2 focus:ring-[#0d2b56]/10 rounded-md py-2.5 pl-9 pr-10 text-xs font-medium text-slate-900 focus:outline-none placeholder:text-slate-400 transition-colors"
            />
            <button
              type="button"
              onClick={() => setMostrarPassword(!mostrarPassword)}
              className="absolute right-3 text-slate-400 hover:text-slate-700 cursor-pointer"
              tabIndex={-1}
              aria-label={mostrarPassword ? "Ocultar contraseña" : "Ver contraseña"}
            >
              {mostrarPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        {/* Botón Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full mt-2 bg-[#0d2b56] hover:bg-[#091f3e] disabled:opacity-60 text-white py-2.5 rounded-md font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          {isPending ? (
            <>
              <Loader2 size={14} className="animate-spin text-white" />
              <span>Verificando credenciales...</span>
            </>
          ) : (
            <>
              <Lock size={13} className="text-brand-gold" />
              <span>Ingresar al Panel</span>
            </>
          )}
        </button>
      </form>

      {/* Nota de ayuda */}
      <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-lg flex items-start gap-2.5 text-xs text-slate-600">
        <Info size={16} className="text-[#0d2b56] shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-slate-800 text-[11px]">¿No tienes acceso al panel?</p>
          <p className="text-slate-500 text-[11px] mt-0.5 leading-relaxed">
            El administrador del sistema debe agregarte para que puedas acceder.
          </p>
        </div>
      </div>
    </div>
  );
}