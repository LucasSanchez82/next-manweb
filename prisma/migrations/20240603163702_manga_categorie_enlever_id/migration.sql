/*
  Warnings:

  - The primary key for the `MangaCategorie` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `MangaCategorie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MangaCategorie" DROP CONSTRAINT "MangaCategorie_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE INDEX "MangaCategorie_mangaId_categorieId_idx" ON "MangaCategorie"("mangaId", "categorieId");
