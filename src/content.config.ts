import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const empresasCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/empresas" }),
  schema:({ image }) => z.object({
    name: z.string().min(1),
    industry: z.string().min(1),
    description: z.string().min(1),
    servicesProvided: z.array(z.string().min(1)).min(1),
    isLandingPage: z.boolean(),
    isComprehensiveStrategy: z.boolean(),
    results: z.string().min(1).optional(),
    logoUrl: z.string().min(1).optional(),
    featuredImage: image(),
    links: z.array(z.object({ label: z.string(), url: z.string() })).optional(),
    order: z.number().int().nonnegative().default(0),
  }),
});


const optimCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/optim" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    featuredImage: image(),
    order: z.number().default(0),
  }),
});



export const collections = {
  empresas: empresasCollection,
  optim: optimCollection,
};
