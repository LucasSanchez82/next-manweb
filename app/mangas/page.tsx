import { getPage } from "@/components/mangas/@actions/cookies";
import { getSafeSessionServer, prisma } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import MangaContainer from "../../components/mangas/mangaContainer.component";

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const session = await getSafeSessionServer();
  if (!session) {
    redirect("/");
  }
  const cookieSore = cookies();
  const searchedValue = String(cookieSore.get("searchedTitle")?.value || "");

  const nbAffiche = Number(process.env.MANGAS_NB_AFFICHE || 5);
  const currPage = getPage();
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
};

export default page;
