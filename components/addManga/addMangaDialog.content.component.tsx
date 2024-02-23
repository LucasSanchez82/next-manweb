import {
    ScanMangaDatasType,
    ScanMangaTitleType,
} from "@/schemas/scrappingDatasShemas";
import { SetStateAction } from "react";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import AddMangaListPreview from "./addMangaPreviewSearch";
import Link from "next/link";

const AddMangaDialogContent = ({
  distMangas,
  useSelectedManga,
  setDistMangas,
  upDistMangas,
}: {
  distMangas: ScanMangaDatasType;
  useSelectedManga: {
    setSelectedManga: (
      value: SetStateAction<ScanMangaTitleType | null>
    ) => void;
    selectedManga: ScanMangaTitleType | null;
  };
  setDistMangas: (value: SetStateAction<ScanMangaDatasType | null>) => void;
  upDistMangas: (value: string) => Promise<void>;
}) => {
  const { setSelectedManga, selectedManga } = useSelectedManga;
  return (
    <>
      <AddMangaListPreview
        {...{
          distMangas: distMangas || { genre: {}, title: [] },
          setDistMangas,
          setSelectedManga,
          upDistMangas,
        }}
      />
      {/* <AutoForm
          formSchema={newMangaSchema}
          action={handleSubmit}
          values={{
            title: selectedManga?.nom_match,
            linkManga: (selectedManga &&
              `https://scan-manga.com${selectedManga.url}`)!,
            linkImage: (selectedManga &&
              `https://scan-manga.com/img/manga/${selectedManga.image}`)!,
            chapter: 0,
          }}
        >
          <SubmitButton>Add Manga</SubmitButton>
        </AutoForm> */}
      {selectedManga && (
        <Card className="w-[350px] m-5 min-h-[175px] flex flex-col justify-between items-center relative overflow-hidden">
          <CardHeader className="z-10 bg-secondary p-1 m-1 rounded">
            <Link href={selectedManga.url} target={"_blank"}>
              <CardTitle className="text-center p-1 pr-2 pl-2">
                {selectedManga.nom_match}
              </CardTitle>
            </Link>
          </CardHeader>
          <CardContent className="absolute m-0 p-0 w-full h-full">
            <img
              className={"rounded object-cover w-full h-full "}
              src={"https://scan-manga.com/img/manga/" + selectedManga.image}
              // onError={() => setIsErrorImage(true)}
              alt=""
            />
            {/* {isErrorImage ? (
            <Skeleton className="w-[100%] h-[100%] mb-[10px] m-auto" />
          ) : (
          )} */}
          </CardContent>
          {/* {selectedManga.id && ( */}
          <CardFooter className="w-100 z-10">
            {/* <MangaUpdateForm chapter={manga.chapter} idManga={manga.id} /> */}
            <Button>Submit</Button>
          </CardFooter>
          {/* )} */}
        </Card>
      )}
    </>
  );
};

export default AddMangaDialogContent;
