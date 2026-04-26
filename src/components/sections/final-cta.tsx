import { ContactForm } from "./contact-form";

export function FinalCTA() {
  return (
    <section
      id="contacto"
      className="relative overflow-hidden border-t border-white/10 bg-gradient-to-b from-[#002a3d] via-[#013a52] to-[#014a66] text-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:40px_40px] opacity-50"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(1,155,220,0.12),transparent_55%)]"
      />

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 overflow-hidden">
        <svg
          className="absolute -bottom-4 left-1/2 w-[min(1200px,100%)] -translate-x-1/2 text-white/20"
          viewBox="0 0 800 120"
          fill="none"
          aria-hidden
        >
          <path
            d="M0 80 C 120 20, 200 100, 320 50 S 500 20, 620 60 S 720 90, 800 40"
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinecap="round"
            strokeDasharray="6 8"
            className="route-line"
          />
          <path
            d="M40 100 C 180 40, 280 90, 400 55 S 540 30, 680 70 S 760 100, 800 75"
            stroke="currentColor"
            strokeWidth="0.9"
            strokeLinecap="round"
            strokeOpacity="0.5"
            strokeDasharray="4 10"
            className="route-line-slow"
          />
        </svg>
      </div>

      <div className="relative z-10 container py-24 md:py-28">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-6">
            <div className="text-sm font-medium text-azure-200">Contacto</div>
            <h2 className="mt-3 text-balance text-3xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-white leading-[1.05]">
              Hablemos.
            </h2>
            <p className="mt-5 text-lg text-white/75 max-w-md leading-relaxed">
              Coordine una demostración. O escríbanos a{" "}
              <a
                href="mailto:contacto@unitedlogistics.com.do"
                className="text-white font-medium underline decoration-white/30 underline-offset-2 hover:decoration-azure-200 transition-colors"
              >
                contacto@unitedlogistics.com.do
              </a>
              .
            </p>
          </div>

          <div id="form" className="lg:col-span-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
