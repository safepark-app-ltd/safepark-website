import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Guides are served at the site root (/<slug>/) to keep the WordPress URLs.
// The file name is the slug.
const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    // Shorter title for cards and lists.
    shortTitle: z.string().optional(),
    description: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    readMinutes: z.number().int().positive(),
    icon: z
      .enum(['crime-theft-cargo-trailer', 'crime-theft-fuel', 'crime-hijack', 'crime-theft', 'crime-damage-tank'])
      .default('crime-theft'),
    draft: z.boolean().default(false),
  }),
});

// Privacy, cookie and terms pages. The file name is the URL.
const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updated: z.coerce.date().optional(),
  }),
});

export const collections = { guides, legal };
