/*
  Warnings:

  - A unique constraint covering the columns `[libelle]` on the table `Categorie` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Categorie_libelle_key" ON "Categorie"("libelle");

-- CreateIndex
CREATE INDEX "Categorie_libelle_idx" ON "Categorie"("libelle");
