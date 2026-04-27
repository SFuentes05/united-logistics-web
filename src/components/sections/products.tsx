import Image from "next/image";
import { cn } from "@/lib/utils";

const DEVICES = [
  {
    name: "Starlink",
    tagline: "Tracker",
    description:
      "Conectividad satelital de alta velocidad para flotas en zonas sin cobertura celular.",
    imageSrc: "/erm-devices-no-bg/starlink-tracker.png",
    imageLabel: "Starlink Tracker",
  },
  {
    name: "Karma FM",
    tagline: "Software",
    description:
      "Plataforma web de gestión de flotas que centraliza todos sus vehículos, conductores, eventos y reportes operativos en tiempo real.",
    imageSrc: "/erm-devices-no-bg/karma-fm.png",
    imageLabel: "Karma FM",
  },
  {
    name: "eFuel DOME",
    tagline: "Monitoreo de combustible y alertas de robo",
    description:
      "eFuel DOME establece un nuevo estándar en la medición de nivel de combustible gracias a su diseño inalámbrico y autónomo, permitiendo una instalación rápida y limpia sin necesidad de perforaciones ni cableado.",
    imageSrc: "/erm-devices-no-bg/efuel-dome.png",
    imageLabel: "eFuel DOME",
  },
  {
    name: "eEye",
    tagline: "Cámara ADAS y DMS con IA",
    description:
      "eEye es una cámara dual inteligente con IA integrada para el análisis del comportamiento del conductor en tiempo real (DMS), asistencia avanzada a la conducción (ADAS) y grabación de video basada en eventos; está diseñada para mejorar la seguridad de flotas.",
    imageSrc: "/erm-devices-no-bg/camara-eye.png",
    imageLabel: "eEye",
  },
  {
    name: "eData",
    tagline: "Herramienta de Diagnóstico Vehicular",
    description:
      "eData es una herramienta de diagnóstico vehicular en tiempo real que permite configurar reglas y notificaciones personalizadas a partir de datos CANBUS u OBD, mediante una interfaz intuitiva y orientada a la gestión operativa.",
    imageSrc: "/erm-devices-no-bg/edata.png",
    imageLabel: "eData",
  },
  {
    name: "Driver ID",
    tagline: "Identificación de Conductores",
    description:
      "Driver ID permite identificar al conductor mediante un chip de identificación único. El lector instalado en el vehículo valida al conductor autorizado, habilita el encendido y asocia cada viaje y evento al conductor correspondiente.",
    imageSrc: "/erm-devices-no-bg/driver-id.png",
    imageLabel: "Driver ID",
  },
];

export function Products() {
  return (
    <section id="productos" className="bg-white border-t border-ink/10">
      <div className="container py-24 md:py-28">
        <div className="max-w-3xl">
          <div className="text-sm font-medium text-azure">Productos</div>
          <h2 className="mt-3 text-balance text-3xl md:text-5xl font-medium tracking-tighter text-ink leading-[1.1]">
            Hardware industrial.{" "}
            <span className="text-ink/50">Soporte local.</span>
          </h2>
          <p className="mt-4 text-lg text-ink/60 max-w-xl leading-relaxed">
            Distribuidor Exclusivo de ERM Advanced Telematics en RD. Presencia
            ERM en más de 80 países.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DEVICES.map((d) => (
            <DeviceCard key={d.name} {...d} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface DeviceCardProps {
  name: string;
  tagline: string;
  description: string;
  imageLabel: string;
  imageSrc?: string;
  className?: string;
}

function DeviceCard({
  name,
  tagline,
  description,
  imageLabel,
  imageSrc,
  className,
}: DeviceCardProps) {
  return (
    <article
      className={cn(
        "group flex flex-col rounded-2xl border border-ink/10 bg-white overflow-hidden",
        "transition-colors duration-200 hover:border-ink/20",
        className
      )}
    >
      <div className="relative aspect-square border-b border-ink/10 bg-ink-50/40 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,29,41,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,29,41,0.04)_1px,transparent_1px)] [background-size:28px_28px]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.85)_0%,rgba(244,246,247,0)_70%)]"
        />
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageLabel}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-6 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
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

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-medium tracking-tight text-ink">{name}</h3>
        <div className="mt-1 text-[12.5px] font-medium text-azure">
          {tagline}
        </div>
        <p className="mt-3 text-[13.5px] text-ink/65 leading-relaxed">
          {description}
        </p>
      </div>
    </article>
  );
}
