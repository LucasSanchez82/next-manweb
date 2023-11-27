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

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target;

    if (target instanceof HTMLFormElement) {
      const formData = Object.fromEntries(new FormData(target));
      setManga((el) => {
        let newManga = el;
        newManga.chapter = Number(formData.chapter) || el.chapter;
        return newManga;
      });
      // call api pour update chapitre
      const response = await fetch("api/mangas", {
        method: "PUT",
        body: JSON.stringify(manga),
      });
      if (response.ok) {
        const res = await response.json();

        router.refresh();
      } else {
        console.error("internal servor error");
      }
    }
  };

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
            // min-width={"100%"}
            // min-height={"100%"}
            onError={() => setIsErrorImage(true)}
          />
        )}
      </CardContent>
      <CardFooter className="w-100 z-10">
        <form
          className="flex items-center justify-around p-0 w-100"
          onSubmit={handleSubmit}
        >
          <Input
            defaultValue={chapter}
            className="w-2/4"
            type="number"
            name="chapter"
            id="chapter"
            placeholder="chapter.."
          />
          <Button className="w-1/4">Update</Button>
        </form>
      </CardFooter>
    </Card>
  );
}
