import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const empresasCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/empresas" }),
  schema: z.object({
    name: z.string().min(1),
    industry: z.string().min(1),
    description: z.string().min(1),
    servicesProvided: z.array(z.string().min(1)).min(1),
    isLandingPage: z.boolean(),
    isComprehensiveStrategy: z.boolean(),
    results: z.string().min(1).optional(),
    logoUrl: z.string().min(1).optional(),
    featuredImage: z.string().min(1).optional(),
    order: z.number().int().nonnegative().default(0),
  }),
});

export const collections = {
  empresas: empresasCollection,
};
