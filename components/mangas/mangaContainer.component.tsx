"use client";
import { Manga } from "@/lib/types";
import { Suspense } from "react";
import { AddMangaDialog } from "./addMangaDialog.component";
import { MangaCard } from "./mangaCard.component";
import NavigationBetweenPagesBar from "./navigationBetweenpagesBar.component";
import Searchbar from "./searchBar.component";

const MangaContainer = ({
  mangas: iniMangas,
  nbTotalPages,
  page,
}: {
  mangas: Manga[];
  nbAffiche: number;
  nbTotalPages: number;
  page: number;
}) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h2>Ajouter un manga</h2>
        <AddMangaDialog />
      </div>
      <Searchbar />
      <Suspense>
        <div className="flex flex-row flex-wrap justify-around m-auto">
          {iniMangas.map((el) => (
            <MangaCard {...el} key={el.id} />
          ))}
        </div>
        {!(nbTotalPages <= 1) && (
          <NavigationBetweenPagesBar page={page} nbTotalPages={nbTotalPages} />
        )}
      </Suspense>
    </>
  );
};

export default MangaContainer;
