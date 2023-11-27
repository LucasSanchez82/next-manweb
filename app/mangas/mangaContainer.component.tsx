import React, { Suspense } from "react";
import { MangaCard } from "./mangaCard.component";
import Searchbar from "./searchBar.component";
import { Manga } from "@/lib/types";

const MangaContainer = ({mangas}: {mangas: Manga[]}) => {
  return (
    <>
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

export default MangaContainer;
