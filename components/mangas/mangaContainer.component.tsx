"use client";
import { Manga } from "@/lib/types";
import { Suspense, useEffect, useState, useTransition } from "react";
import { getMangasByUser } from "./@actions/searchUser";
import { AddMangaDialog } from "./addMangaDialog.component";
import { MangaCard } from "./mangaCard.component";
import NavigationBetweenpagesBar from "./navigationBetweenpagesBar.component";
import Searchbar from "./searchBar.component";
import { Loader2 } from "lucide-react";
import { useToast } from "../ui/use-toast";

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
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const refreshMangas = async () => {
    setIsLoading(true);
    const safeMangas = await getMangasByUser({
      searchTitle: currSearch,
      page: page,
      nbAffiche,
    });
    setIsLoading(false);

    if (safeMangas.success && safeMangas.mangas.length > 0) {
      setMangas(safeMangas.mangas);
    }
  };

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
      <div className="flex flex-col justify-center items-center">
        <h2>Ajouter un manga</h2>
        <AddMangaDialog refreshMangas={refreshMangas} />
      </div>
      <Searchbar
        setNbTotalPages={setNbTotalPages}
        nbAffiche={nbAffiche}
        setMangas={setMangas}
        useSearch={{ currSearch, setCurrSearch }}
        usePage={{ page, setPage }}
      />
          <h1>nbpages : {nbTotalPages}</h1>
      <Suspense>
        <div className="flex flex-row flex-wrap justify-around m-auto">
          {isLoading && <Loader2 className="loader-2 m-5 w-full" />}
          {mangas.map((el) => (
            <MangaCard refreshMangas={refreshMangas} {...el} key={el.id} />
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
