import { getSafeSessionServer, prisma } from "@/lib/utils";
import { redirect } from "next/navigation";
import { getMangasByUser } from "../../components/mangas/@actions/searchUser";
import MangaContainer from "../../components/mangas/mangaContainer.component";

const page = async () => {
  const session = await getSafeSessionServer();
  const nbAffiche = Number(process.env.MANGAS_NB_AFFICHE) || 5;
  const nbMangas = await prisma.manga.count({
    where: { userId: session.user.userId },
  });
  const nbTotalPages = Math.round(nbMangas / nbAffiche);

  if (!session) {
    redirect("/");
  }

  const safeMangas = await getMangasByUser({ searchTitle: "", nbAffiche });

  return (
    <main className="flex flex-col justify-center items-center text-center h-full">
      {safeMangas.success ? (
        <MangaContainer
          nbTotalPages={nbTotalPages}
          nbAffiche={nbAffiche}
          mangas={safeMangas.mangas}
        />
      ) : (
        safeMangas.error
      )}
    </main>
  );
};

export default page;
