"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateManga } from "./@actions/update";
import { useFormStatus } from "react-dom";
import { Download, Loader2, Save } from "lucide-react";
import { SubmitButton } from "../submitButton";
import {UpdateIcon} from '@radix-ui/react-icons'

export const MangaUpdateForm = ({
  chapter,
  idManga,
}: {
  idManga: string | number;
  chapter: string | number;
}) => {
  return (
    <form
      className="flex items-center justify-around p-0 w-full"
      action={updateManga}
    >
      <Input className="hidden" name="boxId" defaultValue={idManga} />
      <Input
        defaultValue={chapter}
        className="w-2/4"
        type="number"
        name="chapter"
        step="0.1"
        id="chapter"
        placeholder="chapter.."
      />
      <SubmitButton altError={<UpdateIcon className="infinite-rotate" />} variant='outline' ><UpdateIcon width={'35px'} /></SubmitButton>
      
      
    </form>
  );
};
