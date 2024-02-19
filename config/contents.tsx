import { HeroHeader, ContentSection } from "@/types/contents";
import {
  BookMarked,
  BookOpenText,
  Code2,
  FileSearch,
  Shuffle,
  ThumbsUp,
} from "lucide-react";

/* ====================
[> CUSTOMIZING CONTENT <]
-- Setup image by typing `/image-name.file` (Example: `/header-image.jpg`)
-- Add images by adding files to /public folder
-- Leave blank `` if you don't want to put texts or images
 ==================== */

export const heroHeader: HeroHeader = {
  header: `manweb, le marque`,
  subheader: `Se souvenir de ses lectures n'a jamais été aussi simple`,
  image: `/hero-img.webp`,
};

export const featureCards: ContentSection = {
  header: `Manweb en bref`,
  subheader: `pour quoi ?`,
  content: [
    {
      text: `Tous les fans de scans`,
      subtext: `Webcomics / Mangas / Webtoons / Novels`,
      icon: <BookOpenText />,
    },
    {
      text: `Simple et beau`,
      subtext: `Facile à comprendre, nul besoin de documentation`,
      icon: <ThumbsUp />,
    },
    {
      text: "Le marque-page moderne",
      subtext: `Pour toutes vos lectures en ligne`,
      icon: <BookMarked />,
    },
  ],
};

export const features: ContentSection = {
  header: `Features`,
  subheader: `Why use Next Landing?`,
  image: `/landing.png`,
  content: [
    {
      text: `Se souvenir des mangas lus`,
      subtext: `Les retrouver facilement`,
      icon: <FileSearch />,
    },
    {
      text: `Ne plus se mélanger entre tous les sites de scans`,
      subtext: `Se concentrer sur l'essentiel : le dernier chapitre lu`,
      icon: <Shuffle />,
    },
    {
      text: `Facile à utiliser`,
      subtext: `Une interface simple et intuitive`,
      icon: <ThumbsUp />,
    },
    {
      text: `Développement toujours en cours`,
      subtext: `Promet des améliorations quotidiennes`,
      icon: <Code2 />,
    },
  ],
};
