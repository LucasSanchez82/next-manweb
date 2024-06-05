type MangaWithCategories = ({
    MangaCategorie: ({
        Categorie: {
            id: number;
            libelle: string;
        };
    } & {
        mangaId: number;
        categorieId: number;
    })[];
} & {
    id: number;
    title: string;
    linkManga: string;
    linkImage: string;
    chapter: number;
    isDeleted: boolean;
    userId: string;
})
type MangaWithCategoriesEssential = Omit<MangaWithCategories, 'chapter' | 'isDeleted' | 'userId'	>;

export type { MangaWithCategories,  MangaWithCategoriesEssential};

