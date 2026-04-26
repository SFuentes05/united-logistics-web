import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Pillars } from "@/components/sections/pillars";
import { Products } from "@/components/sections/products";
import { Reports } from "@/components/sections/reports";
import { Monitoreo } from "@/components/sections/monitoreo";
import { Testimonials } from "@/components/sections/testimonials";
import { FinalCTA } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Pillars />
        <Products />
        <Reports />
        <Monitoreo />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
