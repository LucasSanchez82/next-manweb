import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { MoreVertical, Edit } from "lucide-react";
import React from "react";
import { DeleteForm } from "./mangasForm/deleteForm";
import { Button } from "../ui/button";
import { ClassNameValue } from "tailwind-merge";

type DropDownProps = {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => Promise<void>;
};

export function DropDownCommands({ setIsEdit, handleDelete, ...props}: DropDownProps & React.HtmlHTMLAttributes<HTMLButtonElement>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger {...props} asChild>
        <Button className="p-0" variant="outline">
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col items-center justify-center pt-2 pb-2">
        <DropdownMenuItem className="p-0 m-0 w-full mb-3">
          <Button
            className="w-full flex justify-around"
            variant={"outline"}
            onClick={() => setIsEdit(true)}
          >
            <Edit /> <span>Modifer</span>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
          }}
          className="p-0 m-0 w-full"
        >
          <DeleteForm handleDelete={handleDelete} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
