import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative bg-white overflow-x-clip">
      <div className="container pt-24 md:pt-36">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <Link
              href="https://www.ermtelematics.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full pl-2 pr-3.5 py-1 text-[11.5px] font-medium text-white/90 tracking-wide bg-gradient-to-b from-[#0c2c39] to-ink border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_1px_2px_rgba(0,29,41,0.25),0_4px_10px_-4px_rgba(0,29,41,0.35)] transition-opacity hover:opacity-95"
            >
              <Image
                src="/erm_logotype.png"
                alt="ERM"
                width={900}
                height={900}
                className="h-4 w-4 object-contain"
              />
              Distribuidor oficial de ERM Advanced Telematics
            </Link>
          </div>

          <h1 className="mt-6 text-balance text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tighter text-ink leading-[1.05]">
            Opere su flota{" "}
            <span className="text-ink/55">con precisión.</span>
          </h1>

          <p className="mx-auto mt-6 text-pretty text-lg text-ink/60 max-w-xl leading-relaxed">
            Telemetría, analítica y monitoreo 24/7 sobre cada vehículo.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <Button asChild variant="dark" size="md">
              <a href="#contacto">
                Solicitar demostración
                <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="ghost" size="md">
              <a href="#plataforma">Ver la plataforma</a>
            </Button>
          </div>
        </div>
      </div>

      <div className="relative mt-8 md:mt-12 px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="relative mx-auto w-full max-w-[1180px]">
          <div className="relative aspect-[16/9] md:aspect-[16/8] lg:aspect-[16/7.5] overflow-hidden rounded-t-2xl md:rounded-t-3xl border border-b-0 border-ink/10 bg-white shadow-card">
            <Image
              src="/app_screenshots/map_page.png"
              alt="Mapa de flota en tiempo real en la plataforma de United Logistics"
              fill
              priority
              sizes="(min-width: 1180px) 1180px, 100vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
