import { SyntheticEvent } from "react";
import NextImage from "next/image";
import { Button } from "@/components/ui/button";

export const DeleteForm = ({ handleDelete }: { handleDelete: (event: SyntheticEvent) => Promise<void> }) =>  {
    return (
      <form onSubmit={handleDelete}>
        <Button
          type="submit"
          className="w-10 h-10 p-0 bg-transparent absolute top-3 right-3"
        >
          <NextImage //delete Icon
            src="/delete-icon.svg"
            alt="Icon of a delete button"
            width={40}
            height={40}
          />
        </Button>
      </form>
    );
  }
  