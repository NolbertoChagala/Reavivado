import prisma from "@/lib/db";
import { AdminLayout } from "@/components/layout";
import { PointsManagement } from "@/components/admin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminPuntosPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session_user");
  const role = cookieStore.get("user_role");

  if (!session || role?.value !== "ADMIN") {
    redirect("/login");
  }

  const [admin, unidades] = await Promise.all([
    prisma.usuario.findUnique({ where: { id: session.value } }),
    prisma.unidad.findMany({ orderBy: { puntos: "desc" } }),
  ]);

  return (
    <AdminLayout adminName={admin?.nombre} activeTab="puntos">
      <PointsManagement unidades={unidades} />
    </AdminLayout>
  );
}