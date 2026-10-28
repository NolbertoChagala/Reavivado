"use client";

import { useState, useActionState, useMemo } from "react";
import { registrarPuntaje } from "@/app/actions/puntos";
import { CheckCircle2, AlertCircle } from "lucide-react";
import type { Unidad, TipoOperacionPuntos, ModalPuntosData } from "@/types/models";
import {
  PointsHeader,
  PointsKpiGrid,
  PointsTable,
  PointsModal,
} from "./components";

interface PointsManagementProps {
  unidades: Unidad[];
  adminName?: string;
}

export default function PointsManagement({ unidades }: PointsManagementProps) {
  const [busqueda, setBusqueda] = useState("");

  const [activeModal, setActiveModal] = useState<ModalPuntosData | null>(null);

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

  /* Métricas */
  const totalPuntos = useMemo(() => unidades.reduce((acc, u) => acc + u.puntos, 0), [unidades]);
  const unidadesOrdenadas = useMemo(() => [...unidades].sort((a, b) => b.puntos - a.puntos), [unidades]);
  const posiciones = useMemo(
    () => new Map(unidadesOrdenadas.map((u, i) => [u.id, i + 1] as const)),
    [unidadesOrdenadas]
  );

  /* Filtrado */
  const unidadesFiltradas = useMemo(() => {
    const q = busqueda.toLowerCase().trim();
    if (!q) return unidadesOrdenadas;
    return unidadesOrdenadas.filter(
      (u) => u.nombreGrupo.toLowerCase().includes(q) || u.lider.toLowerCase().includes(q)
    );
  }, [unidadesOrdenadas, busqueda]);

  const abrirModal = (u: Unidad, tipo: TipoOperacionPuntos) =>
    setActiveModal({ uId: u.id, nombreGrupo: u.nombreGrupo, puntos: u.puntos, tipo });

  return (
    <div className="w-full space-y-6 select-none font-sans text-slate-800">
      <PointsHeader />

      <PointsKpiGrid
        totalPuntos={totalPuntos}
        totalUnidades={unidades.length}
      />

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

      <PointsTable
        unidades={unidadesFiltradas}
        posiciones={posiciones}
        busqueda={busqueda}
        onBusquedaChange={setBusqueda}
        onAbrirModal={abrirModal}
      />

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