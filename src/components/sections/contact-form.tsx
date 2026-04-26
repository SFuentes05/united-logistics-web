"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(json.error ?? "No se pudo enviar. Intente de nuevo.");
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setError("Error de red. Intente de nuevo.");
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-white/20 bg-white p-7 md:p-8 shadow-soft"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Nombre" name="name" placeholder="Juan Pérez" />
        <Field
          label="Empresa"
          name="company"
          placeholder="Su empresa"
        />
        <Field
          label="Correo corporativo"
          name="email"
          type="email"
          placeholder="usted@empresa.com"
          required
        />
        <Field
          label="Teléfono"
          name="phone"
          placeholder="+1 (809) 000-0000"
        />
        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="text-sm font-medium text-ink"
          >
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Cuéntenos sobre su operación."
            className="mt-1.5 w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-sm text-ink placeholder:text-ink/35 focus:border-azure focus:ring-2 focus:ring-azure/20 outline-none transition resize-none"
          />
        </div>
      </div>

      {error ? (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
      {status === "success" ? (
        <p className="mt-4 text-sm font-medium text-[#0a5]">
          Gracias. Hemos recibido su solicitud; nos pondremos en contacto pronto.
        </p>
      ) : null}

      <Button
        type="submit"
        variant="dark"
        size="md"
        className="mt-6 w-full"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Enviando…" : "Enviar solicitud"}
        <ArrowRight />
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full h-10 rounded-lg border border-ink/15 bg-white px-3 text-sm text-ink placeholder:text-ink/35 focus:border-azure focus:ring-2 focus:ring-azure/20 outline-none transition"
      />
    </div>
  );
}
