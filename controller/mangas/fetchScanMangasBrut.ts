import { ToastProps } from "@/components/ui/toast";
import { ScanMangaDatasType, scanMangaDatasSchema } from "@/schemas/scrappingDatasShemas";

function fetchScanMangaBrut(
  setDistMangas: (distMangas: ScanMangaDatasType) => void,
  toast: (toast: ToastProps & { description: string }) => void
) {
  return async (encodedUri: string) => {
    const response = await fetch(
      `https://www.scan-manga.com/api/search/quick.json?term=${encodedUri}`, {
        method: "GET",
        credentials: "omit",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }}
    );
    if (response.ok) {
      const scanMangasDatas = await response.json();
      const safeScanMangasDatas =
        scanMangaDatasSchema.safeParse(scanMangasDatas);
      if (safeScanMangasDatas.success) {
        setDistMangas(safeScanMangasDatas.data);
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
}

export default fetchScanMangaBrut;
