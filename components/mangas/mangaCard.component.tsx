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
import NextImage from "next/image";
import Link from "next/link";
import { useState } from "react";
import { EditForm } from "./mangaEditForm.component";
import { MangaUpdateForm } from "./mangaUpdateChapterForm.component";

export function MangaCard({ title, linkImage, linkManga, chapter, id, refreshMangas }: Manga & {refreshMangas: () => Promise<void>}) {
  const [manga, setManga] = useState<Manga>({
    title,
    linkImage,
    linkManga,
    chapter,
    id,
  });
  const [isErrorImage, setIsErrorImage] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleDelete = async () => {
    const isConfirmed = confirm("sur de vouloir le supprimer definitevement ?");

    if (!isConfirmed) return;
    const response = await fetch("/api/mangas", {
      method: "DELETE",
      body: JSON.stringify(manga),
    });
    if (response.ok) {
      const res = await response.json();
      await refreshMangas();
    } else {
      console.error("internal servor error");
    }
  };

  if (isEdit) {
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
            <CardTitle className="text-center p-1 pr-2 pl-2">{manga.title}</CardTitle>
          </Link>
          <Button
            onClick={handleDelete}
            className="w-10 h-10 p-0 bg-transparent absolute top-3 right-3"
          >
            <NextImage //delete Icon
              src="/delete-icon.svg"
              alt="Icon of a delete button"
              width={40}
              height={40}
            />
          </Button>
          <Button
            onClick={() => setIsEdit(true)}
            className="w-10 h-10 p-0 absolute top-3 left-3 bg-primary"
          >
            <Edit />
          </Button>
        </CardHeader>
        <CardContent className="absolute m-0 p-0 w-full h-full">
          {isErrorImage ? (
            <Skeleton className="w-[100%] h-[100%] mb-[10px] m-auto" />
          ) : (
            <img
              className={"rounded object-cover w-full h-full "}
              src={manga.linkImage}
              onError={() => setIsErrorImage(true)}
            />
          )}
        </CardContent>
        <CardFooter className="w-100 z-10">
          <MangaUpdateForm chapter={manga.chapter} idManga={manga.id} />
        </CardFooter>
      </Card>
    );
  }
}
