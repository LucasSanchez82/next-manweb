import { z } from "zod";

export const mangaBaseSchema = z.object({
  title: z
    .string({ required_error: "Titre doit contenir plus de 3 caracteres" })
    .min(3, { message: "doit etre superieur a trois caracteres" })
    .describe("Titre manga"),
  linkManga: z
    .string()
    .regex(new RegExp("^https://[^\\s/$.?#].[^\\s]*$"), {
      message: "n'est pas détecté comme une URL https",
    })
    .describe("lien manga (https://scan-manga.com)"),
  linkImage: z
    .string()
    .regex(new RegExp("^https://.*/.*\\.(png|gif|webp|jpeg|jpg)\\??.*$"), {
      message: "n'est pas détecté comme une URL d'image https",
    })
    .describe("lien image (https://site.com/image.png)"),
});

export const newMangaSchema = mangaBaseSchema.extend({
  chapter: z.coerce.number().describe("dernier chapitre lu"),
});

export const mangaSchema = newMangaSchema.extend({
  id: z.coerce.number(),
});

export const editMangaSchema = mangaBaseSchema.extend({
  id: z.coerce.number(),
});
