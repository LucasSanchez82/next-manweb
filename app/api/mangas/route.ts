import { mangaSchema } from "@/schemas/mangasSchemas";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


export const PUT = async (req: Request) => {
    const body = await req.json();
    const safeBody = mangaSchema.safeParse(body);
    if(safeBody.success){
        const { data } = safeBody;
        const prisma = new PrismaClient();

        const mangaUpdated = await prisma.manga.update({
            where: {id: data.id},
            data: {...data}
        })

        return NextResponse.json(mangaUpdated, {status: 200});
    }else {
        return NextResponse.json({error: safeBody.error.message}, {status: 500});
    }
}