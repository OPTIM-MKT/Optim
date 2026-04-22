import * as React from "react";
import type { ContactFormData } from "./contact.schema";

//  Props

interface EmailTemplateProps extends ContactFormData {
  serviceLabel: string;
  budgetLabel: string;
  branchLabel?: string;
}

//  Design tokens

const BRAND = {
  primary: "#4f46e5",
  shade: "#4338ca",
  blue: "#4f46e5",
  mateBlack: "#111315",
  mateWhite: "#f5f6f7",
  surface: "#ffffff",
  surface2: "#f5f6f7",
  border: "#e6e8ec",
  muted: "#5b6470",
} as const;

//  Shared inline styles

const s = {
  wrapper: {
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    backgroundColor: BRAND.surface2,
    padding: "40px 20px",
    margin: 0,
  } as React.CSSProperties,

  card: {
    maxWidth: 600,
    margin: "0 auto",
    backgroundColor: BRAND.surface,
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 4px 24px rgba(17,19,21,0.08)",
    border: `1px solid ${BRAND.border}`,
  } as React.CSSProperties,

  header: {
    background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.shade} 100%)`,
    padding: "36px 40px",
  } as React.CSSProperties,

  headerTitle: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: 700,
    margin: 0,
    letterSpacing: "-0.02em",
  } as React.CSSProperties,

  headerSubtitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    margin: "6px 0 0",
    fontWeight: 400,
  } as React.CSSProperties,

  logoBadge: {
    display: "inline-block",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 8,
    padding: "4px 12px",
    color: "#ffffff",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    marginBottom: 16,
  } as React.CSSProperties,

  body: {
    padding: "32px 40px",
  } as React.CSSProperties,

  greeting: {
    fontSize: 16,
    color: BRAND.mateBlack,
    marginBottom: 24,
    lineHeight: 1.6,
  } as React.CSSProperties,

  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: BRAND.primary,
    margin: "0 0 12px",
  } as React.CSSProperties,

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    marginBottom: 24,
  } as React.CSSProperties,

  fieldBox: {
    backgroundColor: BRAND.surface2,
    borderRadius: 10,
    padding: "12px 16px",
    border: `1px solid ${BRAND.border}`,
  } as React.CSSProperties,

  fieldBoxFull: {
    backgroundColor: BRAND.surface2,
    borderRadius: 10,
    padding: "12px 16px",
    border: `1px solid ${BRAND.border}`,
    marginBottom: 12,
  } as React.CSSProperties,

  fieldLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: BRAND.muted,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    display: "block",
    marginBottom: 2,
  } as React.CSSProperties,

  fieldValue: {
    fontSize: 14,
    color: BRAND.mateBlack,
    fontWeight: 500,
    margin: 0,
  } as React.CSSProperties,

  badge: {
    display: "inline-block",
    backgroundColor: `${BRAND.primary}18`,
    color: BRAND.shade,
    borderRadius: 20,
    padding: "3px 10px",
    fontSize: 12,
    fontWeight: 600,
  } as React.CSSProperties,

  divider: {
    border: "none",
    borderTop: `1px solid ${BRAND.border}`,
    margin: "24px 0",
  } as React.CSSProperties,

  messageBox: {
    backgroundColor: `${BRAND.blue}08`,
    border: `1px solid ${BRAND.blue}22`,
    borderRadius: 10,
    padding: "16px",
    marginBottom: 24,
  } as React.CSSProperties,

  messageText: {
    fontSize: 14,
    color: BRAND.mateBlack,
    lineHeight: 1.7,
    margin: 0,
    fontStyle: "italic",
  } as React.CSSProperties,

  cta: {
    display: "block",
    backgroundColor: BRAND.primary,
    color: "#ffffff",
    textDecoration: "none",
    borderRadius: 999,
    padding: "14px 28px",
    fontWeight: 700,
    fontSize: 14,
    textAlign: "center" as const,
    marginBottom: 24,
  } as React.CSSProperties,

  footer: {
    borderTop: `1px solid ${BRAND.border}`,
    padding: "20px 40px",
    backgroundColor: BRAND.surface2,
    textAlign: "center" as const,
  } as React.CSSProperties,

  footerText: {
    fontSize: 12,
    color: BRAND.muted,
    margin: 0,
    lineHeight: 1.6,
  } as React.CSSProperties,
};

// ─── Field component ──────────────────────────────────────────────────────────

function Field({
  label,
  value,
  isBadge,
}: {
  label: string;
  value: string;
  isBadge?: boolean;
}) {
  return (
    <div style={s.fieldBox}>
      <span style={s.fieldLabel}>{label}</span>
      {isBadge ? (
        <span style={s.badge}>{value}</span>
      ) : (
        <p style={s.fieldValue}>{value}</p>
      )}
    </div>
  );
}

//  Email Template

export function EmailTemplate({
  name,
  email,
  company,
  phone,
  serviceLabel,
  budgetLabel,
  branchLabel,
  message,
}: EmailTemplateProps) {
  const replySubject = encodeURIComponent(`Re: Tu contacto con Optim`);
  const replyBody = encodeURIComponent(
    `Hola ${name},\n\nGracias por contactarnos...`,
  );
  const gmailLink = `https://mail.google.com/mail/?view=cm&to=${email}&su=${replySubject}&body=${replyBody}`;

  return (
    <div style={s.wrapper}>
      <div style={s.card}>
        {/* ── Header ── */}
        <div style={s.header}>
          <div style={s.logoBadge}>Optim</div>
          <h1 style={s.headerTitle}>Nuevo mensaje de contacto</h1>
          <p style={s.headerSubtitle}>
            {name} ha enviado una solicitud a través del formulario de contacto.
          </p>
        </div>

        {/* ── Body ── */}
        <div style={s.body}>
          {/* Greeting */}
          <p style={s.greeting}>
            Hola equipo 👋, han recibido un nuevo mensaje de{" "}
            <strong>{name}</strong>. A continuación los detalles de su
            solicitud:
          </p>

          {/* Contact info section */}
          <p style={s.sectionTitle}>Información de contacto</p>
          <div style={{ ...s.grid, marginBottom: 12 }}>
            <Field label="Nombre completo" value={name} />
            <Field label="Teléfono" value={phone || "No especificado"} />
          </div>
          <div style={s.fieldBoxFull}>
            <span style={s.fieldLabel}>Correo electrónico</span>
            <p style={s.fieldValue}>{email}</p>
          </div>
          {company && (
            <div style={{ ...s.fieldBoxFull, marginBottom: 24 }}>
              <span style={s.fieldLabel}>Empresa</span>
              <p style={s.fieldValue}>{company}</p>
            </div>
          )}

          <hr style={s.divider} />

          {/* Project Details section */}
          <p style={s.sectionTitle}>Detalles del proyecto</p>
          <div style={{ ...s.grid, marginBottom: branchLabel ? 12 : 24 }}>
            <Field label="Servicio de interés" value={serviceLabel} isBadge />
            <Field label="Presupuesto" value={budgetLabel} isBadge />
          </div>
          
          {branchLabel && (
            <div style={{ ...s.fieldBoxFull, marginBottom: 24 }}>
              <span style={s.fieldLabel}>Rama de interés</span>
              <span style={s.badge}>{branchLabel}</span>
            </div>
          )}

          {/* Optional message */}
          {message && (
            <div style={s.messageBox}>
              <span
                style={{ ...s.fieldLabel, color: BRAND.blue, marginBottom: 8 }}
              >
                Contexto del proyecto
              </span>
              <p style={s.messageText}>"{message}"</p>
            </div>
          )}

          {/* CTA reply button */}
          <a href={gmailLink} style={s.cta}>
            Responder a {name} →
          </a>
        </div>

        {/* ── Footer ── */}
        <div style={s.footer}>
          <p style={s.footerText}>
            Este correo fue generado automáticamente por el formulario de
            contacto de <strong>optimmkt.com</strong>. Por favor no respondas
            directamente a este mensaje.
          </p>
          <p style={{ ...s.footerText, marginTop: 8 }}>
            © {new Date().getFullYear()} Optim MKT · Todos los derechos reservados
          </p>
        </div>
      </div>
    </div>
  );
}
