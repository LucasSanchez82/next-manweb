"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Dispatch, SetStateAction } from "react";
import { useFormStatus } from "react-dom";
import { editManga } from "./@actions/editManga";

type editFormType = {
  title: string;
  linkManga: string;
  linkImage: string;
  id: number;
  setIsEdit?: Dispatch<SetStateAction<boolean>>
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending}>
      {pending ? "Chargement..." : "Mettre a jour"}
    </Button>
  );
};
export const EditForm = ({ linkImage, linkManga, title, id, setIsEdit }: editFormType) => {
  const classNamesLabel = "mb-4";
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
      console.log(res);
      
      if(res?.error) {
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
      <input type="text" className="hidden" name="id" value={id} />
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
