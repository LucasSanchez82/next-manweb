"use client";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { newMangaSchema } from "@/schemas/mangasSchemas";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AddMangaDialog() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleSubmit = async (values: any) => {
    const safeValues = newMangaSchema.safeParse(values);
    if (!safeValues.success) {
      alert("values n' est pas de type newMangaSchema");
      return;
    }
    const { data: manga } = safeValues;
    const response = await fetch("/api/mangas", {
      method: "POST",
      body: JSON.stringify(manga),
    });

    if (response.ok) {
      const res = await response.json();
      console.log(res);
      setOpen(false);
      router.refresh();
    } else {
      alert("error manga creation");
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-12 h-12 overflow-hidden p-0 bg-transparent m-2 ">
          {/* ICON FOR ADD */}
          <PlusCircle className="text-primary hover:text-secondary rounded w-full h-full" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter un manga</DialogTitle>
        </DialogHeader>
        <AutoForm formSchema={newMangaSchema} onSubmit={handleSubmit}>
          <AutoFormSubmit>Add Manga</AutoFormSubmit>
        </AutoForm>
      </DialogContent>
    </Dialog>
  );
}
