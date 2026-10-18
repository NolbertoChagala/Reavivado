import { ReactNode } from "react";

interface KpiCardProps {
  label: string;
  value: string | number;
  description: string;
  icon: ReactNode;
  iconBgColor?: string;
}

export function KpiCard({
  label,
  value,
  description,
  icon,
  iconBgColor = "bg-slate-50 border-slate-200/60 text-slate-500",
}: KpiCardProps) {
  return (
    <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex items-center gap-4">
      <div className={`p-3 rounded-2xl border flex items-center justify-center shrink-0 ${iconBgColor}`}>
        {icon}
      </div>
      <div className="text-left">
        <span className="text-[9px] font-bold text-slate-400 block">{label}</span>
        <span className="text-sm font-black text-slate-800 block mt-1 leading-none">{value}</span>
        <span className="text-[9px] text-slate-400 font-bold block mt-1.5 leading-none">{description}</span>
      </div>
    </div>
  );
}