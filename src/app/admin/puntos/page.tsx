import prisma from "@/lib/db";
import { AdminLayout } from "@/components/layout";
import { PointsManagement } from "@/features/admin";
import { getCurrentSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";

export default async function AdminPuntosPage() {
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
    <AdminLayout adminName={admin?.nombre} activeTab="puntos">
      <PointsManagement unidades={unidades} adminName={admin?.nombre} />
    </AdminLayout>
  );
}