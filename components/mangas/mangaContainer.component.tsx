"use client";
import { Manga } from "@/lib/types";
import { Suspense, useEffect, useState } from "react";
import { MangaCard } from "./mangaCard.component";
import Searchbar from "./searchBar.component";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { getMangasByUser } from "./@actions/searchUser";
import { toast } from "@/components/ui/use-toast";

const MangaContainer = ({ mangas: iniMangas }: { mangas: Manga[] }) => {
  const searchParams = useSearchParams();

  const router = useRouter();
  const [mangas, setMangas] = useState<Manga[]>(iniMangas);
  const [page, setPage] = useState(Number(searchParams.get("page") || 1));

  const handleClick = (isNext: boolean) => {
    if (isNext) {
      setPage((curr) => {
        return curr + 1;
      });
    } else if (page > 1) {
      setPage((curr) => {
        return curr - 1;
      });
    }
  };
  useEffect(() => {
    router.push(`?page=${page}`);
    const formdata = new FormData();
    formdata.set('search', '');
    formdata.set('page', String(page));
    const processMangasByPage = async () => {
      const safeMangas = await getMangasByUser(formdata);
      if(safeMangas.success){
        if(safeMangas.mangas.length > 0){
          setMangas(safeMangas.mangas);
        }
      }else {
        toast({
          variant: 'destructive',
          title: 'Erreur interne du serveur'
        })
      }
    }
    processMangasByPage();
  }, [page]);
  return (
    <>
      <Searchbar setMangas={setMangas} page={page} />
      <Suspense>
        <div className="flex flex-row flex-wrap justify-around m-auto">
          {mangas.map((el) => (
            <MangaCard {...el} key={el.id} />
          ))}
        </div>
        <div>
          {page > 1 && (
            <Button onClick={() => handleClick(false)} className="bg-primary">
              precedent
            </Button>
          )}
          <Button
            onClick={() => handleClick(true)}
            className="bg-secondary text-primary hover:text-secondary"
          >
            suivant
          </Button>
        </div>
      </Suspense>
    </>
  );
};

export default MangaContainer;
