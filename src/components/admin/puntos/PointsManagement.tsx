"use client";

import { useState, useActionState } from "react";
import { registrarPuntaje } from "@/app/actions/puntos";
import { CheckCircle2, AlertCircle, Plus, Trophy, Pencil, Activity, Users } from "lucide-react";
import { AdminPageHeader, KpiCard } from "../ui";
import { PointsModal } from "./PointsModal";

interface Unidad {
  id: string;
  nombreGrupo: string;
  lider: string;
  puntos: number;
}

export default function PointsManagement({ unidades }: { unidades: Unidad[] }) {
  const [activeModal, setActiveModal] = useState<{
    uId: string;
    nombreGrupo: string;
    puntos: number;
    tipo: "sumar" | "fijar";
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

  const totalPuntos = unidades.reduce((acc, u) => acc + u.puntos, 0);
  const liderUnidad = unidades[0]?.nombreGrupo || "Ninguna";
  const liderNombre = unidades[0]?.lider || "---";
  const totalUnidades = unidades.length;

  return (
    <div className="w-full">
      <AdminPageHeader
        title="Gestión de puntajes"
        subtitle="Registra y controla los méritos semanales de las unidades de Villas Otoch 4."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 select-none">
        <KpiCard
          label="Líder actual"
          value={liderUnidad}
          description={`Director: ${liderNombre}`}
          icon={<Trophy size={20} className="text-brand-gold" />}
          iconBgColor="bg-amber-50 border-brand-gold/25"
        />
        <KpiCard
          label="Puntos distribuidos"
          value={totalPuntos.toLocaleString()}
          description="Total acumulado de la sede"
          icon={<Activity size={20} className="text-blue-500" />}
          iconBgColor="bg-blue-50/50 border-blue-100"
        />
        <KpiCard
          label="Unidades registradas"
          value={totalUnidades}
          description="Grupos activos registrados"
          icon={<Users size={20} className="text-slate-500" />}
        />
      </div>

      {state?.message && !activeModal && (
        <div
          className={`mb-6 flex items-center gap-3 p-4 rounded-2xl text-xs font-bold tracking-wide animate-in fade-in duration-300 ${
            state.success
              ? "bg-green-50 text-green-700 border border-green-200/50"
              : "bg-red-50 text-red-655 border border-red-200/50"
          }`}
        >
          {state.success ? (
            <CheckCircle2 size={16} className="text-green-600 shrink-0" />
          ) : (
            <AlertCircle size={16} className="text-red-655 shrink-0" />
          )}
          <span>{state.message}</span>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.015)] w-full">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50 select-none">
          <div className="flex items-center gap-2">
            <Trophy size={16} className="text-brand-gold" />
            <h2 className="text-xs font-black text-slate-800 leading-none">Panel de posiciones y control</h2>
          </div>
          <span className="text-[10px] font-bold text-slate-400">Verifica el total antes de enviar</span>
        </div>

        {/* Tabla Desktop */}
        <div className="hidden sm:block overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="bg-slate-50/30 border-b border-slate-100 text-[10px] font-bold text-slate-450 tracking-wider select-none">
                <th className="px-6 py-4 w-16 text-center">Posición</th>
                <th className="px-6 py-4">Unidad</th>
                <th className="px-6 py-4 w-1/3">Rendimiento relativo</th>
                <th className="px-6 py-4 text-center">Puntaje</th>
                <th className="px-6 py-4 text-center w-40">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(() => {
                const maxPuntos = unidades[0]?.puntos || 1;
                return unidades.map((unidad, index) => {
                  const progressPct = Math.round((unidad.puntos / maxPuntos) * 100);
                  return (
                    <tr key={unidad.id} className="hover:bg-slate-50/30 transition-all group">
                      <td className="px-6 py-4 text-center">
                        <div
                          className={`w-8 h-8 mx-auto flex items-center justify-center rounded-xl font-black italic text-xs shadow-sm select-none ${
                            index === 0
                              ? "bg-brand-gold text-white shadow-brand-gold/10"
                              : index === 1
                              ? "bg-slate-200 text-slate-700"
                              : index === 2
                              ? "bg-amber-600/70 text-white"
                              : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          {index + 1}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-xs font-black text-slate-800 group-hover:text-brand-gold transition-colors leading-tight">
                            {unidad.nombreGrupo}
                          </span>
                          <span className="text-[9px] text-slate-400 font-bold leading-none mt-1.5">
                            Líder: {unidad.lider}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-brand-gold h-full rounded-full transition-all duration-700 ease-out"
                              style={{ width: `${Math.max(3, progressPct)}%` }}
                            />
                          </div>
                          <span className="text-[9px] font-black text-slate-400 w-8 text-right tabular-nums">
                            {progressPct}%
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span className="text-sm font-black text-slate-900 tabular-nums">
                          {unidad.puntos.toLocaleString()}
                        </span>
                        <span className="text-[8px] font-bold text-slate-400 block leading-none mt-0.5 select-none">
                          Puntos
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() =>
                              setActiveModal({
                                uId: unidad.id,
                                nombreGrupo: unidad.nombreGrupo,
                                puntos: unidad.puntos,
                                tipo: "sumar",
                              })
                            }
                            className="bg-brand-gold hover:bg-brand-gold-hover text-white text-[10px] font-bold px-3 py-2 rounded-xl flex items-center gap-1 cursor-pointer active:scale-95 transition-all select-none shadow-sm shadow-brand-gold/10"
                          >
                            <Plus size={11} className="text-white shrink-0" />
                            <span>Sumar</span>
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setActiveModal({
                                uId: unidad.id,
                                nombreGrupo: unidad.nombreGrupo,
                                puntos: unidad.puntos,
                                tipo: "fijar",
                              })
                            }
                            className="border border-slate-200 hover:border-slate-350 text-slate-450 hover:text-slate-655 p-2 rounded-xl flex items-center justify-center cursor-pointer hover:bg-slate-50 active:scale-95 transition-all select-none"
                          >
                            <Pencil size={11} className="shrink-0" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                });
              })()}
            </tbody>
          </table>
        </div>

        {/* Tabla Móvil */}
        <div className="block sm:hidden divide-y divide-slate-100">
          {(() => {
            const maxPuntos = unidades[0]?.puntos || 1;
            return unidades.map((unidad, index) => {
              const progressPct = Math.round((unidad.puntos / maxPuntos) * 100);
              return (
                <div key={unidad.id} className="p-4 flex flex-col gap-3 group">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 flex items-center justify-center rounded-xl font-black italic text-xs shadow-sm shrink-0 select-none ${
                          index === 0
                            ? "bg-brand-gold text-white shadow-brand-gold/10"
                            : index === 1
                            ? "bg-slate-200 text-slate-700"
                            : index === 2
                            ? "bg-amber-600/70 text-white"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {index + 1}
                      </div>

                      <div className="flex flex-col">
                        <span className="text-xs font-black text-slate-800 leading-tight group-hover:text-brand-gold transition-colors">
                          {unidad.nombreGrupo}
                        </span>
                        <span className="text-[9px] text-slate-400 font-bold leading-none mt-1">
                          Líder: {unidad.lider}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right select-none">
                        <span className="text-sm font-black text-slate-900 tabular-nums">
                          {unidad.puntos.toLocaleString()}
                        </span>
                        <span className="text-[8px] font-bold text-slate-400 block leading-none mt-0.5">
                          Puntos
                        </span>
                      </div>

                      <div className="h-6 w-[1px] bg-slate-200" />

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveModal({
                              uId: unidad.id,
                              nombreGrupo: unidad.nombreGrupo,
                              puntos: unidad.puntos,
                              tipo: "sumar",
                            })
                          }
                          className="bg-brand-gold hover:bg-brand-gold-hover text-white text-[10px] font-bold px-3 py-2 rounded-xl flex items-center gap-1 cursor-pointer active:scale-95 transition-all shadow-sm shadow-brand-gold/10 select-none"
                        >
                          <Plus size={11} className="text-white shrink-0" />
                          <span>Sumar</span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setActiveModal({
                              uId: unidad.id,
                              nombreGrupo: unidad.nombreGrupo,
                              puntos: unidad.puntos,
                              tipo: "fijar",
                            })
                          }
                          className="border border-slate-200 hover:border-slate-350 text-slate-450 hover:text-slate-655 p-2 rounded-xl flex items-center justify-center cursor-pointer hover:bg-slate-50 active:scale-95 transition-all select-none"
                        >
                          <Pencil size={11} className="shrink-0" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="w-full bg-slate-100/70 h-1 rounded-full overflow-hidden">
                    <div
                      className="bg-brand-gold h-full rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${Math.max(3, progressPct)}%` }}
                    />
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </div>

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