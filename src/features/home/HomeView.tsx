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
import { VOTO_JA, type NAVIGATION_TABS } from "@/constants/app";
import type { Unidad } from "@/types";

type VistaApp = keyof typeof NAVIGATION_TABS;

export interface Lectura {
  libro: string;
  capitulo: number;
}

interface HomeViewProps {
  hoy: Date;
  lecturaHoy: Lectura;
  voto?: string;
  fondoUrl?: string;
  unidades?: Unidad[];
  onCambiarVista?: (vista: VistaApp) => void;
}

export default function HomeView({
  hoy,
  lecturaHoy,
  voto = VOTO_JA,
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