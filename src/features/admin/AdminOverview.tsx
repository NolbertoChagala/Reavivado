"use client";

import Link from "next/link";
import {
  Trophy,
  Users,
  Award,
  TrendingUp,
  Shield,
  ArrowRight,
  BarChart3,
  Calendar,
} from "lucide-react";

interface Unidad {
  id: string;
  nombreGrupo: string;
  lider: string;
  puntos: number;
}

interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: string;
}

interface AdminOverviewProps {
  adminName?: string;
  unidades: Unidad[];
  usuarios: Usuario[];
}

export default function AdminOverview({ adminName, unidades, usuarios }: AdminOverviewProps) {
  const totalPuntos = unidades.reduce((acc, u) => acc + u.puntos, 0);
  const unidadesOrdenadas = [...unidades].sort((a, b) => b.puntos - a.puntos);
  const lider = unidadesOrdenadas[0];
  const maxPuntos = Math.max(1, lider?.puntos ?? 1);
  const promedioPuntos = unidades.length > 0 ? Math.round(totalPuntos / unidades.length) : 0;

  const fechaHoy = new Intl.DateTimeFormat("es-MX", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  const fechaCapitalizada = fechaHoy.charAt(0).toUpperCase() + fechaHoy.slice(1);

  return (
    <div className="w-full space-y-6 select-none font-sans text-slate-800">
      {/* ════════ I. CABECERA FORMAL DE BIENVENIDA ════════ */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Panel Central · Sociedad JA
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Sistema activo
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              ¡Bienvenido{adminName ? `, ${adminName}` : ""}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Resumen ejecutivo y monitoreo general de la plataforma de la Sociedad JA Villas Otoch 4.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl self-start sm:self-auto">
            <Calendar size={14} className="text-[#0d2b56]" />
            <span>{fechaCapitalizada}</span>
          </div>
        </div>

        {/* 4 KPIs Formales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-5">
          <div className="bg-slate-50/70 rounded-xl border border-slate-200/80 p-4">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Puntos acumulados
            </span>
            <span className="text-2xl font-black text-slate-900 tabular-nums block mt-1">
              {totalPuntos.toLocaleString()} <span className="text-xs font-bold text-slate-400">pts</span>
            </span>
            <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
              Promedio de {promedioPuntos.toLocaleString()} pts por grupo
            </span>
          </div>

          <div className="bg-slate-50/70 rounded-xl border border-slate-200/80 p-4">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Unidad en 1° lugar
            </span>
            <span className="text-2xl font-black text-[#0d2b56] truncate block mt-1">
              {lider?.nombreGrupo ?? "Sin datos"}
            </span>
            <span className="text-[11px] text-slate-500 font-medium block mt-0.5 truncate">
              {lider ? `${lider.puntos.toLocaleString()} pts · ${lider.lider}` : "—"}
            </span>
          </div>

          <div className="bg-slate-50/70 rounded-xl border border-slate-200/80 p-4">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Unidades activas
            </span>
            <span className="text-2xl font-black text-slate-900 tabular-nums block mt-1">
              {unidades.length} <span className="text-xs font-bold text-slate-400">grupos</span>
            </span>
            <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
              100% en competencia sabatina
            </span>
          </div>

          <div className="bg-slate-50/70 rounded-xl border border-slate-200/80 p-4">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Administradores
            </span>
            <span className="text-2xl font-black text-slate-900 tabular-nums block mt-1">
              {usuarios.length || 1} <span className="text-xs font-bold text-slate-400">cuentas</span>
            </span>
            <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
              Acceso seguro con privilegios
            </span>
          </div>
        </div>
      </div>

      {/* ════════ II. GRÁFICA COMPARATIVA FORMAL ════════ */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <BarChart3 size={18} className="text-[#0d2b56]" />
            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              Clasificación y Rendimiento General de Unidades
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-semibold">
            {unidades.length} grupos
          </span>
        </div>

        <div className="space-y-3.5 pt-1">
          {unidadesOrdenadas.map((u, i) => {
            const pos = i + 1;
            const porcentaje = Math.round((u.puntos / maxPuntos) * 100);
            const esOro = pos === 1;

            return (
              <div key={u.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-5 h-5 rounded-md font-bold text-[10px] flex items-center justify-center shrink-0 border ${
                        esOro
                          ? "bg-amber-50 text-amber-900 border-amber-200 font-black"
                          : "bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {pos}°
                    </span>
                    <span className="font-bold text-slate-900">{u.nombreGrupo}</span>
                    <span className="text-slate-400 text-[11px] hidden sm:inline">
                      · Líder: {u.lider}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 text-[11px] font-medium">
                      {porcentaje}% del líder
                    </span>
                    <span className="font-bold text-slate-900 tabular-nums">
                      {u.puntos.toLocaleString()} <span className="text-slate-400 text-[10px]">pts</span>
                    </span>
                  </div>
                </div>

                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      esOro ? "bg-amber-500" : "bg-[#0d2b56]"
                    }`}
                    style={{ width: `${Math.max(4, porcentaje)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ════════ III. TARJETAS DE ACCESO A SECCIONES ════════ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Acceso a Gestión de Puntos */}
        <Link
          href="/admin/puntos"
          className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 text-[#0d2b56] flex items-center justify-center group-hover:bg-[#0d2b56] group-hover:text-white transition-colors shrink-0">
              <Award size={22} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0d2b56] transition-colors">
                Gestión de Puntos
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Asignar méritos, penalizaciones y fijar puntajes por grupo.
              </p>
            </div>
          </div>
          <ArrowRight size={16} className="text-slate-400 group-hover:text-[#0d2b56] group-hover:translate-x-1 transition-all" />
        </Link>

        {/* Acceso a Control de Usuarios */}
        <Link
          href="/admin/usuarios"
          className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 text-[#0d2b56] flex items-center justify-center group-hover:bg-[#0d2b56] group-hover:text-white transition-colors shrink-0">
              <Users size={22} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0d2b56] transition-colors">
                Control de Usuarios
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Supervisar accesos autorizados y crear administradores.
              </p>
            </div>
          </div>
          <ArrowRight size={16} className="text-slate-400 group-hover:text-[#0d2b56] group-hover:translate-x-1 transition-all" />
        </Link>
      </div>
    </div>
  );
}
