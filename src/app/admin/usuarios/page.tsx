import prisma from "@/lib/db";
import { AdminLayout } from "@/components/layout";
import { AdminPageHeader, KpiCard, UserForm, UserList } from "@/components/admin";
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
    prisma.usuario.findMany({ orderBy: { nombre: "asc" } }),
  ]);

  const totalCuentas = usuarios.length;
  const totalAdmins = usuarios.filter((u) => u.rol === "ADMIN").length;

  return (
    <AdminLayout adminName={admin?.nombre} activeTab="usuarios">
      <AdminPageHeader
        title="Control de usuarios"
        subtitle="Administra los accesos oficiales al panel administrativo del Ministerio Juvenil."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 select-none">
        <KpiCard
          label="Cuentas activas"
          value={totalCuentas}
          description="Administradores registrados"
          icon={<Users size={20} className="text-blue-500" />}
          iconBgColor="bg-blue-50/50 border-blue-100"
        />
        <KpiCard
          label="Acceso total"
          value={totalAdmins}
          description="Privilegios totales habilitados"
          icon={<Shield size={20} className="text-brand-gold" />}
          iconBgColor="bg-amber-50 border-brand-gold/25"
        />
        <KpiCard
          label="Estado del panel"
          value="Seguro"
          description="Protección contra auto-eliminación"
          icon={<ShieldAlert size={20} className="text-green-500" />}
          iconBgColor="bg-green-50 border-green-150"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <section className="lg:col-span-5">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3 text-slate-800 select-none">
              <UserPlus size={16} className="text-brand-gold" />
              <h2 className="text-xs font-black text-slate-800">Nuevo acceso</h2>
            </div>
            <div className="p-6">
              <UserForm />
            </div>
          </div>
        </section>

        <section className="lg:col-span-7">
          <UserList usuarios={usuarios} currentAdminId={session.value} />
        </section>
      </div>
    </AdminLayout>
  );
}