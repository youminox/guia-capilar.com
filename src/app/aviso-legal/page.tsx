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
  title: `Aviso Legal y Condiciones de Uso | ${SITE_NAME}`,
  description: `Aviso legal, titularidad e información corporativa de ${SITE_NAME} (guia-capilar.com). Titular: ${LEGAL_OWNER}, domiciliado en ${LEGAL_LOCATION} (${LEGAL_EMAIL}).`,
  alternates: { canonical: `${SITE_URL}/aviso-legal/` },
};

export default function AvisoLegalPage() {
  return (
    <SimplePage
      title="Aviso Legal y Condiciones de Uso"
      crumb="Aviso legal"
      href="/aviso-legal/"
      intro={`Información legal reglamentaria, titularidad del dominio guia-capilar.com y condiciones generales de acceso y uso.`}
    >
      <h2>1. Datos identificativos del titular de la web</h2>
      <p>
        En cumplimiento del deber de información y transparencia digital, se
        hace constar que el presente sitio web <strong>guia-capilar.com</strong>{" "}
        (en adelante, <strong>{SITE_NAME}</strong>) es propiedad y está
        administrado por:
      </p>
      <ul>
        <li>
          <strong>Titular del sitio web:</strong> {LEGAL_OWNER}
        </li>
        <li>
          <strong>Domicilio legal:</strong> {LEGAL_LOCATION}
        </li>
        <li>
          <strong>Correo electrónico oficial de contacto:</strong>{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
        </li>
        <li>
          <strong>Dominio oficial:</strong> {SITE_URL}
        </li>
      </ul>

      <h2>2. Objeto y naturaleza del portal</h2>
      <p>
        <strong>{SITE_NAME}</strong> es una publicación digital independiente en
        español dedicada a la divulgación técnica sobre el cuidado del cabello,
        con enfoque prioritario en cabello teñido o decolorado, análisis de
        mascarillas, tratamientos reconstructores de enlaces (como K18, Olaplex
        o Redken Acidic Bonding), champús sin sulfatos o matizadores y
        protectores térmicos, evaluados según tipo de cabello, forma de uso y
        costo real por aplicación.
      </p>
      <p>
        La información publicada tiene carácter estrictamente informativo,
        educativo y comparativo de cosmética capilar. No sustituye el
        diagnóstico médico dermatológico ante patologías del cuero cabelludo.
      </p>

      <h2>3. Propiedad intelectual e industrial</h2>
      <p>
        Todos los textos originales, tablas comparativas de costo por
        aplicación, calculadoras interactivas, ilustraciones SVG, fotografías
        generadas y código fuente de <strong>guia-capilar.com</strong> son
        titularidad intelectual de <strong>{LEGAL_OWNER}</strong>. Las marcas
        comerciales citadas (K18 Biomimetic Hairscience, Olaplex, Redken,
        L’Oréal Professionnel, Kérastase, Color Wow, Elizavecca, Moroccanoil,
        Fanola, Pureology, Wella, entre otras) pertenecen a sus respectivos
        propietarios y se mencionan con fines exclusivamente descriptivos y
        comparativos.
      </p>

      <h2>4. Participación en el Programa de Afiliados de Amazon</h2>
      <p>
        <strong>{LEGAL_OWNER}</strong> participa en el Programa de Afiliados de
        Amazon.com Associates (Estados Unidos, bajo el ID de rastreo{" "}
        <code>{AMAZON_TAG_US}</code>) y en el Programa de Afiliados de Amazon EU
        (España, bajo el ID de seguimiento <code>{AMAZON_TAG_ES}</code>). En
        calidad de Afiliado de Amazon, <strong>guia-capilar.com</strong> obtiene
        ingresos por las compras adscritas que cumplen los requisitos
        aplicables, sin que ello represente ningún recargo ni diferencia de
        precio para el usuario final.
      </p>

      <h2>5. Legislación aplicable y contacto</h2>
      <p>
        Las presentes condiciones se rigen por la legislación vigente en la
        República del Perú (domicilio del titular en {LEGAL_LOCATION}), sin
        perjuicio de los derechos que asistan a los consumidores conforme a la
        normativa de su país de residencia. Para cualquier consulta legal,
        reclamación o notificación, puede escribir directamente a{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>
    </SimplePage>
  );
}
