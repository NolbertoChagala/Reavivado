"use client";
import { useState, useEffect } from "react";
import { obtenerLecturaPorFecha, obtenerSemanaActual } from "@/lib/bibleLogic";
import CalendarioMensual from "@/components/monthly_calendar";
import AdventistLogo from "@/components/AdventistLogo";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar, List, BookOpen } from "lucide-react";

export default function ReavivadoApp() {
  const [vista, setVista] = useState<"dia" | "semana" | "mes">("dia");
  const [hoy, setHoy] = useState(new Date());

  useEffect(() => {
    // Actualizar la fecha cada minuto para que sea en tiempo real
    const interval = setInterval(() => {
      setHoy(new Date());
    }, 60000); // Actualizar cada 60 segundos

    return () => clearInterval(interval);
  }, []);

  const lecturaHoy = obtenerLecturaPorFecha(hoy);
  const semana = obtenerSemanaActual(hoy);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-slate-100 flex flex-col pb-24 text-slate-900">
      
      {/* HEADER ELEGANTE */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-center gap-3">
          <AdventistLogo />
          <div className="text-center flex-1">
            <h1 className="text-lg md:text-2xl font-black text-slate-800 tracking-tight">
              REAVIVADO
            </h1>
            <p className="text-xs md:text-sm text-slate-500 font-semibold">por su palabra</p>
          </div>
          <div className="w-12"></div>
        </div>
      </header>

      <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
        
        {/* VISTA DÍA: Lo que se estudia HOY */}
        {vista === "dia" && (
          <div className="space-y-6 animate-in fade-in zoom-in duration-300">
            {/* Card principal */}
            <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-3xl p-8 md:p-12 shadow-2xl text-white">
              <div className="space-y-4">
                <div>
                  <p className="text-teal-100 font-semibold uppercase tracking-widest text-xs mb-2">
                    Lectura para hoy
                  </p>
                  <p className="text-teal-50 font-semibold capitalize">
                    {format(hoy, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
                  </p>
                </div>
                
                <div className="py-8 space-y-2">
                  <p className="text-teal-100 font-semibold text-sm uppercase tracking-wide">Libro</p>
                  <h2 className="text-5xl md:text-6xl font-black">{lecturaHoy.libro}</h2>
                  <div className="pt-4 border-t border-teal-400/30">
                    <p className="text-teal-100 font-semibold text-sm uppercase tracking-wide mb-2">Capítulo</p>
                    <p className="text-6xl md:text-7xl font-light text-teal-100">{lecturaHoy.capitulo}</p>
                  </div>
                </div>

                <button className="w-full bg-white text-teal-700 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:bg-slate-50 active:scale-95 transition-all duration-200">
                  <BookOpen size={22} strokeWidth={2.5} /> Leer capítulo
                </button>
              </div>
            </div>

            {/* Info adicional */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100">
                <p className="text-slate-500 font-semibold text-xs uppercase tracking-wide mb-3">Próximo día</p>
                {(() => {
                  const manana = new Date(hoy);
                  manana.setDate(manana.getDate() + 1);
                  const lecturaMañana = obtenerLecturaPorFecha(manana);
                  return (
                    <div>
                      <p className="text-slate-800 font-bold text-sm">{lecturaMañana.libro}</p>
                      <p className="text-teal-600 font-semibold text-lg">Cap. {lecturaMañana.capitulo}</p>
                    </div>
                  );
                })()}
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100">
                <p className="text-slate-500 font-semibold text-xs uppercase tracking-wide mb-3">Versículo del día</p>
                <p className="text-slate-600 font-semibold text-sm italic">
                  "Lámpara es a mis pies tu palabra, y lumbrera a mi camino"
                </p>
                <p className="text-teal-600 font-semibold text-xs mt-2">Salmos 119:105</p>
              </div>
            </div>
          </div>
        )}

        {/* VISTA SEMANA: Organización de 7 días */}
        {vista === "semana" && (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <div>
              <h2 className="text-2xl font-black text-slate-800 mb-1">Semana Actual</h2>
              <p className="text-slate-500 text-sm">
                {format(hoy, "d 'de' MMMM", { locale: es })}
              </p>
            </div>

            <div className="space-y-3">
              {semana.map((dia: { diaNombre: string; numeroDia: number; libro: string; capitulo: number }, i: number) => {
                const esHoy = dia.numeroDia === hoy.getDate();
                return (
                  <div 
                    key={i} 
                    className={`p-5 rounded-2xl border-2 transition-all duration-200 ${
                      esHoy 
                        ? 'bg-teal-50 border-teal-500 ring-2 ring-teal-200 shadow-lg' 
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <p className={`font-bold uppercase tracking-wide text-xs mb-1 ${esHoy ? 'text-teal-700' : 'text-slate-500'}`}>
                          {dia.diaNombre.slice(0, 3)} • {dia.numeroDia}
                        </p>
                        <p className="text-slate-800 font-bold text-lg">{dia.libro}</p>
                        <p className="text-teal-600 font-semibold text-sm">Capítulo {dia.capitulo}</p>
                      </div>
                      {esHoy && (
                        <div className="bg-teal-500 text-white px-4 py-2 rounded-full">
                          <span className="text-xs font-bold">HOY</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VISTA MES: El calendario */}
        {vista === "mes" && (
          <div className="animate-in fade-in duration-300 space-y-4">
            <div>
              <h2 className="text-2xl font-black text-slate-800">Calendario Mensual</h2>
              <p className="text-slate-500 text-sm">
                {format(hoy, 'MMMM yyyy', { locale: es })}
              </p>
            </div>
            <CalendarioMensual fecha={hoy} />
          </div>
        )}
      </main>

      {/* MENÚ DE NAVEGACIÓN */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl">
        <div className="max-w-4xl mx-auto flex justify-around px-4 py-3">
          <button 
            onClick={() => setVista("dia")}
            className={`flex flex-col items-center gap-2 px-6 py-2 rounded-xl transition-all duration-200 ${
              vista === 'dia' 
                ? 'bg-teal-600 text-white shadow-lg' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookOpen size={24} strokeWidth={vista === 'dia' ? 2.5 : 2} />
            <span className="text-xs font-bold">DÍA</span>
          </button>
          
          <button 
            onClick={() => setVista("semana")}
            className={`flex flex-col items-center gap-2 px-6 py-2 rounded-xl transition-all duration-200 ${
              vista === 'semana' 
                ? 'bg-teal-600 text-white shadow-lg' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <List size={24} strokeWidth={vista === 'semana' ? 2.5 : 2} />
            <span className="text-xs font-bold">SEMANA</span>
          </button>
          
          <button 
            onClick={() => setVista("mes")}
            className={`flex flex-col items-center gap-2 px-6 py-2 rounded-xl transition-all duration-200 ${
              vista === 'mes' 
                ? 'bg-teal-600 text-white shadow-lg' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Calendar size={24} strokeWidth={vista === 'mes' ? 2.5 : 2} />
            <span className="text-xs font-bold">MES</span>
          </button>
        </div>
      </nav>
    </div>
  );
}