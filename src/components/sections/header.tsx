"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Plataforma", href: "#plataforma" },
  { label: "Productos", href: "#productos" },
  { label: "Reportes", href: "#reportes" },
  { label: "Monitoreo", href: "#monitoreo" },
];

export function Header() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-200 bg-white/90 backdrop-blur-md",
        scrolled ? "border-b border-ink/10" : "border-b border-transparent"
      )}
    >
      <div className="container flex h-12 md:h-14 items-center gap-8">
        <Link
          href="#"
          className="flex items-center shrink-0"
          aria-label="United Logistics"
        >
          <Image
            src="/up_horizontal_logo.png"
            alt="United Logistics"
            width={180}
            height={40}
            priority
            className="h-6 md:h-7 w-auto"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-md px-2.5 py-1.5 text-[13px] font-medium text-ink/70 hover:text-ink transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2 ml-auto">
          <Button
            asChild
            variant="ghost"
            size="xs"
            className="border border-ink/15 bg-white/60 text-ink/90 hover:bg-white"
          >
            <a
              href="https://app.unitedlogistics.com.do/auth/v2/login"
              target="_blank"
              rel="noopener noreferrer"
            >
              Iniciar sesión
            </a>
          </Button>
          <Button asChild variant="dark" size="xs">
            <a href="#contacto">Solicitar demo</a>
          </Button>
        </div>

        <button
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden ml-auto inline-flex h-8 w-8 items-center justify-center rounded-md text-ink hover:bg-ink-50 transition"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open ? (
        <div className="lg:hidden border-t border-ink/10 bg-white">
          <div className="container py-4 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-ink hover:bg-ink-50"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="w-full border border-ink/15 bg-white/60"
              >
                <a
                  href="https://app.unitedlogistics.com.do/auth/v2/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                >
                  Iniciar sesión
                </a>
              </Button>
              <Button asChild variant="dark" size="sm" className="w-full">
                <a href="#contacto" onClick={() => setOpen(false)}>
                  Solicitar demo
                </a>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
