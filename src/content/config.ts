import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const empresasCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/empresas" }),
  schema: z.object({
    name: z.string().describe("Nombre de la empresa o cliente"),
    industry: z.string().describe("Sector o giro al que se dedica la empresa (ej. Inmobiliaria)"),
    description: z.string().describe("Breve resumen de lo que hace la empresa"),
    servicesProvided: z.array(z.string()).describe("Lista de servicios ejecutados"),
    isLandingPage: z.boolean().default(false).describe("Indica si el proyecto incluyó o fue exclusivamente una landing page"),
    isComprehensiveStrategy: z.boolean().default(false).describe("Indica si fue una estrategia integral de marketing"),
    results: z.string().optional().describe("Métricas o resultados clave obtenidos"),
    logoUrl: z.string().optional().describe("Ruta al logo de la empresa para uso en el componente Banner"),
    featuredImage: z.string().optional().describe("Ruta a la imagen principal del caso de estudio"),
    order: z.number().default(0).describe("Orden de aparición en los carruseles")
  })
});

export const collections = {
  'empresas': empresasCollection,
};