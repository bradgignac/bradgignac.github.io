import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
  }),
});

const books = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/books" }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    start_date: z.date(),
    end_date: z.date().nullable(),
    goodreads_url: z.url(),
  }),
});

const hikes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/hikes" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    alltrails_url: z.url(),
    distance_miles: z.number().optional(),
    elevation_gain_feet: z.number().optional(),
    duration: z
      .string()
      .regex(/^\d+h \d+m \d+s$/, "Duration must be in the format 'Xh Xm Xs' (e.g., '1h 53m 24s')")
      .optional(),
    tags: z.array(z.string()).optional(),
    gear: z.array(z.string()).optional(),
    gpx: z.string().optional(),
  }),
});

export const collections = { posts, books, hikes };
