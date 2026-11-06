"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout";
import { HomeView } from "@/features/home";
import { UnitsView } from "@/features/units";
import { CalendarView } from "@/features/calendar";
import { obtenerLecturaPorFecha, obtenerSemanaActual } from "@/lib/bibleLogic";
import { useCurrentDate, useScrollIntoView } from "@/hooks";
import { NAVIGATION_TABS } from "@/constants/app";
import type { Unidad } from "@/types";

export type VistaApp = keyof typeof NAVIGATION_TABS;

interface ReavivadoAppClientProps {
  unidades: Unidad[];
}

export default function ReavivadoAppClient({ unidades }: ReavivadoAppClientProps) {
  const [vista, setVista] = useState<VistaApp>("dia");
  const hoy = useCurrentDate();
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | null>(null);

  const fechaActiva = fechaSeleccionada || hoy;
  const refDiaActual = useScrollIntoView(vista === "semana");
  const lecturaHoy = obtenerLecturaPorFecha(fechaActiva);
  const semana = obtenerSemanaActual(fechaActiva);

  const handleCambiarVista = (nuevaVista: VistaApp) => {
    if (nuevaVista === vista) return;
    setVista(nuevaVista);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  return (
    <AppLayout vistaActual={vista} onChangeVista={handleCambiarVista}>
      <div className={vista === "dia" ? "block" : "hidden"}>
        <HomeView
          hoy={fechaActiva}
          lecturaHoy={lecturaHoy}
          unidades={unidades}
          onCambiarVista={handleCambiarVista}
        />
      </div>

      <div className={vista === "semana" ? "block" : "hidden"}>
        <UnitsView
          hoy={fechaActiva}
          semana={semana}
          refDiaActual={refDiaActual}
          unidades={unidades}
        />
      </div>

      <div className={vista === "mes" ? "block" : "hidden"}>
        <CalendarView
          fecha={fechaActiva}
          onSeleccionarFecha={(fecha) => {
            setFechaSeleccionada(fecha);
            handleCambiarVista("dia");
          }}
        />
      </div>
    </AppLayout>
  );
}