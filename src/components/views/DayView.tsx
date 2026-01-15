// Vista del Día - Muestra la lectura diaria completa con información adicional
import { BookOpen } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { LABELS, VERSE_OF_DAY } from "@/constants/app";
import { obtenerLecturaPorFecha } from "@/lib/bibleLogic";

interface DayViewProps {
  hoy: Date;
  lecturaHoy: { libro: string; capitulo: number };
  onLeerCapitulo: () => void;
}

export default function DayView({
  hoy,
  lecturaHoy,
  onLeerCapitulo,
}: DayViewProps) {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
      {/* Card Principal de Lectura */}
      <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-3xl p-8 md:p-12 shadow-2xl text-white">
        <div className="space-y-4">
          {/* Encabezado con fecha */}
          <div>
            <p className="text-teal-100 font-semibold uppercase tracking-widest text-xs mb-2">
              {LABELS.lecturaParaHoy}
            </p>
            <p className="text-teal-50 font-semibold capitalize">
              {format(hoy, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
            </p>
          </div>

          {/* Información del Libro y Capítulo */}
          <div className="py-8 space-y-2">
            <p className="text-teal-100 font-semibold text-sm uppercase tracking-wide">
              {LABELS.libro}
            </p>
            <h2 className="text-5xl md:text-6xl font-black">{lecturaHoy.libro}</h2>
            <div className="pt-4 border-t border-teal-400/30">
              <p className="text-teal-100 font-semibold text-sm uppercase tracking-wide mb-2">
                {LABELS.capitulo}
              </p>
              <p className="text-6xl md:text-7xl font-light text-teal-100">{lecturaHoy.capitulo}</p>
            </div>
          </div>

          {/* Botón para Leer Capítulo */}
          <button
            onClick={onLeerCapitulo}
            className="w-full bg-white text-teal-700 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:bg-slate-50 active:scale-95 transition-all duration-200"
          >
            <BookOpen size={22} strokeWidth={2.5} /> {LABELS.leerCapitulo}
          </button>
        </div>
      </div>

      {/* Info Adicional - Próximo día y Versículo */}
      <InfoCards hoy={hoy} />
    </div>
  );
}

/**
 * Componente auxiliar para mostrar el próximo día y versículo del día
 */
interface InfoCardsProps {
  hoy: Date;
}

function InfoCards({ hoy }: InfoCardsProps) {
  const mañana = new Date(hoy);
  mañana.setDate(mañana.getDate() + 1);

  // Obtener la lectura del próximo día
  const lecturaMañana = obtenerLecturaPorFecha(mañana);

  return (
    <div className="grid grid-cols-2 gap-4 md:gap-6">
      {/* Card - Próximo Día */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100">
        <p className="text-slate-500 font-semibold text-xs uppercase tracking-wide mb-3">
          {LABELS.proximoDia}
        </p>
        <div>
          <p className="text-slate-800 font-bold text-sm">
            {lecturaMañana.libro}
          </p>
          <p className="text-teal-600 font-semibold text-lg">
            {lecturaMañana.capitulo}
          </p>
        </div>
      </div>

      {/* Card - Versículo del Día */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100">
        <p className="text-slate-500 font-semibold text-xs uppercase tracking-wide mb-3">
          {LABELS.versiculo}
        </p>
        <p className="text-slate-600 font-semibold text-sm italic">
          {VERSE_OF_DAY.text}
        </p>
        <p className="text-teal-600 font-semibold text-xs mt-2">
          {VERSE_OF_DAY.reference}
        </p>
      </div>
    </div>
  );
}
