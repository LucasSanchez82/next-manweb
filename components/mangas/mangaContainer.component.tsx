"use client";
import { toast } from "@/components/ui/use-toast";
import { Manga } from "@/lib/types";
import { Suspense, useEffect, useState } from "react";
import { getMangasByUser } from "./@actions/searchUser";
import { MangaCard } from "./mangaCard.component";
import NavigationBetweenpagesBar from "./navigationBetweenpagesBar.component";
import Searchbar from "./searchBar.component";

const MangaContainer = ({
  mangas: iniMangas,
  nbAffiche,
  nbTotalPages: nbTotalPagesInitial,
}: {
  mangas: Manga[];
  nbAffiche: number;
  nbTotalPages: number;
}) => {
  const [nbTotalPages, setNbTotalPages] = useState(nbTotalPagesInitial);
  const [mangas, setMangas] = useState<Manga[]>(iniMangas);
  const [page, setPage] = useState(1);
  const [currSearch, setCurrSearch] = useState("");

  useEffect(() => {
    const processMangasByPage = async () => {
      const safeMangas = await getMangasByUser({
        searchTitle: currSearch,
        page: page,
        nbAffiche,
      });
      if (safeMangas.success) {
        if (safeMangas.mangas.length > 0 && page <= nbTotalPages) {
          setMangas(safeMangas.mangas);
        }
      } else {
        toast({
          variant: "destructive",
          title: "Erreur interne du serveur",
        });
      }
    };
    processMangasByPage();
  }, [page]);

  return (
    <>
      <Searchbar
        setNbTotalPages={setNbTotalPages}
        nbAffiche={nbAffiche}
        setMangas={setMangas}
        useSearch={{currSearch, setCurrSearch}}
        usePage={{page, setPage}}
      />
      <Suspense>
        <div className="flex flex-row flex-wrap justify-around m-auto">
          {mangas.map((el) => (
            <MangaCard {...el} key={el.id} />
          ))}
        </div>
        {!(nbTotalPages <= 1) && (
          <NavigationBetweenpagesBar
            {...{ nbTotalPages, usePage: { page, setPage } }}
          />
        )}
      </Suspense>
    </>
  );
};

export default MangaContainer;
