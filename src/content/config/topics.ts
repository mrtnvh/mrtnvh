import { z, defineCollection } from 'astro:content';
import { colorKeys } from '../../styles/colors';

export const topicsCollection = defineCollection({
  schema: z
    .object({
      category: z.string().optional(),
      datePublished: z.number(),
      description: z.string(),
      id: z.string(),
      layout: z.string(),
      slides: z.string().optional(),
      slidesThumbnailAlt: z.string().optional(),
      slug: z.string().optional(),
      subtitle: z.string(),
      thumbnail: z.string(),
      thumbnailCredits: z.string(),
      tint: z.enum(colorKeys),
      title: z.string(),
      video: z.string().optional(),
      videoThumbnailAlt: z.string().optional(),
    })
    .superRefine((val, ctx) => {
      if (val.slides && !val.slidesThumbnailAlt) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Provide a thumbnail alt text for slides',
          path: ['slidesThumbnailAlt'],
        });
      }
      if (val.video && !val.videoThumbnailAlt) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Provide a thumbnail alt text for video',
          path: ['videoThumbnailAlt'],
        });
      }
      return true;
    }),
});
