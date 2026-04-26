import type { ReactNode } from "react";
import Link from "next/link";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";

export function LegalPageLayout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-[60vh]">
        <div className="container py-20 md:py-28">
          <p className="text-sm text-azure font-medium">Legal</p>
          <h1 className="mt-2 text-3xl md:text-4xl font-medium tracking-tight text-ink">
            {title}
          </h1>
          <div className="mt-8 max-w-3xl text-[15px] text-ink/80 leading-relaxed space-y-4">
            {children}
          </div>
          <p className="mt-12 text-sm text-ink/50">
            <Link href="/" className="text-azure hover:underline">
              ← Volver al inicio
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
