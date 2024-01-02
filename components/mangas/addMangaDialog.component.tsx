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
import {
  ScanMangaDatasType,
  ScanMangaTitleType,
  scanMangaDatasSchema,
} from "@/schemas/scrappingDatasShemas";
import { Loader2, PlusCircle } from "lucide-react";
import { FocusEvent, KeyboardEvent, PropsWithChildren, useState } from "react";
import { useFormStatus } from "react-dom";
import { useToast } from "../ui/use-toast";
import addManga from "./@actions/addManga";
import AddMangaListPreview from "./addMangaPreviewSearch";

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
  const [distMangas, setDistMangas] = useState<ScanMangaDatasType | null>(null);
  const [selectedManga, setSelectedManga] = useState<ScanMangaTitleType | null>(
    null
  );
  let timeOutId: NodeJS.Timeout | null = null;

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

  const handleChangeValues = (event: KeyboardEvent<HTMLInputElement>) => {
    const title = event.currentTarget.value;
    if (title && title.length > 2) {
      if (timeOutId) {
        clearTimeout(timeOutId);
        console.log(timeOutId);
        timeOutId = null;
      }
      timeOutId = setTimeout(() => {
        fetchScanManga(encodeURIComponent(title));
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
  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    console.log(
      "🚀 ~ file: addMangaDialog.component.tsx:127 ~ handleBlur ~ event.target:",
      event.relatedTarget
    );
    setTimeout(() => {
      setDistMangas(null);
    }, 100); // 00ms is necessary for dodge onBlur
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
          // onValuesChange={handleChangeValues}
          values={{
            title: selectedManga?.nom_match,
            linkManga: (selectedManga &&
              `https://scan-manga.com${selectedManga.url}`)!,
            linkImage: (selectedManga &&
              `https://scan-manga.com/img/manga/${selectedManga.image}`)!,
            chapter: 0,
          }}
          fieldConfig={{
            title: {
              inputProps: {
                onBlur: handleBlur,
                onKeyUp: handleChangeValues,
              },
            },
          }}
        >
          {distMangas && (
            <AddMangaListPreview
              {...{ distMangas, setDistMangas, setSelectedManga }}
            />
          )}
          <SubmitButton>Add Manga</SubmitButton>
        </AutoForm>
      </DialogContent>
    </Dialog>
  );
};
