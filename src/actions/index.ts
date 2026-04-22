import { ActionError, defineAction } from 'astro:actions';
import { Resend } from 'resend';
import { contactSchema, getLabelByValue, INTEREST_REASONS, ROLES, CONTACT_METHODS, COMMUNITY_SIZES } from "@/components/contact/contact.schema";
import { EmailTemplate } from "@/components/contact/email-template";
import { renderToString } from 'react-dom/server';
import React from 'react';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
  send: defineAction({
    accept: 'json',
    input: contactSchema,
    handler: async (data) => {
      // ── 1. Build human-readable labels ───────────────────────────────────────
      const interestLabel = getLabelByValue(INTEREST_REASONS as unknown as { value: string; label: string }[], data.interestReason);
      const roleLabel = getLabelByValue(ROLES as unknown as { value: string; label: string }[], data.role);
      const sizeLabel = getLabelByValue(COMMUNITY_SIZES as unknown as { value: string; label: string }[], data.communitySize);
      const contactLabel = data.preferredContact
        ? getLabelByValue(CONTACT_METHODS as unknown as { value: string; label: string }[], data.preferredContact)
        : undefined;

      // ── 2. Render React component to HTML string ─────────────────────────────
      // We render it to HTML manually to avoid Resend requiring @react-email/render
      const htmlOutput = renderToString(
        React.createElement(EmailTemplate, {
          ...data,
          interestReasonLabel: interestLabel,
          roleLabel,
          communitySizeLabel: sizeLabel,
          preferredContactLabel: contactLabel,
        })
      );

      // ── 3. Send email via Resend ─────────────────────────────────────────────
      const { data: resendData, error } = await resend.emails.send({
        from: "Contacto Optim MKT <contacto@optimmkt.com>",
        to: ["contactonegocios@optimmkt.com"],
        replyTo: data.email,
        subject: `Nuevo contacto: ${data.name} — ${interestLabel}`,
        html: htmlOutput, // Usamos la propiedad html enviando el string en vez de react
      });

      if (error) {
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error.message,
        });
      }

      return { success: true, id: resendData?.id };
    },
  }),
};