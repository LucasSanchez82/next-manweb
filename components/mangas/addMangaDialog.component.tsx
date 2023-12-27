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
import { NewManga } from "@/lib/types";
import { newMangaSchema } from "@/schemas/mangasSchemas";
import { Loader2, PlusCircle } from "lucide-react";
import { PropsWithChildren, useState } from "react";
import { useFormStatus } from "react-dom";
import { useToast } from "../ui/use-toast";
import addManga from "./@actions/addManga";
import { scanMangaDatasSchema, scanMangaDatasType } from "@/schemas/scrappingDatasShemas";
import { MangaDropdown } from "./mangaDropDown.component";

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
  const [distMangas, setDistMangas] = useState<scanMangaDatasType | null>(null);
  let timeOutId: NodeJS.Timeout | null = null;

  const handleChangeValues = (manga: Partial<NewManga>) => {
    const title = manga.title;
    if (title && title.length > 2) {
      console.log("🚀 ~ file: addMangaDialog.component.tsx:39 ~ handleChangeValues ~ title:", title)
      
      if (timeOutId) {
        clearTimeout(timeOutId);
        console.log(timeOutId);
        timeOutId = null;
      }
      timeOutId = setTimeout(() => {
        const fetchScanManga = async () => {
          const response = await fetch(
            "https://www.scan-manga.com/api/search/quick.json?term=" + encodeURIComponent(title)
          );
          if (response.ok) {
            const scanMangasDatas = await response.json();
            const safeScanMangasDatas = scanMangaDatasSchema.safeParse(scanMangasDatas);
            if(safeScanMangasDatas.success) {
              setDistMangas(safeScanMangasDatas.data)
            }else {
              console.log("🚀 ~ file: addMangaDialog.component.tsx:56 ~ fetchScanManga ~ safeScanMangasDatas.error:", safeScanMangasDatas.error)
            }
          } else {
            toast({
              title: "Impossible d'utiliser la recherche magique 😭",
              description: 'Esssaye de désactiver ton vpn',
              variant: "destructive",
            });
          }
        };
        fetchScanManga();
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
          values={{
            title: distMangas?.title[0].nom_match,
            linkManga: 'https://scan-manga.com/' + distMangas?.title[0].url,
            linkImage: 'https://scan-manga.com/img/manga/' + distMangas?.title[0].image,
            chapter: 0
          }}
        >
          <SubmitButton>Add Manga</SubmitButton>
        </AutoForm>
      </DialogContent>
    </Dialog>
  );
};
