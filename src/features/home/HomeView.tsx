"use client";

import React from "react";
import {
  HomeHeader,
  HomeMetricsBridge,
  HomePurposeSection,
  HomeReadingSection,
  HomeIdealsSection,
} from "./components";
import LeadershipFooter from "@/components/layout/LeadershipFooter";

interface Lectura {
  libro: string;
  capitulo: number;
}

interface Unidad {
  nombre: string;
  lider: string;
  puntos: number;
}

interface HomeViewProps {
  hoy: Date;
  lecturaHoy: Lectura;
  voto?: string;
  fondoUrl?: string;
  unidades?: Unidad[];
  onCambiarVista?: (vista: "dia" | "semana" | "mes") => void;
}

const VOTO_JA_POR_DEFECTO =
  "Por amor al Señor Jesús, prometo tomar parte activa en la obra de los Ministerios Juveniles Adventistas, haciendo cuanto pueda para ayudar a otros, y para terminar la obra del evangelio en todo el mundo";

export default function HomeView({
  hoy,
  lecturaHoy,
  voto = VOTO_JA_POR_DEFECTO,
  onCambiarVista,
}: HomeViewProps) {
  return (
    <div className="w-full select-none bg-slate-50 font-sans text-slate-800">
      <HomeHeader hoy={hoy} />
      <HomeMetricsBridge />
      <HomePurposeSection onCambiarVista={onCambiarVista} />
      <HomeReadingSection lecturaHoy={lecturaHoy} />
      <HomeIdealsSection voto={voto} />
      <LeadershipFooter />
    </div>
  );
}