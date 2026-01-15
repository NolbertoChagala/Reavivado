"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import NavigationBar from "@/components/NavigationBar";
import DayView from "@/components/views/DayView";
import WeekView from "@/components/views/WeekView";
import CalendarioMensual from "@/components/monthly_calendar";
import ChapterModal from "@/components/ChaptorModal";
import { obtenerLecturaPorFecha, obtenerSemanaActual } from "@/lib/bibleLogic";
import { useCurrentDate, useScrollIntoView } from "@/hooks";

/**
 * Componente Principal de la Aplicación Reavivado
 * 
 * Responsabilidades:
 * - Gestionar el estado global de la aplicación (vista actual, modal)
 * - Obtener los datos de lectura bíblica según la fecha
 * - Renderizar el componente correspondiente según la vista seleccionada
 * - Manejar la apertura/cierre del modal de lectura
 */
export default function ReavivadoApp() {
  // Estado para controlar qué vista se muestra al usuario
  const [vista, setVista] = useState<"dia" | "semana" | "mes">("dia");

  // Estado para mostrar/ocultar el modal de lectura de capítulo
  const [modalAbierto, setModalAbierto] = useState(false);

  // Obtener la fecha actual actualizada automáticamente cada 60 segundos
  const hoy = useCurrentDate();

  // Hook para scroll automático al día actual cuando se cambia a vista de semana
  // Devuelve una referencia que se pasa al componente WeekView
  const refDiaActual = useScrollIntoView(vista === "semana");

  // Obtener información de la lectura del día actual
  const lecturaHoy = obtenerLecturaPorFecha(hoy);

  // Obtener toda la semana de lecturas (7 días)
  const semana = obtenerSemanaActual(hoy);

  // Scroll al inicio cuando se cambia a la vista "día"
  useEffect(() => {
    if (vista === "dia") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [vista]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-slate-100 flex flex-col pb-24 text-slate-900">
      {/* Encabezado con logo y título */}
      <Header />

      {/* Contenido principal */}
      <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
        {/* VISTA DÍA: Lectura del día actual */}
        {vista === "dia" && (
          <DayView 
            hoy={hoy}
            lecturaHoy={lecturaHoy}
            onLeerCapitulo={() => setModalAbierto(true)}
          />
        )}

        {/* VISTA SEMANA: Lectura de los 7 días de la semana */}
        {vista === "semana" && (
          <WeekView 
            hoy={hoy}
            semana={semana}
            refDiaActual={refDiaActual}
          />
        )}

        {/* VISTA MES: Calendario del mes */}
        {vista === "mes" && (
          <div className="animate-in fade-in duration-300 space-y-4">
            <div>
              <h2 className="text-2xl font-black text-slate-800">
                Calendario del Mes
              </h2>
            </div>
            <CalendarioMensual fecha={hoy} />
          </div>
        )}
      </main>

      {/* Modal para leer el capítulo completo */}
      <ChapterModal
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        libro={lecturaHoy.libro}
        capitulo={lecturaHoy.capitulo}
      />

      {/* Barra de navegación inferior */}
      <NavigationBar 
        vistaActual={vista}
        onChangeVista={setVista}
      />
    </div>
  );
}
