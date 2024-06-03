/*
  Warnings:

  - A unique constraint covering the columns `[mangaId,categorieId]` on the table `MangaCategorie` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "MangaCategorie_categorieId_key";

-- DropIndex
DROP INDEX "MangaCategorie_mangaId_key";

-- CreateIndex
CREATE UNIQUE INDEX "MangaCategorie_mangaId_categorieId_key" ON "MangaCategorie"("mangaId", "categorieId");
