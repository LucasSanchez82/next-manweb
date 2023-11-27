import { getServerSession } from "next-auth";
import { Suspense } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { MangaCard } from "@/app/mangas/mangaCard";
import { AddMangaDialog } from "./addMangaDialog";
import Searchbar from "./searchBar";

const page = async () => {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/");
  }

  const prisma = new PrismaClient();
  const searchTitle = ""
  const mangas = await prisma.manga.findMany({
    where: {
      AND: {
        user: {
          email: session.user?.email!,
        },
        title: {
          contains: searchTitle,
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h2>Ajouter un manga</h2>
        {/* afficher un dialog */}
        <AddMangaDialog />
      </div>
    <Searchbar />
      <Suspense>
        <div className="flex flex-row flex-wrap justify-around m-auto">
          {mangas.map((el) => (
            <MangaCard {...el} key={el.id} />
          ))}
        </div>
      </Suspense>
    </>
  );
};

export default page;
