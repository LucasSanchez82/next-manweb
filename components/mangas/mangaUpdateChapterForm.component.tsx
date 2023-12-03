"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateManga } from "./@actions/update";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

const SubmitButton = () => {
  const { pending,  } = useFormStatus();
  if(!pending) {
    console.log('pend');
    
  }
  return (
    <Button type="submit"  aria-disabled={pending} className="w-1/4">
      {pending ? <Loader2 className="loader-2 " /> : "Update"}
    </Button>
  );
};

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
      <input className="hidden" name="boxId" defaultValue={idManga} />
      <Input
        defaultValue={chapter}
        className="w-2/4"
        type="number"
        name="chapter"
        step="0.1"
        id="chapter"
        placeholder="chapter.."
      />
      <SubmitButton />
    </form>
  );
};
