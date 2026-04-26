import Image from "next/image";

const LOGO_H = "h-14";

const TESTIMONIALS = [
  {
    quote:
      "Hoy contamos con información precisa sobre ubicación, conducción y eventos operativos, lo que nos permite detectar desviaciones, corregir procesos y tener mayor control sobre la flota.",
    name: "Gerente General",
    company: "Caribbean Turf",
    markColor: "#308949",
    logoSrc: "/caribbeanturf_logo.png",
    logoAlt: "Caribbean Turf",
  },
  {
    quote:
      "La visibilidad en tiempo real de nuestros vehículos nos permite coordinar rutas, cumplir horarios y responder rápidamente ante incidencias durante los tours.",
    name: "Coordinador de Operaciones",
    company: "Wild On Tours",
    markColor: "#1D4A9F",
    logoSrc: "/wildon_logo.png",
    logoAlt: "Wild On Tours",
  },
] as const;

export function Testimonials() {
  return (
    <section className="bg-white border-t border-ink/10">
      <div className="container py-24 md:py-28">
        <div className="max-w-3xl">
          <div className="text-sm font-medium text-azure">Clientes</div>
          <h2 className="mt-3 text-balance text-3xl md:text-5xl font-medium tracking-tighter text-ink leading-[1.1]">
            Resultados reales.{" "}
            <span className="text-ink/50">Operaciones reales.</span>
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-5">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.company}
              className="flex flex-col rounded-2xl border border-ink/10 bg-white p-7 md:p-8"
            >
              <svg
                aria-hidden
                width="24"
                height="20"
                viewBox="0 0 28 22"
                className="shrink-0"
                style={{ color: t.markColor }}
                fill="currentColor"
              >
                <path d="M0 22V12C0 8.5 0.7 5.7 2.1 3.4C3.5 1.1 5.5 -0.2 8 0.5L9 4C7.4 4.3 6.2 5 5.4 6.1C4.6 7.2 4.2 8.5 4.2 10H8V22H0ZM16 22V12C16 8.5 16.7 5.7 18.1 3.4C19.5 1.1 21.5 -0.2 24 0.5L25 4C23.4 4.3 22.2 5 21.4 6.1C20.6 7.2 20.2 8.5 20.2 10H24V22H16Z" />
              </svg>
              <blockquote className="mt-5 text-lg text-ink leading-relaxed text-pretty">
                {t.quote}
              </blockquote>
              <figcaption className="mt-7 flex flex-col border-t border-ink/10 pt-5">
                <div className="text-sm font-medium text-ink">{t.name}</div>
                <div className="text-sm text-ink/55">{t.company}</div>
                <div className="mt-4">
                  <Image
                    src={t.logoSrc}
                    alt={t.logoAlt}
                    width={220}
                    height={68}
                    className={`${LOGO_H} w-auto max-w-[220px] object-contain object-left`}
                  />
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
