import { NextResponse } from "next/server";

type Body = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
};

function parseName(full: string): { firstName: string; lastName: string } {
  const t = full.trim();
  if (!t) return { firstName: "—", lastName: "—" };
  const i = t.indexOf(" ");
  if (i === -1) return { firstName: t, lastName: "—" };
  return {
    firstName: t.slice(0, i).trim(),
    lastName: t.slice(i + 1).trim() || "—",
  };
}

/**
 * Submits a lead to a self-hosted Twenty CRM instance.
 * Set env: TWENTY_API_URL (e.g. https://crm.yourdomain.com), TWENTY_API_KEY
 * Create the key in Twenty: Settings → API & Webhooks.
 * Schema may vary slightly by workspace; adjust the mutation if your Person fields differ.
 */
export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
  }

  const { name, company, email, phone, message } = body;
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json(
      { error: "Correo corporativo requerido" },
      { status: 400 }
    );
  }

  const base = process.env.TWENTY_API_URL?.replace(/\/$/, "");
  const apiKey = process.env.TWENTY_API_KEY;

  if (!base || !apiKey) {
    console.error(
      "[contact] Falta TWENTY_API_URL o TWENTY_API_KEY en el entorno del servidor."
    );
    return NextResponse.json(
      {
        error:
          "El envío no está configurado. Añada TWENTY_API_URL y TWENTY_API_KEY al servidor.",
      },
      { status: 503 }
    );
  }

  const { firstName, lastName } = parseName(
    typeof name === "string" ? name : ""
  );
  const jobTitle = [
    "Lead — sitio web",
    company ? `Empresa: ${company}` : null,
    phone ? `Tel: ${phone}` : null,
    message ? `Mensaje: ${message}` : null,
  ]
    .filter(Boolean)
    .join(" | ")
    .slice(0, 2000);

  const graphqlUrl = `${base}/graphql`;

  const query = `
    mutation CreatePeople($data: [PersonCreateInput!]!) {
      createPeople(data: $data) {
        id
      }
    }
  `;

  const variables = {
    data: [
      {
        name: { firstName, lastName },
        emails: { primaryEmail: email.trim() },
        jobTitle,
      },
    ],
  };

  const res = await fetch(graphqlUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = (await res.json()) as {
    errors?: { message: string }[];
    data?: { createPeople?: { id: string }[] };
  };

  if (!res.ok) {
    console.error("[contact] Twenty HTTP", res.status, await res.text());
    return NextResponse.json(
      { error: "No se pudo conectar con el CRM" },
      { status: 502 }
    );
  }

  if (json.errors?.length) {
    console.error("[contact] Twenty GraphQL", json.errors);
    return NextResponse.json(
      { error: json.errors[0]?.message ?? "Error al crear el contacto" },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
