// src/components/views/ReavivadoAppClient.tsx
"use client";
import { useState } from "react";
import { AppLayout } from "@/components/layout";
import DayView from "./HomeView";
import WeekView from "./UnitsView";
import MonthlyCalendar from "./Monthly_calendar";
import { obtenerLecturaPorFecha, obtenerSemanaActual } from "@/lib/bibleLogic";
import { useCurrentDate, useScrollIntoView } from "@/hooks";

interface Unidad {
  nombre: string;
  lider: string;
  puntos: number;
}

interface Props {
  unidades: Unidad[];
}

export default function ReavivadoAppClient({ unidades }: Props) {
  const [vista, setVista] = useState<"dia" | "semana" | "mes">("dia");
  const hoy = useCurrentDate();
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | null>(null);

  const fechaActiva = fechaSeleccionada || hoy;
  const refDiaActual = useScrollIntoView(vista === "semana");
  const lecturaHoy = obtenerLecturaPorFecha(fechaActiva);
  const semana = obtenerSemanaActual(fechaActiva);

  const handleCambiarVista = (nuevaVista: "dia" | "semana" | "mes") => {
    if (nuevaVista === vista) return;
    setVista(nuevaVista);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  return (
    <AppLayout vistaActual={vista} onChangeVista={handleCambiarVista}>
      <div className={vista === "dia" ? "block" : "hidden"}>
        <DayView
          hoy={fechaActiva}
          lecturaHoy={lecturaHoy}
          unidades={unidades}
          onCambiarVista={handleCambiarVista}
        />
      </div>
      <div className={vista === "semana" ? "block" : "hidden"}>
        <WeekView
          hoy={fechaActiva}
          semana={semana}
          refDiaActual={refDiaActual}
          unidades={unidades}
        />
      </div>
      <div className={vista === "mes" ? "block" : "hidden"}>
        <MonthlyCalendar 
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