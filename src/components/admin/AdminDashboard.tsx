"use client";

import Link from "next/link";
import {
  Trophy,
  Users,
  Award,
  TrendingUp,
  Shield,
  ArrowRight,
  BookOpen,
  Calendar,
  Crown,
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

interface AdminDashboardProps {
  adminName?: string;
  unidades: Unidad[];
  usuarios: Usuario[];
  currentAdminId?: string;
}

export default function AdminDashboard({
  adminName,
  unidades,
  usuarios,
  currentAdminId,
}: AdminDashboardProps) {
  const totalPuntos = unidades.reduce((acc, u) => acc + u.puntos, 0);
  const unidadesOrdenadas = [...unidades].sort((a, b) => b.puntos - a.puntos);
  const lider = unidadesOrdenadas[0];
  const maxPuntos = Math.max(1, lider?.puntos ?? 1);
  const promedioPuntos = unidades.length > 0 ? Math.round(totalPuntos / unidades.length) : 0;

  // Escala del gráfico vertical
  const chartMax = Math.ceil((maxPuntos * 1.15) / 500) * 500 || 2000;
  const chartSteps = [
    chartMax,
    Math.round(chartMax * 0.75),
    Math.round(chartMax * 0.5),
    Math.round(chartMax * 0.25),
    0,
  ];

  const fechaHoy = new Intl.DateTimeFormat("es-MX", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  const fechaCapitalizada = fechaHoy.charAt(0).toUpperCase() + fechaHoy.slice(1);

  return (
    <div className="w-full space-y-6 select-none font-sans text-slate-800">
      {/* ════════ BIENVENIDA EN EL INICIO (LIMPIA Y DIRECTA) ════════ */}
      <div className="bg-white rounded-lg border border-slate-200/90 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-2xl">
            <h1 className="text-xl sm:text-2xl font-bold text-[#0d2b56] tracking-tight">
              ¡Bienvenido al Panel de Control{adminName ? `, ${adminName}` : ""}! 👋
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
              Supervisa las métricas globales del ministerio juvenil, consulta el balance de méritos y administra los accesos oficiales del sistema.
            </p>
          </div>

          {/* Fecha actual */}
          <div className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold bg-slate-50 border border-slate-200/80 px-3.5 py-2.5 rounded-lg self-start sm:self-center shrink-0">
            <Calendar size={15} className="text-[#0d2b56] shrink-0" />
            <span>{fechaCapitalizada}</span>
          </div>
        </div>
      </div>

      {/* ════════ FILA 1: 4 TARJETAS KPI ════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Puntos acumulados (Azul JA) */}
        <div className="bg-white rounded-lg border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Puntos Globales</span>
            <span className="text-[10px] font-bold bg-[#0d2b56]/10 text-[#0d2b56] px-2 py-0.5 rounded-md border border-[#0d2b56]/15">
              Oficial
            </span>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#0d2b56] tracking-tight tabular-nums block">
                {totalPuntos.toLocaleString()}
              </span>
              <span className="text-[11px] text-slate-400 font-medium mt-0.5 block">
                Puntos acumulados
              </span>
            </div>
            <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 bg-[#0d2b56]/10 text-[#0d2b56] border border-[#0d2b56]/15 shadow-2xs">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-[#0d2b56] font-bold flex items-center gap-1">
              ↑ Promedio
            </span>
            <span className="text-slate-500 font-medium">
              {promedioPuntos.toLocaleString()} pts / unidad
            </span>
          </div>
        </div>

        {/* Card 2: Unidad líder (Dorado JA) */}
        <div className="bg-white rounded-lg border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Unidad en 1° Lugar</span>
            <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md border border-amber-200">
              1° Puesto
            </span>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="min-w-0 pr-2">
              <span className="text-xl sm:text-2xl font-extrabold text-amber-900 tracking-tight truncate block">
                {lider?.nombreGrupo ?? "Sin datos"}
              </span>
              <span className="text-[11px] text-slate-400 font-medium mt-0.5 truncate block">
                Líder: {lider?.lider ?? "—"}
              </span>
            </div>
            <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 bg-amber-50 text-amber-600 border border-amber-200 shadow-2xs">
              <Crown size={20} className="text-amber-500" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-amber-600 font-bold flex items-center gap-1">
              Puntaje líder
            </span>
            <span className="text-slate-600 font-semibold truncate">
              {lider ? `${lider.puntos.toLocaleString()} pts` : "—"}
            </span>
          </div>
        </div>

        {/* Card 3: Unidades activas */}
        <div className="bg-white rounded-lg border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Unidades Juveniles</span>
            <span className="text-[10px] font-bold bg-sky-50 text-sky-700 px-2 py-0.5 rounded-md border border-sky-100">
              Activas
            </span>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#0d2b56] tracking-tight tabular-nums block">
                {unidades.length}
              </span>
              <span className="text-[11px] text-slate-400 font-medium mt-0.5 block">
                Grupos en competencia
              </span>
            </div>
            <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 bg-sky-50 text-sky-700 border border-sky-100 shadow-2xs">
              <Users size={20} />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-sky-700 font-bold flex items-center gap-1">
              Participación
            </span>
            <span className="text-slate-500 font-medium">
              Padrón completo
            </span>
          </div>
        </div>

        {/* Card 4: Administradores */}
        <div className="bg-white rounded-lg border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Operadores del Panel</span>
            <span className="text-[10px] font-bold bg-rose-50 text-[#b71c1c] px-2 py-0.5 rounded-md border border-rose-100">
              Seguridad
            </span>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#0d2b56] tracking-tight tabular-nums block">
                {usuarios.length || 1}
              </span>
              <span className="text-[11px] text-slate-400 font-medium mt-0.5 block">
                Cuentas activas
              </span>
            </div>
            <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 bg-rose-50 text-[#b71c1c] border border-rose-100 shadow-2xs">
              <Shield size={20} />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-[#b71c1c] font-bold flex items-center gap-1">
              Acceso verificado
            </span>
            <span className="text-slate-500 font-medium">
              Roles asignados
            </span>
          </div>
        </div>
      </div>

      {/* ════════ FILA 2: GRID DE 2 COLUMNAS (8 COLS + 4 COLS) ════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ── COLUMNA IZQUIERDA (8 COLUMNAS): GRÁFICA DE PUNTOS (SIN PODIO) ── */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-lg border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-[#0d2b56]">
                  Resumen de Puntuación JA
                </h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  Comparativa de méritos acumulados entre las unidades en competencia.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs font-medium text-slate-600">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-gold" />
                  <span>1° Lugar</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0d2b56]" />
                  <span>Unidades JA</span>
                </div>
              </div>
            </div>

            {/* Gráfico de Columnas Verticales con colores JA */}
            <div className="relative pt-6 pb-2">
              <div className="flex items-end gap-3 sm:gap-6 h-64 w-full pr-12 pl-2">
                {unidadesOrdenadas.map((u, i) => {
                  const alturaPorcentaje = Math.round((u.puntos / chartMax) * 100);
                  const pos = i + 1;
                  const esLider = pos === 1;

                  return (
                    <div key={u.id} className="flex-1 flex flex-col items-center h-full justify-end group">
                      <span className="text-[11px] font-bold text-slate-700 tabular-nums mb-1.5 group-hover:text-[#0d2b56] transition-colors">
                        {u.puntos.toLocaleString()}
                      </span>

                      <div className="w-full max-w-[48px] bg-slate-100 rounded-t-sm overflow-hidden flex flex-col justify-end h-full">
                        <div
                          className={`w-full rounded-t-sm transition-all duration-700 ${
                            esLider
                              ? "bg-gradient-to-t from-[#c5a059] to-[#d4af37]"
                              : "bg-gradient-to-t from-[#0d2b56] to-[#0284c7]"
                          }`}
                          style={{ height: `${Math.max(6, alturaPorcentaje)}%` }}
                        />
                      </div>

                      <span className="text-xs font-semibold text-slate-700 truncate w-full text-center mt-3">
                        {u.nombreGrupo}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Escala Y */}
              <div className="absolute right-0 inset-y-6 flex flex-col justify-between items-end text-[10px] font-semibold text-slate-400 pointer-events-none pr-1">
                {chartSteps.map((s) => (
                  <span key={s}>{s >= 1000 ? `${(s / 1000).toFixed(1)}k` : s}</span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>{unidades.length} unidades registradas</span>
              <Link
                href="/admin/puntos"
                className="font-bold text-[#0d2b56] hover:text-blue-900 flex items-center gap-1 transition-colors"
              >
                <span>Ir al gestor de puntos</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>

        {/* ── COLUMNA DERECHA (4 COLUMNAS): CRITERIO DE ACIERTOS + OPERADORES ── */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card: Criterio de Puntuación JA (Solo aciertos por pregunta) */}
          <div className="bg-white rounded-lg border border-slate-200/80 p-5 shadow-xs space-y-3.5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <BookOpen size={16} className="text-[#0d2b56]" />
              <h2 className="text-sm font-bold text-[#0d2b56]">
                Criterio de Puntuación JA
              </h2>
            </div>

            <div className="p-3 bg-slate-50 rounded-md border border-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Acierto por pregunta contestada</span>
                <span className="font-bold text-xs text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  +10 pts
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Cada pregunta respondida correctamente por la unidad suma 10 puntos al acumulado oficial.
              </p>
            </div>
          </div>

          {/* Card: Operadores del Panel */}
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
        </div>
      </div>
    </div>
  );
}
