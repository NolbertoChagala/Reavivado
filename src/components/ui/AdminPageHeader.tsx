interface AdminPageHeaderProps {
  title: string;
  subtitle: string;
}

export function AdminPageHeader({ title, subtitle }: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-200/65 mb-8 select-none">
      <div>
        <h1 className="text-lg font-black text-slate-900 leading-tight">{title}</h1>
        <p className="text-[11px] text-slate-400 font-semibold mt-1.5 leading-none">{subtitle}</p>
      </div>

      <div className="flex items-center gap-2 bg-white border border-slate-200/80 px-4 py-2.5 rounded-2xl shadow-sm self-start">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-[10px] font-bold text-slate-500">Servidor activo</span>
      </div>
    </div>
  );
}