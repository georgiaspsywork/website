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

// Resources: tools, templates, guides. Library cards and standard detail pages are built from these fields.
const resources = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/resources' }),
  schema: z.object({
    title: z.string(),
    /** What kind of thing it is: Tool, Video, Template, Guide or Pack. */
    type: z.string(),
    /** Short detail shown on the card, e.g. "5 min" or "PDF · 8 pages". */
    meta: z.string(),
    /** One or two sentences on the card. */
    summary: z.string(),
    /** Who it is for, completing "For ___". */
    audience: z.string(),
    /** Card call to action, e.g. "Use the tool", "Download", "Watch". */
    action: z.string(),
    /** Position in the library, lowest first. */
    order: z.number().int().default(100),
    /** Multi-part resources show as a stack of cards: how many extra layers (0-3). */
    parts: z.number().int().min(0).max(3).default(0),
    /** Set when the resource has its own bespoke page (e.g. the rota builder) instead of the standard resource page. */
    href: z.string().optional(),
    /** Shown large at the top of the resources page (use on one resource only). */
    featured: z
      .object({ meta: z.string(), blurb: z.string(), previewLabel: z.string() })
      .optional(),
    draft: z.boolean().default(false),
    /** True while the text is stand-in copy; `npm run check` lists these before publishing. */
    placeholder: z.boolean().default(false),

    // Detail page content
    /** Page headline if different from the card title. */
    heading: z.string().optional(),
    intro: z.string().optional(),
    buttons: z.array(z.object({ label: z.string(), href: z.string(), style: z.enum(['primary', 'outline']).default('primary') })).default([]),
    facts: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    previewLabel: z.string().optional(),
    insideTitle: z.string().default("What's inside"),
    inside: z.array(z.object({ title: z.string(), body: z.string() })).default([]),
    stepsEyebrow: z.string().default('How to use it'),
    stepsTitle: z.string().optional(),
    steps: z.array(z.object({ stamp: z.string(), title: z.string(), body: z.string() })).default([]),
    note: z.object({ label: z.string().default('Why we made this'), quote: z.string(), by: z.string() }).optional(),
    /** Slugs of resources to suggest underneath. */
    related: z.array(z.string()).default([]),
  }),
});

export const collections = { articles, resources };
