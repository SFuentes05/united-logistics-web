import Image from "next/image";
import { Fuel, Gauge, MapPinX, type LucideIcon, Route } from "lucide-react";
import { cn } from "@/lib/utils";

const REPORTS: {
  name: string;
  tagline: string;
  description: string;
  imageSrc: string;
  imageLabel: string;
  Icon: LucideIcon;
}[] = [
  {
    name: "Paso rápido",
    tagline: "Auditoría de peajes",
    description:
      "Cruce de tramos y cargos vía telemetría, historial de pasos y validación con el estado de la cuenta de peaje y la ruta operativa.",
    imageSrc: "/reports/paso-rapido.png",
    imageLabel: "Paso rápido",
    Icon: Route,
  },
  {
    name: "Rendimiento de combustible",
    tagline: "Consumo y eficiencia",
    description:
      "Indicadores de desempeño, tendencias y anomalías para bajar el costo por kilómetro y cuidar el abastecimiento y el uso de la unidad.",
    imageSrc: "/reports/rendimiento_combustible.png",
    imageLabel: "Rendimiento de combustible",
    Icon: Fuel,
  },
  {
    name: "Reporte de velocidad",
    tagline: "Excesos y análisis por vía",
    description:
      "Límites y umbrales configurables; seguimiento de excesos por magnitud, recurrencia y corredor para actuar con datos fiables.",
    imageSrc: "/reports/Reporte%20de%20Velocidad.png",
    imageLabel: "Reporte de velocidad",
    Icon: Gauge,
  },
  {
    name: "Paradas no autorizadas",
    tagline: "Geocercas y cumplimiento",
    description:
      "Detección de detenciones fuera de reglas operativas, con geocercas, horarios y alertas alineados a su operación.",
    imageSrc: "/reports/paradas%20no-autorizadas.png",
    imageLabel: "Paradas no autorizadas",
    Icon: MapPinX,
  },
];

export function Reports() {
  return (
    <section id="reportes" className="bg-white border-t border-ink/10">
      <div className="container py-24 md:py-28">
        <div className="max-w-3xl">
          <div className="text-sm font-medium text-azure">Reportes</div>
          <h2 className="mt-3 text-balance text-3xl md:text-5xl font-medium tracking-tighter text-ink leading-[1.1]">
            Analítica operativa{" "}
            <span className="text-ink/50">configurada a su flota.</span>
          </h2>
          <p className="mt-4 text-lg text-ink/60 max-w-xl leading-relaxed">
            Reportes pre-construidos y conectables a su ERP.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 gap-5">
          {REPORTS.map((r) => (
            <ReportCard key={r.name} {...r} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ReportCardProps {
  name: string;
  tagline: string;
  description: string;
  imageLabel: string;
  imageSrc?: string;
  Icon: LucideIcon;
  className?: string;
}

function ReportCard({
  name,
  tagline,
  description,
  imageLabel,
  imageSrc,
  Icon,
  className,
}: ReportCardProps) {
  return (
    <article
      className={cn(
        "group flex flex-col rounded-2xl border border-ink/10 bg-white overflow-hidden",
        "transition-colors duration-200 hover:border-ink/20",
        className
      )}
    >
      <div className="relative aspect-[16/9] border-b border-ink/10 bg-ink-50/40 overflow-hidden">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageLabel}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,29,41,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,29,41,0.04)_1px,transparent_1px)] [background-size:32px_32px]"
            />
            <div className="relative flex flex-col items-center gap-2">
              <Image
                src="/united-logistics-icon.png"
                alt=""
                width={36}
                height={36}
                className="opacity-40"
              />
              <span className="text-[11px] font-medium text-ink/40">
                {imageLabel}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <div className="flex gap-2.5">
          <Icon
            className="h-[1.1rem] w-[1.1rem] shrink-0 text-ink/45 mt-0.5"
            strokeWidth={1.2}
            aria-hidden
          />
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-medium tracking-tight text-ink leading-snug">
              {name}
            </h3>
            <div className="mt-1 text-[12.5px] font-medium text-azure">
              {tagline}
            </div>
            <p className="mt-3 text-[13.5px] text-ink/65 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
