import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Articles: one .mdx file per article in src/content/articles.
const articles = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/articles' }),
  schema: z.object({
    /** Headline. Wrap a word in *asterisks* for the italic emphasis. */
    title: z.string(),
    /** One or two sentences shown in lists and under the headline. */
    dek: z.string(),
    date: z.coerce.date(),
    topic: z.string(),
    readMinutes: z.number().int().positive(),
    author: z.string().default('Georgia Hodkinson GMBPsS'), // see src/data/site.ts
    /** Describes the missing lead photo while it is a placeholder, e.g. "Depot at night". */
    imageNote: z.string().optional(),
    /** The article featured at the top of the articles page. */
    lead: z.boolean().default(false),
    /** Draft articles are not built or listed. */
    draft: z.boolean().default(false),
    /** True while the text is stand-in copy; `npm run check` lists these before publishing. */
    placeholder: z.boolean().default(false),
  }),
});

// Resources: tools, templates, guides. Detail pages are built from these fields.
const resources = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/resources' }),
  schema: z.object({
    title: z.string(),
    /** What kind of thing it is: Tool, Video, Template, Guide or Pack. */
    type: z.string(),
    /** Short detail shown on the card, e.g. "5 min" or "PDF · 8 pages". */
    meta: z.string(),
    summary: z.string(),
    /** Who it is for, completing "For ___". */
    audience: z.string(),
    /** Card call to action, e.g. "Use the tool", "Download", "Watch". */
    action: z.string(),
    /** Multi-part resources show as a stack of cards: how many extra layers. */
    parts: z.number().int().min(0).max(3).default(0),
    /** Use when the resource lives on its own bespoke page instead of the standard resource page. */
    href: z.string().optional(),
    draft: z.boolean().default(false),
    placeholder: z.boolean().default(false),
    /** Standard resource page extras. */
    facts: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    inside: z.array(z.object({ title: z.string(), body: z.string() })).default([]),
    steps: z.array(z.object({ stamp: z.string(), title: z.string(), body: z.string() })).default([]),
    note: z.string().optional(),
  }),
});

export const collections = { articles, resources };
