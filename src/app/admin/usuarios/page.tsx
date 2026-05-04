import prisma from "@/lib/db";
import FormularioUsuario from "./FormularioUsuario";
import AdminLayout from "@/components/AdminLayout";
import { ShieldCheck, UserPlus } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function UsuariosPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session_user");
  const role = cookieStore.get("user_role");

  if (!session || role?.value !== "ADMIN") {
    redirect("/login");
  }

  const [admin, usuarios] = await Promise.all([
    prisma.usuario.findUnique({ where: { id: session.value } }),
    prisma.usuario.findMany({ orderBy: { nombre: 'asc' } })
  ]);

  return (
    <AdminLayout adminName={admin?.nombre} activeTab="usuarios">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* FORMULARIO */}
        <section className="lg:col-span-5">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center gap-3 text-slate-800">
              <UserPlus size={16} />
              <h2 className="text-xs font-bold uppercase tracking-widest">Nuevo Acceso</h2>
            </div>
            <div className="p-6">
              <FormularioUsuario />
            </div>
          </div>
        </section>

        {/* LISTADO */}
        <section className="lg:col-span-7">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldCheck size={16} className="text-blue-500" />
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-800">Cuentas Activas</h2>
              </div>
              <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded font-bold uppercase">
                Total: {usuarios.length}
              </span>
            </div>
            
            <div className="divide-y divide-slate-50">
              {usuarios.map((u) => (
                <div key={u.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-900 uppercase tracking-tight">{u.nombre}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{u.email}</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg">
                    <span className="text-[9px] font-black tracking-widest uppercase">{u.rol}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </AdminLayout>
  );
}