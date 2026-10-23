import React from "react";
import { Users, Shield, ShieldAlert } from "lucide-react";

interface UserKpiGridProps {
  totalCuentas: number;
  totalAdmins: number;
}

export default function UserKpiGrid({ totalCuentas, totalAdmins }: UserKpiGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg border border-slate-200/80 p-4 sm:p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500">Cuentas Registradas</span>
          <span className="text-[10px] font-bold bg-sky-50 text-sky-700 px-2 py-0.5 rounded-md border border-sky-100">
            Padrón
          </span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums block">
              {totalCuentas}
            </span>
            <span className="text-[11px] text-slate-400 font-medium mt-0.5 block">
              Administradores en total
            </span>
          </div>
          <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 bg-sky-50 text-sky-600 border border-sky-100 shadow-2xs">
            <Users size={20} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200/80 p-4 sm:p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500">Acceso Total</span>
          <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md border border-amber-100">
            Privilegios
          </span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums block">
              {totalAdmins}
            </span>
            <span className="text-[11px] text-slate-400 font-medium mt-0.5 block">
              Superadministradores
            </span>
          </div>
          <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 bg-amber-50 text-amber-600 border border-amber-100 shadow-2xs">
            <Shield size={20} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200/80 p-4 sm:p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500">Estado de Seguridad</span>
          <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-100">
            Activo
          </span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight block">
              Protegido
            </span>
            <span className="text-[11px] text-slate-400 font-medium mt-0.5 block">
              Auto-eliminación bloqueada
            </span>
          </div>
          <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-2xs">
            <ShieldAlert size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}