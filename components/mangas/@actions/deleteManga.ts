"use server";
import { prisma } from "@/lib/utils";
import { NextResponse } from "next/server";

const deleteManga = async (
  idManga: number
): Promise<
| { message: string; success: true }
| { error: string; success: false }
> => {
  try {
    await prisma.manga.update({
      data: {
        isDeleted: true,
      },
      where: {
        id: idManga,
      },
    });
    return { message: "supprime avec succes", success: true };
  } catch (err) {
    console.log("deletedManga Error", err);
    
    throw Error("Erreur serveur interne")
  }
};

export default deleteManga;
