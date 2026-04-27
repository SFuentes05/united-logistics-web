import Image from "next/image";
import Link from "next/link";

const NAV_GROUPS = [
  {
    title: "Plataforma",
    items: [
      {
        label: "Telemetría, analítica y monitoreo",
        href: "/#plataforma",
      },
      { label: "Reportes", href: "/#reportes" },
      { label: "Centro de monitoreo", href: "/#monitoreo" },
    ],
  },
  {
    title: "Productos",
    items: [{ label: "Catálogo ERM", href: "/#productos" }],
  },
  {
    title: "Empresa",
    items: [
      { label: "Contacto", href: "/#contacto" },
      { label: "Términos y condiciones", href: "/terminos-y-condiciones" },
      { label: "Política de privacidad", href: "/politica-de-privacidad" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white border-t border-ink/10">
      <div className="container py-16">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Image
              src="/up_horizontal_logo.png"
              alt="United Logistics"
              width={220}
              height={48}
              className="h-8 w-auto"
            />
            <p className="mt-5 max-w-md text-[14.5px] text-ink/60 leading-relaxed">
              United Logistics es el Distribuidor Exclusivo de ERM Advanced
              Telematics en RD. Plataforma, hardware, instalación, monitoreo 24/7
              y analítica integral para flotas corporativas.
            </p>

            <div className="mt-6 space-y-1.5 text-sm">
              <a
                href="mailto:contacto@unitedlogistics.com.do"
                className="block text-ink/80 hover:text-azure transition-colors"
              >
                contacto@unitedlogistics.com.do
              </a>
              <div className="text-ink/55">República Dominicana</div>
            </div>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-10">
            {NAV_GROUPS.map((g) => (
              <div key={g.title}>
                <h4 className="text-xs uppercase tracking-[0.14em] font-medium text-ink/50">
                  {g.title}
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {g.items.map((i) => (
                    <li key={i.label}>
                      <Link
                        href={i.href}
                        className="text-[13.5px] text-ink/75 hover:text-ink transition-colors"
                      >
                        {i.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-ink/10 text-sm text-ink/50">
          © {year} United Logistics. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
