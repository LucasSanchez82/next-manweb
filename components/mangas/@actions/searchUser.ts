"use server";

import { Manga } from "@/lib/types";
import { getSafeSessionServer, prisma } from "@/lib/utils";

export const getMangasByUser = async ({
  searchTitle,
  page = 1,
  nbAffiche,
  returnNbPages
}: {
  searchTitle: string;
  page?: number;
  nbAffiche: number;
  returnNbPages?: boolean,
}): Promise<
  { success: true; mangas: Manga[] } | { success: true; mangas: Manga[], nbTotalPages: number} | { success: false; error: string }
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
    skip: nbAffiche * (page - 1),
    take: nbAffiche,
  });
  if (returnNbPages) {
    const nbAffiche = Number(process.env.MANGAS_NB_AFFICHE) || 5;
    const nbMangas = await prisma.manga.count({
      where: {
        user: {
          email: session.user.email,
        },
        title: {
          contains: String(searchTitle || ""),
        },
      },
    });
    
    const nbTotalPages = Math.ceil(nbMangas / nbAffiche);
    return { success: true, mangas, nbTotalPages };
  } else {
    return { success: true, mangas };
  }
};
