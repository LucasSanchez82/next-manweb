import { getServerSession } from 'next-auth';
import React, { Suspense } from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import { MangaCard } from '@/app/mangas/mangaCard';

const page = async () => {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect('/');
    }
    
    console.log(session);
    const prisma = new PrismaClient();
    const mangas = await prisma.manga.findMany({
        where: {
            user: {
                email: session.user?.email!,
            }
        }
    })
    return (
        <>
            Hello Mangas
            <Suspense>
                <div className='flex flex-row flex-wrap justify-around m-auto'>
                    {
                        mangas.map((el, key) => <MangaCard {...el} />)
                    }
                </div>
            </Suspense>

        </>
    );
};

export default page;