// Componente Header - Encabezado de la aplicación
// Totalmente responsive: se adapta a móvil, tablet y desktop
import Image from "next/image";
import { APP_NAME, APP_SUBTITLE } from "@/constants/app";
import logo from "@/assets/img/logoAdventista.webp";

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-md">
      {/* Contenedor principal con padding y espacios adaptativos */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 lg:py-5 flex items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-5">
        
        {/* Logo - Escala adaptativa por pantalla */}
        <div className="flex-shrink-0 flex items-center">
          <Image
            src={logo}
            alt="Logo Adventista"
            width={48}
            height={48}
            priority
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16"
          />
        </div>

        {/* Información de la App - Textos adaptativos */}
        <div className="text-center flex-1">
          <h1 className="text-base sm:text-lg md:text-2xl lg:text-4xl font-black text-slate-800 tracking-tight leading-tight">
            {APP_NAME}
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-500 font-semibold mt-0.5 sm:mt-1">
            {APP_SUBTITLE}
          </p>
        </div>

        {/* Espaciador flexible para centrar en desktop */}
        <div className="hidden sm:flex flex-shrink-0 w-8 sm:w-10 md:w-12 lg:w-16"></div>
      </div>
    </header>
  );
}
