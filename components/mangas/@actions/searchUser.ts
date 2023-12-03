"use server";

import { Manga } from "@/lib/types";
import { getSafeSessionServer, prisma } from "@/lib/utils";

export const getMangasByUser = async (
  {searchTitle, page=1, nbAffiche} :
  {searchTitle: string, page?: number, nbAffiche: number}
): Promise<
  { success: true; mangas: Manga[] } | { success: false; error: string }
> => {
  const session = await getSafeSessionServer();
  const mangas = await prisma.manga.findMany({
    where: {
        user: {
          email: session.user.email,
        },
        title: {
          contains: String(searchTitle || ""),
        },
    },
    orderBy: {
      id: "desc",
    },
    skip: nbAffiche*(page-1),
    take: nbAffiche,
  });
  
  return { success: true, mangas };
};
