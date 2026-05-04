"use client";

import { useActionState } from "react";
import { registrarPuntaje } from "@/app/actions/puntos";
import { Save, Database, CheckCircle2, AlertCircle } from "lucide-react";

export default function FormularioPuntos({ unidades }: { unidades: any[] }) {
  const [state, formAction, isPending] = useActionState(registrarPuntaje, null);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
        <Database size={16} className="text-slate-400" />
        <h2 className="text-xs font-bold text-slate-800 uppercase tracking-widest text-center">
          Registro de Puntajes
        </h2>
      </div>

      <form action={formAction} className="p-8 space-y-6">
        {/* MENSAJE DE ÉXITO O ERROR */}
        {state?.message && (
          <div className={`flex items-center gap-3 p-4 rounded-xl text-[10px] font-bold uppercase tracking-widest animate-in fade-in slide-in-from-top-1 ${
            state.success ? "bg-green-50 text-green-600 border border-green-100" : "bg-red-50 text-red-600 border border-red-100"
          }`}>
            {state.success ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            {state.message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-slate-500 tracking-widest ml-1 text-center">
              Unidad Destino
            </label>
            <select 
              name="unidadId" 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs font-semibold text-slate-700 outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer" 
              required
            >
              <option value="">Seleccionar unidad...</option>
              {unidades.map(u => (
                <option key={u.id} value={u.id}>{u.nombreGrupo.toUpperCase()}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-slate-500 tracking-widest ml-1 text-center">
              Cantidad a Sumar
            </label>
            <input 
              name="cantidad" 
              type="number" 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-bold text-slate-900 outline-none focus:border-blue-500 transition-all text-center" 
              placeholder="0" 
              required 
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-50 flex justify-end">
          <button 
            type="submit" 
            disabled={isPending}
            className="w-full md:w-auto bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-100 disabled:opacity-50"
          >
            {isPending ? (
              <span className="animate-pulse">Guardando...</span>
            ) : (
              <>
                <Save size={16} /> Confirmar Registro
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}