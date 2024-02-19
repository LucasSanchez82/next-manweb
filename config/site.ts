import { SiteConfig, ContactConfig } from "@/types"

/* ====================
[> WEBSITE CONFIG <]
-- Fill the details about your website
 ==================== */

const baseUrl = "https://manweb.lucas-sanchez.fr"

export const siteConfig: SiteConfig = {
  name: "Manweb",
  author: "Lucas Sanchez",
  description:
    "Easy way for memorizing mangas",
  keywords: [
    "Manweb",
    "Mangas",
    "Memorize Mangas",
    "Memoriser mangas",
    "Lister Mangas",
    "Listing Mangas",
    "Scans",
    "Listing Scans",
  ],
  url: {
    base: baseUrl,
    author: "https://redpangilinan.live",
  },
  ogImage: `${baseUrl}/og.jpg`,
}

export const contactConfig: ContactConfig = {
  email: "08.lucas.sanchez@gmail.com",
}
