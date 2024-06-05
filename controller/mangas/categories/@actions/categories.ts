"use server";
import { IllegalArgumentError } from "@/controller/customErrors/IllegalArgumentErrors";
import { prisma } from "@/lib/utils";

const validCategorieWrapper = <T>(
  nameInitial: string,
  callback: (name: string) => T
) => {
  const name = nameInitial.toLowerCase();

  if (name.length > 2 && name.length < 26) {
    return callback(name);
  } else {
    console.table({errorName: name, length: name.length})
    if (name.length <= 2)
      throw new IllegalArgumentError(
        "Le nom de la catégorie doit contenir au moins 3 caractères"
      );
    if (name.length >= 26)
      throw new IllegalArgumentError(
        "Le nom de la catégorie doit contenir au plus 25 caractères"
      );
  }
};

const validManyCategorieWrapper = <T>(
  namesInitial: string[],
  callback: (names: string[]) => T
) => {
  const names = namesInitial.map((name) => name.toLowerCase());
  let isValid = true;
  for (const name of names) {
    isValid = isValid && name.length > 2 && name.length < 26;
    if (!isValid) break;
  }
  if (isValid) {
    return callback(names);
  } else {
    console.table(names.map((el) => ({ errorName: el, length: el.length })));
    throw new IllegalArgumentError(
      "Le nom de la catégorie doit contenir au moins 3 caractères / au plus 25 caractères"
    );
  }
};

const getCategories = async (nameInitial: string) =>
  validCategorieWrapper(nameInitial, async (name) => {
    return await prisma.categorie.findMany({
      where: {
        libelle: {
          contains: name,
          mode: "insensitive",
        },
      },
    });
  });

const createCategorie = async (nameInitial: string) =>
  validCategorieWrapper(nameInitial, async (name) => {
    return await prisma.categorie.create({
      data: {
        libelle: name,
      },
    });
  });

const createManyCategories = async (arrayInitial: string[]) =>
  validManyCategorieWrapper(arrayInitial, async (names) => {
    await prisma.categorie.createMany({
      data: names.map((el) => ({ libelle: el })),
    });
  });

const deleteCategorie = async (nameInitial: string) => {
  validCategorieWrapper(nameInitial, async (name) => {
    return await prisma.categorie.delete({
      where: {
        libelle: name,
      },
    });
  });
};

const getCategoriestIn = async (categories: string[]) => {
  return await prisma.categorie.findMany({
    where: {
      libelle: {
        in: categories,
      },
    },
  });
};

export {
  getCategories,
  createCategorie,
  createManyCategories,
  deleteCategorie,
  getCategoriestIn,
};
