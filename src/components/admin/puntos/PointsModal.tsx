"use client";

import { useState } from "react";
import { Save, Plus, Minus, Pencil, X } from "lucide-react";

interface PointsModalProps {
  modalData: {
    uId: string;
    nombreGrupo: string;
    puntos: number;
    tipo: "sumar" | "fijar";
  };
  onClose: () => void;
  formAction: (payload: FormData) => void;
  isPending: boolean;
}

export function PointsModal({
  modalData,
  onClose,
  formAction,
  isPending,
}: PointsModalProps) {
  // Inicialización limpia sin useEffect
  const [cantidad, setCantidad] = useState(
    modalData.tipo === "fijar" ? modalData.puntos : 0
  );

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="fixed inset-0 cursor-default" onClick={onClose} />

      <div className="bg-white rounded-3xl max-w-sm w-full p-6 md:p-8 shadow-2xl border border-slate-100 relative z-10 animate-in zoom-in-95 duration-200 flex flex-col gap-6">
        {/* Header del Modal */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="bg-amber-50 p-2.5 rounded-2xl border border-brand-gold/25 flex items-center justify-center shrink-0">
              {modalData.tipo === "sumar" ? (
                <Plus size={15} className="text-brand-gold" />
              ) : (
                <Pencil size={13} className="text-brand-gold" />
              )}
            </div>
            <div className="text-left">
              <h3 className="text-xs font-black text-slate-800 leading-none">
                {modalData.tipo === "sumar" ? "Sumar puntos" : "Corregir puntaje"}
              </h3>
              <p className="text-[10px] text-brand-gold font-bold mt-1.5 leading-none">
                Unidad: {modalData.nombreGrupo}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <form action={formAction} className="space-y-6">
          <input type="hidden" name="unidadId" value={modalData.uId} />
          <input type="hidden" name="tipoOperacion" value={modalData.tipo} />

          <div className="flex flex-col items-center justify-center p-5 bg-slate-50 border border-slate-200/50 rounded-2xl space-y-3">
            <span className="text-[9px] font-bold text-slate-400 select-none">
              {modalData.tipo === "sumar" ? "Cantidad a sumar" : "Establecer puntos exactos"}
            </span>

            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={() => setCantidad((prev) => Math.max(0, prev - 10))}
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
                onClick={() => setCantidad((prev) => prev + 10)}
                className="w-10 h-10 bg-white hover:bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center text-slate-650 shadow-sm active:scale-95 transition-all select-none cursor-pointer"
              >
                <Plus size={15} />
              </button>
            </div>

            <div className="flex gap-1.5 pt-0.5">
              {modalData.tipo === "sumar" ? (
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
                    onClick={() => setCantidad((prev) => prev + 10)}
                    className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 rounded-lg text-[9px] font-bold transition-all cursor-pointer"
                  >
                    +10
                  </button>
                  <button
                    type="button"
                    onClick={() => setCantidad((prev) => Math.max(0, prev - 10))}
                    className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 rounded-lg text-[9px] font-bold transition-all cursor-pointer"
                  >
                    -10
                  </button>
                  <button
                    type="button"
                    onClick={() => setCantidad(modalData.puntos)}
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
            {modalData.tipo === "sumar" ? (
              <p>
                Se sumarán <span className="font-bold text-slate-800">{cantidad}</span> puntos a la unidad.<br />
                Total proyectado: <span className="font-black text-slate-900">{modalData.puntos}</span> ➔{" "}
                <span className="font-black text-brand-gold bg-amber-50 border border-brand-gold/15 px-1.5 py-0.5 rounded-md ml-0.5">
                  {modalData.puntos + cantidad} pts
                </span>
              </p>
            ) : (
              <p className="text-[9px] text-amber-800 leading-relaxed">
                ⚠️ Nota: El puntaje actual ({modalData.puntos} pts) se sobrescribirá por la cantidad exacta de {cantidad} pts al confirmar.
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-slate-100 w-full">
            <button
              type="button"
              onClick={onClose}
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
  );
}