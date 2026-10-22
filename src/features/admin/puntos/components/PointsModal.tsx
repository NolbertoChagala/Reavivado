"use client";

import { useEffect, useState } from "react";
import { Plus, Minus, Pencil, X } from "lucide-react";

export type Tipo = "sumar" | "restar" | "fijar";

export interface PointsModalProps {
  modalData: {
    uId: string;
    nombreGrupo: string;
    puntos: number;
    tipo: Tipo;
  };
  onClose: () => void;
  formAction: (payload: FormData) => void;
  isPending: boolean;
}

export function PointsModal({ modalData, onClose, formAction, isPending }: PointsModalProps) {
  const tipo = modalData.tipo;
  const [cantidad, setCantidad] = useState<string>(
    tipo === "fijar" ? String(modalData.puntos) : "0"
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const valor = Math.max(0, parseInt(cantidad, 10) || 0);

  const stepCantidad = (delta: number) => {
    const actual = parseInt(cantidad, 10) || 0;
    const nuevo = Math.max(0, actual + delta);
    setCantidad(String(nuevo));
  };

  const nuevoTotal =
    tipo === "sumar"
      ? modalData.puntos + valor
      : tipo === "restar"
      ? Math.max(0, modalData.puntos - valor)
      : valor;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 select-none">
      <button
        type="button"
        aria-label="Cerrar ventana"
        onClick={onClose}
        className="fixed inset-0 cursor-default bg-slate-900/60 backdrop-blur-xs"
      />

      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-sm rounded-lg border border-slate-200 bg-white p-5 shadow-xl space-y-4 text-slate-800"
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold ${
                tipo === "sumar"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : tipo === "restar"
                  ? "bg-rose-50 text-rose-700 border border-rose-200"
                  : "bg-slate-100 text-slate-800 border border-slate-200"
              }`}
            >
              {tipo === "sumar" && <Plus size={14} strokeWidth={2.5} />}
              {tipo === "restar" && <Minus size={14} strokeWidth={2.5} />}
              {tipo === "fijar" && <Pencil size={13} strokeWidth={2.5} />}
              {tipo === "sumar" && "Sumar Puntos"}
              {tipo === "restar" && "Restar Puntos"}
              {tipo === "fijar" && "Editar Puntaje"}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
            Unidad JA
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
            {modalData.nombreGrupo}
          </h3>
          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-200/60 text-xs">
            <span className="text-slate-500 font-medium">Puntos actuales:</span>
            <span className="font-extrabold text-[#0d2b56] bg-white px-2 py-0.5 rounded border border-slate-200 tabular-nums">
              {modalData.puntos.toLocaleString()} pts
            </span>
          </div>
        </div>

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="unidadId" value={modalData.uId} />
          <input type="hidden" name="tipoOperacion" value={tipo} />
          <input type="hidden" name="cantidad" value={valor} />

          <div className="space-y-1.5">
            <label htmlFor="cantidad-input" className="text-xs font-semibold text-slate-700 block">
              {tipo === "fijar" ? "Puntaje total a establecer:" : "Puntos a aplicar:"}
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => stepCantidad(-10)}
                className="h-11 w-11 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-md flex items-center justify-center text-slate-700 cursor-pointer active:scale-95 transition-all"
                title="Restar 10"
                aria-label="Restar 10"
              >
                <Minus size={16} strokeWidth={2.5} />
              </button>

              <div className="relative flex-1">
                <input
                  id="cantidad-input"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder={tipo === "fijar" ? String(modalData.puntos) : "0"}
                  value={cantidad}
                  onFocus={() => {
                    if (tipo !== "fijar" && cantidad === "0") {
                      setCantidad("");
                    }
                  }}
                  onBlur={() => {
                    if (!cantidad || cantidad.trim() === "") {
                      setCantidad(tipo === "fijar" ? String(modalData.puntos) : "0");
                    }
                  }}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, "");
                    const normalized = raw.replace(/^0+(?=\d)/, "");
                    setCantidad(normalized);
                  }}
                  className="w-full bg-white border border-slate-300 focus:border-[#0d2b56] focus:ring-2 focus:ring-[#0d2b56]/10 rounded-md py-2.5 px-3 text-center text-2xl font-black text-slate-900 focus:outline-none tabular-nums placeholder:text-slate-300"
                  required
                />
              </div>

              <button
                type="button"
                onClick={() => stepCantidad(10)}
                className="h-11 w-11 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-md flex items-center justify-center text-slate-700 cursor-pointer active:scale-95 transition-all"
                title="Sumar 10"
                aria-label="Sumar 10"
              >
                <Plus size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {tipo !== "fijar" && (
            <div className="flex items-center gap-1.5">
              {[10, 20, 30, 50].map((pts) => (
                <button
                  key={pts}
                  type="button"
                  onClick={() => setCantidad(String(pts))}
                  className={`flex-1 py-1.5 rounded-md text-xs font-semibold border transition-colors cursor-pointer ${
                    valor === pts
                      ? tipo === "sumar"
                        ? "bg-emerald-50 text-emerald-800 border-emerald-300 font-bold"
                        : "bg-rose-50 text-rose-800 border-rose-300 font-bold"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  {tipo === "sumar" ? `+${pts}` : `-${pts}`}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md border border-slate-200 text-xs">
            <span className="text-slate-500 font-medium">Nuevo puntaje final:</span>
            <span className="font-black text-[#0d2b56] text-sm sm:text-base tabular-nums">
              {nuevoTotal.toLocaleString()} pts
            </span>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="flex-1 py-2.5 rounded-md text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 cursor-pointer transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPending}
              className={`flex-1 py-2.5 rounded-md text-xs font-bold text-white shadow-xs cursor-pointer transition-colors ${
                tipo === "sumar"
                  ? "bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800"
                  : tipo === "restar"
                  ? "bg-rose-600 hover:bg-rose-700 active:bg-rose-800"
                  : "bg-[#0d2b56] hover:bg-[#091f3e] active:bg-[#06152b]"
              } ${isPending ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              {isPending ? "Guardando..." : "Confirmar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PointsModal;