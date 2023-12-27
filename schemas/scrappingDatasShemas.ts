import { z } from "zod";

export const scanMangaDatasSchema = z.object({
  title: z.array(
    z.object({
      nom: z.string(),
      nom_match: z.string(),
      url: z.string(),
      demo: z.string(),
      type: z.string(),
      genre: z.array(z.coerce.number()),
      statut: z.coerce.number(),
      type_lecture: z.coerce.number(),
      auteur: z.string(),
      image: z.string(),
      logo: z.string(),
      l_ch: z.coerce.number(),
      v_l_ch: z.string(),
      up: z.number(),
    })
  ),
  genre: z.record(z.string(), z.string()),
});
export type scanMangaDatasType = {
  title: {
    image: string;
    type: string;
    nom: string;
    nom_match: string;
    url: string;
    demo: string;
    genre: number[];
    statut: number;
    type_lecture: number;
    auteur: string;
    logo: string;
    l_ch: number;
    v_l_ch: string;
    up: number;
  }[];
  genre: Record<string, string>;
};
