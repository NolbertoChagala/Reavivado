// src/components/CalendarioMensual.tsx
import { obtenerLecturaPorFecha } from "@/lib/bibleLogic";
import { eachDayOfInterval, startOfMonth, endOfMonth, format, startOfWeek, endOfWeek } from "date-fns";
import { es } from "date-fns/locale";

export default function CalendarioMensual({ fecha }: { fecha: Date }) {
  const inicio = startOfMonth(fecha);
  const fin = endOfMonth(fecha);
  const semanaInicio = startOfWeek(inicio, { weekStartsOn: 0 });
  const semanaFin = endOfWeek(fin, { weekStartsOn: 0 });
  
  const dias = eachDayOfInterval({ start: semanaInicio, end: semanaFin });
  const semanas = [];
  
  // Agrupar días por semanas
  for (let i = 0; i < dias.length; i += 7) {
    semanas.push(dias.slice(i, i + 7));
  }

  return (
    <div className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden border border-slate-200">
      {/* Header con mes y año */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-4 md:p-8 text-center">
        <div className="flex justify-between items-center">
          <span className="text-slate-400 font-bold text-xs md:text-lg">
            {format(inicio, 'MM')}
          </span>
          <h2 className="text-white font-black text-lg md:text-4xl tracking-wider">
            {format(inicio, 'MMMM', { locale: es }).toUpperCase()}
          </h2>
          <span className="text-slate-400 font-bold text-xs md:text-lg">
            {format(inicio, 'yyyy')}
          </span>
        </div>
      </div>

      {/* Contenedor responsivo */}
      <div className="p-2 md:p-6">
        {/* Vista móvil: Lista de días */}
        <div className="md:hidden space-y-2">
          {dias.map((dia) => {
            const esDiaDelMes = dia.getMonth() === inicio.getMonth();
            const esHoy = dia.toDateString() === new Date().toDateString();
            
            if (!esDiaDelMes) return null;
            
            const lectura = obtenerLecturaPorFecha(dia);
            
            return (
              <div
                key={dia.toString()}
                className={`flex justify-between items-center p-4 rounded-xl border-2 transition-all ${
                  esHoy
                    ? 'bg-teal-50 border-teal-500 shadow-md'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-slate-500 uppercase">
                    {format(dia, 'EEEE', { locale: es })} {format(dia, 'd')}
                  </span>
                  <div>
                    <span className="text-slate-800 font-bold text-sm block">{lectura.libro}</span>
                    <span className="text-teal-600 font-semibold text-xs">Capítulo {lectura.capitulo}</span>
                  </div>
                </div>
                {esHoy && <span className="text-xs font-bold text-white px-3 py-1 bg-teal-500 rounded-full">HOY</span>}
              </div>
            );
          })}
        </div>

        {/* Vista desktop: Grilla */}
        <div className="hidden md:block">
          {semanas.map((semana, semanaIdx) => (
            <div key={semanaIdx} className="mb-4">
              {/* Headers de días solo en la primera semana */}
              {semanaIdx === 0 && (
                <div className="grid grid-cols-7 gap-2 mb-2">
                  {['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map(d => (
                    <div key={d} className="text-center font-bold text-slate-600 text-sm py-2 border-b-2 border-slate-200">
                      {d.slice(0, 3)}
                    </div>
                  ))}
                </div>
              )}
              
              {/* Fila de días */}
              <div className="grid grid-cols-7 gap-2">
                {semana.map((dia) => {
                  const esDiaDelMes = dia.getMonth() === inicio.getMonth();
                  const esHoy = dia.toDateString() === new Date().toDateString();
                  
                  if (!esDiaDelMes) {
                    return <div key={dia.toString()} className="bg-slate-50 rounded-xl min-h-[130px]"></div>;
                  }
                  
                  const lectura = obtenerLecturaPorFecha(dia);
                  
                  return (
                    <div
                      key={dia.toString()}
                      className={`border-2 p-4 rounded-xl flex flex-col justify-between min-h-[130px] transition-all ${
                        esHoy
                          ? 'bg-teal-50 border-teal-500 shadow-md'
                          : 'bg-white border-slate-200 hover:shadow-md hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <span className="text-sm font-bold text-slate-600 block">{format(dia, 'd')}</span>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-slate-800 font-bold text-sm">{lectura.libro}</p>
                        <p className="text-teal-600 font-semibold text-sm">Cap. {lectura.capitulo}</p>
                      </div>
                      
                      {esHoy && (
                        <span className="text-xs font-bold text-white px-2 py-1 bg-teal-500 rounded-full text-center">HOY</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}