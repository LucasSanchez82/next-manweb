"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { NewManga } from "@/lib/types";
import {
  ScanMangaDatasType,
  scanMangaDatasSchema,
} from "@/schemas/scrappingDatasShemas";


export function ScrappMangaByTitle({
  useManga,
}: {
  useManga: {
    distMangas: ScanMangaDatasType | null;
    setDistMangas: React.Dispatch<
      React.SetStateAction<ScanMangaDatasType | null>
    >;
  };
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const { toast } = useToast();
  const { distMangas, setDistMangas } = useManga;
  let timeOutId: NodeJS.Timeout | null = null;

  const fetchScanManga = async (encodedUri: string) => {
    const response = await fetch(
      "https://www.scan-manga.com/api/search/quick.json?term=" + encodedUri
    );
    if (response.ok) {
      const scanMangasDatas = await response.json();
      const safeScanMangasDatas =
        scanMangaDatasSchema.safeParse(scanMangasDatas);
      if (safeScanMangasDatas.success) {
        setDistMangas(safeScanMangasDatas.data);
      } else {
        console.log(
          "🚀 ~ file: addMangaDialog.component.tsx:56 ~ fetchScanManga ~ safeScanMangasDatas.error:",
          safeScanMangasDatas.error
        );
      }
    } else {
      console.log(await response.json());
      toast({
        title: "Impossible d'utiliser la recherche magique 😭",
        description: "Esssaye de désactiver ton vpn",
        variant: "destructive",
      });
    }
  };

  const handleChangeValues = (event: React.FormEvent<HTMLButtonElement>) => {
    console.log("🚀 ~ file: scrappMangaByTitle.tsx:71 ~ handleChangeValues ~ event:", event)
    // const title = manga.title;
    // if (title && title.length > 2) {
    //   console.log(
    //     "🚀 ~ file: addMangaDialog.component.tsx:39 ~ handleChangeValues ~ title:",
    //     title
    //   );

    //   if (timeOutId) {
    //     clearTimeout(timeOutId);
    //     console.log(timeOutId);
    //     timeOutId = null;
    //   }
    //   timeOutId = setTimeout(() => {
    //     fetchScanManga(encodeURIComponent(title));
    //   }, 1000);
    // }
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
          onChange={handleChangeValues}
        >
          {value
            ? value //distMangas?.find((framework) => framework.value === value)?.label
            : "chercher un manga..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {/* {distMangas.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))} */}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
