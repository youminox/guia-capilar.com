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
  title: `Sobre Nosotros y Carlos Lingan Borja | ${SITE_NAME}`,
  description: `Conoce la misión de ${SITE_NAME} (guia-capilar.com), fundado por ${LEGAL_OWNER} (${LEGAL_LOCATION} · ${LEGAL_EMAIL}), para elegir productos de cabello teñido o decolorado con criterio técnico.`,
  alternates: { canonical: `${SITE_URL}/sobre-nosotros/` },
};

export default function SobreNosotrosPage() {
  return (
    <SimplePage
      title="Sobre Guía Capilar y Nuestra Misión"
      crumb="Sobre nosotros"
      href="/sobre-nosotros/"
      intro="Ayudamos a elegir tratamientos, mascarillas, champús y protectores térmicos para cabello teñido o decolorado basándonos en ciencia cosmética, forma de uso y costo real por aplicación."
    >
      <h2>¿Por qué nació GuíaCapilar.com?</h2>
      <p>
        Quienes se tiñen, llevan mechas <em>balayage</em> o decoloran su cabello
        a rubio platinado o cobrizo suelen enfrentarse a un problema costoso:
        comprar frascos de $30 a $75 dólares en Amazon sin saber si su cabello
        necesita <strong>reconstrucción de enlaces internos</strong> (como K18 u
        Olaplex No. 3), <strong>sellado ácido de cutícula</strong> (como Redken
        Acidic Bonding), <strong>proteínas de relleno</strong> (como Elizavecca
        CER-100) o <strong>hidratación lipídica sin proteínas</strong> (como
        Moroccanoil o Color Wow Money Masque).
      </p>
      <p>
        <strong>Guía Capilar</strong> nació con un objetivo claro: traducir la
        química capilar al español claro y calcular el{" "}
        <strong>costo real por aplicación</strong> de cada producto en{" "}
        <strong>Amazon Estados Unidos</strong> y <strong>Amazon España</strong>,
        para que inviertas solo en lo que tu fibra capilar realmente necesita y
        lo apliques de la forma exacta que maximiza su resultado.
      </p>

      <h2>Fundador y Titular del Proyecto</h2>
      <ul>
        <li>
          <strong>Nombre completo:</strong> {LEGAL_OWNER}
        </li>
        <li>
          <strong>Domicilio:</strong> {LEGAL_LOCATION}
        </li>
        <li>
          <strong>Correo electrónico directo:</strong>{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
        </li>
      </ul>

      <h2>Lo que encontrarás en nuestras 600 guías</h2>
      <ul>
        <li>
          <strong>100 Guías Transaccionales y Comparativas Directas:</strong>{" "}
          Reseñas individuales, duelos cara a cara (<em>K18 vs Olaplex No. 3</em>
          , <em>Redken Acidic Bonding vs L’Oréal Metal Detox</em>,{" "}
          <em>Fanola No Yellow vs Olaplex No. 4P</em>) y rankings de compra en
          Amazon EE. UU.
        </li>
        <li>
          <strong>500 Guías Técnicas de Uso y Diagnóstico:</strong> Protocolos
          exactos al minuto, rescate de cabello chicloso, pruebas de porosidad,
          temperaturas seguras de plancha y secador, y tablas de dosificación en
          mililitros y <em>pumps</em>.
        </li>
        <li>
          <strong>Asesora Capilar IA en Vivo:</strong> Nuestro chat inteligente
          conectado a las 600 guías para recomendarte al instante tu rutina
          personalizada.
        </li>
      </ul>
    </SimplePage>
  );
}
