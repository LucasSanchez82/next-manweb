import { IllegalArgumentError } from "@/controller/customErrors/IllegalArgumentErrors";
import { createCategorie, deleteCategorie, getCategories } from "@/controller/mangas/categories/@actions/categories";
import { describe, it, beforeAll, afterAll, expect } from "bun:test";

describe("Categories erreurs", () => {
  it("getCategories avec moins de 3 caractères", async () => {
    expect(async () => await getCategories("a")).toThrow(
      new IllegalArgumentError(
        "Le nom de la catégorie doit contenir au moins 3 caractères"
      )
    );
  });
  it("getCategories avec plus de 25 caractères", async () => {
    expect(async () => await getCategories("a".repeat(26))).toThrow(
      new IllegalArgumentError(
        "Le nom de la catégorie doit contenir au plus 25 caractères"
      )
    );
  });
});

describe("Categories", () => {
  it("getCategories", async () => {
    const categories = await getCategories("Test");
    expect(categories).toBeArray();
  });
});

describe("crud categorie", () => {
    it("createCategorie", async () => {
        const categorie = await createCategorie("nouvelle categorie de T");
        expect(categorie).toBeObject();
    })

    it("deleteCategorie", async () => {
        expect(async () => await deleteCategorie("nouvelle categorie de T")).not.toThrow()
    })
});
