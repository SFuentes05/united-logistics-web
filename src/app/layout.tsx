import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const plex = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://unitedlogistics.com.do"),
  title: {
    default:
      "United Logistics | Telemetría, monitoreo y gestión de flotas en tiempo real",
    template: "%s | United Logistics",
  },
  description:
    "Plataforma integral de gestión de flotas: telemetría GPS, control de combustible, cámaras inteligentes con IA, sala de monitoreo 24/7 y analítica avanzada para empresas en República Dominicana y el Caribe.",
  keywords: [
    "telemetría vehicular",
    "gestión de flotas",
    "rastreo GPS",
    "control de combustible",
    "monitoreo 24/7",
    "ERM Telematics",
    "ADAS",
    "DMS",
    "United Logistics",
  ],
  openGraph: {
    type: "website",
    locale: "es_DO",
    siteName: "United Logistics",
    title:
      "United Logistics | Telemetría, monitoreo y gestión de flotas en tiempo real",
    description:
      "Visibilidad, control y analítica para flotas corporativas. Tecnología ERM + sala de monitoreo 24/7 + integraciones a la medida.",
    images: ["/up_horizontal_logo.png"],
  },
  icons: {
    icon: [
      {
        url: "/united-logistics-icon.png",
        type: "image/png",
      },
    ],
    shortcut: "/united-logistics-icon.png",
    apple: "/united-logistics-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={plex.variable}>
      <body className="bg-white text-ink antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
