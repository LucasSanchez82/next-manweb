// seed.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Votre code Prisma pour insérer des données si nécessaire

  // Exécutez le script SQL
  // await prisma.$executeRaw` 
  //   -- Placez ici votre script SQL avec les déclencheurs
  //   DELIMITER //
  //   CREATE TRIGGER before_manga_insert
  //   AFTER INSERT ON Manga
  //   FOR EACH ROW
  //   BEGIN
  //       INSERT INTO HistoriqueManga (mangaId, title, linkManga, linkImage, chapter)
  //       VALUES (NEW.id, NEW.title, NEW.linkManga, NEW.linkImage, NEW.chapter);
  //   END;
  //   //

  //   CREATE TRIGGER before_manga_update
  //   AFTER UPDATE ON Manga
  //   FOR EACH ROW
  //   BEGIN
  //           INSERT INTO HistoriqueManga (mangaId, title, linkManga, linkImage, chapter)
  //           VALUES (NEW.id, NEW.title, NEW.linkManga, NEW.linkImage, NEW.chapter);
  //   END;
  //   //
  //   DELIMITER ;

  // `;

  // Fermez la connexion Prisma
  await prisma.$disconnect();
}

// Exécutez la fonction main
main().catch((e) => {
  throw e;
});
