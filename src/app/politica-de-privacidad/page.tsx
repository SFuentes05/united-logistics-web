import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Cómo United Logistics trata la información personal y los datos de contacto en su sitio web.",
};

export default function PoliticaDePrivacidadPage() {
  return (
    <LegalPageLayout title="Política de privacidad">
      <p>
        <strong>Última actualización:</strong> abril de 2026. United Logistics
        (“nosotros”) se compromete a proteger la privacidad de quienes visitan
        este sitio o envían datos a través de los formularios de contacto.
      </p>
      <p>
        <strong>Datos que recopilamos.</strong> Cuando solicita una demostración
        o nos escribe, podemos recibir su nombre, empresa, correo electrónico,
        teléfono y el contenido del mensaje. Técnicamente también se pueden
        registrar direcciones IP, tipo de navegador y fechas de acceso, según
        la configuración del alojamiento y de las herramientas de análisis que
        utilicemos.
      </p>
      <p>
        <strong>Finalidad.</strong> Usamos esos datos para responder a su
        solicitud, coordinar demostraciones, prestar nuestros servicios de
        telemetría y gestión de flotas, y, cuando proceda, mantenerle informado
        de forma comercial, si usted lo consiente.
      </p>
      <p>
        <strong>Base legal y conservación.</strong> El tratamiento se basa en
        su consentimiento, en la ejecución de medidas precontractuales o
        contractuales, o en nuestro interés legítimo de dar respuesta a
        consultas. Conservamos los datos el tiempo necesario para esas
        finalidades y según exija la ley.
      </p>
      <p>
        <strong>Destinatarios.</strong> Podemos utilizar proveedores de
        alojamiento, correo, CRM o analítica que actúen como encargados del
        tratamiento, con contrato o cláusulas adecuadas, incluida transferencia
        a otros países con garantías exigibles cuando aplique.
      </p>
      <p>
        <strong>Sus derechos.</strong> Puede solicitar acceso, rectificación,
        supresión, oposición, limitación o portabilidad, según el marco legal
        aplicable. Para ello, escriba a{" "}
        <a
          href="mailto:contacto@unitedlogistics.com.do"
          className="text-azure underline underline-offset-2"
        >
          contacto@unitedlogistics.com.do
        </a>
        .
      </p>
      <p>
        <strong>Menores.</strong> Este sitio no está dirigido a menores de
        edad. No recopilamos a sabiendas datos de menores.
      </p>
      <p>
        <strong>Cambios.</strong> Podemos actualizar esta política. La versión
        vigente se publicará en esta URL.
      </p>
    </LegalPageLayout>
  );
}
