"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Manga } from "@/lib/types";
import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import { getMangasByUser } from "./@actions/searchUser";
import { useSearchParams } from "next/navigation";

const Searchbar = ({
  setMangas,
  page = 1,
  nbAffiche,
  setNbTotalPages
}: {
  setMangas: React.Dispatch<React.SetStateAction<Manga[]>>;
  page: number;
  nbAffiche: number,
  setNbTotalPages: Dispatch<SetStateAction<number>>
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [currSearch, setCurrSearch] = useState("");

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const target = event.target;
    if (target instanceof HTMLFormElement) {
      const formDataValue = new FormData(target);
      const searchTitle = String(formDataValue.get("search")).trim().toLowerCase();

      if (
        formDataValue.get("search") != currSearch.trim().toLocaleLowerCase()
      ) {
        setCurrSearch(String(formDataValue.get("search")));
        setIsLoading(true);
        const safeMangas = await getMangasByUser({searchTitle: searchTitle, page: page, nbAffiche, returnNbPages: true});

        if (safeMangas.success) {
          setMangas(safeMangas.mangas);
          if("nbTotalPages" in safeMangas){
            setNbTotalPages(safeMangas.nbTotalPages);
          }
        } else {
          toast({
            variant: "destructive",
            title:
              safeMangas.error ||
              "Erreur serveur lors de la recherche des lectures",
          });
        }
        setIsLoading(false);
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm items-center space-x-2 m-auto"
    >
      <Input type="search" name="search" placeholder="One piece..." />
      <Button type="submit">{isLoading ? "..." : "🔍"}</Button>
    </form>
  );
};

export default Searchbar;
