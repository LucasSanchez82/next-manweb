"use server";
import { prisma } from "@/lib/utils";
import { sessionProvider } from "@/lib/utilsSession";
import { newMangaSchema } from "@/schemas/mangasSchemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const addManga = async (newMangaToAdd: z.infer<typeof newMangaSchema>) => {
  const safeBody = newMangaSchema.safeParse(newMangaToAdd);
  if (safeBody.success) {
    const { data: manga } = safeBody;
    return sessionProvider(
      async (session) => {
        console.table({
          ...manga,
          userId: session?.user?.userId,
        });
        try {
          const createdManga = await prisma.manga.create({
            data: {
              title: manga.title,
              linkManga: manga.linkManga,
              linkImage: manga.linkImage,
              chapter: manga.chapter,
              userId: session?.user?.userId,
            },
          });
          revalidatePath("/mangas");
          return { message: createdManga };
        } catch (error) {
          console.error(error);
          throw new Error("Erreur interne du serveur");
        }
      },
      () => {
        throw Error("No session found");
      }
    );
  } else {
    return { error: safeBody.error.message };
  }
};

export default addManga;
