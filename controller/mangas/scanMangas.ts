const isScanMangaUrl = (url: string): boolean => {
  try {
    const { hostname } = new URL(url);
    return hostname === "scan-manga.com" || hostname === "www.scan-manga.com";
  } catch (e) {
    console.log("isScanMangaUrl -> dans le catch")
    return false;
  }
};

const getManga = async (linkManga: string) => {
    const response = await fetch(linkManga);
    if (response.ok) {
      const doc = document.createElement("html");
      const result = await response.text();
      doc.innerHTML = result;
      let titleStr = '';
      let imgStr = '';
      const title = doc.querySelector("#middle > div.h2_ensemble > div.h2_titre.h2_titre_shonen > h2")
      const img = doc.querySelector(
        "#middle > div.h2_ensemble > div.fiche_technique.folder_corner > div.contenu_fiche_technique.border_radius_contener.folder_corner > div.image_manga > img"
      );
      console.log(title, img);
      
      if(title instanceof HTMLHeadingElement ) {titleStr = title.innerText;}
      if(img instanceof HTMLImageElement) {imgStr = img.src;}
      console.log(doc)
      return { linkManga, title: titleStr, img: imgStr };
    }
  };

export { getManga, isScanMangaUrl };
