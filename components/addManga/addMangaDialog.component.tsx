"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ScanMangaDatasType,
  ScanMangaTitleType,
  scanMangaDatasSchema,
} from "@/schemas/scrappingDatasShemas";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
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
            setOpen,
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
