"use server";

import { NewManga } from "@/lib/types";
import { getSafeSessionServer, prisma } from "@/lib/utils";
import { newMangaSchema } from "@/schemas/mangasSchemas";

const addMangaProcess = async (newManga: unknown) => {
  const safeBody = newMangaSchema.safeParse(newManga);
  if (safeBody.success) {
    const { data: manga } = safeBody;
    const session = await getSafeSessionServer();
    try {
      const createdManga = await prisma.manga.create({
        data: {
          ...manga,
          userId: session?.user?.userId!,
        },
      });
      return { message: createdManga };
    } catch (error) {
      return { error };
    }
  } else {
    return { error: safeBody.error.message };
  }
};

const addManga = async (newMangaToAdd: FormData | NewManga) => {
  if (newMangaToAdd instanceof FormData) {
    const newManga = Object.fromEntries(newMangaToAdd);
    return addMangaProcess(newManga);
  } else {
    return addMangaProcess(newMangaToAdd);
  }
};

export default addManga;
