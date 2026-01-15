// Componente Header - Encabezado de la aplicación
import Image from "next/image";
import { APP_NAME, APP_SUBTITLE } from "@/constants/app";
import logo from "@/assets/img/logoAdventista.webp";

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3 md:py-4 flex items-center justify-center gap-2 md:gap-4">
        {/* Logo de la Iglesia Adventista - Responsive */}
        <div className="flex-shrink-0">
          <Image
            src={logo}
            alt="Logo Adventista"
            width={36}
            height={36}
            priority
            className="sm:w-10 sm:h-10 md:w-12 md:h-12 w-8 h-8"
          />
        </div>

        {/* Información de la App - Responsive */}
        <div className="text-center flex-1 min-w-0">
          <h1 className="text-base sm:text-lg md:text-2xl font-black text-slate-800 tracking-tight leading-tight">
            {APP_NAME}
          </h1>
          <p className="text-xs sm:text-xs md:text-sm text-slate-500 font-semibold">
            {APP_SUBTITLE}
          </p>
        </div>

        {/* Espaciador flexible para centrar en desktop */}
        <div className="hidden sm:block sm:w-8 md:w-12 flex-shrink-0"></div>
      </div>
    </header>
  );
}
