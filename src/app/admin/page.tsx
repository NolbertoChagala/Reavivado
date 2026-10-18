import prisma from "@/lib/db";
import { AdminLayout } from "@/components/layout";
import { getCurrentSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";
import AdminDashboard from "@/features/admin/AdminDashboard";

export default async function AdminInicioPage() {
  const session = await getCurrentSession();

  if (!session || session.role !== Role.ADMIN) {
    redirect("/login");
  }

  const [admin, unidades, usuarios] = await Promise.all([
    prisma.usuario.findUnique({ where: { id: session.userId } }),
    prisma.unidad.findMany({ orderBy: { puntos: "desc" } }),
    prisma.usuario.findMany({ orderBy: { nombre: "asc" } }),
  ]);

  return (
    <AdminLayout adminName={admin?.nombre} activeTab="inicio">
      <AdminDashboard
        adminName={admin?.nombre}
        unidades={unidades}
        usuarios={usuarios}
        currentAdminId={session.userId}
      />
    </AdminLayout>
  );
}
