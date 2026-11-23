import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import {
  SITE_URL,
  SITE_NAME,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
} from "@/lib/content";
import { AMAZON_TAG_ES, AMAZON_TAG_US } from "@/lib/amazon";

export const metadata: Metadata = {
  title: `Divulgación de Afiliados de Amazon | ${SITE_NAME}`,
  description: `Declaración de transparencia sobre enlaces de afiliados de Amazon Estados Unidos (${AMAZON_TAG_US}) y España (${AMAZON_TAG_ES}) en ${SITE_NAME}.`,
  alternates: { canonical: `${SITE_URL}/divulgacion-de-afiliados/` },
};

export default function DivulgacionAfiliadosPage() {
  return (
    <SimplePage
      title="Divulgación de Afiliados de Amazon"
      crumb="Divulgación de afiliados"
      href="/divulgacion-de-afiliados/"
      intro="Transparencia total sobre cómo se financia GuíaCapilar.com y cómo funcionan nuestros enlaces hacia Amazon Estados Unidos y Amazon España."
    >
      <h2>1. Declaración oficial de afiliación con Amazon</h2>
      <p>
        <strong>guia-capilar.com</strong>, sitio web titularidad de{" "}
        <strong>{LEGAL_OWNER}</strong> (domiciliado en {LEGAL_LOCATION} · email:{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>), participa en el{" "}
        <strong>Programa de Afiliados de Amazon.com Associates</strong> y en el{" "}
        <strong>Programa de Afiliados de Amazon EU</strong>, programas de
        publicidad para afiliados diseñados para ofrecer a sitios web un modo de
        obtener comisiones publicitarias mediante la inclusión de enlaces a{" "}
        <code>Amazon.com</code> y <code>Amazon.es</code>.
      </p>
      <ul>
        <li>
          <strong>ID de Rastreo en Amazon Estados Unidos (amazon.com):</strong>{" "}
          <code>{AMAZON_TAG_US}</code>
        </li>
        <li>
          <strong>ID de Seguimiento en Amazon España (amazon.es):</strong>{" "}
          <code>{AMAZON_TAG_ES}</code>
        </li>
      </ul>

      <h2>2. ¿Tiene algún costo adicional para el lector?</h2>
      <p>
        <strong>Absolutamente ninguno.</strong> El precio que pagas en Amazon es
        exactamente el mismo tanto si accedes desde un enlace de{" "}
        <strong>{SITE_NAME}</strong> como si entras directamente en Amazon. Las
        pequeñas comisiones de afiliado las abona Amazon de su propio margen y
        nos permiten mantener este portal libre de muros de pago, actualizar las
        600 guías técnicas y ofrecer gratis la Asesora Capilar IA.
      </p>

      <h2>3. Independencia editorial y cálculo de costo por aplicación</h2>
      <p>
        Ninguna marca cosmética (ni K18, ni Olaplex, ni Redken, ni L’Oréal, ni
        Elizavecca) paga por aparecer en primer lugar en nuestras comparativas.
        Nuestro criterio se basa estrictamente en:
      </p>
      <ol>
        <li>
          <strong>Eficacia molecular real</strong> según el nivel de daño (pelo
          teñido oxidado vs decoloración alta nivel 9-10 o cabello chicloso).
        </li>
        <li>
          <strong>Compatibilidad con el tipo de cabello</strong> (fino que se
          apelmaza, medio, grueso o rizado, y nivel de porosidad).
        </li>
        <li>
          <strong>Costo matemático por aplicación ($/uso)</strong>, dividiendo
          el precio del envase entre el número real de mililitros o{" "}
          <em>pumps</em> necesarios por sesión.
        </li>
      </ol>
    </SimplePage>
  );
}
