"use client";
import { Input } from "@/components/ui/input";
import React, { useTransition } from "react";
import { updateManga } from "./@actions/update";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit"  aria-disabled={pending} className="w-1/4">
      {pending ? "Update..." : "Update"}
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
      className="flex items-center justify-around p-0 w-100"
      action={updateManga}
    >
      <input className="hidden" name="boxId" value={idManga} />
      <Input
        defaultValue={chapter}
        className="w-2/4"
        type="number"
        name="chapter"
        id="chapter"
        placeholder="chapter.."
      />
      <SubmitButton />
    </form>
  );
};
