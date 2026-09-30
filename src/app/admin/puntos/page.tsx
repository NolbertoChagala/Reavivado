import prisma from "@/lib/db";
import { AdminLayout } from "@/components/layout";
import { PointsManagement } from "@/components/admin";
import { getCurrentSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function AdminPuntosPage() {
  const session = await getCurrentSession();

  if (!session || session.role !== "ADMIN") {
    redirect("/login");
  }

  const [admin, unidades] = await Promise.all([
    prisma.usuario.findUnique({ where: { id: session.userId } }),
    prisma.unidad.findMany({ orderBy: { puntos: "desc" } }),
  ]);

  return (
    <AdminLayout adminName={admin?.nombre} activeTab="puntos">
      <PointsManagement unidades={unidades} />
    </AdminLayout>
  );
}