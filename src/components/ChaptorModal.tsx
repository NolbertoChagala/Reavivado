/**
 * Modal para visualizar el capítulo completo de la Biblia
 * 
 * Características:
 * - Intenta cargar el contenido desde una API externa
 * - Proporciona enlace a Bible.com como alternativa
 * - Diseño responsive (mobile bottom-sheet, desktop centrado)
 * - Animaciones suave de entrada
 */

"use client";
import { useState, useEffect } from "react";
import { X, Loader2, ExternalLink } from "lucide-react";

interface ChapterModalProps {
  isOpen: boolean;
  onClose: () => void;
  libro: string;
  capitulo: number;
}

export default function ChapterModal({
  isOpen,
  onClose,
  libro,
  capitulo,
}: ChapterModalProps) {
  const [contenido, setContenido] = useState<string>("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      cargarCapitulo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, libro, capitulo]);

  /**
   * Carga el contenido del capítulo desde una API externa
   */
  const cargarCapitulo = async () => {
    setCargando(true);
    setError(false);
    setContenido("");

    try {
      // Intentar cargar desde la API de la Biblia
      const response = await fetch(
        `https://api.versiculo.com/v1/verses/${libro}/${capitulo}`
      );

      if (response.ok) {
        const data = await response.json();
        setContenido(data.content || data.text);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setCargando(false);
    }
  };

  /**
   * Genera un enlace a Bible.com como alternativa cuando falla la API
   */
  const obtenerEnlaceExterno = () => {
    const nombreLibro = libro.replace(/\s+/g, "+");
    return `https://www.bible.com/es/search?q=${nombreLibro}+${capitulo}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4">
      <div className="bg-white rounded-2xl md:rounded-3xl w-full md:max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl animate-in slide-in-from-bottom-10 md:zoom-in duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-4 md:p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl md:text-2xl font-black">{libro}</h2>
            <p className="text-teal-100 text-sm">Capítulo {capitulo}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-teal-500 rounded-lg transition-colors"
            aria-label="Cerrar"
          >
            <X size={24} />
          </button>
        </div>

        {/* Contenido */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {cargando && (
            <div className="flex items-center justify-center h-32">
              <Loader2 size={32} className="animate-spin text-teal-600" />
            </div>
          )}

          {error && (
            <div className="space-y-4">
              <p className="text-slate-600 text-center">
                No se pudo cargar el capítulo. Abre el texto en un navegador externo:
              </p>
              <a
                href={obtenerEnlaceExterno()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold"
              >
                <ExternalLink size={20} />
                Leer en Bible.com
              </a>
            </div>
          )}

          {contenido && (
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <div className="prose prose-sm max-w-none">
                {contenido.split("\n").map((linea, idx) => (
                  <p key={idx} className="text-base md:text-lg">
                    {linea}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 md:p-6">
          <button
            onClick={onClose}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
