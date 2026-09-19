import Image from "next/image";
import logoadventista from "@/assets/img/logoadventista.webp";
import JA from "@/assets/img/JA.webp";

interface BrandLogoProps {
  size?: number;
  showDivider?: boolean;
}

export function BrandLogo({ size = 26, showDivider = false }: BrandLogoProps) {
  return (
    <div className="flex items-center gap-1.5 p-1 bg-slate-50 border border-slate-100 rounded-lg shadow-sm">
      <Image
        src={logoadventista}
        alt="IASD"
        width={size}
        height={size}
        className="object-contain"
        priority
      />
      {showDivider && <div className="h-4 w-[1px] bg-slate-200" />}
      <Image
        src={JA}
        alt="JA"
        width={size}
        height={size}
        className="object-contain"
        priority
      />
    </div>
  );
}