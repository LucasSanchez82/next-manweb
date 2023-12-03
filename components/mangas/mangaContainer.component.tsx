"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Manga } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { getMangasByUser } from "./@actions/searchUser";
import { MangaCard } from "./mangaCard.component";
import Searchbar from "./searchBar.component";
import NavigationBetweenpagesBar from "./navigationBetweenpagesBar.component";

const MangaContainer = ({
  mangas: iniMangas,
  nbAffiche,
  nbTotalPages,
}: {
  mangas: Manga[];
  nbAffiche: number;
  nbTotalPages: number;
}) => {
  const searchParams = useSearchParams();

  const router = useRouter();
  const [mangas, setMangas] = useState<Manga[]>(iniMangas);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // router.push(`?page=${page}`);
    const processMangasByPage = async () => {
      const safeMangas = await getMangasByUser({
        searchTitle: "",
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
      <Searchbar nbAffiche={nbAffiche} setMangas={setMangas} page={page} />
      <Suspense>
        <div className="flex flex-row flex-wrap justify-around m-auto">
          {mangas.map((el) => (
            <MangaCard {...el} key={el.id} />
          ))}
        </div>
        {!(nbTotalPages <= 1) && (
          <NavigationBetweenpagesBar
            {...{ nbTotalPages, page, usePage: { page, setPage } }}
            // usePage={{ page, setPage }}
          />
        )}
      </Suspense>
    </>
  );
};

export default MangaContainer;
