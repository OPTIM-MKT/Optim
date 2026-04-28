import { z } from "zod";

export const SERVICE_OPTIONS = [
  { value: "estrategia", label: "Estrategia / Strategy" },
  { value: "contenido", label: "Contenido / Content" },
  { value: "ads", label: "Ads" },
  { value: "branding", label: "Branding" },
  { value: "web", label: "Web / Landing" },
  { value: "crm", label: "CRM" },
] as const;

export const BUDGET_OPTIONS = [
  { value: "under_9k", label: "Menos de $9,000 MXN" },
  { value: "10k_15k", label: "$10,000 - $15,000 MXN" },
  { value: "15k_20k", label: "$15,000 - $20,000 MXN" },
  { value: "20k_30k", label: "$20,000 - $30,000 MXN" },
  { value: "30k_40k", label: "$30,000 - $40,000 MXN" },
  { value: "40k_plus", label: "$40,000+" },
] as const;

export const BRANCH_OPTIONS = [
  { value: "optim_mkt_digital", label: "Optim MKT Digital" },
  { value: "optim_mkt_inmobiliario", label: "Optim MKT Inmobiliario" },
  { value: "optim_creator_studios", label: "Optim Creator Studios" },
  { value: "optim_productions", label: "Optim Productions" },
] as const;

export const contactSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  email: z.string().min(1, "El correo es obligatorio").email("Correo electrónico inválido"),
  company: z.string().optional(),
  phone: z.string().optional(),
  service: z.enum(
    SERVICE_OPTIONS.map((s) => s.value) as [string, ...string[]],
    { message: "Selecciona un servicio de interés" }
  ),
  budget: z.enum(
    BUDGET_OPTIONS.map((b) => b.value) as [string, ...string[]],
    { message: "Selecciona tu presupuesto estimado" }
  ),
  branch: z.enum(
    BRANCH_OPTIONS.map((b) => b.value) as [string, ...string[]]
  ).optional().or(z.literal("")),
  message: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export function getLabelByValue<
  T extends readonly { value: string; label: string }[],
>(options: T, value?: string): string {
  if (!value) return "";
  return options.find((o) => o.value === value)?.label ?? value;
}
