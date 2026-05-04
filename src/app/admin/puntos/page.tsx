import prisma from "@/lib/db";
import AdminLayout from "@/components/AdminLayout";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import FormularioPuntos from "./FormularioPuntos";
import { Trophy, Hash, Users } from "lucide-react";

export default async function AdminPuntosPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session_user");
  const role = cookieStore.get("user_role");

  if (!session || role?.value !== "ADMIN") {
    redirect("/login");
  }

  // Carga de datos del administrador y unidades en Cancún
  const [admin, unidades] = await Promise.all([
    prisma.usuario.findUnique({ where: { id: session.value } }),
    prisma.unidad.findMany({ orderBy: { puntos: "desc" } }), // Ordenados por puntos para ver el ranking real
  ]);

  return (
    <AdminLayout adminName={admin?.nombre} activeTab="puntos">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* SECCIÓN IZQUIERDA: FORMULARIO Y LISTADO ACTUAL */}
        <section className="lg:col-span-2 space-y-8">
          
          {/* Formulario de entrada de puntos */}
          <div className="bg-white p-2 rounded-2xl border border-slate-100">
             <FormularioPuntos unidades={unidades} />
          </div>

          {/* LISTADO DE PUNTOS ACTUALES (AQUÍ SE REFLEJAN LOS CAMBIOS) */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Trophy size={16} className="text-[#003366]" />
                <h2 className="text-sm font-bold text-slate-900 italic">Estado actual de las unidades</h2>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white border-b border-slate-100">
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 tracking-widest uppercase w-16">Pos</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 tracking-widest uppercase">Unidad</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 tracking-widest uppercase text-right">Puntaje acumulado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {unidades.map((unidad, index) => (
                    <tr key={unidad.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-4">
                        <div className={`w-7 h-7 flex items-center justify-center rounded-lg font-black italic text-xs ${
                          index === 0 ? "bg-[#003366] text-white" : "bg-slate-100 text-slate-400"
                        }`}>
                          {index + 1}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-slate-900 italic group-hover:text-[#003366] transition-colors">
                            {unidad.nombreGrupo}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium tracking-tight">
                            Líder: {unidad.lider}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-lg font-black text-slate-900 tabular-nums">
                          {unidad.puntos.toLocaleString()}
                        </span>
                        <p className="text-[9px] font-bold text-slate-300 italic mt-0.5">unidades de valor</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECCIÓN DERECHA: STATUS INFORMATIVO */}
        <section className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Estado del Servidor</span>
              <span className="flex items-center gap-1.5 text-[9px] font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full tracking-tighter">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Live
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium italic">
              Los cambios impactan el Ranking público de **Villas Otoch 4** inmediatamente. Verifica los puntos antes de enviar.
            </p>
          </div>

          <div className="bg-[#003366] p-8 rounded-2xl text-white shadow-xl shadow-blue-900/10 relative overflow-hidden group">
            {/* Decoración sutil de ingeniería */}
            <Users className="absolute -right-4 -bottom-4 text-white/5 w-32 h-32 group-hover:scale-110 transition-transform duration-500" />
            
            <div className="relative z-10">
              <h3 className="text-[9px] font-bold uppercase tracking-[0.3em] text-blue-200/50 mb-4">Consola de Control</h3>
              <p className="text-[12px] text-blue-100 font-light italic leading-relaxed">
                Módulo de administración exclusivo para la gestión de méritos del Ministerio Juvenil.
              </p>
              <div className="mt-6 flex items-center gap-2">
                <Hash size={12} className="text-blue-300" />
                <span className="text-[10px] font-black tracking-widest text-blue-200">v2.0.4 - 2026</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}