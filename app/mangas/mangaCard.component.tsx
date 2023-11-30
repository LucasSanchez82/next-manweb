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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MangaUpdateForm } from "./mangaUpdateChapterForm.component";
import { EditForm } from "./mangaEditForm.component";

export function MangaCard({ title, linkImage, linkManga, chapter, id }: Manga) {
  const [manga, setManga] = useState<Manga>({
    title,
    linkImage,
    linkManga,
    chapter,
    id,
  });
  const router = useRouter();
  const [isErrorImage, setIsErrorImage] = useState(false);
  const [isEdit, setIsEdit] = useState(false);


  const handleDelete = async () => {
    //suppression
    const isConfirmed = confirm("sur de vouloir le supprimer definitevement ?");

    if (!isConfirmed) return;
    const response = await fetch("/api/mangas", {
      method: "DELETE",
      body: JSON.stringify(manga),
    });
    if (response.ok) {
      const res = await response.json();
      router.refresh();
    } else {
      console.error("internal servor error");
    }
  };

  if (isEdit) {
    return (
      <Card className="w-[350px] m-5 min-h-[175px] flex flex-col justify-between items-center relative overflow-hidden">
          <CardHeader className="bg-secondary p-1 m-1 rounded">
            <CardTitle className="text-center">
              Mettre a jour
            </CardTitle>
            <Button
              onClick={() => setIsEdit(false)}
              className="w-10 h-10 p-0 absolute top-3 left-3 bg-primary"
            >
              <X />
            </Button>
          </CardHeader>
          <CardContent className="">
           <EditForm {...{title, linkImage, linkManga, id, setIsEdit}} />
          </CardContent>
      </Card>
    );
  } else {
    return (
      <Card className="w-[350px] m-5 min-h-[175px] flex flex-col justify-between items-center relative overflow-hidden">
        <CardHeader className="z-10 bg-secondary p-1 m-1 rounded">
          <Link href={linkManga} target={"_blank"}>
            <CardTitle className="text-center">{title}</CardTitle>
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
              src={linkImage}
              onError={() => setIsErrorImage(true)}
            />
          )}
        </CardContent>
        <CardFooter className="w-100 z-10">
          <MangaUpdateForm chapter={chapter} idManga={manga.id} />
        </CardFooter>
      </Card>
    );
  }
}
