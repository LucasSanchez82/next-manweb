import { getSafeSessionServer, prisma } from "@/lib/utils";
import { redirect } from "next/navigation";
import { getMangasByUser } from "../../components/mangas/@actions/searchUser";
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
  const nbAffiche = Number(process.env.MANGAS_NB_AFFICHE) || 5;

  // router.
  // console.log("url", url.searchParams);

  const {search, page}= searchParams;
  const nbMangas = await prisma.manga.count({
    where: { userId: session.user.userId },
  });
  const nbTotalPages = Math.round(nbMangas / nbAffiche);

  // const safeMangas = await getMangasByUser({ searchTitle: "", nbAffiche });
  const mangas = await prisma.manga.findMany({
    where: {
      user: {
        email: session.user.email,
      },
      title: {
        contains: String(search || ""),
      },
      isDeleted: false,
    },
    orderBy: {
      id: "desc",
    },
    // skip: nbAffiche * (Number(page) - 1),
    take: nbAffiche,
  });

  return (
    <main className="flex flex-col justify-center items-center text-center h-full">
      {/* {safeMangas.success ? ( */}
      <MangaContainer
        nbTotalPages={nbTotalPages}
        nbAffiche={nbAffiche}
        mangas={mangas}
      />
      {/* )  */}
      {/* : (
        safeMangas.error */}
      {/* )} */}
    </main>
  );
};

export default page;
