import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const POINTS = [
  "Robo de vehículo y combustible",
  "Paradas no autorizadas",
  "Excesos de velocidad",
  "Eventos configurables por cliente",
];

export function Monitoreo() {
  return (
    <section id="monitoreo" className="bg-white border-t border-ink/10">
      <div className="container py-24 md:py-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <div className="text-sm font-medium text-azure">Monitoreo 24/7</div>
            <h2 className="mt-3 text-balance text-3xl md:text-5xl font-medium tracking-tighter text-ink leading-[1.1]">
              Centro de monitoreo{" "}
              <span className="text-ink/50">24/7.</span>
            </h2>
            <p className="mt-4 text-lg text-ink/60 leading-relaxed">
              Personal dedicado supervisando los eventos críticos de su flota.
            </p>

            <ul className="mt-8 space-y-3">
              {POINTS.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-2.5 text-[14.5px] text-ink/75"
                >
                  <Check
                    className="h-4 w-4 mt-0.5 text-azure shrink-0"
                    strokeWidth={2.25}
                  />
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <Button asChild variant="dark" size="md">
                <a href="#contacto">
                  Solicitar demostración
                  <ArrowRight />
                </a>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-2xl border border-ink/10 bg-ink-50/40 overflow-hidden shadow-soft">
              <Image
                src="/sala-monitoreo.jpg"
                alt="Centro de monitoreo de United Logistics con operadores frente a la pared de pantallas"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
