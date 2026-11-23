import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import {
  SITE_NAME,
  SITE_URL,
  OG_DEFAULT,
  organizationLd,
  personLd,
} from "@/lib/content";
import GuiaCapilarChatWidget from "@/components/GuiaCapilarChatWidget";
import SmoothScroll from "@/components/SmoothScroll";
import { JsonLd } from "@/components/Breadcrumbs";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Guía Capilar 2026: Tratamientos K18, Olaplex, Mascarillas y Costo por Aplicación en Amazon US",
    template: "%s",
  },
  description:
    "Guía especializada en español para el cuidado del cabello teñido o decolorado: comparativas de K18, Olaplex, Redken Acidic Bonding, mascarillas, champús sin sulfatos y protectores térmicos según tipo de cabello, forma de uso y costo real por aplicación en Amazon Estados Unidos.",
  applicationName: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: "website",
    locale: "es_US",
    siteName: SITE_NAME,
    url: `${SITE_URL}/`,
    images: [
      {
        url: OG_DEFAULT(),
        width: 1200,
        height: 675,
        alt: "Guía Capilar – K18, Olaplex, Mascarillas y Protectores Térmicos para Cabello Teñido o Decolorado",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: ["google07464c8c60a81e7a", "172C7_Myoxhj0Y7awkbiE22513T05NSfBYUdmPFvxgY"],
  },
  other: {
    "google-adsense-account": "ca-pub-1070738569472471",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#B85D3B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${outfit.variable} ${inter.variable}`}>
      <body className="antialiased selection:bg-[#E8B86D] selection:text-[#191311]">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                url: `${SITE_URL}/`,
                name: SITE_NAME,
                inLanguage: "es",
                publisher: { "@id": `${SITE_URL}/#org` },
              },
              organizationLd,
              personLd,
            ],
          }}
        />
        {children}
        <GuiaCapilarChatWidget />
        <SmoothScroll />
      </body>
    </html>
  );
}
