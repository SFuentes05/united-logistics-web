import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description:
    "Condiciones de uso del sitio web de United Logistics y de los servicios descritos en él.",
};

export default function TerminosYCondicionesPage() {
  return (
    <LegalPageLayout title="Términos y condiciones">
      <p>
        <strong>Última actualización:</strong> abril de 2026. Bienvenido al
        sitio web de United Logistics. Al acceder o utilizar este sitio, usted
        acepta estos términos. Si no está de acuerdo, absténgase de
        utilizarlo.
      </p>
      <p>
        <strong>Uso del sitio.</strong> El contenido (textos, marcas, imágenes,
        diseño) está protegido. Se permite la navegación y la descarga
        temporal para su consulta personal. No se permite copia masiva, uso
        comercial no autorizado ni ingeniería inversa del software a través del
        sitio.
      </p>
      <p>
        <strong>Información y exención de responsabilidad.</strong> La
        información sobre productos, integraciones o disponibilidad es
        orientativa y no constituye oferta vinculante. Las relaciones
        comerciales se rigen por contratos firmados y por la legislación
        aplicable en la República Dominicana, salvo pacto distinto.
      </p>
      <p>
        <strong>Enlaces a terceros.</strong> Este sitio puede enlazar
        (incluido ERM Telematics u otros partners). No somos responsables de sus
        contenidos ni de sus políticas; el uso de sitios vinculados queda bajo
        su propio riesgo.
      </p>
      <p>
        <strong>Formularios y demostraciones.</strong> Al enviar datos de
        contacto, usted declara que la información es veraz. Nos reservamos el
        derecho a rechazar o limitar el acceso a demos a discreción comercial
        y legal.
      </p>
      <p>
        <strong>Limitación de responsabilidad.</strong> En la medida permitida
        por la ley, United Logistics no será responsable por daños indirectos,
        lucro cesante o perjuicios derivados del uso o imposibilidad de uso del
        sitio, salvo dolo o culpa grave demostrable.
      </p>
      <p>
        <strong>Modificaciones y contacto.</strong> Podemos modificar estos
        términos publicando la nueva versión aquí. Preguntas:{" "}
        <a
          href="mailto:contacto@unitedlogistics.com.do"
          className="text-azure underline underline-offset-2"
        >
          contacto@unitedlogistics.com.do
        </a>
        .
      </p>
    </LegalPageLayout>
  );
}
