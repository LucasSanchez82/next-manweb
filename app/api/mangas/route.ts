import { mangaSchema, newMangaSchema } from "@/schemas/mangasSchemas";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { useSession } from "next-auth/react";


export const PUT = async (req: Request) => {
    const body = await req.json();
    const safeBody = mangaSchema.safeParse(body);
    if (safeBody.success) {
        const { data } = safeBody;
        const prisma = new PrismaClient();

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
    const safeBody = newMangaSchema.safeParse(body);
    if (safeBody.success) {
        const { data: manga } = safeBody;
        const prisma = new PrismaClient();
        const session = await getServerSession(authOptions);
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
        const prisma = new PrismaClient();

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