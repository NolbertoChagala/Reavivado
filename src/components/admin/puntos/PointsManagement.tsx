"use client";

import { useState, useActionState, useMemo } from "react";
import { registrarPuntaje } from "@/app/actions/puntos";
import {
  CheckCircle2,
  AlertCircle,
  Plus,
  Minus,
  Pencil,
  Search,
  X,
  Award,
  TrendingUp,
  Users,
} from "lucide-react";
import { PointsModal } from "./PointsModal";

interface Unidad {
  id: string;
  nombreGrupo: string;
  lider: string;
  puntos: number;
}

type Tipo = "sumar" | "restar" | "fijar";

interface PointsManagementProps {
  unidades: Unidad[];
  adminName?: string;
}

export default function PointsManagement({ unidades }: PointsManagementProps) {
  const [busqueda, setBusqueda] = useState("");

  const [activeModal, setActiveModal] = useState<{
    uId: string;
    nombreGrupo: string;
    puntos: number;
    tipo: Tipo;
  } | null>(null);

  const [state, formAction, isPending] = useActionState(
    async (prevState: unknown, formData: FormData) => {
      const res = await registrarPuntaje(prevState, formData);
      if (res?.success) {
        setActiveModal(null);
      }
      return res;
    },
    null
  );

  /* ───── Métricas de Puntaje ───── */
  const totalPuntos = useMemo(() => unidades.reduce((acc, u) => acc + u.puntos, 0), [unidades]);
  const unidadesOrdenadas = useMemo(() => [...unidades].sort((a, b) => b.puntos - a.puntos), [unidades]);
  const posiciones = useMemo(
    () => new Map(unidadesOrdenadas.map((u, i) => [u.id, i + 1] as const)),
    [unidadesOrdenadas]
  );

  /* Filtrado por búsqueda */
  const unidadesFiltradas = useMemo(() => {
    const q = busqueda.toLowerCase().trim();
    if (!q) return unidadesOrdenadas;
    return unidadesOrdenadas.filter(
      (u) => u.nombreGrupo.toLowerCase().includes(q) || u.lider.toLowerCase().includes(q)
    );
  }, [unidadesOrdenadas, busqueda]);

  const abrir = (u: Unidad, tipo: Tipo) =>
    setActiveModal({ uId: u.id, nombreGrupo: u.nombreGrupo, puntos: u.puntos, tipo });

  return (
    <div className="w-full space-y-6 select-none font-sans text-slate-800">
      {/* ════════ ENCABEZADO LIMPIO Y DIRECTO ════════ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0d2b56] tracking-tight">
            Gestión de Puntos
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Asigna o descuenta méritos a cada unidad participante según sus respuestas correctas.
          </p>
        </div>

        {/* Criterio oficial visible y limpio */}
        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200/80 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-900 shadow-2xs self-start sm:self-auto">
          <Award size={16} className="text-amber-600 shrink-0" />
          <span>Criterio: +10 pts por pregunta respondida</span>
        </div>
      </div>

      {/* ════════ TARJETAS KPI (SOLO INFO REAL Y ÚTIL) ════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Puntos Globales */}
        <div className="bg-white rounded-lg border border-slate-200/80 p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500">Puntos Totales Repartidos</span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#0d2b56] tabular-nums">
                {totalPuntos.toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-slate-400">pts acumulados</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-[#0d2b56]/10 text-[#0d2b56] border border-[#0d2b56]/15 shrink-0">
            <TrendingUp size={20} />
          </div>
        </div>

        {/* Total de Unidades */}
        <div className="bg-white rounded-lg border border-slate-200/80 p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500">Unidades en Competencia</span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#0d2b56] tabular-nums">
                {unidades.length}
              </span>
              <span className="text-xs font-semibold text-slate-400">grupos registrados</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-blue-50 text-blue-700 border border-blue-100 shrink-0">
            <Users size={20} />
          </div>
        </div>
      </div>

      {/* Alerta de notificación de operación reciente */}
      {state?.message && !activeModal && (
        <div
          role="status"
          className={`flex items-center gap-3 p-3.5 rounded-lg text-xs font-semibold transition-all shadow-2xs border ${
            state.success
              ? "bg-emerald-50 text-emerald-900 border-emerald-200"
              : "bg-rose-50 text-rose-900 border-rose-200"
          }`}
        >
          {state.success ? (
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle size={16} className="text-rose-600 shrink-0" />
          )}
          <span>{state.message}</span>
        </div>
      )}

      {/* ════════ TABLA DE GESTIÓN DE PUNTOS ════════ */}
      <div className="bg-white rounded-lg border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Barra superior de la tabla con buscador */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">Listado de Unidades</span>
            <span className="text-[11px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
              {unidadesFiltradas.length} {unidadesFiltradas.length === 1 ? "grupo" : "grupos"}
            </span>
          </div>

          <div className="relative w-full sm:w-72">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar unidad o líder..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-md pl-8 pr-7 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0d2b56] transition-colors"
            />
            {busqueda && (
              <button
                type="button"
                onClick={() => setBusqueda("")}
                aria-label="Limpiar búsqueda"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Tabla limpia con botones de iconos */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4 w-14 text-center">#</th>
                <th className="py-3 px-4">Unidad y Líder</th>
                <th className="py-3 px-4 text-center w-36">Puntos Actuales</th>
                <th className="py-3 px-4 text-right pr-6 w-44">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {unidadesFiltradas.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-400">
                    No se encontraron unidades con esa búsqueda.
                  </td>
                </tr>
              ) : (
                unidadesFiltradas.map((unidad) => {
                  const pos = posiciones.get(unidad.id) ?? 0;
                  const esPrimero = pos === 1;

                  return (
                    <tr key={unidad.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Posición */}
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`w-6 h-6 rounded-md inline-flex items-center justify-center font-bold text-xs ${
                            esPrimero
                              ? "bg-amber-100 text-amber-900 font-black"
                              : "text-slate-500 font-semibold bg-slate-100"
                          }`}
                        >
                          {pos}
                        </span>
                      </td>

                      {/* Nombre del grupo y líder */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900 text-xs sm:text-sm">
                            {unidad.nombreGrupo}
                          </span>
                          <span className="text-[11px] text-slate-500 mt-0.5">
                            Líder: {unidad.lider}
                          </span>
                        </div>
                      </td>

                      {/* Puntaje Oficial */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="font-extrabold text-[#0d2b56] text-sm sm:text-base tabular-nums block">
                          {unidad.puntos.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-slate-400 block leading-none font-medium">
                          pts
                        </span>
                      </td>

                      {/* Acciones limpias con iconos elegantes (sin saturación de texto) */}
                      <td className="py-3.5 px-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Botón Sumar (+10 o sumar) */}
                          <button
                            type="button"
                            onClick={() => abrir(unidad, "sumar")}
                            className="w-8 h-8 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center justify-center transition-all active:scale-90 cursor-pointer shadow-2xs"
                            title={`Sumar puntos a ${unidad.nombreGrupo}`}
                            aria-label={`Sumar puntos a ${unidad.nombreGrupo}`}
                          >
                            <Plus size={16} strokeWidth={2.8} />
                          </button>

                          {/* Botón Restar (-) */}
                          <button
                            type="button"
                            onClick={() => abrir(unidad, "restar")}
                            className="w-8 h-8 rounded-md bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 flex items-center justify-center transition-all active:scale-90 cursor-pointer shadow-2xs"
                            title={`Descontar puntos a ${unidad.nombreGrupo}`}
                            aria-label={`Descontar puntos a ${unidad.nombreGrupo}`}
                          >
                            <Minus size={16} strokeWidth={2.8} />
                          </button>

                          {/* Botón Editar total (Pencil) */}
                          <button
                            type="button"
                            onClick={() => abrir(unidad, "fijar")}
                            className="w-8 h-8 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center transition-all active:scale-90 cursor-pointer shadow-2xs"
                            title={`Editar total de puntos de ${unidad.nombreGrupo}`}
                            aria-label={`Editar total de puntos de ${unidad.nombreGrupo}`}
                          >
                            <Pencil size={14} strokeWidth={2.2} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Interactivo de Asignación / Descuento */}
      {activeModal && (
        <PointsModal
          key={`${activeModal.uId}-${activeModal.tipo}`}
          modalData={activeModal}
          onClose={() => setActiveModal(null)}
          formAction={formAction}
          isPending={isPending}
        />
      )}
    </div>
  );
}