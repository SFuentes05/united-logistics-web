import { readFileSync, existsSync } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { Resend } from "resend";

type Body = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
};

/** SPA fetch sends this header; native <form> POST does not → we redirect after success. */
const SPA_HEADER = "x-contact-form";

function normalizeBody(raw: Record<string, unknown>): Body {
  return {
    name: typeof raw.name === "string" ? raw.name : String(raw.name ?? ""),
    company:
      typeof raw.company === "string" ? raw.company : String(raw.company ?? ""),
    email: typeof raw.email === "string" ? raw.email : String(raw.email ?? ""),
    phone: typeof raw.phone === "string" ? raw.phone : String(raw.phone ?? ""),
    message:
      typeof raw.message === "string"
        ? raw.message
        : String(raw.message ?? ""),
  };
}

async function parseContactBody(req: Request): Promise<Body | null> {
  const ct = (req.headers.get("content-type") || "").toLowerCase();
  try {
    if (ct.includes("application/json")) {
      const j = (await req.json()) as Record<string, unknown>;
      return normalizeBody(j);
    }
    if (ct.includes("application/x-www-form-urlencoded")) {
      const text = await req.text();
      const sp = new URLSearchParams(text);
      return normalizeBody({
        name: sp.get("name") ?? "",
        company: sp.get("company") ?? "",
        email: sp.get("email") ?? "",
        phone: sp.get("phone") ?? "",
        message: sp.get("message") ?? "",
      });
    }
  } catch {
    return null;
  }
  return null;
}

const NOTIFICATION_TO = [
  "opena@grupohaina.com",
  "samuelfuentes005@gmail.com",
] as const;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatMultiline(s: string): string {
  return escapeHtml(s).replace(/\r\n/g, "\n").replace(/\n/g, "<br />");
}

function buildHtml(body: Body, includeLogo: boolean): string {
  const rows: { label: string; value: string }[] = [];
  if (body.name?.trim()) rows.push({ label: "Nombre", value: body.name.trim() });
  if (body.company?.trim())
    rows.push({ label: "Empresa", value: body.company.trim() });
  rows.push({ label: "Correo", value: body.email.trim() });
  if (body.phone?.trim()) rows.push({ label: "Teléfono", value: body.phone.trim() });
  if (body.message?.trim())
    rows.push({ label: "Mensaje", value: body.message.trim() });

  const rowHtml = rows
    .map(
      (r) => `
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid #e2e8f0;font-size:14px;color:#64748b;width:132px;vertical-align:top;font-weight:500;">${escapeHtml(r.label)}</td>
          <td style="padding:14px 0;border-bottom:1px solid #e2e8f0;font-size:15px;color:#0f172a;line-height:1.55;vertical-align:top;">${
            r.label === "Mensaje" ? formatMultiline(r.value) : escapeHtml(r.value)
          }</td>
        </tr>`
    )
    .join("");

  const logoBlock = includeLogo
    ? `<img src="cid:ul-logo" width="220" height="auto" alt="United Logistics" style="display:block;margin:0 auto;max-width:100%;height:auto;" />`
    : `<div style="font-size:18px;font-weight:600;color:#0f172a;letter-spacing:-0.02em;">United Logistics</div>`;

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#f1f5f9;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f1f5f9;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:520px;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 4px 24px rgba(15,23,42,0.06);">
          <tr>
            <td style="padding:32px 36px 20px;text-align:center;background:linear-gradient(180deg,#ffffff 0%,#f8fafc 100%);border-bottom:1px solid #e2e8f0;">
              ${logoBlock}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 36px 8px;text-align:center;">
              <p style="margin:0;font-size:15px;color:#334155;font-weight:600;">Nueva solicitud de contacto</p>
              <p style="margin:8px 0 0;font-size:13px;color:#64748b;line-height:1.5;">Recibida desde el formulario del sitio web.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 36px 36px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">${rowHtml}</table>
            </td>
          </tr>
        </table>
        <p style="margin:28px 0 0;font-size:12px;color:#94a3b8;text-align:center;max-width:480px;line-height:1.5;">
          Mensaje generado automáticamente. Puede responder directamente a este correo para escribir al remitente.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildText(body: Body): string {
  const lines = [
    "United Logistics — Nueva solicitud de contacto",
    "",
    ...(body.name?.trim() ? [`Nombre: ${body.name.trim()}`] : []),
    ...(body.company?.trim() ? [`Empresa: ${body.company.trim()}`] : []),
    `Correo: ${body.email.trim()}`,
    ...(body.phone?.trim() ? [`Teléfono: ${body.phone.trim()}`] : []),
    ...(body.message?.trim() ? [`Mensaje:\n${body.message.trim()}`] : []),
    "",
    "— Sitio web United Logistics",
  ];
  return lines.join("\n");
}

function loadLogoAttachment():
  | { filename: string; content: Buffer; contentId: string }
  | undefined {
  const logoPath = path.join(process.cwd(), "public", "up_horizontal_logo.png");
  if (!existsSync(logoPath)) {
    console.warn("[contact] Logo no encontrado en", logoPath);
    return undefined;
  }
  return {
    filename: "up_horizontal_logo.png",
    content: readFileSync(logoPath),
    contentId: "ul-logo",
  };
}

/**
 * Envía el formulario de contacto por correo (Resend).
 * Variables: RESEND_API_KEY, RESEND_FROM (dominio verificado, p. ej. "United Logistics <hola@tudominio.com>").
 */
export async function POST(req: Request) {
  const body = await parseContactBody(req);
  if (!body) {
    return NextResponse.json(
      { error: "Cuerpo inválido o tipo de contenido no admitido" },
      { status: 400 }
    );
  }

  const { name, company, email, phone, message } = body;
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json(
      { error: "Correo corporativo requerido" },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM?.trim();

  if (!apiKey || !from) {
    console.error(
      "[contact] Falta RESEND_API_KEY o RESEND_FROM en el entorno del servidor."
    );
    return NextResponse.json(
      {
        error:
          "El envío no está configurado. Añada RESEND_API_KEY y RESEND_FROM al servidor.",
      },
      { status: 503 }
    );
  }

  const form: Body = {
    name: typeof name === "string" ? name : "",
    company: typeof company === "string" ? company : "",
    email,
    phone: typeof phone === "string" ? phone : "",
    message: typeof message === "string" ? message : "",
  };

  const logo = loadLogoAttachment();
  const html = buildHtml(form, Boolean(logo));

  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send(
    {
      from,
      to: [...NOTIFICATION_TO],
      replyTo: email.trim(),
      subject: "Nueva solicitud de contacto — United Logistics",
      html,
      text: buildText(form),
      attachments: logo ? [logo] : undefined,
      tags: [{ name: "source", value: "contact-form" }],
    },
    { idempotencyKey: `contact/${randomUUID()}` }
  );

  if (error) {
    console.error("[contact] Resend", error);
    return NextResponse.json(
      { error: "No se pudo enviar el correo. Intente de nuevo más tarde." },
      { status: 502 }
    );
  }

  console.log("[contact] Resend ok", data?.id);

  const fromSpa =
    req.headers.get(SPA_HEADER) === "1" || req.headers.get(SPA_HEADER) === "true";
  if (!fromSpa) {
    return NextResponse.redirect(new URL("/?enviado=1#contacto", req.url), 303);
  }

  return NextResponse.json({ ok: true });
}
