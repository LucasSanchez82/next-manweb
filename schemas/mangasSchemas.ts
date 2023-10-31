import { z } from 'zod';

export const mangaSchema = z.object({
    title: z.string(),
    linkImage: z.string(),
    linkManga: z.string(),
    chapter: z.number(),
    id: z.number(),
})