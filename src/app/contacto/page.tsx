import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import OpenChatButton from "@/components/OpenChatButton";
import {
  SITE_URL,
  SITE_NAME,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
} from "@/lib/content";

export const metadata: Metadata = {
  title: `Contacto Oficial | ${SITE_NAME}`,
  description: `Ponte en contacto con ${LEGAL_OWNER} (${LEGAL_LOCATION}), titular de ${SITE_NAME} (guia-capilar.com), en ${LEGAL_EMAIL} o consulta en vivo a nuestra Asesora Capilar IA.`,
  alternates: { canonical: `${SITE_URL}/contacto/` },
};

export default function ContactoPage() {
  return (
    <SimplePage
      title="Contacto Oficial"
      crumb="Contacto"
      href="/contacto/"
      intro="¿Tienes dudas sobre una comparativa, quieres sugerir el análisis de un tratamiento capilar o necesitas contactar con el titular del sitio web?"
    >
      <h2>Datos de contacto directo</h2>
      <ul>
        <li>
          <strong>Titular del portal:</strong> {LEGAL_OWNER}
        </li>
        <li>
          <strong>Domicilio:</strong> {LEGAL_LOCATION}
        </li>
        <li>
          <strong>Correo electrónico:</strong>{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
        </li>
      </ul>

      <h2>¿Necesitas ayuda inmediata para elegir tu tratamiento en Amazon?</h2>
      <p>
        Si buscas una recomendación rápida sobre qué mascarilla, reconstructor
        (K18, Olaplex, Redken), champú o protector térmico comprar según el
        estado actual de tu cabello teñido o decolorado, nuestra{" "}
        <strong>Asesora Capilar IA</strong> está disponible las 24 horas en la
        esquina inferior derecha de tu pantalla.
      </p>
      <div className="my-6">
        <OpenChatButton
          label="Abrir Asesora Capilar IA Ahora"
          prompt="Hola, quiero que me ayudes a elegir los mejores productos para mi cabello teñido o decolorado en Amazon según mi tipo de cabello y costo por aplicación."
          className="btn btn-buy shine"
        />
      </div>
    </SimplePage>
  );
}
