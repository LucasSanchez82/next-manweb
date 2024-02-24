"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { mangaSchema } from "@/schemas/mangasSchemas";
import { Manga } from "@/lib/types";
import { Dispatch, SetStateAction } from "react";
import { useFormStatus } from "react-dom";
import { editManga } from "./@actions/editManga";
import { SubmitButton } from "../submitButton";

type editFormType = {
  title: string;
  linkManga: string;
  linkImage: string;
  id: number;
  setIsEdit?: Dispatch<SetStateAction<boolean>>
};
export const EditForm = ({ linkImage, linkManga, title, id, setIsEdit, setManga }: editFormType & {setManga: Dispatch<SetStateAction<Manga>>}) => {
  const handleSubmit = async(formdata: FormData) => {
    if(!setIsEdit) {
      toast({
        variant: 'destructive',
        title: "N est pas detecte comme en train d etre modifie",
      })
      return;
    }
    try{
      const res = await editManga(formdata);
      const safeManga = mangaSchema.safeParse(res);
      if(safeManga.success) {
        setManga((curr) => ({...curr, ...safeManga.data}));
      }
      
      if('error' in res && res.error) {
        toast({
          title: res.error.join('\n'),
          variant: 'destructive'
        })
      }else{
        toast({
          variant: 'default',
          title: 'succes'
        })
        setIsEdit(false);
      }

    }catch(error) {
      toast({
        title: "Erreur serveur interne",
        variant: 'destructive'
      });
      console.log(error);
      
    }
  }
  

  return (
    <form 
    // action={editManga}
    method="POST"
      action={handleSubmit}
    >
      <Input type="text" className="hidden" name="id" value={id} />
      <Input id="title" type="text" defaultValue={title} name="title" />
      link manga : 
      <Input
        id="linkManga"
        type="text"
        defaultValue={linkManga}
        name="linkManga"
      />
      link image :
      <Input
        id="linkImage"
        type="text"
        defaultValue={linkImage}
        name="linkImage"
      />
      <SubmitButton />
    </form>
  );
};
