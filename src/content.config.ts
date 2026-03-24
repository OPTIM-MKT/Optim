import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const empresas = defineCollection({
  loader: glob({
    base: "./src/content/empresas",
    pattern: "**/*.{md,mdx}",
  }),
  schema: z.object({
    name: z.string().min(1),
    industry: z.string().min(1),
    description: z.string().min(1),
    servicesProvided: z.array(z.string().min(1)).min(1),
    isLandingPage: z.boolean(),
    isComprehensiveStrategy: z.boolean(),
    results: z.string().min(1).optional(),
    image: z.string().min(1).optional(),
  }),
});

export const collections = { empresas };
