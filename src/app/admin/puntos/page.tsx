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
    prisma.unidad.findMany({ orderBy: { puntos: "desc" } }),
  ]);

  return (
    <AdminLayout adminName={admin?.nombre} activeTab="puntos">
      <FormularioPuntos unidades={unidades} />
    </AdminLayout>
  );
}