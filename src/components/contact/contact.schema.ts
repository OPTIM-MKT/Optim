import { z } from "zod";

//  Option constants 

export const INTEREST_REASONS = [
  { value: "general", label: "Interés general" },
  { value: "specific_info", label: "Interés en información específica" },
  { value: "quote", label: "Cotización" },
  { value: "collaboration", label: "Colaboración" },
] as const;

export const ROLES = [
  { value: "resident", label: "Residente" },
  { value: "administrator", label: "Administrador" },
  { value: "president", label: "Presidente" },
  { value: "board_member", label: "Parte de la mesa directiva" },
  { value: "external_advisor", label: "Asesor externo" },
] as const;

export const CONTACT_METHODS = [
  { value: "email", label: "Correo electrónico" },
  { value: "phone", label: "Teléfono" },
  { value: "whatsapp", label: "WhatsApp" },
] as const;

export const COMMUNITY_SIZES = [
  { value: "0-10", label: "0–10 espacios" },
  { value: "10-30", label: "10–30 espacios" },
  { value: "30-80", label: "30–80 espacios" },
  { value: "80-100", label: "80–100 espacios" },
  { value: "100+", label: "100+ espacios" },
  { value: "200+", label: "200+ espacios" },
] as const;

//  Derived union types 

type InterestReasonValue = (typeof INTEREST_REASONS)[number]["value"];
type RoleValue = (typeof ROLES)[number]["value"];
type ContactMethodValue = (typeof CONTACT_METHODS)[number]["value"];
type CommunitySizeValue = (typeof COMMUNITY_SIZES)[number]["value"];

//   Zod schema 

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),

  phone: z
    .string()
    .min(7, "El teléfono debe tener al menos 7 dígitos")
    .max(20, "El teléfono no puede exceder 20 caracteres")
    .regex(/^[\d\s\+\-\(\)]+$/, "Formato de teléfono inválido"),

  email: z.email("Correo electrónico inválido"),

  interestReason: z.enum(
    INTEREST_REASONS.map((r) => r.value) as [
      InterestReasonValue,
      ...InterestReasonValue[],
    ],
    { error: "Selecciona una razón de interés" },
  ),

  community: z
    .string()
    .min(2, "El nombre de colonia/residencia debe tener al menos 2 caracteres")
    .max(150, "El nombre no puede exceder 150 caracteres"),

  role: z.enum(
    ROLES.map((r) => r.value) as [RoleValue, ...RoleValue[]],
    { error: "Selecciona tu rol" },
  ),

  communitySize: z.enum(
    COMMUNITY_SIZES.map((s) => s.value) as [
      CommunitySizeValue,
      ...CommunitySizeValue[],
    ],
    { error: "Selecciona el tamaño de tu colonia" },
  ),

  preferredContact: z
    .enum(
      CONTACT_METHODS.map((m) => m.value) as [
        ContactMethodValue,
        ...ContactMethodValue[],
      ],
    )
    .optional(),

  message: z.string().max(500, "El mensaje no puede exceder 500 caracteres").optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

//  Label helpers  

export function getLabelByValue<
  T extends { value: string; label: string }[],
>(options: T, value: string): string {
  return options.find((o) => o.value === value)?.label ?? value;
}
