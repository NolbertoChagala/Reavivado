import prisma from "@/lib/db";
import FormularioUsuario from "./FormularioUsuario";
import ListaUsuarios from "./ListaUsuarios";
import AdminLayout from "@/components/AdminLayout";
import { UserPlus, Shield, Users, ShieldAlert } from "lucide-react";
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

  // Cálculos dinámicos de métricas KPI
  const totalCuentas = usuarios.length;
  const totalAdmins = usuarios.filter(u => u.rol === "ADMIN").length;

  return (
    <AdminLayout adminName={admin?.nombre} activeTab="usuarios">
      {/* CABECERA DE LA PÁGINA */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-200/65 mb-8 select-none">
        <div>
          <h1 className="text-lg font-black text-slate-900 leading-tight">Control de usuarios</h1>
          <p className="text-[11px] text-slate-400 font-semibold mt-1.5 leading-none">Administra los accesos oficiales al panel administrativo del Ministerio Juvenil.</p>
        </div>
        
        {/* Servidor Live status */}
        <div className="flex items-center gap-2 bg-white border border-slate-200/80 px-4 py-2.5 rounded-2xl shadow-sm self-start">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold text-slate-500">Servidor activo</span>
        </div>
      </div>

      {/* METRICAS KPI DE RESUMEN */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 select-none">
        {/* KPI 1: Cuentas registradas */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex items-center gap-4">
          <div className="bg-blue-50/50 border border-blue-100 p-3 rounded-2xl flex items-center justify-center shrink-0">
            <Users size={20} className="text-blue-500" />
          </div>
          <div className="text-left">
            <span className="text-[9px] font-bold text-slate-400 block">Cuentas activas</span>
            <span className="text-sm font-black text-slate-800 block mt-1 leading-none">{totalCuentas}</span>
            <span className="text-[9px] text-slate-400 font-bold block mt-1.5 leading-none">Administradores registrados</span>
          </div>
        </div>

        {/* KPI 2: Nivel Administrador Total */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex items-center gap-4">
          <div className="bg-amber-50 border border-brand-gold/25 p-3 rounded-2xl flex items-center justify-center shrink-0">
            <Shield size={20} className="text-brand-gold" />
          </div>
          <div className="text-left">
            <span className="text-[9px] font-bold text-slate-400 block">Acceso total</span>
            <span className="text-sm font-black text-slate-800 block mt-1 leading-none">{totalAdmins}</span>
            <span className="text-[9px] text-slate-400 font-bold block mt-1.5 leading-none">Privilegios totales habilitados</span>
          </div>
        </div>

        {/* KPI 3: Estado de Seguridad */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex items-center gap-4">
          <div className="bg-green-50 border border-green-150 p-3 rounded-2xl flex items-center justify-center shrink-0">
            <ShieldAlert size={20} className="text-green-500" />
          </div>
          <div className="text-left">
            <span className="text-[9px] font-bold text-slate-400 block">Estado del panel</span>
            <span className="text-sm font-black text-slate-800 block mt-1 leading-none">Seguro</span>
            <span className="text-[9px] text-slate-400 font-bold block mt-1.5 leading-none">Protección contra auto-eliminación</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* FORMULARIO */}
        <section className="lg:col-span-5">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3 text-slate-800 select-none">
              <UserPlus size={16} className="text-brand-gold" />
              <h2 className="text-xs font-black text-slate-800">Nuevo acceso</h2>
            </div>
            <div className="p-6">
              <FormularioUsuario />
            </div>
          </div>
        </section>

        {/* LISTADO */}
        <section className="lg:col-span-7">
          <ListaUsuarios usuarios={usuarios} currentAdminId={session.value} />
        </section>
      </div>
    </AdminLayout>
  );
}