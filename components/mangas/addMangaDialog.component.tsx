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
import { useToast } from "../ui/use-toast";

export function AddMangaDialog() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (values: any) => {
    const safeNewManga = newMangaSchema.safeParse(values);
    if (safeNewManga.success) {
      const { data: manga } = safeNewManga;
      const response = await fetch("/api/mangas", {
        method: "POST",
        body: JSON.stringify(manga),
      });

      if (response.ok) {
        const res = await response.json();
        setOpen(false);
        router.refresh();
      } else {
        toast({
          title: "Erreur lors de la creation du manga",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "values n' est pas de type newMangaSchema",
        variant: "destructive",
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-12 h-12 overflow-hidden p-0 bg-transparent m-2 ">
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
