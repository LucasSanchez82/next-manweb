
import { prisma } from "@/lib/utils";
import { sessionProvider } from "@/lib/utilsSession";
import { newMangaSchema } from "@/schemas/mangasSchemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const addMangaProcess = async (newManga: z.infer<typeof newMangaSchema>) => {
  const safeBody = newMangaSchema.safeParse(newManga);
  if (safeBody.success) {
    const { data: manga } = safeBody;
    return sessionProvider(
      async (session) => {
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
      },
      () => {
        throw Error("No session found");
      }
    );
  } else {
    return { error: safeBody.error.message };
  }
};

const addManga = async (newMangaToAdd: z.infer<typeof newMangaSchema>) => {
  const safeParse = newMangaSchema.safeParse(newMangaToAdd);
  if (safeParse.success) {
    revalidatePath("/mangas");
    return newMangaToAdd;
  } else throw new Error("Mauvais type de donnee en parametre🪄🪄");
};

export default addManga;
