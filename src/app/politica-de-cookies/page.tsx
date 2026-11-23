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
  title: `Política de Cookies y Almacenamiento Local | ${SITE_NAME}`,
  description: `Información sobre cookies y almacenamiento local (localStorage) en ${SITE_NAME} (guia-capilar.com). Titular: ${LEGAL_OWNER}, ${LEGAL_LOCATION}.`,
  alternates: { canonical: `${SITE_URL}/politica-de-cookies/` },
};

export default function PoliticaCookiesPage() {
  return (
    <SimplePage
      title="Política de Cookies y Almacenamiento Local"
      crumb="Política de cookies"
      href="/politica-de-cookies/"
      intro="Detalle técnico de las claves de almacenamiento local y cookies utilizadas para el funcionamiento del chat y la selección de tienda Amazon."
    >
      <h2>1. Titular responsable</h2>
      <p>
        El sitio web <strong>guia-capilar.com</strong> es titularidad de{" "}
        <strong>{LEGAL_OWNER}</strong>, domiciliado en{" "}
        <strong>{LEGAL_LOCATION}</strong>, con correo electrónico de contacto{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>

      <h2>2. Uso de almacenamiento local (localStorage) técnico</h2>
      <p>
        Para ofrecer una experiencia rápida y sin pantallas invasivas,{" "}
        <strong>{SITE_NAME}</strong> utiliza almacenamiento local en tu propio
        navegador (<code>localStorage</code> y <code>sessionStorage</code>)
        estrictamente funcional:
      </p>
      <ul>
        <li>
          <code>gc_amazon_region</code>: Recuerda si prefieres consultar los
          precios en <strong>Amazon Estados Unidos (US)</strong> o{" "}
          <strong>Amazon España (ES)</strong>.
        </li>
        <li>
          <code>gc_visitor</code> y <code>gc_chat_session</code>: Identificador
          anónimo aleatorio para mantener tu conversación activa con la Asesora
          Capilar IA mientras navegas de una guía a otra.
        </li>
        <li>
          <code>gc_chat_messages</code>: Guarda localmente el historial reciente
          del chat para que no pierdas las recomendaciones de productos al
          cambiar de página (puedes borrarlo en cualquier momento pulsando{" "}
          <em>Reiniciar</em> en la ventana del chat).
        </li>
      </ul>

      <h2>3. Cookies de terceros al visitar Amazon</h2>
      <p>
        Cuando haces clic en un enlace de afiliado hacia{" "}
        <strong>Amazon.com</strong> (tag <code>guia-capilar-20</code>) o{" "}
        <strong>Amazon.es</strong> (tag <code>guia-capilar-21</code>), Amazon
        establece sus propias cookies en su dominio para atribuir la referencia
        del Programa de Afiliados durante la ventana reglamentaria de 24 horas.
      </p>

      <h2>4. Cómo gestionar o eliminar el almacenamiento local</h2>
      <p>
        Puedes borrar las cookies y el almacenamiento local en cualquier momento
        desde la configuración de privacidad de tu navegador (Chrome, Safari,
        Firefox o Edge) o escribiéndonos a{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>
    </SimplePage>
  );
}
