"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export interface MediaCarouselItem {
  name: string;
  src: string;
}

interface MediaCarouselProps {
  items: MediaCarouselItem[];
  rotationMs?: number;
  variant?: "bar" | "badge";
}

export function MediaCarousel({
  items,
  rotationMs = 1600,
  variant = "bar",
}: MediaCarouselProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, rotationMs);
    return () => clearInterval(id);
  }, [items.length, rotationMs]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink-50/40">
      {items.map((item, i) => {
        const active = i === index;
        return (
          <div
            key={item.src}
            className={`absolute inset-0 transition-all duration-500 ease-out ${
              active
                ? "opacity-100 scale-100"
                : "opacity-0 scale-[1.02] pointer-events-none"
            }`}
            aria-hidden={!active}
          >
            <Image
              src={item.src}
              alt={item.name}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
              priority={i === 0}
            />
          </div>
        );
      })}

      {variant === "bar" ? (
        <BarOverlay items={items} index={index} />
      ) : (
        <BadgeOverlay items={items} index={index} />
      )}
    </div>
  );
}

function BarOverlay({
  items,
  index,
}: {
  items: MediaCarouselItem[];
  index: number;
}) {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/70 via-ink/30 to-transparent"
      />
      <div className="absolute left-4 right-4 bottom-4 flex items-center justify-between gap-3">
        <div className="relative h-5 overflow-hidden">
          {items.map((item, i) => {
            const active = i === index;
            return (
              <span
                key={item.src}
                className={`absolute left-0 top-0 whitespace-nowrap text-[12px] font-medium tracking-tight text-white transition-all duration-500 ease-out ${
                  active
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2 pointer-events-none"
                }`}
              >
                {item.name}
              </span>
            );
          })}
        </div>
        <div className="flex items-center gap-1.5">
          {items.map((item, i) => {
            const active = i === index;
            return (
              <span
                key={item.src}
                className={`h-1 rounded-full transition-all duration-500 ease-out ${
                  active ? "w-5 bg-white" : "w-1 bg-white/40"
                }`}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

function BadgeOverlay({
  items,
  index,
}: {
  items: MediaCarouselItem[];
  index: number;
}) {
  return (
    <>
      <div className="absolute right-3 bottom-3 flex h-7 items-center">
        {items.map((item, i) => {
          const active = i === index;
          return (
            <span
              key={item.src}
              className={`absolute right-0 inline-flex items-center gap-1.5 rounded-full bg-ink/85 px-2.5 py-1 text-[11px] font-medium tracking-tight text-white shadow-card backdrop-blur-sm transition-all duration-500 ease-out ${
                active
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2 pointer-events-none"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-azure" />
              {item.name}
            </span>
          );
        })}
      </div>
      <div className="absolute left-3 bottom-3 flex items-center gap-1">
        {items.map((item, i) => {
          const active = i === index;
          return (
            <span
              key={item.src}
              className={`h-1 rounded-full transition-all duration-500 ease-out ${
                active ? "w-4 bg-white" : "w-1 bg-white/50"
              }`}
            />
          );
        })}
      </div>
    </>
  );
}

export const ERM_DEVICES: MediaCarouselItem[] = [
  { name: "Cámara eEye", src: "/erm_devices/camara-eye.png" },
  { name: "Driver ID", src: "/erm_devices/driver-id.png" },
  { name: "eData", src: "/erm_devices/edata.png" },
  { name: "eFuel Dome", src: "/erm_devices/efuel-dome.png" },
  { name: "Karma FM", src: "/erm_devices/karma-fm.png" },
  { name: "Starlink Tracker", src: "/erm_devices/starlink-tracker.png" },
];

export const ERM_REPORTS: MediaCarouselItem[] = [
  { name: "Reporte de velocidad", src: "/reports/Reporte%20de%20Velocidad.png" },
  { name: "Paradas no autorizadas", src: "/reports/paradas%20no-autorizadas.png" },
  { name: "Paso rápido", src: "/reports/paso-rapido.png" },
  { name: "Rendimiento de combustible", src: "/reports/rendimiento_combustible.png" },
];
