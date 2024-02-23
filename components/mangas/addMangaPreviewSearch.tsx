// MangaList.tsx
import { cn } from "@/lib/utils";
import {
  ScanMangaDatasType,
  ScanMangaTitleType,
} from "@/schemas/scrappingDatasShemas";
import { SetStateAction, useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

const AddMangaListPreview = ({
  distMangas,
  setSelectedManga,
  setDistMangas,
  upDistMangas,
}: {
  distMangas: ScanMangaDatasType;
  setSelectedManga: (value: SetStateAction<ScanMangaTitleType | null>) => void;
  setDistMangas: (value: SetStateAction<ScanMangaDatasType | null>) => void;
  upDistMangas: (value: string) => Promise<void>;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Command
      onChange={(event) => {
        if (event.target instanceof HTMLInputElement) {
          const value = event.target.value;
          if (value.length > 2) {
            upDistMangas(value);
          }
        }
      }}
      shouldFilter={false}
      className="rounded-lg border shadow-md"
    >
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {distMangas.title.map((manga, order) => (
            <CommandItem
              key={order}
              onSelect={(selectedValue) => {
                setSelectedManga(manga);
                setDistMangas(null);
              }}
            >
              <span>{manga.nom_match}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default AddMangaListPreview;
