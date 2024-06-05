"use server";
import { prisma } from "@/lib/utils";
import { sessionProvider } from "@/lib/utilsSession";
import {
  newMangaSchemaAutoform,
  newMangaSchemaWithTags,
} from "@/schemas/mangasSchemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { syncCategories } from "../categories/categories.utils";
import { Session } from "next-auth";
import { Manga } from "@prisma/client";
type MangaCreate = z.infer<typeof newMangaSchemaWithTags>;
type MangaUpdate = {
  idManga: number;
} & Partial<MangaCreate>;
type mangaEssential = MangaCreate | MangaUpdate;

const createmangaProcess = async (
  manga: MangaCreate,
  session: Session,
  categoriesData: {
    categorieId: number;
  }[]
) => {
  return await prisma.manga.create({
    data: {
      title: manga.title,
      linkManga: manga.linkManga,
      linkImage: manga.linkImage,
      chapter: manga.chapter,
      userId: session.user.userId,
      MangaCategorie: {
        createMany: {
          data: categoriesData,
          skipDuplicates: true,
        },
      },
    },
  });
};

const isMangaOfUser = async (mangaId: number, userId: string) => {
  return await prisma.manga.findUnique({
    where: {
      id: mangaId,
      userId,
    },
  });
};

const updateMangaProcess = async (
  manga: MangaUpdate,
  session: Session,
  categoriesData: {
    categorieId: number;
  }[]
) => {
  console.table([categoriesData]);
  const isMangaOwnedByUser = await isMangaOfUser(
    manga.idManga,
    session.user.userId
  );
  if (isMangaOwnedByUser) {
    return await prisma.manga.update({
      where: {
        id: manga.idManga,
      },
      data: {
        title: manga.title,
        linkManga: manga.linkManga,
        linkImage: manga.linkImage,
        chapter: manga.chapter,
        userId: session.user.userId,
        MangaCategorie: {
          createMany: {
            data: categoriesData,
            skipDuplicates: true,
          },
        },
      },
    });
  } else throw new Error("Manga not owned by user");
};

const upSertManga = async (newMangaToAdd: mangaEssential): Promise<Manga> => {
  const safeBody = newMangaSchemaWithTags.safeParse(newMangaToAdd);
  console.log("synccategories depuis addmanga🔍");
  let categoriesIn = undefined;
  let categoriesData = undefined;
  if(newMangaToAdd.tags) {
    await syncCategories(newMangaToAdd.tags);
    categoriesIn = await prisma.categorie.findMany({
      where: {
        libelle: {
          in: newMangaToAdd.tags,
        },
      },
    });
    categoriesData = categoriesIn.map((categorie) => ({
      categorieId: categorie.id,
    }));
  }
  if (safeBody.success) {
    const { data: manga } = safeBody;
    console.table(manga)
    return sessionProvider(
      async (session) => {
        console.log("synccategories depuis addmanga🔍");
        try {
          if ('idManga' in newMangaToAdd && typeof newMangaToAdd.idManga === 'number') {
            console.log({
              idManga: newMangaToAdd.idManga,
              message: "je modifie",
            });
            const updatedManga = await updateMangaProcess(
              { ...manga, idManga: newMangaToAdd.idManga },
              session,
              categoriesData || [],
            );
            revalidatePath("/mangas");
            return updatedManga;
          } else {
            const createdManga = await createmangaProcess(
              manga,
              session,
              categoriesData || [],
            );
            revalidatePath("/mangas");
            return createdManga;
          }
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
    throw new Error(safeBody.error.message);
  }
};

const addManga = async (
  newMangaToAdd: MangaCreate
) => {
console.log(`🍄🍄🍄 add manga`)
return await upSertManga(newMangaToAdd);
};

const updateManga = async (
  newMangaToAdd: MangaUpdate
) => {
console.log(`🍄🍄🍄 update manga`)

  return await upSertManga(newMangaToAdd);
};

export { addManga, updateManga };
