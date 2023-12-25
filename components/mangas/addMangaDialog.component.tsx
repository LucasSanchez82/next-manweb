"use client";
import AutoForm from "@/components/ui/auto-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { newMangaSchema } from "@/schemas/mangasSchemas";
import { Loader2, PlusCircle } from "lucide-react";
import { ChangeEvent, PropsWithChildren, useState } from "react";
import { useFormStatus } from "react-dom";
import { useToast } from "../ui/use-toast";
import addManga from "./@actions/addManga";
import { ScrappMangaParTitre } from "./scrapping/scrappMangaParTitre";
import { NewManga } from "@/lib/types";
import { getMangaBySrapTitle } from "@/app/mangas/scrappingProcess";

const SubmitButton = ({ children }: PropsWithChildren) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit">
      {pending ? <Loader2 className="loader-2" /> : children ?? "Submit"}
    </Button>
  );
};

export const AddMangaDialog = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  let timeOutId: NodeJS.Timeout | null = null;

  const handleChangeValues = (manga: Partial<NewManga>) => {
    const title = manga.title;
    if (title && title.length > 2) {
      if (timeOutId) {
        clearTimeout(timeOutId);
        console.log(timeOutId);
        timeOutId = null;
      }
      timeOutId = setTimeout(() => {
        fetch("/api/mangas/scrapp")
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else throw new Error("Erreur serveur interne");
          })
          .then((result) => {
            console.log(
              "🚀 ~ file: addMangaDialog.component.tsx:48 ~ timeOutId=setTimeout ~ result:",
              result
            );
            return;
          });
      }, 1000);
    }
  };

  const handleSubmit = async (values: any) => {
    if (values instanceof FormData) {
      const newManga = Object.fromEntries(values);

      const safeNewManga = newMangaSchema.safeParse(newManga);

      if (safeNewManga.success) {
        const newManga = await addManga(safeNewManga.data);
        if ("error" in newManga) {
          toast({
            title:
              typeof newManga.error === "string"
                ? newManga.error
                : "Erreur interne du serveur",
            variant: "destructive",
          });
        } else {
          toast({
            title: "ajoute avec succes",
            variant: "default",
          });
          setOpen(false);
        }
      } else {
        toast({
          title: "values n' est pas de type newMangaSchema",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "n est pas un formdata",
        description: "veuillez parler de ce problemes si le probleme persiste",
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
        <AutoForm
          formSchema={newMangaSchema}
          action={handleSubmit}
          onValuesChange={handleChangeValues}
        >
          <SubmitButton>Add Manga</SubmitButton>
        </AutoForm>
      </DialogContent>
    </Dialog>
  );
};
