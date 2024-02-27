"use client";
import { Input } from "@/components/ui/input";
import { UpdateIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { SubmitButton } from "../submitButton";
import { updateManga } from "./@actions/update";

export const MangaUpdateForm = ({
  chapter,
  idManga,
}: {
  idManga: string | number;
  chapter: string | number;
}) => {
  const [buttonClass, setButtonClass] = useState("");
  const rotateButton = (rotate: boolean) => {
    if (rotate) {
      setButtonClass("infinite-rotate");
    } else {
      setButtonClass("");
    }
  };
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
      <SubmitButton
        pendingCallback={(pending) => {
          rotateButton(pending);
          console.log({ buttonClass });
        }}
        variant="outline"
      >
        <UpdateIcon className={buttonClass} width={"35px"} />
      </SubmitButton>
    </form>
  );
};
