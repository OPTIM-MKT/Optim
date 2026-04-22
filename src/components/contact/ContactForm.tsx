import { actions } from "astro:actions";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";
import {
  FiUser,
  FiPhone,
  FiMail,
  FiMessageCircle,
  FiBriefcase,
  FiStar,
  FiDollarSign,
  FiGrid,
  FiSend,
  FiLoader,
} from "react-icons/fi";
import {
  contactSchema,
  type ContactFormData,
  SERVICE_OPTIONS,
  BUDGET_OPTIONS,
  BRANCH_OPTIONS,
} from "./contact.schema";
import type {
  FieldWrapperProps,
  InputFieldProps,
  SelectFieldProps,
  TextareaFieldProps,
} from "./formTypes";

function FieldWrapper({
  label,
  fieldId,
  required,
  error,
  icon: Icon,
  children,
}: FieldWrapperProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={fieldId}
        className="text-xs font-semibold tracking-widest uppercase text-[var(--muted)] flex items-center gap-1.5"
      >
        {Icon && <Icon size={12} className="text-primary shrink-0" />}
        {label}
        {required && <span className="text-primary ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-red-500 dark:text-red-400 text-xs font-medium mt-0.5 flex items-center gap-1">
          <span className="inline-block w-1 h-1 rounded-full bg-red-500 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

const inputBase =
  "w-full rounded-xl px-4 py-3 text-sm font-medium " +
  "bg-[var(--bg-2)] border border-[var(--border)] text-[var(--fg)] " +
  "placeholder:text-[var(--muted)] " +
  "transition-all duration-200 " +
  "outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 " +
  "disabled:opacity-50 disabled:pointer-events-none";

const inputError = "border-red-400 focus:border-red-400 focus:ring-red-400/20";

function InputField({
  label,
  fieldId,
  required,
  icon,
  error,
  className,
  ...rest
}: InputFieldProps) {
  return (
    <FieldWrapper
      label={label}
      fieldId={fieldId}
      required={required}
      icon={icon}
      error={error}
    >
      <input
        id={fieldId}
        className={`${inputBase} ${error ? inputError : ""} ${className ?? ""}`}
        {...rest}
      />
    </FieldWrapper>
  );
}

function SelectField({
  label,
  fieldId,
  required,
  icon,
  error,
  placeholder,
  options,
  className,
  ...rest
}: SelectFieldProps) {
  return (
    <FieldWrapper
      label={label}
      fieldId={fieldId}
      required={required}
      icon={icon}
      error={error}
    >
      <select
        id={fieldId}
        className={`${inputBase} cursor-pointer appearance-none ${error ? inputError : ""} ${className ?? ""}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='%235b6470'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' /%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 12px center",
          backgroundSize: "16px",
          paddingRight: "40px",
        }}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}

function TextareaField({
  label,
  fieldId,
  required,
  icon,
  error,
  className,
  ...rest
}: TextareaFieldProps) {
  return (
    <FieldWrapper
      label={label}
      fieldId={fieldId}
      required={required}
      icon={icon}
      error={error}
    >
      <textarea
        id={fieldId}
        rows={3}
        className={`${inputBase} resize-none ${error ? inputError : ""} ${className ?? ""}`}
        {...rest}
      />
    </FieldWrapper>
  );
}

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    try {
      const { data: responseData, error } = await actions.send(data);

      if (error) {
        throw new Error(error.message || "Error al enviar el formulario.");
      }

      toast.success("¡Mensaje enviado con éxito! 🎉", {
        description: "Nos pondremos en contacto contigo pronto.",
        duration: 6000,
      });
      reset();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Error al enviar el formulario.";
      toast.error("No se pudo enviar el mensaje", {
        description: message,
        duration: 6000,
      });
    }
  };

  return (
    <>
      <Toaster
        position="bottom-center"
        theme="system"
        richColors
        closeButton
        toastOptions={{
          style: {
            fontFamily: "inherit",
            borderRadius: "12px",
          },
        }}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-label="Formulario de contacto"
        className="w-full flex flex-col space-y-5 glass-panel rounded-4xl border border-line p-8 md:p-10"
      >
        <div className="text-center pb-2">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--fg)]">
            CUÉNTANOS DEL PROYECTO
          </h2>
          <p className="text-sm text-[var(--muted)] mt-1">
            Contáctanos y hablemos de lo que necesitas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 mt-8 gap-4">
          <InputField
            label="Nombre"
            fieldId="cf-name"
            required
            icon={FiUser}
            placeholder="Marcelo Figueroa"
            autoComplete="name"
            error={errors.name?.message}
            {...register("name")}
          />
          <InputField
            label="Correo electrónico"
            fieldId="cf-email"
            required
            icon={FiMail}
            type="email"
            placeholder="hola@ejemplo.com"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Empresa (Opcional)"
            fieldId="cf-company"
            icon={FiBriefcase}
            placeholder="Nombre de tu empresa"
            error={errors.company?.message}
            {...register("company")}
          />
          <InputField
            label="Teléfono (Opcional)"
            fieldId="cf-phone"
            icon={FiPhone}
            type="tel"
            placeholder="123 456 7890"
            autoComplete="tel"
            error={errors.phone?.message}
            {...register("phone")}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="Servicio de interés"
            fieldId="cf-service"
            required
            icon={FiStar}
            placeholder="Selecciona un servicio..."
            options={SERVICE_OPTIONS}
            error={errors.service?.message}
            defaultValue=""
            {...register("service")}
          />
          <SelectField
            label="Presupuesto estimado"
            fieldId="cf-budget"
            required
            icon={FiDollarSign}
            placeholder="Selecciona tu presupuesto..."
            options={BUDGET_OPTIONS}
            error={errors.budget?.message}
            defaultValue=""
            {...register("budget")}
          />
        </div>

        <div className="grid grid-cols-1 gap-4">
          <SelectField
            label="Rama de interés (Opcional)"
            fieldId="cf-branch"
            icon={FiGrid}
            placeholder="Selecciona una rama..."
            options={BRANCH_OPTIONS}
            error={errors.branch?.message}
            defaultValue=""
            {...register("branch")}
          />
        </div>

        <TextareaField
          label="Contexto del proyecto (Opcional)"
          fieldId="cf-message"
          icon={FiMessageCircle}
          placeholder="Cuéntanos más sobre tu proyecto..."
          error={errors.message?.message}
          {...register("message")}
        />

        <div className="mt-auto pt-2 space-y-5">
          <button
            type="submit"
            disabled={isSubmitting}
            className={
              "w-full cursor-pointer inline-flex items-center justify-center gap-2 " +
              "rounded-full h-13 px-7 text-sm font-semibold text-white " +
              "bg-[#4f46e5] hover:bg-[#4338ca] " +
              "shadow-[0_10px_30px_-10px_rgba(79,70,229,0.55)] " +
              "transition-all duration-200 active:scale-[0.98] " +
              "disabled:opacity-60 disabled:pointer-events-none " +
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f46e5]/50"
            }
          >
            {isSubmitting ? (
              <>
                <FiLoader size={16} className="animate-spin shrink-0" />
                Enviando...
              </>
            ) : (
              <>
                <FiSend size={16} className="shrink-0" />
                ENVIAR SOLICITUD
              </>
            )}
          </button>

          <p className="text-center text-xs text-[var(--muted)] leading-relaxed">
            Al enviar este formulario aceptas que nos pongamos en contacto
            contigo para responder tu solicitud.
          </p>
        </div>
      </form>
    </>
  );
}
