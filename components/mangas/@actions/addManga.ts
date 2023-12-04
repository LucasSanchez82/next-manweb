"use server";

import { NewManga } from "@/lib/types";
import { getSafeSessionServer, prisma } from "@/lib/utils";
import { newMangaSchema } from "@/schemas/mangasSchemas";
import { NextResponse } from "next/server";

const addMangaProcess = async (newManga: unknown) => {
  const safeBody = newMangaSchema.safeParse(newManga);
  if (safeBody.success) {
    const { data: manga } = safeBody;
    const session = await getSafeSessionServer();
    try {
      const createdManga = await prisma.manga.create({
        data: {
          ...manga,
          userId: session?.user?.userId!,
        },
      });
      return NextResponse.json(createdManga, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  } else {
    return NextResponse.json(
      { error: safeBody.error.message },
      { status: 401 }
    );
  }
};

const addManga = async (newMangaToAdd: FormData | NewManga) => {
  if (newMangaToAdd instanceof FormData) {
    const newManga = Object.fromEntries(newMangaToAdd);
    return await addMangaProcess(newManga);
  } else {
    return await addMangaProcess(newMangaToAdd);
  }
};

export default addManga;
