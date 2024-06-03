-- DropIndex
DROP INDEX "MangaCategorie_mangaId_categorieId_idx";

-- AlterTable
ALTER TABLE "MangaCategorie" ADD CONSTRAINT "MangaCategorie_pkey" PRIMARY KEY ("mangaId", "categorieId");
