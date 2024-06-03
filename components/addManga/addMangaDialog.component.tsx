"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import fetchScanMangaBrut from "@/controller/mangas/fetchScanMangasBrut";
import {
  ScanMangaDatasType,
  ScanMangaTitleType
} from "@/schemas/scrappingDatasShemas";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import AddMangaDialogContent from "./addMangaDialog.content.component";

export const AddMangaDialog = () => {
  const [open, setOpen] = useState(false);
  const [distMangas, setDistMangas] = useState<ScanMangaDatasType | null>(null);
  const [selectedManga, setSelectedManga] = useState<ScanMangaTitleType | null>(
    null
  );
  const { toast } = useToast();
  const fetchScanMangaPrepared = fetchScanMangaBrut(setDistMangas, toast);
  

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
            upDistMangas: fetchScanMangaPrepared,
            setOpen,
          }}
        />
      </DialogContent>
    </Dialog>
  );
};


