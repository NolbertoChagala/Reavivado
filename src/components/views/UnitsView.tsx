"use client";

import React, { useMemo, useState } from "react";
import {
  UnitsHeader,
  UnitsMetricsBridge,
  UnitsPodiumSection,
  UnitsRankingTable,
  UnitsScoringRules,
} from "./units";
import LeadershipFooter from "@/components/layout/LeadershipFooter";

interface Unidad {
  nombre: string;
  lider: string;
  puntos: number;
}

export interface UnitsViewProps {
  unidades?: Unidad[];
  hoy?: Date;
  semana?: any[];
  refDiaActual?: React.RefObject<HTMLDivElement | null>;
}

export default function UnitsView({ unidades = [] }: UnitsViewProps) {
  const [busqueda, setBusqueda] = useState("");

  const gruposProcesados = useMemo(() => {
    const ordenados = [...unidades].sort((a, b) => b.puntos - a.puntos);
    const maxPuntos = ordenados.length > 0 && ordenados[0].puntos > 0 ? ordenados[0].puntos : 1;

    return ordenados.map((grupo, index) => {
      const grupoAdelante = index > 0 ? ordenados[index - 1] : null;
      const diferenciaAdelante = grupoAdelante ? grupoAdelante.puntos - grupo.puntos : 0;
      const nombreAdelante = grupoAdelante ? grupoAdelante.nombre : "";
      const porcentaje = Math.round((grupo.puntos / maxPuntos) * 100);
      const aciertos = Math.floor(grupo.puntos / 10);

      return {
        ...grupo,
        diferenciaAdelante,
        nombreAdelante,
        posicion: index + 1,
        porcentaje,
        aciertos,
      };
    });
  }, [unidades]);

  const liderActual = gruposProcesados[0];
  const segundoLugar = gruposProcesados[1];
  const tercerLugar = gruposProcesados[2];

  const puntosTotales = useMemo(
    () => unidades.reduce((acc, u) => acc + (u.puntos || 0), 0),
    [unidades]
  );

  const gruposFiltrados = useMemo(() => {
    if (!busqueda.trim()) return gruposProcesados;
    const q = busqueda.toLowerCase().trim();
    return gruposProcesados.filter(
      (g) => g.nombre.toLowerCase().includes(q) || g.lider.toLowerCase().includes(q)
    );
  }, [gruposProcesados, busqueda]);

  return (
    <div className="w-full select-none bg-slate-50 font-sans text-slate-800">
      <UnitsHeader totalUnidades={unidades.length} />
      <UnitsMetricsBridge
        liderActual={liderActual}
        totalUnidades={unidades.length}
        puntosTotales={puntosTotales}
      />
      <UnitsPodiumSection
        primerLugar={liderActual}
        segundoLugar={segundoLugar}
        tercerLugar={tercerLugar}
        tieneUnidades={gruposProcesados.length > 0}
      />
      <UnitsRankingTable
        busqueda={busqueda}
        onBusquedaChange={setBusqueda}
        grupos={gruposFiltrados}
      />
      <UnitsScoringRules />
      <LeadershipFooter />
    </div>
  );
}