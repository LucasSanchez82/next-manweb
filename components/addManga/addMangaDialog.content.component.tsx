"use client";
import { cn } from "@/lib/utils";
import { newMangaSchema } from "@/schemas/mangasSchemas";
import {
  ScanMangaDatasType,
  ScanMangaTitleType,
} from "@/schemas/scrappingDatasShemas";
import { TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import Link from "next/link";
import { SetStateAction, useState } from "react";
import { z } from "zod";
import addManga from "../mangas/@actions/addManga";
import { SubmitButton } from "../submitButton";
import AutoForm from "../ui/auto-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent } from "../ui/tabs";
import { useToast } from "../ui/use-toast";
import AddMangaListPreview from "./addMangaPreviewSearch";
import { Sparkles } from "lucide-react";

const AddMangaDialogContent = ({
  distMangas,
  useSelectedManga,
  setDistMangas,
  upDistMangas,
  setOpen,
}: {
  distMangas: ScanMangaDatasType;
  useSelectedManga: {
    setSelectedManga: (
      value: SetStateAction<ScanMangaTitleType | null>
    ) => void;
    selectedManga: ScanMangaTitleType | null;
  };
  setDistMangas: (value: SetStateAction<ScanMangaDatasType | null>) => void;
  upDistMangas: (value: string) => Promise<void>;
  setOpen: (value: boolean) => void;
}) => {
  const { setSelectedManga, selectedManga } = useSelectedManga;
  const { toast } = useToast();
  const [currValue, setCurrValue] = useState("magic");
  const addMangaProcess = async (mangaData: z.infer<typeof newMangaSchema>) => {
    console.clear();
    console.log(mangaData);
    console.table(mangaData);
    try {
      const newManga = await addManga(mangaData);
      if ("error" in newManga) {
        console.error(newManga.error);
        toast({
          title: "Erreur interne du serveur",
          variant: "destructive",
        });
      } else {
        toast({
          title: "ajoute avec succes",
          variant: "default",
        });
        setOpen(false);
        setDistMangas(null);
        setSelectedManga(null);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Erreur interne du serveur",
        description: error instanceof Error ? error.message : "Erreur inconnu",
        variant: "destructive",
      });
    }
  };
  const handleSubmit = async (values: any) => {
    if (values instanceof FormData) {
      const newManga = Object.fromEntries(values);

      const safeNewManga = newMangaSchema.safeParse(newManga);

      if (safeNewManga.success) {
        return addMangaProcess(safeNewManga.data);
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
  return (
    <Tabs defaultValue="magic" onValueChange={setCurrValue} value={currValue}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger
          className={cn(
            "rounded",
            currValue === "magic" && "bg-primary text-secondary"
          )}
          value="magic"
        >
          <Sparkles />
          Magic
          <Sparkles />
        </TabsTrigger>
        <TabsTrigger
          className={cn(
            "rounded",
            currValue === "manual" && "bg-primary text-secondary"
          )}
          value="manual"
        >
          Manual
        </TabsTrigger>
      </TabsList>
      <TabsContent value="magic">
        <AddMangaListPreview
          {...{
            distMangas: distMangas || { genre: {}, title: [] },
            setDistMangas,
            setSelectedManga,
            upDistMangas,
          }}
        />

        {selectedManga && (
          <Card className="w-[350px] m-auto mt-5 min-h-[175px] flex flex-col justify-between items-center relative overflow-hidden">
            <CardHeader className="bg-secondary rounded">
              <Link href={selectedManga.url} target={"_blank"}>
                <CardTitle className="text-center p-1 pr-2 pl-2">
                  {selectedManga.nom_match}
                </CardTitle>
              </Link>
            </CardHeader>
            <CardContent className="absolute m-0 p-0 w-full h-full">
              <img
                className={"rounded object-cover w-full h-full "}
                src={"https://scan-manga.com/img/manga/" + selectedManga.image}
                alt=""
              />
            </CardContent>
            <CardFooter className="w-100 z-10">
              <form
                action={async () => {
                  await addMangaProcess({
                    title: selectedManga?.nom_match,
                    linkManga:
                      selectedManga &&
                      `https://scan-manga.com${selectedManga.url}`,
                    linkImage:
                      selectedManga &&
                      `https://scan-manga.com/img/manga/${selectedManga.image}`,
                    chapter: 0,
                    tags: [],
                  });
                }}
              >
                <SubmitButton>Ajouter</SubmitButton>
              </form>
            </CardFooter>
          </Card>
        )}
      </TabsContent>
      <TabsContent value="manual">
        <AutoForm
          formSchema={newMangaSchema}
          action={handleSubmit}
          values={{
            title: selectedManga?.nom_match,
            linkManga: (selectedManga &&
              `https://scan-manga.com${selectedManga.url}`)!,
            linkImage: (selectedManga &&
              `https://scan-manga.com/img/manga/${selectedManga.image}`)!,
            chapter: 0,
          }}
        >
          <SubmitButton>Ajouter</SubmitButton>
        </AutoForm>
      </TabsContent>
    </Tabs>
  );
};

export default AddMangaDialogContent;
