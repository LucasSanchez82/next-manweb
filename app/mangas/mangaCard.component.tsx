"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Manga } from "@/lib/types";
import NextImage from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { updateManga } from "./@actions/update";
import { MangaUpdateForm } from "./mangaUpdateForm.component";

export function MangaCard({ title, linkImage, linkManga, chapter, id }: Manga) {
  const [manga, setManga] = React.useState<Manga>({
    title,
    linkImage,
    linkManga,
    chapter,
    id,
  });
  const router = useRouter();
  const [isErrorImage, setIsErrorImage] = React.useState(false);



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
      </CardHeader>
      <CardContent className="absolute m-0 p-0 w-full h-full">
        {isErrorImage ? (
          <Skeleton className="w-[100%] h-[100%] mb-[10px] m-auto" />
        ) : (
          <img
            className={"rounded object-cover w-full h-full "}
            src={isErrorImage ? "/404.gif" : linkImage}
            alt="image"
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
