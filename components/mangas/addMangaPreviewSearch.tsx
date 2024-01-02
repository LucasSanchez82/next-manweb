// MangaList.tsx
import { Manga } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  ScanMangaDatasType,
  ScanMangaTitleType,
} from "@/schemas/scrappingDatasShemas";
import React, { SetStateAction } from "react";

interface MangaListProps {
  distMangas: any; // Replace with the correct type
  setSelectedManga: (manga: any) => void; // Replace with the correct type
  setDistMangas: (mangas: any) => void; // Replace with the correct type
}

const AddMangaListPreview: React.FC<MangaListProps> = ({
  distMangas,
  setSelectedManga,
  setDistMangas,
}: {
  distMangas: ScanMangaDatasType;
  setSelectedManga: (value: SetStateAction<ScanMangaTitleType | null>) => void;
  setDistMangas: (value: SetStateAction<ScanMangaDatasType | null>) => void;
}) => (
  <ul
    className={cn(
      "bg-secondary rounded",
      "absolute top-36 z-10",
      "left-1/2 transform -translate-x-1/2",
      "max-h-36 w-11/12 overflow-auto"
    )}
  >
    {distMangas.title.map((manga, order) => (
      <li
        key={order}
        className={cn(
          "cursor-pointer rounded m-1 p-1",
          "hover:bg-primary hover:text-secondary" //hover
        )}
        onClick={(event) => {
          const { target } = event;
          target instanceof HTMLLIElement &&
            target.innerText &&
            setSelectedManga(
              distMangas.title.find(
                (manga) => manga.nom_match === target.innerText
              ) || null
            );
          setDistMangas(null);
        }}
      >
        {manga.nom_match}
      </li>
    ))}
  </ul>
);

export default AddMangaListPreview;
