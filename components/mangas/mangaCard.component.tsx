"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MangaWithCategories } from "@/controller/types/mangas.types";
import { X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import deleteManga from "../../controller/mangas/@actions/deleteManga";
import { useToast } from "../ui/use-toast";
import { DropDownCommands } from "./mangaCard.dropDown.component";
import { EditForm } from "./mangaEditForm.component";
import { MangaUpdateForm } from "./mangaUpdateChapterForm.component";

export function MangaCard(mangaInitial: MangaWithCategories) {
  const [manga, setManga] = useState<MangaWithCategories>(mangaInitial);
  const [isErrorImage, setIsErrorImage] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { toast } = useToast();
  const categoriesStr: string[] = manga.MangaCategorie.map(
    (categorie) => categorie.Categorie.libelle
  );
  const [categories, setCategories] = useState<string[]>(categoriesStr);

  const handleDelete = async () => {
    if (manga.id) {
      const response = await deleteManga(manga.id);
      if (response.success) {
        toast({
          title: "Manga supprimé",
          variant: "default",
        });
      } else console.log("erreur serveur interne lors de la suppression");
    } else {
      toast({
        title: "cette card n'est pas modifiable",
        variant: "destructive",
      });
    }
  };

  if (isEdit && manga.id) {
    return (
      <Card className="w-[350px] m-5 min-h-[175px] flex flex-col justify-between items-center relative overflow-hidden">
        <CardHeader className="bg-secondary p-1 m-1 rounded">
          <CardTitle className="text-center">Mettre a jour</CardTitle>
          <Button
            onClick={() => setIsEdit(false)}
            className="w-10 h-10 p-0 absolute top-3 left-3 bg-primary"
          >
            <X />
          </Button>
        </CardHeader>
        <CardContent className="">
          <EditForm
            {...{
              title: manga.title,
              linkImage: manga.linkImage,
              linkManga: manga.linkManga,
              id: manga.id,
              setIsEdit,
              MangaCategorie: manga.MangaCategorie,
            }}
            useCategories={{categories, setCategories}}
            setManga={setManga}
          />
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Card className="w-[350px] m-5 min-h-[175px] flex flex-col justify-between items-center relative overflow-hidden">
        <CardHeader className="z-10 w-full p-0 m-1 rounded">
          <div className="flex items-center justify-around">
            <Link href={manga.linkManga} target={"_blank"} className="p-1">
              <CardTitle className="text-center bg-secondary rounded p-2">
                {manga.title}
              </CardTitle>
            </Link>
            {manga.id && (
              <DropDownCommands
                className="self-start"
                setIsEdit={setIsEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </CardHeader>
        <CardContent className="absolute m-0 p-0 w-full h-full">
          {isErrorImage ? (
            <Skeleton className="w-[100%] h-[100%] mb-[10px] m-auto" />
          ) : (
            <img
              className={"rounded object-cover w-full h-full "}
              src={manga.linkImage}
              onError={() => setIsErrorImage(true)}
              alt=""
            />
          )}
        </CardContent>
        {manga.id && (
          <CardFooter className="w-100 z-10">
            <MangaUpdateForm chapter={manga.chapter} idManga={manga.id} />
          </CardFooter>
        )}
      </Card>
    );
  }
}
