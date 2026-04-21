import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FiSend } from "react-icons/fi";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import type { SiteDictionary } from "@/lib/site";

const serviceOptions = [
  "Estrategia / Strategy",
  "Contenido / Content",
  "Ads",
  "Branding",
  "Web / Landing",
  "CRM",
];

const budgets = [
  "Menos de $9,000 MXN",
  "$10,000 - $15,000 MXN",
  "$15,000 - $20,000 MXN",
  "$20,000 - $30,000 MXN",
  "$30,000 - $40,000 MXN",
  "$40,000+",
];

const interestedBranches = [
  "Optim MKT Digital",
  "Optim MKT Inmobiliario",
  "Optim Creator Studios",
  "Optim Productions",
];

const formSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z
    .string()
    .min(1, "El correo es obligatorio")
    .email("Correo electrónico inválido"),
  company: z.string().optional(),
  phone: z.string().optional(),
  service: z.string().min(1, "El servicio de interés es obligatorio"),
  budget: z.string().min(1, "El presupuesto estimado es obligatorio"),
  branch: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm({
  dictionary,
}: {
  dictionary: SiteDictionary;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Simular envío a API
      console.log("Form data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Mensaje enviado con éxito");
      reset();
    } catch (error) {
      toast.error("Ocurrió un error al enviar el mensaje");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <article className="glass-panel rounded-[2rem] border border-line p-8 md:p-10">
      <p className="editorial-label">
        {dictionary?.contactPage?.form?.title || "Contacto"}
      </p>
      <p className="mt-4 max-w-xl text-base leading-7">
        {dictionary?.contactPage?.form?.description ||
          "Déjanos tus datos y nos pondremos en contacto contigo."}
      </p>

      <form
        className="mt-8 grid gap-4 md:grid-cols-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="grid gap-2">
          <span className="text-sm font-medium text-ink">
            {dictionary?.contactPage?.form?.name || "Nombre"}{" "}
            <span className="text-red-500">*</span>
          </span>
          <input
            {...register("name")}
            className="rounded-2xl border border-line bg-canvas px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-strategic"
            type="text"
            placeholder="Juan Pérez"
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-ink">
            {dictionary?.contactPage?.form?.email || "Correo electrónico"}{" "}
            <span className="text-red-500">*</span>
          </span>
          <input
            {...register("email")}
            className="rounded-2xl border border-line bg-canvas px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-strategic"
            type="email"
            placeholder="hola@ejemplo.com"
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-ink">
            {dictionary?.contactPage?.form?.company || "Empresa"}{" "}
            <span className="text-xs text-muted font-normal">(Opcional)</span>
          </span>
          <input
            {...register("company")}
            className="rounded-2xl border border-line bg-canvas px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-strategic"
            type="text"
            placeholder="Empresa"
          />
          {errors.company && (
            <p className="text-xs text-red-500">{errors.company.message}</p>
          )}
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-ink">
            {dictionary?.contactPage?.form?.phone || "Teléfono"}{" "}
            <span className="text-xs text-muted font-normal">(Opcional)</span>
          </span>
          <input
            {...register("phone")}
            className="rounded-2xl border border-line bg-canvas px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-strategic"
            type="tel"
            placeholder="123 456 7890"
          />
          {errors.phone && (
            <p className="text-xs text-red-500">{errors.phone.message}</p>
          )}
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-ink">
            {dictionary?.contactPage?.form?.service || "Servicio de interés"}{" "}
            <span className="text-red-500">*</span>
          </span>
          <select
            {...register("service")}
            className="rounded-2xl border border-line bg-canvas px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-strategic"
          >
            <option value="">Selecciona un servicio</option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className="text-xs text-red-500">{errors.service.message}</p>
          )}
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-ink">
            {dictionary?.contactPage?.form?.budget || "Presupuesto estimado"}{" "}
            <span className="text-red-500">*</span>
          </span>
          <select
            {...register("budget")}
            className="rounded-2xl border border-line bg-canvas px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-strategic"
          >
            <option value="">Selecciona tu presupuesto</option>
            {budgets.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.budget && (
            <p className="text-xs text-red-500">{errors.budget.message}</p>
          )}
        </label>

        <label className="grid gap-2 md:col-span-2">
          <span className="text-sm font-medium text-ink">
            Rama de interés{" "}
            <span className="text-xs text-muted font-normal">(Opcional)</span>
          </span>
          <select
            {...register("branch")}
            className="rounded-2xl border border-line bg-canvas px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-strategic"
          >
            <option value="">Selecciona una rama</option>
            {interestedBranches.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.branch && (
            <p className="text-xs text-red-500">{errors.branch.message}</p>
          )}
        </label>

        <label className="grid gap-2 md:col-span-2">
          <span className="text-sm font-medium text-ink">
            {dictionary?.contactPage?.form?.message || "Contexto del proyecto"}{" "}
            <span className="text-xs text-muted font-normal">(Opcional)</span>
          </span>
          <textarea
            {...register("message")}
            className="min-h-36 rounded-[1.5rem] border border-line bg-canvas px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-strategic"
            placeholder="Cuéntanos más sobre tu proyecto..."
          />
          {errors.message && (
            <p className="text-xs text-red-500">{errors.message.message}</p>
          )}
        </label>

        <div className="md:col-span-2 mt-2">
          <Button
            variant="primary"
            type="submit"
            className="px-7 py-3 hover:text-black hover:bg-white/80 dark:hover:text-white dark:hover:bg-black/80 cursor-pointer goup hover:scale-105 transition-all duration-500"
            disabled={isSubmitting}
          >
            <span className="shrink-0 text-lg">
              <FiSend className={isSubmitting ? "animate-pulse" : ""} />
            </span>
            {isSubmitting
              ? "Enviando..."
              : dictionary?.contactPage?.form?.submit || "Enviar"}
          </Button>
        </div>
      </form>
    </article>
  );
}
