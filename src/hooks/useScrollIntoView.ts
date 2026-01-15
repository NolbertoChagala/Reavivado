// Hook para manejar el scroll a un elemento específico
import { useEffect, useRef } from "react";

export function useScrollIntoView(shouldScroll: boolean) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldScroll && ref.current) {
      // Pequeño delay para asegurar que el DOM esté completamente renderizado
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }, [shouldScroll]);

  return ref;
}
