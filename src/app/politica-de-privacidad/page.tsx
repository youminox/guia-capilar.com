import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import {
  SITE_URL,
  SITE_NAME,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
} from "@/lib/content";

export const metadata: Metadata = {
  title: `Política de Privacidad y Protección de Datos | ${SITE_NAME}`,
  description: `Política de privacidad y tratamiento de datos personales en ${SITE_NAME} (guia-capilar.com), bajo la responsabilidad de ${LEGAL_OWNER}, domiciliado en ${LEGAL_LOCATION} (${LEGAL_EMAIL}).`,
  alternates: { canonical: `${SITE_URL}/politica-de-privacidad/` },
};

export default function PoliticaPrivacidadPage() {
  return (
    <SimplePage
      title="Política de Privacidad y Protección de Datos"
      crumb="Política de privacidad"
      href="/politica-de-privacidad/"
      intro="Transparencia total sobre qué datos recopilamos, cómo protegemos tu privacidad y cómo ejercer tus derechos."
    >
      <h2>1. Responsable del tratamiento de los datos</h2>
      <ul>
        <li>
          <strong>Responsable:</strong> {LEGAL_OWNER}
        </li>
        <li>
          <strong>Domicilio:</strong> {LEGAL_LOCATION}
        </li>
        <li>
          <strong>Correo electrónico de privacidad:</strong>{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
        </li>
        <li>
          <strong>Sitio web:</strong> {SITE_URL}
        </li>
      </ul>

      <h2>2. Marco normativo aplicable</h2>
      <p>
        Esta Política de Privacidad se adecúa a la Ley N.º 29733 (Ley de
        Protección de Datos Personales del Perú y su reglamento), así como a los
        estándares internacionales del Reglamento General de Protección de Datos
        (RGPD / GDPR) para visitantes desde Europa y las leyes estatales de
        privacidad de Estados Unidos (CCPA / CPRA).
      </p>

      <h2>3. Datos que recopilamos y finalidad</h2>
      <p>
        <strong>guia-capilar.com</strong> es un portal informativo de consulta
        abierta que no exige registro de cuenta para leer sus guías. Únicamente
        tratamos los siguientes datos técnicos o voluntarios:
      </p>
      <ul>
        <li>
          <strong>Consultas en el Chat Online (Asesora Capilar IA):</strong>{" "}
          Cuando utilizas voluntariamente nuestro asistente virtual, se genera
          un identificador anónimo de visitante (<code>gc_visitor</code>) y se
          almacenan los mensajes de la sesión en nuestra base de datos segura en
          Supabase con el único fin de responder tus dudas sobre cuidado capilar
          y mejorar la calidad de las recomendaciones.
        </li>
        <li>
          <strong>Comunicaciones por correo electrónico:</strong> Si nos
          escribes a <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>,
          utilizaremos tu dirección de correo exclusivamente para responder a tu
          solicitud.
        </li>
        <li>
          <strong>Métricas anónimas de navegación y clics de afiliados:</strong>{" "}
          Registramos de forma agregada qué guías o enlaces hacia Amazon se
          consultan para optimizar nuestras comparativas.
        </li>
      </ul>

      <h2>4. Enlaces externos hacia Amazon</h2>
      <p>
        Al hacer clic en los botones de consulta de precio o compra hacia{" "}
        <code>amazon.com</code> o <code>amazon.es</code>, serás redirigido a la
        plataforma oficial de Amazon, la cual aplica su propia política de
        privacidad y cookies para gestionar tu carrito y compra segura.
      </p>

      <h2>5. Derechos de acceso, rectificación, cancelación y oposición (ARCO)</h2>
      <p>
        En cualquier momento puedes solicitar el acceso, rectificación,
        eliminación u oposición al tratamiento de tus datos enviando un correo a{" "}
        <strong>{LEGAL_OWNER}</strong> en la dirección{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>
    </SimplePage>
  );
}
