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
  title: `Política Editorial y Metodología de Evaluación Capilar | ${SITE_NAME}`,
  description: `Cómo evaluamos tratamientos capilares (K18, Olaplex, mascarillas, champús y protectores térmicos) y cómo calculamos el costo por aplicación en ${SITE_NAME}.`,
  alternates: { canonical: `${SITE_URL}/politica-editorial/` },
};

export default function PoliticaEditorialPage() {
  return (
    <SimplePage
      title="Política Editorial y Metodología de Análisis Capilar"
      crumb="Política editorial"
      href="/politica-editorial/"
      intro="Nuestro protocolo técnico para comparar tratamientos reconstructores, mascarillas, champús y protectores térmicos según tipo de cabello, forma de uso y costo por aplicación."
    >
      <h2>1. Dirección editorial</h2>
      <p>
        La dirección editorial y verificación técnica de{" "}
        <strong>guia-capilar.com</strong> está a cargo de{" "}
        <strong>{LEGAL_OWNER}</strong>, domiciliado en{" "}
        <strong>{LEGAL_LOCATION}</strong> (contacto oficial:{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>).
      </p>

      <h2>2. Los 4 pilares de evaluación de cada producto</h2>
      <p>
        A diferencia de los blogs genéricos de belleza que repiten el eslogan
        del fabricante, cada una de nuestras 600 guías evalúa cuatro variables
        medibles:
      </p>
      <ol>
        <li>
          <strong>Química e INCI del activo principal:</strong> Distinguimos
          claramente entre péptidos biomiméticos que reconectan cadenas
          polipeptídicas (<code>sh-Oligopeptide-78</code> en K18), moléculas que
          enlazan puentes disulfuro rotos (
          <code>Bis-Aminopropyl Diglycol Dimaleate</code> en Olaplex), complejos
          ácidos selladores de cutícula (ácido cítrico y AHA en Redken y Wella),
          quelantes de metales del agua (Glicoamina en L’Oréal Metal Detox) y
          proteínas hidrolizadas o lípidos emolientes.
        </li>
        <li>
          <strong>Adecuación por tipo de cabello y porosidad:</strong> Un
          producto excelente para un cabello grueso decolorado de porosidad alta
          puede apelmazar un cabello fino con mechas. En cada tabla indicamos el
          grosor (fino, medio, grueso) y patrón (liso, ondulado, rizado) ideal.
        </li>
        <li>
          <strong>Protocolo exacto de aplicación paso a paso:</strong> El 70 %
          de las malas experiencias con K18 u Olaplex se deben a errores de
          aplicación (como usar acondicionador antes de K18 o aplicar Olaplex
          No. 3 en cabello seco por solo 3 minutos). Documentamos el orden de
          capas, la humedad exacta y los minutos reales de espera.
        </li>
        <li>
          <strong>Cálculo del Costo por Aplicación en USD ($/dosis):</strong>{" "}
          Calculamos cuántos mililitros (ml) o pulsaciones (<em>pumps</em>)
          consume una melena corta, media o larga por sesión para que sepas
          cuánto te cuesta realmente cada uso en Amazon Estados Unidos.
        </li>
      </ol>

      <h2>3. Revisión y actualización continua</h2>
      <p>
        Si detectas cualquier cambio de formulación, nuevo formato en Amazon o
        deseas sugerir una comparativa, escríbenos directamente a{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>
    </SimplePage>
  );
}
