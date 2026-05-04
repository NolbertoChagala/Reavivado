import { useEffect, useRef } from "react";

export function useScrollIntoView(shouldScroll: boolean) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldScroll && ref.current) {
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }, [shouldScroll]);

  return ref;
}
