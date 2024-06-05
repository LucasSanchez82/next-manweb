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
  oldtags: string[];
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
  {
    add: categoriesToAdd,
    delete: categoriesToDelete,
  }: {
    add: { categorieId: number }[];
    delete: { categorieId: number }[];
  }
) => {
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
            data: categoriesToAdd,
            skipDuplicates: true,
          },
          deleteMany: categoriesToDelete,
        },
      },
    });
  } else throw new Error("Manga not owned by user");
};

const upSertManga = async (newMangaToAdd: mangaEssential): Promise<Manga> => {
  const safeBody = newMangaSchemaWithTags.safeParse(newMangaToAdd);
  let categoriesIn = undefined;

  const categoriesData: {
    add: { categorieId: number }[];
    delete: { categorieId: number }[];
  } = { add: [], delete: [] };

  if (newMangaToAdd.tags) {
    await syncCategories(newMangaToAdd.tags);
    const categoriesIn = await prisma.categorie.findMany({
      where: {
        libelle: {
          in: newMangaToAdd.tags,
        },
      },
    });

    categoriesData.add = categoriesIn.map((categorie) => ({
      categorieId: categorie.id,
    }));
  }
  if (safeBody.success) {
    const { data: manga } = safeBody;
    console.table(manga);
    return sessionProvider(
      async (session) => {
        console.log("synccategories depuis addmanga🔍");
        try {
          if (
            "idManga" in newMangaToAdd &&
            typeof newMangaToAdd.idManga === "number"
          ) {
            const categoriesToDelete = newMangaToAdd.oldtags.filter(element => !newMangaToAdd.tags?.includes(element))
            const categoriesDeleteIn = await prisma.categorie.findMany({
              where: {
                libelle: {
                  in: categoriesToDelete
                },
              },
            });
            categoriesData.delete = categoriesDeleteIn.map((categorie) => ({
              categorieId: categorie.id,
            }));
            const updatedManga = await updateMangaProcess(
              {
                ...manga,
                idManga: newMangaToAdd.idManga,
                oldtags: newMangaToAdd.oldtags,
              },
              session,
              categoriesData
            );
            revalidatePath("/mangas");
            return updatedManga;
          } else {
            const createdManga = await createmangaProcess(
              manga,
              session,
              categoriesData.add || []
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

const addManga = async (newMangaToAdd: MangaCreate) => {
  return await upSertManga(newMangaToAdd);
};

const updateManga = async (newMangaToAdd: MangaUpdate) => {
  const { oldtags, tags } = newMangaToAdd;
  console.log({ oldtags, tags });
  return await upSertManga(newMangaToAdd);
};

export { addManga, updateManga };
