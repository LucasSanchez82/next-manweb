import { getSafeSessionServer, prisma } from "@/lib/utils";
import { mangaSchema, newMangaSchemaAutoform } from "@/schemas/mangasSchemas";
import { NextResponse } from "next/server";


export const PUT = async (req: Request) => {
    const body = await req.json();
    const safeBody = mangaSchema.safeParse(body);
    if (safeBody.success) {
        const { data } = safeBody;

        const mangaUpdated = await prisma.manga.update({
            where: { id: data.id },
            data: { ...data }
        })

        return NextResponse.json(mangaUpdated, { status: 200 });
    } else {
        return NextResponse.json({ error: safeBody.error.message }, { status: 401 });
    }
}

export const POST = async (req: Request) => {

    const body = await req.json();
    const safeBody = newMangaSchemaAutoform.safeParse(body);
    if (safeBody.success) {
        const { data: manga } = safeBody;
        const session = await getSafeSessionServer();
        try {
            const createdManga = await prisma.manga.create({
                data: {
                    ...manga,
                    userId: session?.user?.userId!,
                }
            })
            return NextResponse.json(createdManga, { status: 200 });
        } catch (error) {
            return NextResponse.json({ error: error }, { status: 500 })
        }
    } else {
        return NextResponse.json({ error: safeBody.error.message }, { status: 401 });
    }
}

export const DELETE = async (req: Request) => {
    const body = await req.json();
    const safeBody = mangaSchema.safeParse(body);
    if (safeBody.success) {
        const { data: manga } = safeBody;

        try {
            const mangaDeleted = await prisma.manga.delete({
                where: { ...manga },
            })
            return NextResponse.json(mangaDeleted, { status: 200 });
        }catch(error){
            return NextResponse.json({error: 'Erreur interne du serveur'}, {status: 500});
        }

    } else {
        return NextResponse.json({ error: safeBody.error.message }, { status: 401 });
    }
}