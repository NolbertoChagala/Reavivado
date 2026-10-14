import Image from "next/image";
import logoadventista from "@/assets/img/logoadventista.webp";
import JA from "@/assets/img/JA.webp";

interface BrandLogoProps {
  size?: number;
  showDivider?: boolean;
  className?: string;
  isDark?: boolean;
}

export function BrandLogo({
  size = 32,
  showDivider = true,
  className = "",
  isDark = false,
}: BrandLogoProps) {
  return (
    <div className={`flex items-center gap-2 sm:gap-2.5 shrink-0 select-none ${className}`}>
      {/* Logo Iglesia Adventista */}
      <div className="flex items-center justify-center shrink-0">
        <Image
          src={logoadventista}
          alt="Iglesia Adventista del Séptimo Día"
          width={size}
          height={size}
          className="h-7 sm:h-8 w-auto object-contain rounded-full"
          priority
        />
      </div>

      {showDivider && (
        <span
          className={`h-4 sm:h-5 w-px transition-colors duration-300 ${
            isDark ? "bg-white/30" : "bg-slate-200"
          }`}
          aria-hidden="true"
        />
      )}

      {/* Logo Jóvenes Adventistas (JA): recortado en elipse exacta para eliminar las esquinas cuadradas blancas del archivo */}
      <div
        className="flex items-center justify-center shrink-0 overflow-hidden"
        style={{
          clipPath: "ellipse(48.5% 48% at 50% 50%)",
          WebkitClipPath: "ellipse(48.5% 48% at 50% 50%)",
        }}
      >
        <Image
          src={JA}
          alt="Jóvenes Adventistas"
          width={size}
          height={size}
          style={{ width: "auto", height: "auto" }}
          className="h-7 sm:h-8 w-auto object-contain"
          priority
        />
      </div>
    </div>
  );
}