"use server";

import { getSafeSessionServer, prisma } from "@/lib/utils";
import { z } from "zod";

const toUpdateSchema = z.object({
  boxId: z.coerce.number(),
  chapter: z.coerce.number(),
});

export const updateManga = async (formdata: FormData) => {
  const session = await getSafeSessionServer();
  if (formdata instanceof FormData) {
    let data = Object.fromEntries(formdata.entries());
    const safeDatas = toUpdateSchema.safeParse(data);
    if (safeDatas.success) {
      try {
        await prisma.manga.update({
            data: {
              chapter: safeDatas.data.chapter,
            },
            where: {
              id: safeDatas.data.boxId,
              userId: session.user.userId,
            },
          });
      }catch(error) {
        console.log("Error", error);
        throw Error("Erreur serveur lors de la mise a jour du chapitre");
      }
    } else {
      throw Error(safeDatas.error.message);
    }
  } else throw Error("n est pas une instance de FormData");
};
