import { Resend } from "resend";

const FALLBACK_FROM = "Ségolène Falandry <onboarding@resend.dev>";

export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<{ ok: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Missing RESEND_API_KEY env var — email not sent.");
    return { ok: false };
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM_ADDRESS || FALLBACK_FROM,
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
    });
    return { ok: true };
  } catch (err) {
    console.error("Failed to send email:", err);
    return { ok: false };
  }
}
