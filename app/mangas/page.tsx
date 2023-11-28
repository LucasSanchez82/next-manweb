import { getSafeSessionServer } from "@/lib/utils";
import { redirect } from "next/navigation";
import { getMangasByUser } from "./@actions/searchUser";
import { AddMangaDialog } from "./addMangaDialog.component";
import MangaContainer from "./mangaContainer.component";

const page = async () => {
  const session = await getSafeSessionServer();

  if (!session) {
    redirect("/");
  }

  const searchFormdata = new FormData();
  const safeMangas = await getMangasByUser(searchFormdata);

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h2>Ajouter un manga</h2>
        <AddMangaDialog />
      </div>
      
      {safeMangas.success ? (
        <MangaContainer mangas={safeMangas.mangas} />
      ) : (
        safeMangas.error
      )}
    </>
  );
};

export default page;
