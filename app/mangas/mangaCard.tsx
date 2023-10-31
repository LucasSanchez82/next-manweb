'use client'
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"
import { Manga } from "@/lib/types"
import { useRouter } from "next/navigation"



export function MangaCard({ title, linkImage, linkManga, chapter, id }: Manga) {
  const [manga, setManga] = React.useState<Manga>({ title, linkImage, linkManga, chapter, id })
  const router = useRouter();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target;

    if (target instanceof HTMLFormElement) {
      const formData = Object.fromEntries(new FormData(target));
      setManga((el) => {
        let newManga = el;
        newManga.chapter = Number(formData.chapter) || el.chapter;
        return newManga;
      })
      // call api pour update chapitre
      const response = await fetch('api/mangas', {
        method: 'PUT',
        body: JSON.stringify(manga)
      })
      if (response.ok) {
        const res = await response.json();

        router.refresh();
      } else {
        console.error('internal servor error');
      }
    }
  }
  return (
    <Card className="w-[350px] m-5 p-5 flex flex-col justify-between">
      <CardHeader>
        <Link href={linkManga} target={'_blank'}>
          <CardTitle className="text-center">{title}</CardTitle>
        </Link>
      </CardHeader>
      <CardContent className="h-24 overflow-hidden flex justify-center items-center ">
        <Image
          className='rounded'
          src={linkImage}
          alt='image'
          width={300}
          height={100}
        />
      </CardContent>
      <CardFooter className="w-100">
        <form className="flex items-center justify-around p-0 w-100" onSubmit={handleSubmit}>
          <Input defaultValue={chapter} className="w-2/4" type="number" name="chapter" id="chapter" placeholder="chapter.." />
          <Button className="w-1/4">Update</Button>
        </form>
      </CardFooter>
    </Card>
  )
}
