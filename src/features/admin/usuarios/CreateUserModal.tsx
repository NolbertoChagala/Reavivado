"use client";

import { useEffect, useState, useActionState } from "react";
import { UserPlus, User, Mail, Lock, Shield, X, Eye, EyeOff, AlertCircle } from "lucide-react";
import { crearUsuario } from "@/app/actions/usuarios";

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (msg: string) => void;
}

export function CreateUserModal({ isOpen, onClose, onSuccess }: CreateUserModalProps) {
  const [mostrarPass, setMostrarPass] = useState(false);

  const [state, formAction, isPending] = useActionState(
    async (prevState: unknown, formData: FormData) => {
      const res = await crearUsuario(prevState, formData);
      if (res?.success) {
        if (onSuccess) onSuccess(res.message);
        onClose();
      }
      return res;
    },
    null
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (isOpen) {
      window.addEventListener("keydown", onKey);
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 select-none">
      {/* Fondo oscuro con desenfoque suave */}
      <button
        type="button"
        aria-label="Cerrar ventana"
        onClick={onClose}
        className="fixed inset-0 cursor-default bg-slate-900/60 backdrop-blur-xs"
      />

      {/* Tarjeta Modal */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-md rounded-lg border border-slate-200 bg-white p-5 sm:p-6 shadow-xl space-y-4 text-slate-800"
      >
        {/* Encabezado */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-50 text-[#0d2b56] border border-sky-100 flex items-center justify-center shrink-0 shadow-2xs">
              <UserPlus size={19} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Crear Nuevo Usuario
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Registra un nuevo administrador para el panel JA
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Mensaje de error si la acción falla */}
        {state?.message && !state.success && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-md text-xs font-semibold flex items-center gap-2">
            <AlertCircle size={15} className="shrink-0 text-rose-600" />
            <span>{state.message}</span>
          </div>
        )}

        {/* Formulario */}
        <form action={formAction} className="space-y-4">
          {/* Campo: Nombre */}
          <div className="space-y-1.5">
            <label htmlFor="nombre-input" className="text-xs font-semibold text-slate-700 block">
              Nombre completo
            </label>
            <div className="relative flex items-center">
              <User size={15} className="absolute left-3 text-slate-400 pointer-events-none" />
              <input
                id="nombre-input"
                name="nombre"
                type="text"
                placeholder="Ej: Daniel Castillo"
                required
                className="w-full bg-white border border-slate-300 focus:border-[#0d2b56] focus:ring-2 focus:ring-[#0d2b56]/10 rounded-md py-2.5 pl-9 pr-3 text-xs font-medium text-slate-900 focus:outline-none placeholder:text-slate-400 transition-colors"
              />
            </div>
          </div>

          {/* Campo: Correo */}
          <div className="space-y-1.5">
            <label htmlFor="email-input" className="text-xs font-semibold text-slate-700 block">
              Correo electrónico
            </label>
            <div className="relative flex items-center">
              <Mail size={15} className="absolute left-3 text-slate-400 pointer-events-none" />
              <input
                id="email-input"
                name="email"
                type="email"
                placeholder="admin@ejemplo.com"
                required
                className="w-full bg-white border border-slate-300 focus:border-[#0d2b56] focus:ring-2 focus:ring-[#0d2b56]/10 rounded-md py-2.5 pl-9 pr-3 text-xs font-medium text-slate-900 focus:outline-none placeholder:text-slate-400 transition-colors"
              />
            </div>
          </div>

          {/* Campo: Contraseña */}
          <div className="space-y-1.5">
            <label htmlFor="password-input" className="text-xs font-semibold text-slate-700 block">
              Contraseña de acceso
            </label>
            <div className="relative flex items-center">
              <Lock size={15} className="absolute left-3 text-slate-400 pointer-events-none" />
              <input
                id="password-input"
                name="password"
                type={mostrarPass ? "text" : "password"}
                placeholder="Mínimo 6 caracteres"
                minLength={6}
                required
                className="w-full bg-white border border-slate-300 focus:border-[#0d2b56] focus:ring-2 focus:ring-[#0d2b56]/10 rounded-md py-2.5 pl-9 pr-10 text-xs font-medium text-slate-900 focus:outline-none placeholder:text-slate-400 transition-colors"
              />
              <button
                type="button"
                onClick={() => setMostrarPass(!mostrarPass)}
                className="absolute right-3 text-slate-400 hover:text-slate-700 cursor-pointer"
                tabIndex={-1}
                aria-label={mostrarPass ? "Ocultar contraseña" : "Ver contraseña"}
              >
                {mostrarPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Campo: Rol / Privilegios (Informativo) */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Privilegios del sistema
            </label>
            <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 border border-slate-200/80 rounded-md">
              <Shield size={16} className="text-[#0d2b56] shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-900">Administrador Total</p>
                <p className="text-[11px] text-slate-500">Acceso completo a gestión de puntos y panel general</p>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="flex-1 py-2.5 rounded-md text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 py-2.5 rounded-md text-xs font-bold text-white bg-[#0d2b56] hover:bg-[#091f3e] transition-colors cursor-pointer shadow-xs disabled:opacity-60 flex items-center justify-center gap-1.5"
            >
              {isPending ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creando...</span>
                </>
              ) : (
                <>
                  <UserPlus size={14} />
                  <span>Crear Usuario</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
