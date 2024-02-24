import { SubmitButton } from "@/components/submitButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";

export const DeleteForm = ({
  handleDelete,
}: {
  handleDelete: () => Promise<void>;
}) => {
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Button variant={"outline"} className="w-full">
          <Trash2 className="text-red-700" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Supprimer</DialogTitle>
        <DialogDescription>
          Êtes-vous sûr de vouloir supprimer ce manga ?
        </DialogDescription>
        <form action={handleDelete}>
          <SubmitButton className="w-full">
            <Trash2 className="text-red-700" />
          </SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};
