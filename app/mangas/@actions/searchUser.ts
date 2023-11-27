"use server";

import { Manga } from "@/lib/types";
import { getSafeSessionServer, prisma } from "@/lib/utils";

export const searchMangasByUser = async (
  formdata: FormData
): Promise<
  { success: true; mangas: Manga[] } | { success: false; error: string }
> => {
  const session = await getSafeSessionServer();
  const mangaTitle = formdata.get("search");
    const mangas = await prisma.manga.findMany({
      where: {
        AND: {
          user: {
            email: session.user.email,
          },
          title: {
            contains: String(mangaTitle),
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });

    return { success: true, mangas };
};
