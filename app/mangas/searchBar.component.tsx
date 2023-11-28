"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Manga } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { getMangasByUser } from "./@actions/searchUser";

const Searchbar = ({
  setMangas,
}: {
  setMangas: React.Dispatch<React.SetStateAction<Manga[]>>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [currSearch, setCurrSearch] = useState("");

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const target = event.target;
    if (target instanceof HTMLFormElement) {
      const formDataValue = new FormData(target);
      formDataValue.set(
        "search",
        String(formDataValue.get("search")).trim().toLowerCase()
      );

      if (
        formDataValue.get("search") != currSearch.trim().toLocaleLowerCase()
      ) {
        setCurrSearch(String(formDataValue.get("search")));
        setIsLoading(true);
        const safeMangas = await getMangasByUser(formDataValue);
        if (safeMangas.success) {
          setMangas(safeMangas.mangas);
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
      <Button type="submit">🔍{isLoading ? "✅" : "❌"}</Button>
      <h2>curr : {currSearch}</h2>
    </form>
  );
};

export default Searchbar;
