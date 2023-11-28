"use client"
import React, { Suspense, useState } from "react";
import { MangaCard } from "./mangaCard.component";
import Searchbar from "./searchBar.component";
import { Manga } from "@/lib/types";

const MangaContainer = ({mangas: iniMangas}: {mangas: Manga[]}) => {
  const [mangas, setMangas] = useState<Manga[]>(iniMangas)
  return (
    <>
      <Searchbar setMangas={setMangas} />
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
