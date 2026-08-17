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
  const refDiaActual = useScrollIntoView(vista === "semana");
  const lecturaHoy = obtenerLecturaPorFecha(hoy);
  const semana = obtenerSemanaActual(hoy);

  return (
    <AppLayout vistaActual={vista} onChangeVista={setVista}>
      {vista === "dia" && (
        <DayView
          hoy={hoy}
          lecturaHoy={lecturaHoy}
          unidades={unidades}
        />
      )}
      {vista === "semana" && (
        <WeekView
          hoy={hoy}
          semana={semana}
          refDiaActual={refDiaActual}
          unidades={unidades}
        />
      )}
      {vista === "mes" && <CalendarioMensual fecha={hoy} />}
    </AppLayout>
  );
}

