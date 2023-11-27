export type NewManga = {
  title: string;
  linkImage: string;
  linkManga: string;
  chapter: number;
};

export type Manga = {
  title: string;
  linkImage: string;
  linkManga: string;
  chapter: number;
  id: number;
};

export type SearchParams = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
