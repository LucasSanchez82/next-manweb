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
import { Manga } from "@/lib/types";
import { Edit, X } from "lucide-react";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";
import { useToast } from "../ui/use-toast";
import deleteManga from "./@actions/deleteManga";
import { EditForm } from "./mangaEditForm.component";
import { MangaUpdateForm } from "./mangaUpdateChapterForm.component";
import { DeleteForm } from "./mangasForm/DeleteForm";

export function MangaCard(mangaInitial: Manga) {
  const [manga, setManga] = useState<Manga>(mangaInitial);
  const [isErrorImage, setIsErrorImage] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { toast } = useToast();

  const handleDelete = async (event: SyntheticEvent) => {
    event.preventDefault();
    // ? really want to delete ?
    // const isConfirmed = confirm("sur de vouloir le supprimer definitevement ?");

    // if (!isConfirmed) return;
    // console.log("manga id ", manga.id);
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
    // be sure that manga is editable
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
            }}
            setManga={setManga}
          />
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Card className="w-[350px] m-5 min-h-[175px] flex flex-col justify-between items-center relative overflow-hidden">
        <CardHeader className="z-10 bg-secondary p-1 m-1 rounded">
          <Link href={manga.linkManga} target={"_blank"}>
            <CardTitle className="text-center p-1 pr-2 pl-2">
              {manga.title}
            </CardTitle>
          </Link>
          {manga.id && (
            <>
              <DeleteForm handleDelete={handleDelete} />
              <Button
                onClick={() => setIsEdit(true)}
                className="w-10 h-10 p-0 absolute top-3 left-3 bg-primary"
              >
                <Edit />
              </Button>
            </>
          )}
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
