"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  format,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
} from "date-fns";
import { es } from "date-fns/locale";
import {
  CalendarHeader,
  CalendarMetricsBridge,
  CalendarControls,
  CalendarMonthGrid,
  CalendarWeekGrid,
  CalendarFlyerTemplate,
} from "./components";
import LeadershipFooter from "@/components/layout/LeadershipFooter";

interface CalendarViewProps {
  fecha: Date;
  onSeleccionarFecha: (fecha: Date) => void;
}

export default function CalendarView({ fecha, onSeleccionarFecha }: CalendarViewProps) {
  const [tipoVista, setTipoVista] = useState<"mes" | "semana">("mes");
  const [fechaFoco, setFechaFoco] = useState<Date>(fecha || new Date());
  const [diaSeleccionado, setDiaSeleccionado] = useState<Date>(fecha || new Date());
  const [descargando, setDescargando] = useState(false);
  const [lecturasCompletadas, setLecturasCompletadas] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const checksGuardados = localStorage.getItem("reavivado_lecturas_check");
      if (checksGuardados) {
        setLecturasCompletadas(JSON.parse(checksGuardados));
      }
    } catch {
    }
  }, []);

  const handleToggleLectura = (fechaKey: string) => {
    setLecturasCompletadas((prev) => {
      const actualizado = { ...prev, [fechaKey]: !prev[fechaKey] };
      try {
        localStorage.setItem("reavivado_lecturas_check", JSON.stringify(actualizado));
      } catch {
      }
      return actualizado;
    });
  };

  const hoy = new Date();

  // Días vista mensual
  const inicioMes = startOfMonth(fechaFoco);
  const finMes = endOfMonth(fechaFoco);
  const semanaInicio = startOfWeek(inicioMes, { weekStartsOn: 0 });
  const semanaFin = endOfWeek(finMes, { weekStartsOn: 0 });

  const diasMes = useMemo(() => {
    return eachDayOfInterval({ start: semanaInicio, end: semanaFin });
  }, [semanaInicio, semanaFin]);

  // Días vista semanal
  const inicioSemana = startOfWeek(fechaFoco, { weekStartsOn: 0 });
  const finSemana = endOfWeek(fechaFoco, { weekStartsOn: 0 });

  const diasSemana = useMemo(() => {
    return eachDayOfInterval({ start: inicioSemana, end: finSemana });
  }, [inicioSemana, finSemana]);

  const handleAnterior = () => {
    if (tipoVista === "mes") {
      setFechaFoco(subMonths(fechaFoco, 1));
    } else {
      setFechaFoco(subWeeks(fechaFoco, 1));
    }
  };

  const handleSiguiente = () => {
    if (tipoVista === "mes") {
      setFechaFoco(addMonths(fechaFoco, 1));
    } else {
      setFechaFoco(addWeeks(fechaFoco, 1));
    }
  };

  const handleHoy = () => {
    const d = new Date();
    setFechaFoco(d);
    setDiaSeleccionado(d);
  };

  const handleDescargarImagen = async () => {
    if (descargando) return;
    setDescargando(true);
    try {
      const { toPng } = await import("html-to-image");
      const node = document.getElementById("calendario-flyer-descargable");
      if (!node) {
        console.error("No se encontró el elemento para descargar");
        setDescargando(false);
        return;
      }

      const dataUrl = await toPng(node, {
        cacheBust: true,
        backgroundColor: "#ffffff",
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      const nombreMes = format(fechaFoco, "MMMM_yyyy", { locale: es });
      link.download = `Cronograma_Lecturas_${nombreMes}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error al exportar calendario como imagen:", error);
      alert("Hubo un error al generar la imagen. Intenta de nuevo.");
    } finally {
      setDescargando(false);
    }
  };

  return (
    <div className="w-full select-none bg-slate-50 font-sans text-slate-800">
      <CalendarHeader />
      <CalendarMetricsBridge />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 md:py-14">
        <div className="space-y-6">
          <CalendarControls
            tipoVista={tipoVista}
            onTipoVistaChange={setTipoVista}
            fechaFoco={fechaFoco}
            inicioSemana={inicioSemana}
            onAnterior={handleAnterior}
            onSiguiente={handleSiguiente}
            onHoy={handleHoy}
            onDescargarFlyer={handleDescargarImagen}
            descargando={descargando}
          />

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            {tipoVista === "mes" ? (
              <CalendarMonthGrid
                diasMes={diasMes}
                inicioMes={inicioMes}
                hoy={hoy}
                diaSeleccionado={diaSeleccionado}
                lecturasCompletadas={lecturasCompletadas}
                onSeleccionarDia={(dia) => {
                  setDiaSeleccionado(dia);
                  onSeleccionarFecha(dia);
                }}
                onToggleLectura={handleToggleLectura}
                onIrAInicio={(dia) => onSeleccionarFecha(dia)}
              />
            ) : (
              <CalendarWeekGrid
                diasSemana={diasSemana}
                hoy={hoy}
                diaSeleccionado={diaSeleccionado}
                lecturasCompletadas={lecturasCompletadas}
                onToggleLectura={handleToggleLectura}
              />
            )}
          </div>
        </div>
      </section>

      <LeadershipFooter />

      <CalendarFlyerTemplate
        fechaFoco={fechaFoco}
        inicioMes={inicioMes}
        diasMes={diasMes}
      />
    </div>
  );
}