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
import { PropsWithChildren, useState } from "react";
import { useFormStatus } from "react-dom";
import { useToast } from "../ui/use-toast";
import addManga from "./@actions/addManga";

const SubmitButton = ({ children }: PropsWithChildren) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit">
      {pending ? <Loader2 className="loader-2" /> : children ?? "Submit"}
    </Button>
  );
};

export const AddMangaDialog = ({
  refreshMangas,
}: {
  refreshMangas: () => Promise<void>;
}) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

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
          await refreshMangas();
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
        <AutoForm formSchema={newMangaSchema} action={handleSubmit}>
          <SubmitButton>Add Manga</SubmitButton>
        </AutoForm>
      </DialogContent>
    </Dialog>
  );
};
