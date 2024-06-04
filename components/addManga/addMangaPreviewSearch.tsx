'use client'
// MangaList.tsx
import {
  ScanMangaDatasType,
  ScanMangaTitleType,
} from "@/schemas/scrappingDatasShemas";
import { FormEvent, SetStateAction } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
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
  let timeOutId: NodeJS.Timeout | null = null;

  const handleChangeValue = (event: FormEvent<HTMLDivElement>) => {
    const title = event.target instanceof HTMLInputElement && event.target.value;
    if (title && title.length > 2) {
      if (timeOutId) {
        clearTimeout(timeOutId);
        timeOutId = null;
      }
      timeOutId = setTimeout(() => {
        upDistMangas(encodeURIComponent(title));
      }, 300) as NodeJS.Timeout;
    }
  };
  return (
    <Command
      onChange={handleChangeValue}
      shouldFilter={false}
      className="rounded-lg border shadow-md"
    >
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
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
      </CommandList>
    </Command>
  );
};

export default AddMangaListPreview;
