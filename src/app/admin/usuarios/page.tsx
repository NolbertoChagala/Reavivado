import prisma from "@/lib/db";
import { AdminLayout } from "@/components/layout";
import { UserManagement } from "@/components/admin/usuarios";
import { getCurrentSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";

export default async function UsuariosPage() {
  const session = await getCurrentSession();

  if (!session || session.role !== Role.ADMIN) {
    redirect("/login");
  }

  const [admin, usuarios] = await Promise.all([
    prisma.usuario.findUnique({ where: { id: session.userId } }),
    prisma.usuario.findMany({ orderBy: { nombre: "asc" } }),
  ]);

  return (
    <AdminLayout adminName={admin?.nombre} activeTab="usuarios">
      <UserManagement usuarios={usuarios} currentAdminId={session.userId} />
    </AdminLayout>
  );
}