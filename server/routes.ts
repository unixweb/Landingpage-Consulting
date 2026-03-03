import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

const contactSchema = z.object({
  vorname: z.string().min(1),
  nachname: z.string().min(1),
  unternehmen: z.string().min(1),
  email: z.string().email(),
  telefon: z.string().optional().default(""),
  beschreibung: z.string().optional().default(""),
  datenschutz: z.boolean().refine((v) => v === true),
  website: z.string().optional().default(""),
});

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 3;

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore) {
    if (now > value.resetAt) {
      rateLimitStore.delete(key);
    }
  }
}, 60 * 1000);

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) {
    return true;
  }

  return false;
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post("/api/contact", async (req, res) => {
    const clientIp = req.ip || req.socket.remoteAddress || "unknown";

    if (isRateLimited(clientIp)) {
      return res.status(429).json({
        message: "Zu viele Anfragen. Bitte warte 15 Minuten und versuche es erneut.",
      });
    }

    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Bitte fülle alle Pflichtfelder korrekt aus." });
    }

    const data = parsed.data;

    if (data.website && data.website.length > 0) {
      return res.json({ message: "Anfrage erfolgreich gesendet." });
    }

    const brevoApiKey = process.env.BREVO_API_KEY;
    if (!brevoApiKey) {
      console.error("BREVO_API_KEY is not set");
      return res.status(500).json({ message: "E-Mail-Versand ist derzeit nicht verfügbar." });
    }

    const htmlContent = `
      <h2>Neue Potentialanalyse-Anfrage</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;font-family:Arial,sans-serif;">
        <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5;">Vorname</td><td style="padding:8px 12px;border:1px solid #ddd;">${escapeHtml(data.vorname)}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5;">Nachname</td><td style="padding:8px 12px;border:1px solid #ddd;">${escapeHtml(data.nachname)}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5;">Unternehmen</td><td style="padding:8px 12px;border:1px solid #ddd;">${escapeHtml(data.unternehmen)}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5;">E-Mail</td><td style="padding:8px 12px;border:1px solid #ddd;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5;">Telefon</td><td style="padding:8px 12px;border:1px solid #ddd;">${escapeHtml(data.telefon || "–")}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5;">Herausforderung</td><td style="padding:8px 12px;border:1px solid #ddd;">${escapeHtml(data.beschreibung || "–")}</td></tr>
      </table>
      <p style="margin-top:16px;color:#666;font-size:13px;">Datenschutz-Einwilligung wurde erteilt.</p>
    `;

    try {
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "content-type": "application/json",
          "api-key": brevoApiKey,
        },
        body: JSON.stringify({
          sender: {
            name: process.env.CONTACT_SENDER_NAME || "Potentialanalyse",
            email: process.env.CONTACT_SENDER_EMAIL || "noreply@example.com",
          },
          to: [{
            email: process.env.CONTACT_RECIPIENT_EMAIL || "noreply@example.com",
            name: process.env.CONTACT_RECIPIENT_NAME || "Empfaenger",
          }],
          replyTo: { email: data.email, name: `${data.vorname} ${data.nachname}` },
          subject: `Neue Potentialanalyse-Anfrage von ${data.vorname} ${data.nachname}`,
          htmlContent,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("Brevo API error:", response.status, errorBody);
        return res.status(502).json({ message: "E-Mail konnte nicht gesendet werden. Bitte versuche es später erneut." });
      }

      return res.json({ message: "Anfrage erfolgreich gesendet." });
    } catch (error) {
      console.error("Brevo fetch error:", error);
      return res.status(500).json({ message: "Ein Fehler ist aufgetreten. Bitte versuche es später erneut." });
    }
  });

  return httpServer;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
