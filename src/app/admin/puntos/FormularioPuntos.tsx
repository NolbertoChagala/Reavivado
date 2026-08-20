"use client";

import { useState, useEffect, useActionState } from "react";
import { registrarPuntaje } from "@/app/actions/puntos";
import { Save, CheckCircle2, AlertCircle, Plus, Minus, Trophy, Pencil, X, Activity, Users } from "lucide-react";

interface Unidad {
  id: string;
  nombreGrupo: string;
  lider: string;
  puntos: number;
}

export default function FormularioPuntos({ unidades }: { unidades: Unidad[] }) {
  const [state, formAction, isPending] = useActionState(registrarPuntaje, null);

  const [activeModal, setActiveModal] = useState<{
    uId: string;
    nombreGrupo: string;
    puntos: number;
    tipo: "sumar" | "fijar";
  } | null>(null);

  const [cantidad, setCantidad] = useState(0);

  useEffect(() => {
    if (activeModal) {
      if (activeModal.tipo === "fijar") {
        setCantidad(activeModal.puntos);
      } else {
        setCantidad(0);
      }
    }
  }, [activeModal]);

  useEffect(() => {
    if (state?.success) {
      setActiveModal(null);
      setCantidad(0);
    }
  }, [state]);

  const totalPuntos = unidades.reduce((acc, u) => acc + u.puntos, 0);
  const liderUnidad = unidades[0]?.nombreGrupo || "Ninguna";
  const liderNombre = unidades[0]?.lider || "---";
  const totalUnidades = unidades.length;

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-200/65 mb-8 select-none">
        <div>
          <h1 className="text-lg font-black text-slate-900 leading-tight">Gestión de puntajes</h1>
          <p className="text-[11px] text-slate-400 font-semibold mt-1.5 leading-none">Registra y controla los méritos semanales de las unidades de Villas Otoch 4.</p>
        </div>

        <div className="flex items-center gap-2 bg-white border border-slate-200/80 px-4 py-2.5 rounded-2xl shadow-sm self-start">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold text-slate-500">Servidor activo</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 select-none">

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex items-center gap-4">
          <div className="bg-amber-50 border border-brand-gold/25 p-3 rounded-2xl flex items-center justify-center shrink-0">
            <Trophy size={20} className="text-brand-gold" />
          </div>
          <div className="text-left">
            <span className="text-[9px] font-bold text-slate-400 block">Líder actual</span>
            <span className="text-sm font-black text-slate-800 block mt-1 leading-none">{liderUnidad}</span>
            <span className="text-[9px] text-slate-400 font-bold block mt-1.5 leading-none">Director: {liderNombre}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex items-center gap-4">
          <div className="bg-blue-50/50 border border-blue-100 p-3 rounded-2xl flex items-center justify-center shrink-0">
            <Activity size={20} className="text-blue-500" />
          </div>
          <div className="text-left">
            <span className="text-[9px] font-bold text-slate-400 block">Puntos distribuidos</span>
            <span className="text-sm font-black text-slate-800 block mt-1 leading-none">{totalPuntos.toLocaleString()}</span>
            <span className="text-[9px] text-slate-400 font-bold block mt-1.5 leading-none">Total acumulado de la sede</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex items-center gap-4">
          <div className="bg-slate-50 border border-slate-200/60 p-3 rounded-2xl flex items-center justify-center shrink-0">
            <Users size={20} className="text-slate-500" />
          </div>
          <div className="text-left">
            <span className="text-[9px] font-bold text-slate-400 block">Unidades registradas</span>
            <span className="text-sm font-black text-slate-800 block mt-1 leading-none">{totalUnidades}</span>
            <span className="text-[9px] text-slate-400 font-bold block mt-1.5 leading-none">Grupos activos registrados</span>
          </div>
        </div>

      </div>

      {state?.message && !activeModal && (
        <div className={`mb-6 flex items-center gap-3 p-4 rounded-2xl text-xs font-bold tracking-wide animate-in fade-in duration-300 ${state.success ? "bg-green-50 text-green-700 border border-green-200/50" : "bg-red-55 text-red-750 border border-red-200/50"
          }`}>
          {state.success ? <CheckCircle2 size={16} className="text-green-600 shrink-0" /> : <AlertCircle size={16} className="text-red-650 shrink-0" />}
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
                        <div className={`w-8 h-8 mx-auto flex items-center justify-center rounded-xl font-black italic text-xs shadow-sm select-none ${index === 0
                          ? "bg-brand-gold text-white shadow-brand-gold/10"
                          : index === 1
                            ? "bg-slate-200 text-slate-700"
                            : index === 2
                              ? "bg-amber-600/70 text-white"
                              : "bg-slate-100 text-slate-400"
                          }`}>
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
                          <span className="text-[9px] font-black text-slate-400 w-8 text-right tabular-nums">{progressPct}%</span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span className="text-sm font-black text-slate-900 tabular-nums">
                          {unidad.puntos.toLocaleString()}
                        </span>
                        <span className="text-[8px] font-bold text-slate-400 block leading-none mt-0.5 select-none">Puntos</span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setActiveModal({
                              uId: unidad.id,
                              nombreGrupo: unidad.nombreGrupo,
                              puntos: unidad.puntos,
                              tipo: "sumar"
                            })}
                            className="bg-brand-gold hover:bg-brand-gold-hover text-white text-[10px] font-bold px-3 py-2 rounded-xl flex items-center gap-1 cursor-pointer active:scale-95 transition-all select-none shadow-sm shadow-brand-gold/10"
                          >
                            <Plus size={11} className="text-white shrink-0" />
                            <span>Sumar</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setActiveModal({
                              uId: unidad.id,
                              nombreGrupo: unidad.nombreGrupo,
                              puntos: unidad.puntos,
                              tipo: "fijar"
                            })}
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

        {/* VISTA MÓVIL: Tarjetas Compactas (Celulares) */}
        <div className="block sm:hidden divide-y divide-slate-100">
          {(() => {
            const maxPuntos = unidades[0]?.puntos || 1;
            return unidades.map((unidad, index) => {
              const progressPct = Math.round((unidad.puntos / maxPuntos) * 100);
              return (
                <div key={unidad.id} className="p-4 flex flex-col gap-3 group">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 flex items-center justify-center rounded-xl font-black italic text-xs shadow-sm shrink-0 select-none ${index === 0
                        ? "bg-brand-gold text-white shadow-brand-gold/10"
                        : index === 1
                          ? "bg-slate-200 text-slate-700"
                          : index === 2
                            ? "bg-amber-600/70 text-white"
                            : "bg-slate-100 text-slate-400"
                        }`}>
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
                        <span className="text-[8px] font-bold text-slate-400 block leading-none mt-0.5">Puntos</span>
                      </div>

                      <div className="h-6 w-[1px] bg-slate-200" />

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setActiveModal({
                            uId: unidad.id,
                            nombreGrupo: unidad.nombreGrupo,
                            puntos: unidad.puntos,
                            tipo: "sumar"
                          })}
                          className="bg-brand-gold hover:bg-brand-gold-hover text-white text-[10px] font-bold px-3 py-2 rounded-xl flex items-center gap-1 cursor-pointer active:scale-95 transition-all shadow-sm shadow-brand-gold/10 select-none"
                        >
                          <Plus size={11} className="text-white shrink-0" />
                          <span>Sumar</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setActiveModal({
                            uId: unidad.id,
                            nombreGrupo: unidad.nombreGrupo,
                            puntos: unidad.puntos,
                            tipo: "fijar"
                          })}
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

      {/* MODAL POPUP PARA INGRESO DIRECTO DE PUNTOS */}
      {activeModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="fixed inset-0 cursor-default" onClick={() => setActiveModal(null)} />

          <div className="bg-white rounded-3xl max-w-sm w-full p-6 md:p-8 shadow-2xl border border-slate-155 relative z-10 animate-in zoom-in-95 duration-200 flex flex-col gap-6">

            {/* Header del Modal */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="bg-amber-50 p-2.5 rounded-2xl border border-brand-gold/25 flex items-center justify-center shrink-0">
                  {activeModal.tipo === "sumar" ? (
                    <Plus size={15} className="text-brand-gold" />
                  ) : (
                    <Pencil size={13} className="text-brand-gold" />
                  )}
                </div>
                <div className="text-left">
                  <h3 className="text-xs font-black text-slate-800 leading-none">
                    {activeModal.tipo === "sumar" ? "Sumar puntos" : "Corregir puntaje"}
                  </h3>
                  <p className="text-[10px] text-brand-gold font-bold mt-1.5 leading-none">
                    Unidad: {activeModal.nombreGrupo}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Formulario */}
            <form action={formAction} className="space-y-6">
              <input type="hidden" name="unidadId" value={activeModal.uId} />
              <input type="hidden" name="tipoOperacion" value={activeModal.tipo} />

              {/* Stepper del Modal */}
              <div className="flex flex-col items-center justify-center p-5 bg-slate-50 border border-slate-200/50 rounded-2xl space-y-3">
                <span className="text-[9px] font-bold text-slate-400 select-none">
                  {activeModal.tipo === "sumar" ? "Cantidad a sumar" : "Establecer puntos exactos"}
                </span>

                <div className="flex items-center gap-5">
                  <button
                    type="button"
                    onClick={() => setCantidad(prev => Math.max(0, prev - 10))}
                    className="w-10 h-10 bg-white hover:bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center text-slate-650 shadow-sm active:scale-95 transition-all select-none cursor-pointer"
                  >
                    <Minus size={15} />
                  </button>

                  <input
                    name="cantidad"
                    type="number"
                    value={cantidad}
                    onChange={(e) => setCantidad(parseInt(e.target.value) || 0)}
                    className="w-24 bg-transparent border-none text-center text-3xl font-black text-slate-800 focus:outline-none focus:ring-0 outline-none select-all"
                    placeholder="0"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setCantidad(prev => prev + 10)}
                    className="w-10 h-10 bg-white hover:bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center text-slate-650 shadow-sm active:scale-95 transition-all select-none cursor-pointer"
                  >
                    <Plus size={15} />
                  </button>
                </div>

                {/* Presets */}
                <div className="flex gap-1.5 pt-0.5">
                  {activeModal.tipo === "sumar" ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setCantidad(10)}
                        className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 rounded-lg text-[9px] font-bold transition-all cursor-pointer"
                      >
                        +10
                      </button>
                      <button
                        type="button"
                        onClick={() => setCantidad(50)}
                        className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 rounded-lg text-[9px] font-bold transition-all cursor-pointer"
                      >
                        +50
                      </button>
                      <button
                        type="button"
                        onClick={() => setCantidad(100)}
                        className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 rounded-lg text-[9px] font-bold transition-all cursor-pointer"
                      >
                        +100
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => setCantidad(prev => prev + 10)}
                        className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 rounded-lg text-[9px] font-bold transition-all cursor-pointer"
                      >
                        +10
                      </button>
                      <button
                        type="button"
                        onClick={() => setCantidad(prev => Math.max(0, prev - 10))}
                        className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 rounded-lg text-[9px] font-bold transition-all cursor-pointer"
                      >
                        -10
                      </button>
                      <button
                        type="button"
                        onClick={() => setCantidad(activeModal.puntos)}
                        className="px-2.5 py-1 bg-red-50 hover:bg-red-100 border border-red-100/40 text-red-655 rounded-lg text-[9px] font-bold transition-all cursor-pointer"
                      >
                        Restablecer
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Guía Visual */}
              <div className="bg-amber-50/50 border border-amber-200/35 rounded-2xl p-4 text-[10px] font-semibold text-slate-600 leading-relaxed text-center select-none">
                {activeModal.tipo === "sumar" ? (
                  <p>
                    Se sumarán <span className="font-bold text-slate-800">{cantidad}</span> puntos a la unidad.<br />
                    Total proyectado: <span className="font-black text-slate-900">{activeModal.puntos}</span> ➔{" "}
                    <span className="font-black text-brand-gold bg-amber-50 border border-brand-gold/15 px-1.5 py-0.5 rounded-md ml-0.5">
                      {activeModal.puntos + cantidad} pts
                    </span>
                  </p>
                ) : (
                  <p className="text-[9px] text-amber-800 leading-relaxed">
                    ⚠️ Nota: El puntaje actual ({activeModal.puntos} pts) se sobrescribirá por la cantidad exacta de {cantidad} pts al confirmar.
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 w-full">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-700 py-3.5 rounded-xl font-bold text-[10px] active:scale-[0.98] transition-all cursor-pointer text-center"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 text-white py-3.5 rounded-xl font-bold text-[10px] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md disabled:cursor-not-allowed"
                >
                  {isPending ? (
                    <div className="w-3.5 h-3.5 border-2 border-slate-400 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Save size={12} className="text-brand-gold shrink-0" />
                  )}
                  <span>Confirmar</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}