"use client";
import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import DayView from "@/components/views/DayView";
import WeekView from "@/components/views/WeekView";
import CalendarioMensual from "@/components/monthly_calendar";
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

  return (
    <AppLayout vistaActual={vista} onChangeVista={(nuevaVista) => {
      // Si el usuario regresa a "dia" pero no hay fecha seleccionada, por defecto usa hoy
      setVista(nuevaVista);
    }}>
      {vista === "dia" && (
        <DayView
          hoy={fechaActiva}
          lecturaHoy={lecturaHoy}
          unidades={unidades}
        />
      )}
      {vista === "semana" && (
        <WeekView
          hoy={fechaActiva}
          semana={semana}
          refDiaActual={refDiaActual}
          unidades={unidades}
        />
      )}
      {vista === "mes" && (
        <CalendarioMensual 
          fecha={fechaActiva} 
          onSeleccionarFecha={(fecha) => {
            setFechaSeleccionada(fecha);
            setVista("dia");
          }}
        />
      )}
    </AppLayout>
  );
}
