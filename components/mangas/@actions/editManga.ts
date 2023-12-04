"use server";

import { getSafeSessionServer, prisma } from "@/lib/utils";
import { mangaSchema } from "@/schemas/mangasSchemas";



export const editManga = async (formdata: FormData) => {
    const formObject = Object.fromEntries(formdata);
    console.log(formObject);
    
    const safeparse = mangaSchema.safeParse(formObject);
    
    if(safeparse.success){
      const session = await getSafeSessionServer();
      return await prisma.manga.update({data: {...safeparse.data}, where: {id: safeparse.data.id, userId: session.user.userId}})
    }else {
      return {error: safeparse.error.errors.map(el => el.message)};
    }
  };