import { prisma } from "@/lib/utils";
import { sessionProvider } from "@/lib/utilsSession";
import MangaContainer from "../../components/mangas/mangaContainer.component";

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return sessionProvider(async (session) => {
    const searchedValue = typeof searchParams.search === 'string' ? searchParams.search : '';
    const nbAffiche = Number(process.env.MANGAS_NB_AFFICHE || 5);
    const currPage = Number(searchParams.page) || 0;
    const nbMangas = await prisma.manga.count({
      where: {
        userId: session.user.userId,
        title: {
          contains: searchedValue,
        },
        isDeleted: false,
      },
    });

    const nbTotalPages = Math.round(nbMangas / nbAffiche);
    const mangas = await prisma.manga.findMany({
      where: {
        userId: session.user.userId,
        title: {
          contains: searchedValue,
        },
        isDeleted: false,
      },
      orderBy: {
        id: "desc",
      },
      take: nbAffiche,
      skip: nbAffiche * (currPage - 1),
    });
    return (
      <main className="flex flex-col justify-center items-center text-center h-full">
        <MangaContainer
          nbTotalPages={nbTotalPages}
          nbAffiche={nbAffiche}
          mangas={mangas}
          page={currPage}
        />
      </main>
    );
  });
};

export default page;
