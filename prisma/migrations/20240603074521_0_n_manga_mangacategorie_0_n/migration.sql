-- DropForeignKey
ALTER TABLE "MangaCategorie" DROP CONSTRAINT "MangaCategorie_mangaId_fkey";

-- AddForeignKey
ALTER TABLE "MangaCategorie" ADD CONSTRAINT "MangaCategorie_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "Manga"("id") ON DELETE CASCADE ON UPDATE CASCADE;
