"use client";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Manga } from "@/lib/types";
import { editMangaSchema, mangaSchema } from "@/schemas/mangasSchemas";
import { Dispatch, SetStateAction, useState } from "react";
import { editManga } from "../../controller/mangas/@actions/editManga";
import { SubmitButton } from "../submitButton";
import MultiSelectorCategories from "./mangasForm/multiSelectorCategories";
import {
  MangaWithCategories,
  MangaWithCategoriesEssential,
} from "@/controller/types/mangas.types";
import { updateManga } from "@/controller/mangas/@actions/upsertManga";

type editFormType = MangaWithCategoriesEssential & {
  setManga: Dispatch<SetStateAction<MangaWithCategories>>;
  setIsEdit?: Dispatch<SetStateAction<boolean>>;
  useCategories: {categories: string[], setCategories: Dispatch<SetStateAction<string[]>>}
};
export const EditForm = ({
  linkImage,
  linkManga,
  title,
  id,
  setIsEdit,
  setManga,
  useCategories,
}: editFormType) => {
  const {categories, setCategories} = useCategories;
  const handleSubmit = async (formdata: FormData) => {
    if (!setIsEdit) {
      toast({
        variant: "destructive",
        title: "N est pas detecte comme en train d etre modifie",
      });
      return;
    }
    try {
      const values = Object.fromEntries(formdata);
      const safeValues = editMangaSchema.safeParse(values);
      if (safeValues.success) {
        const res = await updateManga({
          linkImage: safeValues.data.linkImage,
          linkManga: safeValues.data.linkManga,
          title: safeValues.data.title,
          chapter: 0,
          idManga: id,
          tags: categories
        });

        const safeManga = mangaSchema.safeParse(res);
        if (safeManga.success) {
          setManga((curr) => ({ ...curr, ...safeManga.data }));
        }

          toast({
            variant: "default",
            title: "succes",
          });
          setIsEdit(false);
        }
    } catch (error) {
      toast({
        title: "Erreur serveur interne",
        variant: "destructive",
      });
      console.log(error);
    }
  };

  return (
    <form
      // action={editManga}
      method="POST"
      action={handleSubmit}
    >
      <Input type="text" className="hidden" name="id" value={id} />
      <Input id="title" type="text" defaultValue={title} name="title" />
      lien manga :
      <Input
        id="linkManga"
        type="text"
        defaultValue={linkManga}
        name="linkManga"
      />
      lien image :
      <Input
        id="linkImage"
        type="text"
        defaultValue={linkImage}
        name="linkImage"
      />
      Categories :
      <MultiSelectorCategories
        categories={categories}
        setCategories={setCategories}
      />
      <SubmitButton />
    </form>
  );
};
