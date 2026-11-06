import prisma from "@/lib/db";
import ReavivadoAppClient from "@/components/client/ReavivadoAppClient";

export default async function Page() {
  const unidades = await prisma.unidad.findMany({
    orderBy: { puntos: "desc" },
    select: {
      id: true,
      nombreGrupo: true,
      lider: true,
      puntos: true,
    },
  });

  return <ReavivadoAppClient unidades={unidades} />;
}