import { defineCollection, z } from 'astro:content';

export const articlesCollection = defineCollection({
  schema: z.object({
    datePublished: z.number(),
    dateEdited: z.number().optional(),
    title: z.string(),
    description: z.string(),
    url: z.string().optional(),
    externalUrl: z.string().optional(),
    originalPublication: z.string().optional(),
  }),
});
