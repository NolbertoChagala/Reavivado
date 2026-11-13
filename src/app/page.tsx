import { unstable_cache } from "next/cache";
import prisma from "@/lib/db";
import ReavivadoAppClient from "@/components/client/ReavivadoAppClient";

const getUnidadesRanking = unstable_cache(
  async () => {
    return prisma.unidad.findMany({
      orderBy: { puntos: "desc" },
      select: {
        id: true,
        nombreGrupo: true,
        lider: true,
        puntos: true,
      },
    });
  },
  ["unidades-ranking-query"],
  {
    tags: ["unidades-ranking"],
    revalidate: 3600,
  }
);

export default async function Page() {
  const unidades = await getUnidadesRanking();

  return <ReavivadoAppClient unidades={unidades} />;
}