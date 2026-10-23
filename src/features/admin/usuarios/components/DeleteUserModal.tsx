"use client";

import React, { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

interface DeleteUserModalProps {
  usuario: { id: string; nombre: string };
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteUserModal({
  usuario,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteUserModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[75] flex items-center justify-center p-4 select-none">
      <button
        type="button"
        aria-label="Cerrar ventana"
        onClick={onClose}
        className="fixed inset-0 cursor-default bg-slate-900/60 backdrop-blur-xs"
      />

      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-sm rounded-lg border border-slate-200 bg-white p-6 shadow-xl space-y-4 text-center"
      >
        <div className="mx-auto w-12 h-12 rounded-full bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center">
          <AlertTriangle size={24} />
        </div>

        <div className="space-y-1.5">
          <h3 className="text-base font-bold text-slate-900">¿Revocar acceso?</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Estás a punto de eliminar la cuenta de{" "}
            <span className="font-bold text-slate-800">{usuario.nombre}</span>. Esta persona ya no podrá iniciar sesión en el panel.
          </p>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 py-2.5 rounded-md text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 py-2.5 rounded-md text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors cursor-pointer shadow-xs disabled:opacity-60 flex items-center justify-center gap-1.5"
          >
            {isDeleting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Eliminando...</span>
              </>
            ) : (
              <span>Revocar Acceso</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}