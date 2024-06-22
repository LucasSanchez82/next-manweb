import MangaCardLoading from "@/components/mangas/mangaCard.loading";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingMangaCard() {
  const nbMangas =
    typeof process.env.MANGAS_NB_AFFICHE === "number"
      ? process.env.MANGAS_NB_AFFICHE
      : 10;
  const mangasLoadingItems = Array.from({ length: nbMangas }).map(
    (_, index) => <MangaCardLoading key={index} />
  );
  return (
    <div className="flex flex-row flex-wrap justify-around m-auto">
      {mangasLoadingItems}
    </div>
  );
}
