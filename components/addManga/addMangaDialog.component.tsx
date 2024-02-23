"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { newMangaSchema } from "@/schemas/mangasSchemas";
import {
  ScanMangaDatasType,
  ScanMangaTitleType,
  scanMangaDatasSchema,
} from "@/schemas/scrappingDatasShemas";
import { Loader2, PlusCircle } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useToast } from "../ui/use-toast";
import addManga from "../mangas/@actions/addManga";
import AddMangaListPreview from "./addMangaPreviewSearch";
import AddMangaDialogContent from "./addMangaDialog.content.component";

export const AddMangaDialog = () => {
  const [open, setOpen] = useState(false);
  const [distMangas, setDistMangas] = useState<ScanMangaDatasType | null>(null);
  const [selectedManga, setSelectedManga] = useState<ScanMangaTitleType | null>(
    null
  );
  const { toast } = useToast();
  const fetchScanManga = async (encodedUri: string) => {
    const response = await fetch(
      "https://www.scan-manga.com/api/search/quick.json?term=" + encodedUri
    );
    if (response.ok) {
      const scanMangasDatas = await response.json();
      const safeScanMangasDatas =
        scanMangaDatasSchema.safeParse(scanMangasDatas);
      if (safeScanMangasDatas.success) {
        setDistMangas(safeScanMangasDatas.data);
      }
    } else {
      console.log(await response.json());
      toast({
        title: "Impossible d'utiliser la recherche magique 😭",
        description: "Esssaye de désactiver ton vpn",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (values: any) => {
    const errorWrapper = async (fn: () => any) => {
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
            fn();
          }
        } else {
          toast({
            title: "Valeurs invalides",
            description: "Veuillez respecter la nomenclarure",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "N'est pas un formdata",
          description: "veuillez signaler le probleme s'il persiste",
          variant: "destructive",
        });
      }
    };
    errorWrapper(() => {
      toast({
        title: "ajoute avec succes",
        variant: "default",
      });
      setOpen(false);
      setDistMangas(null);
      setSelectedManga(null);
    });
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
        <AddMangaDialogContent
        {...{
          distMangas: distMangas || { genre: {}, title: [] },
          setDistMangas,
          useSelectedManga: { setSelectedManga, selectedManga },
          upDistMangas: fetchScanManga,
        }}
        />
      </DialogContent>
    </Dialog>
  );
};
