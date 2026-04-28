"use client";

import * as React from "react";
import { ArrowRight, CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = React.useState<string | null>(null);

  /** Native GET submit (default method) was bypassing the API; POST + ?enviado=1 handles fallback. */
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("enviado") !== "1") return;
    setStatus("success");
    params.delete("enviado");
    const q = params.toString();
    const path = `${window.location.pathname}${q ? `?${q}` : ""}`;
    window.history.replaceState(null, "", `${path}#contacto`);
  }, []);

  function handleSendAnother() {
    formRef.current?.reset();
    setError(null);
    setStatus("idle");
  }

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
        headers: {
          "Content-Type": "application/json",
          "X-Contact-Form": "1",
        },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(json.error ?? "No se pudo enviar. Intente de nuevo.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setError("Error de red. Intente de nuevo.");
      setStatus("error");
    }
  }

  return (
    <form
      ref={formRef}
      method="post"
      action="/api/contact"
      onSubmit={onSubmit}
      className={cn(
        "rounded-2xl border bg-white p-7 md:p-8 shadow-soft transition-[border-color,box-shadow] duration-300 ease-out",
        status === "success"
          ? "border-emerald-400/90 ring-2 ring-emerald-500/25 shadow-[0_0_0_1px_rgba(16,185,129,0.12)]"
          : "border-white/20"
      )}
    >
      {status === "success" ? (
        <div
          className="flex flex-col items-center justify-center py-6 md:py-10 px-2 text-center"
          role="status"
          aria-live="polite"
        >
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-5 ring-1 ring-emerald-100"
            aria-hidden
          >
            <CircleCheck className="h-9 w-9" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl md:text-2xl font-semibold text-ink tracking-tight">
            Mensaje enviado
          </h3>
          <p className="mt-3 max-w-sm text-sm md:text-[15px] text-ink/65 leading-relaxed">
            Gracias. Hemos recibido su solicitud y nos pondremos en contacto con
            usted pronto.
          </p>
          <button
            type="button"
            onClick={handleSendAnother}
            className="mt-8 text-sm font-medium text-azure underline decoration-azure/25 underline-offset-[5px] hover:decoration-azure transition-colors"
          >
            Enviar otro mensaje
          </button>
        </div>
      ) : (
        <>
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
        </>
      )}
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
