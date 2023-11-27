import { MangaCard } from "@/app/mangas/mangaCard.component";
import { SearchParams } from "@/lib/types";
import { getSafeSessionServer } from "@/lib/utils";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { searchMangasByUser } from "./@actions/searchUser";
import { AddMangaDialog } from "./addMangaDialog.component";
import Searchbar from "./searchBar.component";
import MangaContainer from "./mangaContainer.component";

const page = async ({ searchParams }: SearchParams) => {
  const session = await getSafeSessionServer();

  if (!session) {
    redirect("/");
  }

  const searchFormdata = new FormData();
  searchFormdata.set("search", String(searchParams?.search || ""));
  const safeMangas = await searchMangasByUser(searchFormdata);

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
