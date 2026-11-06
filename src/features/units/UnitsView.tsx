"use client";

import React, { useMemo, useState } from "react";
import {
  UnitsHeader,
  UnitsMetricsBridge,
  UnitsPodiumSection,
  UnitsRankingTable,
  UnitsScoringRules,
} from "./components";
import type { GrupoProcesado } from "./components/UnitsRankingTable";
import type { GrupoPodio } from "./components/UnitsPodiumSection";
import LeadershipFooter from "@/components/layout/LeadershipFooter";
import { JA_SCORING_RULES } from "@/constants/app";

export interface InputUnidad {
  id?: string;
  nombre?: string;
  nombreGrupo?: string;
  lider: string;
  puntos: number;
}

export interface UnitsViewProps {
  unidades?: InputUnidad[];
  hoy?: Date;
  semana?: unknown[];
  refDiaActual?: React.RefObject<HTMLDivElement | null>;
}

export default function UnitsView({ unidades = [] }: UnitsViewProps) {
  const [busqueda, setBusqueda] = useState("");

  const unidadesNormalizadas = useMemo(() => {
    return unidades.map((u) => ({
      nombre: u.nombreGrupo || u.nombre || "Sin nombre",
      lider: u.lider || "Sin líder",
      puntos: u.puntos || 0,
    }));
  }, [unidades]);

  const gruposProcesados: GrupoProcesado[] = useMemo(() => {
    const ordenados = [...unidadesNormalizadas].sort((a, b) => b.puntos - a.puntos);

    return ordenados.map((grupo, index) => {
      const grupoAdelante = index > 0 ? ordenados[index - 1] : null;
      const diferenciaAdelante = grupoAdelante ? grupoAdelante.puntos - grupo.puntos : 0;
      const nombreAdelante = grupoAdelante ? grupoAdelante.nombre : "";
      const aciertos = Math.floor(grupo.puntos / JA_SCORING_RULES.POINTS_PER_QUESTION);

      return {
        ...grupo,
        posicion: index + 1,
        aciertos,
        diferenciaAdelante,
        nombreAdelante,
      };
    });
  }, [unidadesNormalizadas]);

  const primerLugar: GrupoPodio | undefined = gruposProcesados[0];
  const segundoLugar: GrupoPodio | undefined = gruposProcesados[1];
  const tercerLugar: GrupoPodio | undefined = gruposProcesados[2];

  const puntosTotales = useMemo(
    () => unidadesNormalizadas.reduce((acc, u) => acc + u.puntos, 0),
    [unidadesNormalizadas]
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
      <UnitsHeader totalUnidades={unidadesNormalizadas.length} />
      <UnitsMetricsBridge
        liderActual={primerLugar}
        totalUnidades={unidadesNormalizadas.length}
        puntosTotales={puntosTotales}
      />
      <UnitsPodiumSection
        primerLugar={primerLugar}
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