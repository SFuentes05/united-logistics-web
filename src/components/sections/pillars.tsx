import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ERM_DEVICES,
  ERM_REPORTS,
  MediaCarousel,
  type MediaCarouselItem,
} from "./media-carousel";

interface PillarConfig {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  imageLabel: string;
  imageSrc?: string;
  carousel?: {
    items: MediaCarouselItem[];
    variant?: "bar" | "badge";
  };
}

const PILLARS: PillarConfig[] = [
  {
    eyebrow: "Telemetría",
    title: "Datos en tiempo real.",
    description: "GPS, CANBUS, sensores y cámaras vía tecnología ERM.",
    bullets: [
      "Rastreo GPS de alta precisión",
      "Lectura CANBUS y diagnóstico OBD",
      "Geocercas y eventos automáticos",
    ],
    imageLabel: "Telemetría",
    carousel: { items: ERM_DEVICES, variant: "bar" },
  },
  {
    eyebrow: "Analítica",
    title: "Reportes e integraciones.",
    description:
      "Reporte de velocidad, paradas no autorizadas, paso rápido y rendimiento de combustible.",
    bullets: [
      "Reportes operativos automatizados",
      "Validaciones y alertas configurables",
      "Power BI y ERP para reportes a la medida",
    ],
    imageLabel: "Analítica",
    carousel: { items: ERM_REPORTS, variant: "bar" },
  },
  {
    eyebrow: "Monitoreo 24/7",
    title: "Centro de monitoreo.",
    description:
      "Personal dedicado supervisando eventos y alertas en tiempo real.",
    bullets: [
      "Respuesta humana ante incidentes",
      "Reglas configurables por cliente",
      "Reporte de incidencias críticas",
    ],
    imageLabel: "Centro de monitoreo",
    imageSrc: "/sala-monitoreo.jpg",
  },
];

export function Pillars() {
  return (
    <section id="plataforma" className="bg-white">
      <div className="container py-24 md:py-28">
        <div className="max-w-3xl">
          <div className="text-sm font-medium text-azure">Plataforma</div>
          <h2 className="mt-3 text-balance text-3xl md:text-5xl font-medium tracking-tighter text-ink leading-[1.1]">
            Una plataforma operativa{" "}
            <span className="text-ink/50">para la gestión de flotas.</span>
          </h2>
          <p className="mt-4 text-lg text-ink/60 max-w-xl leading-relaxed">
            Tres capas integradas: telemetría, analítica y centro de monitoreo
            24/7.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {PILLARS.map((p) => (
            <PillarCard key={p.eyebrow} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface PillarCardProps extends PillarConfig {
  imageSrc?: string;
  className?: string;
}

function PillarCard({
  eyebrow,
  title,
  description,
  bullets,
  imageLabel,
  imageSrc,
  carousel,
  className,
}: PillarCardProps) {
  return (
    <article
      className={cn(
        "group flex flex-col rounded-2xl border border-ink/10 bg-white overflow-hidden",
        "transition-colors duration-200 hover:border-ink/20",
        className
      )}
    >
      <div className="relative aspect-[4/3] border-b border-ink/10 bg-ink-50/40 overflow-hidden">
        {carousel ? (
          <MediaCarousel items={carousel.items} variant={carousel.variant} />
        ) : imageSrc ? (
          <Image src={imageSrc} alt={imageLabel} fill className="object-cover" />
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
                width={32}
                height={32}
                className="opacity-40"
              />
              <span className="text-[11px] font-medium text-ink/40">
                {imageLabel}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="text-[13px] font-medium text-azure">{eyebrow}</div>
        <h3 className="mt-1.5 text-lg font-medium tracking-tight text-ink">
          {title}
        </h3>
        <p className="mt-2 text-[14.5px] text-ink/60 leading-relaxed">
          {description}
        </p>

        <ul className="mt-5 space-y-2">
          {bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-2 text-[13.5px] text-ink/75"
            >
              <Check
                className="h-3.5 w-3.5 mt-0.5 text-azure shrink-0"
                strokeWidth={2.25}
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <a
          href="#contacto"
          className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink hover:text-azure transition-colors"
        >
          Conocer más
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </article>
  );
}
