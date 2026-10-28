import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Usuario } from "@/types";

interface AdminOperatorsListProps {
  usuarios: Usuario[];
  currentAdminId?: string;
}

export default function AdminOperatorsList({
  usuarios,
  currentAdminId,
}: AdminOperatorsListProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200/80 p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h2 className="text-sm font-bold text-[#0d2b56]">
          Operadores del Panel
        </h2>
        <Link
          href="/admin/usuarios"
          className="text-xs font-semibold text-[#0d2b56] hover:text-blue-900 flex items-center gap-1 transition-colors"
        >
          <span>Gestionar</span>
          <ArrowRight size={12} />
        </Link>
      </div>

      <div className="space-y-3">
        {usuarios.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-4">
            No hay otros usuarios registrados.
          </p>
        ) : (
          usuarios.map((usr) => {
            const esActual = usr.id === currentAdminId;
            const inicial = usr.nombre ? usr.nombre.charAt(0).toUpperCase() : "A";

            return (
              <div key={usr.id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-md bg-[#0d2b56]/10 border border-[#0d2b56]/15 text-[#0d2b56] font-bold text-xs flex items-center justify-center shrink-0">
                  {inicial}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 truncate">
                      {usr.nombre}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {esActual ? "Tú" : usr.rol}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    {usr.email}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}