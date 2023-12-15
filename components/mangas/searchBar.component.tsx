"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Manga } from "@/lib/types";
import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import { getMangasByUser } from "./@actions/searchUser";
import { useSearchParams } from "next/navigation";
import { OrderSearchDropdown } from "./orderSearchDropdown.component";

const Searchbar = ({
  setMangas,
  usePage,
  nbAffiche,
  setNbTotalPages,
  useSearch,
}: {
  setMangas: React.Dispatch<React.SetStateAction<Manga[]>>;
  usePage: { page: number; setPage: Dispatch<SetStateAction<number>> };
  nbAffiche: number;
  setNbTotalPages: Dispatch<SetStateAction<number>>;
  useSearch: {
    currSearch: string;
    setCurrSearch: Dispatch<SetStateAction<string>>;
  };
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { currSearch, setCurrSearch } = useSearch;
  const { page, setPage } = usePage;

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const target = event.target;
    if (target instanceof HTMLFormElement) {
      const clearInputValue = () => {
        const searchInput = target.querySelector("input[name=search]");
        if (searchInput instanceof HTMLInputElement) {
          searchInput.value = "";
        }
      };
      const formDataValue = new FormData(target);
      const searchTitle = String(formDataValue.get("search"))
        .trim()
        .toLowerCase();

      if (
        formDataValue.get("search") != currSearch.trim().toLocaleLowerCase()
      ) {
        setCurrSearch(String(formDataValue.get("search")));
        setIsLoading(true);
        console.log("options", {
          searchTitle: searchTitle,
          page: page,
          nbAffiche,
          returnNbPages: true,
        });

        const safeMangas = await getMangasByUser({
          searchTitle: searchTitle,
          page: page,
          nbAffiche,
          returnNbPages: true,
        });

        if (safeMangas.success) {
          console.log(safeMangas);

          setMangas(safeMangas.mangas);
          if ("nbTotalPages" in safeMangas) {
            setNbTotalPages(safeMangas.nbTotalPages);
            setPage(1);
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
      clearInputValue();
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm items-center space-x-2 m-auto"
    >
      <Input type="search" name="search" placeholder="One piece..." />
      <Button type="submit">{isLoading ? "..." : "🔍"}</Button>
      <OrderSearchDropdown />
    </form>
  );
};

export default Searchbar;
