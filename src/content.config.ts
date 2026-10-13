import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { categoryIds, priceRanges } from './data/taxonomy';

const foreignerFriendly = z
  .object({
    englishMenu: z.boolean().optional(),
    coverCharge: z.string().optional(),
    dressCode: z.string().optional(),
    idRequired: z.boolean().optional(),
    notes: z.string().optional(),
  })
  .optional();

const posts = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/posts',
    generateId: ({ entry }) => {
      const file = entry.replace(/\\/g, '/').replace(/\.md$/, '');
      const baseName = file.split('/').pop() ?? file;
      const slug = baseName
        .trim()
        .toLowerCase()
        .replace(/['’]/g, '')
        .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
        .replace(/^-+|-+$/g, '');
      return baseName.startsWith('_') ? `_${slug}` : slug;
    },
  }),
  schema: z
    .object({
      title: z.string().min(3),
      description: z.string().min(20),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),
      category: z.enum(categoryIds),
      area: z.string().min(1).optional(),
      venue: z.string().min(1).optional(),
      rating: z.coerce.number().int().min(1).max(5).optional(),
      price: z.enum(priceRanges).optional(),
      address: z.string().min(1).optional(),
      maps: z.url().optional(),
      hours: z.string().min(1).optional(),
      cover: z.string().min(1).optional(),
      coverAlt: z.string().min(8).optional(),
      tags: z.array(z.string().min(1)).default([]),
      affiliate: z.url().optional(),
      affiliateLabel: z.string().min(1).optional(),
      foreignerFriendly,
    })
    .superRefine((data, ctx) => {
      if (data.category !== 'guides') {
        if (data.rating == null) {
          ctx.addIssue({
            code: 'custom',
            message: 'Venue reviews need a rating from 1 to 5. Guides can leave it out.',
            path: ['rating'],
          });
        }
        if (!data.area) {
          ctx.addIssue({
            code: 'custom',
            message: 'Venue reviews need an area, such as Shibuya or Shinjuku.',
            path: ['area'],
          });
        }
        if (!data.price) {
          ctx.addIssue({
            code: 'custom',
            message: 'Venue reviews need a price range: ¥, ¥¥, ¥¥¥, or ¥¥¥¥.',
            path: ['price'],
          });
        }
        if (!data.address) {
          ctx.addIssue({
            code: 'custom',
            message: 'Venue reviews need an address.',
            path: ['address'],
          });
        }
      }

      if (data.cover && !data.coverAlt) {
        ctx.addIssue({
          code: 'custom',
          message: 'Add coverAlt so people who cannot see the photo know what it shows.',
          path: ['coverAlt'],
        });
      }
    }),
});

export const collections = { posts };
