import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientEffects from "@/components/ClientEffects";
import ArticleCard from "@/components/ArticleCard";
import ReadingProgress from "@/components/ReadingProgress";
import SplitHeading from "@/components/SplitHeading";
import OpenChatButton from "@/components/OpenChatButton";
import AmazonAffiliateBox from "@/components/AmazonAffiliateBox";
import { JsonLd } from "@/components/Breadcrumbs";
import Hero from "@/components/home/Hero";
import ScrollStory from "@/components/home/ScrollStory";
import MolecularBondSvg from "@/components/home/MolecularBondSvg";
import ActiveIngredientsOrbit, {
  type OrbitItem,
} from "@/components/home/ActiveIngredientsOrbit";
import MetricsCounters, { type MetricItem } from "@/components/home/MetricsCounters";
import CuticleComparisonSlider from "@/components/home/CuticleComparisonSlider";
import MomentsCarousel, { type Moment } from "@/components/home/MomentsCarousel";
import CostPerApplicationCalculator, {
  type HairTreatmentTier,
} from "@/components/home/CostPerApplicationCalculator";
import { getContextualAmazonProducts } from "@/lib/amazon";
import {
  SITE_URL,
  OG_DEFAULT,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
  HAIRCARE_DISCLAIMER,
  ambient,
  getAllContent,
  getArticlesIn,
  getByPath,
  getCategories,
  safeHref,
  type Article,
} from "@/lib/content";

export const metadata: Metadata = {
  title:
    "Guía Capilar 2026: K18 vs Olaplex, Mascarillas, Champús y Costo por Aplicación en Amazon US",
  description:
    "Guía especializada en español para elegir productos para el cuidado del cabello teñido o decolorado: comparativas de mascarillas, tratamientos K18, Olaplex y Redken Acidic Bonding, champús y protectores térmicos según tipo de cabello, forma de uso y costo por aplicación en Amazon Estados Unidos.",
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/`,
    title:
      "Guía Capilar: K18, Olaplex, Mascarillas y Protectores Térmicos por Costo por Aplicación",
    description:
      "600 guías técnicas y comparativas para cabello teñido o decolorado en Amazon EE. UU. y España: tipo de cabello, modo de uso paso a paso y costo real por dosis.",
    images: [
      {
        url: OG_DEFAULT(),
        width: 1200,
        height: 675,
        alt: "Guía Capilar – Comparativas de K18, Olaplex, Mascarillas y Protectores Térmicos en Amazon",
      },
    ],
  },
};

const FAQ = [
  {
    q: "¿Qué es mejor para el cabello decolorado o teñido: K18 o Olaplex No. 3?",
    a: "Actúan en niveles distintos y complementarios: K18 Leave-In Molecular Repair Mask contiene el péptido patentado sh-Oligopeptide-78 que reconecta tanto las cadenas polipeptídicas longitudinales de queratina como los puentes disulfuro en solo 4 minutos sin enjuague (ideal para daño severo por decoloración, mechas balayage altas o cabello chicloso/elástico). Olaplex No. 3 Hair Perfector utiliza Bis-Aminopropyl Diglycol Dimaleate para enlazar puentes disulfuro como tratamiento pre-champú de 15 a 30 minutos en húmedo, con un costo por aplicación ligeramente menor (~$1.35-$1.80 USD) e ideal para mantenimiento semanal.",
  },
  {
    q: "¿Cuál es la forma correcta de usar K18 para que realmente funcione y no desperdiciar dinero?",
    a: "El error número uno con K18 es usar acondicionador en la ducha antes de aplicarlo: los emolientes y siliconas del acondicionador crean una película que impide que el péptido penetre al córtex. La forma correcta es: 1) Lavar solo con champú (idealmente un champú detox o sin siliconas pesadas), 2) Enjuagar y secar con toalla hasta que quede húmedo sin gotear, 3) Emulsionar de 1 a 3 pumps de K18 en las palmas hasta que se vuelva blanco y aplicar de puntas a medios, 4) Esperar 4 minutos exactos sin tocar el cabello, y 5) Peinar o aplicar tu protector térmico sin enjuagar el K18.",
  },
  {
    q: "¿Cuánto cuesta realmente por aplicación usar K18, Olaplex No. 3, Redken Acidic Bonding o Elizavecca CER-100?",
    a: "Aunque el envase de K18 (50 ml) tiene el precio inicial más alto en Amazon EE. UU., solo requiere de 1 a 2 ml por sesión, por lo que rinde de 25 a 45 aplicaciones (~$1.50 a $2.40 USD por uso). Olaplex No. 3 (100 ml) rinde entre 16 y 22 usos (~$1.35 a $1.90 USD por aplicación). Redken Acidic Bonding Concentrate (150 ml) ronda los ~$1.15 a $1.50 USD por dosis. Y si buscas una mascarilla de proteínas y colágeno ultra-económica para alternar, Elizavecca CER-100 (100 ml) cuesta menos de $10 en Amazon y sale a ~$0.55 USD por aplicación.",
  },
  {
    q: "¿Por qué Olaplex No. 3 no hidrata ni suaviza el cabello seco por sí solo?",
    a: "Porque Olaplex No. 3 NO es una mascarilla hidratante ni un acondicionador: es un reconstructor interno de enlaces disulfuro que se aplica antes del champú. Si tu cabello teñido o decolorado se siente áspero y seco al tacto, después de enjuagar Olaplex No. 3 y lavar con champú debes aplicar una mascarilla hidratante o lipídica (como Olaplex No. 8, Moroccanoil Intense Hydrating Mask o Color Wow Money Masque) para lubricar y sellar la cutícula externa.",
  },
  {
    q: "¿Qué champú debo usar para que el tinte no se barra y el rubio no se ponga amarillo o naranja?",
    a: "Para los lavados habituales utiliza siempre un champú sin sulfatos agresivos (SLS/SLES) y con pH ácido de 4.5 a 5.5 (como Pureology Hydrate, Olaplex No. 4 o Redken Acidic Bonding Shampoo). Si vives en una zona con agua dura o cloro que oxida el rubio, usa L’Oréal Professionnel Metal Detox Shampoo para quelar el cobre del agua. Y para matizar cada 7 a 10 días: usa champú violeta (Olaplex No. 4P o Fanola No Yellow) si tu pelo tira a amarillo pollo, o champú azul (Fanola No Orange) si tu base castaña con mechas tira a naranja cobrizo.",
  },
  {
    q: "¿Qué protector térmico es mejor para cabello decolorado: en spray o en crema?",
    a: "Depende del momento y del grosor de tu pelo: sobre cabello húmedo antes del secador, una crema leave-in reparadora como Redken Acidic Bonding Leave-In (450 °F) o Kérastase Blond Absolu Cicaplasme nutre y protege; o si quieres bloquear el frizz por humedad durante 3 lavados o acelerar el secado un 50 %, usa Color Wow Dream Coat o Kenra Platinum Blow-Dry Spray. Si vas a pasar la plancha sobre cabello ya seco al día siguiente, usa siempre una bruma ligera en spray como CHI 44 Iron Guard y nunca superes los 330 °F–365 °F (165 °C–185 °C) en pelo decolorado.",
  },
  {
    q: "¿Qué productos elegir si mi cabello es muy fino y decolorado y todo me lo deja pesado o graso?",
    a: "El cabello fino decolorado tiene el córtex debilitado pero no soporta mantecas pesadas (karité o coco puro). Los mejores productos que reparan sin restar volumen son: K18 Mask (se absorbe dentro de la fibra sin dejar peso superficial), Wella Ultimate Repair Miracle Hair Rescue (spray líquido en 90 segundos), Color Wow Money Masque (textura gel-crema sin ceras), Living Proof Triple Bond Complex y el aceite ligero Olaplex No. 7 (solo 1 a 2 gotas en puntas).",
  },
];

const CLAIMS = [
  "K18 Biomimetic Hairscience (Péptido 4 Min)",
  "Olaplex No. 3 & No. 0 (Enlaces Disulfuro S-S)",
  "Redken Acidic Bonding Concentrate (pH 4.5)",
  "Cálculo Real de Costo por Aplicación ($/Uso)",
  "L’Oréal Professionnel Metal Detox (Glicoamina)",
  "Color Wow Dream Coat & Kenra Blow-Dry 450 °F",
  "Champús Violetas y Azules Sin Resecar",
  "Ofertas Verificadas en Amazon EE. UU. y España",
];

const CLAIMS_2 = [
  "Elizavecca CER-100 Colágeno (< $0.60/Uso)",
  "Olaplex No. 4P, No. 6, No. 7, No. 8 y No. 9",
  "Wella Ultimate Repair Miracle Rescue (90 s)",
  "Kérastase Blond Absolu & Masque Thérapiste",
  "Fanola No Yellow & Fanola No Orange",
  "Moroccanoil Intense Hydrating Mask",
  "Pureology Hydrate ZeroSulfate Antifade",
  "Living Proof Triple Bond Complex 3D",
];

const ICONS: Record<string, string> = {
  flask: "🧪",
  scale: "⚖️",
  trophy: "🏆",
  sparkles: "✨",
  dna: "🧬",
  palette: "💜",
  droplet: "💧",
  shower: "🚿",
  flame: "🔥",
  sliders: "💇‍♀️",
  calculator: "💲",
  microscope: "🔬",
};

export default function Home() {
  const cats = getCategories();
  const all = getAllContent();
  const heroImg = ambient("home-hero-capilar", "/img/ambiente/home-hero-capilar.webp");

  const orbit: OrbitItem[] = [
    {
      k: "k18",
      name: "Péptido Biomimético (K18)",
      img: null,
      icon: "🧬",
      role: "Reconecta cadenas de queratina y puentes S-S en 4 minutos",
      d: "El activo sh-Oligopeptide-78 viaja al núcleo de la fibra decolorada o chiclosa sin enjuague. Su regla clave: lavar solo con champú sin acondicionador y esperar 4 minutos antes de peinar.",
      href: safeHref("/resenas-tratamientos-y-productos/k18-leave-in-molecular-repair-hair-mask/"),
    },
    {
      k: "olaplex",
      name: "Enlaces Disulfuro (Olaplex No. 3)",
      img: null,
      icon: "🧪",
      role: "Pre-champú en húmedo con Bis-Aminopropyl (~$1.45/uso)",
      d: "Reconstruye los enlaces covalentes de azufre rotos por el peróxido, el tinte o la plancha. Se aplica en cabello húmedo de 15 a 30 minutos antes de lavar con champú y acondicionador.",
      href: safeHref("/resenas-tratamientos-y-productos/olaplex-no-3-hair-perfector/"),
    },
    {
      k: "acidic",
      name: "Sellado Ácido pH 4.5 (Redken)",
      img: null,
      icon: "🛡️",
      role: "Ácido cítrico + Bonding Care para cerrar la cutícula porosa",
      d: "La decoloración deja el cabello en un estado alcalino con las escamas abiertas. El sistema Redken Acidic Bonding devuelve el pH isoeléctrico (4.5-5.0), reduciendo el frizz y la rotura al instante.",
      href: safeHref("/resenas-tratamientos-y-productos/redken-acidic-bonding-concentrate-intensive-treatment/"),
    },
    {
      k: "mascarilla",
      name: "Mascarillas: Lípidos vs Proteínas",
      img: null,
      icon: "💧",
      role: "Olaplex No. 8, Moroccanoil, Briogeo y Elizavecca CER-100",
      d: "Los reconstructores de enlaces fortalecen por dentro, pero las mascarillas devuelven la suavidad externa: elige proteínas/colágeno si el pelo está elástico, o hidratación sin proteínas si está rígido y seco.",
      href: safeHref("/mejores-productos-capilares/mejores-mascarillas-cabello-tenido-y-decolorado/"),
    },
    {
      k: "detox",
      name: "Champú Quelante & Sin Sulfatos",
      img: null,
      icon: "🚿",
      role: "L’Oréal Metal Detox, K18 Detox y Pureology Hydrate",
      d: "El cobre y el calcio del agua de ducha oxidan el tinte y bloquean los tratamientos. Un champú quelante sin sulfatos limpia los metales pesados manteniendo el 93% de la intensidad del color.",
      href: safeHref("/mejores-productos-capilares/mejores-champus-sin-sulfatos-cabello-tenido/"),
    },
    {
      k: "matizador",
      name: "Matización Violeta y Azul",
      img: null,
      icon: "💜",
      role: "Olaplex No. 4P, Fanola No Yellow y Fanola No Orange",
      d: "El pigmento violeta neutraliza el amarillo en rubios nivel 8-10, mientras que el pigmento azul apaga el naranja en bases castañas con mechas. Te enseñamos los minutos exactos para no resecar.",
      href: safeHref("/mejores-productos-capilares/mejores-champus-violetas-matizadores-rubios-y-balayage/"),
    },
    {
      k: "termico",
      name: "Protectores Térmicos (450 °F)",
      img: null,
      icon: "🔥",
      role: "Color Wow Dream Coat, Redken Leave-In y Kenra Blow-Dry",
      d: "Pasar la plancha o el secador sin escudo térmico evapora el agua interna del pelo decolorado (efecto bubble hair). Un buen termoprotector reduce el tiempo de secado un 50% y sella el brillo.",
      href: safeHref("/mejores-productos-capilares/mejores-protectores-termicos-cabello-decolorado-y-tenido/"),
    },
    {
      k: "aceite",
      name: "Aceites de Enlace (~$0.25/Gota)",
      img: null,
      icon: "✨",
      role: "Olaplex No. 7 Bonding Oil, K18 Oil y Moroccanoil Light",
      d: "El paso final de menor costo por aplicación: 2 a 3 gotas de aceite molecular sellan las puntas abiertas, controlan el frizz por 72 horas y protegen del calor sin manchar ni amarillear el rubio.",
      href: safeHref("/mejores-productos-capilares/mejores-aceites-capilares-para-puntas-decoloradas/"),
    },
  ];

  const metrics: MetricItem[] = [
    {
      v: 4,
      dec: 0,
      u: "min",
      l: "Tiempo de acción de K18Peptide",
      pct: 96,
      note: "Sin acondicionador previo y sin enjuagar",
    },
    {
      v: 4.5,
      dec: 1,
      u: "pH",
      l: "Punto ácido de sellado cuticular",
      pct: 94,
      note: "Cierra las escamas tras el tinte o decoloración",
    },
    {
      v: 1.45,
      dec: 2,
      u: "USD",
      l: "Costo medio por dosis Plex en casa",
      pct: 92,
      note: "Frente a $45–$80 USD por sesión en salón",
    },
    {
      v: 450,
      dec: 0,
      u: "°F",
      l: "Techo de blindaje termoprotector",
      pct: 95,
      note: "230 °C en Redken Leave-In y Olaplex No. 7",
    },
    {
      v: 50,
      dec: 0,
      u: "%",
      l: "Menos tiempo de secado con calor",
      pct: 89,
      note: "En cabello poroso con Kenra Blow-Dry Spray",
    },
    {
      v: 0.55,
      dec: 2,
      u: "USD",
      l: "Costo/uso récord en mascarilla proteica",
      pct: 97,
      note: "Elizavecca CER-100 (15-18 usos por < $10)",
    },
  ];

  const moments: Moment[] = [
    {
      img: ambient("home-k18-vs-olaplex", heroImg),
      t: "K18 vs. Olaplex No. 3",
      d: "Cuándo elegir el péptido sin enjuague de 4 minutos y cuándo el pre-champú de enlaces disulfuro según tu daño y costo por dosis.",
      href: safeHref("/comparativas/k18-vs-olaplex-no-3/"),
      alt: "Comparativa de tratamientos reparadores K18 y Olaplex sobre tocador de mármol",
    },
    {
      img: ambient("home-cabello-decolorado", heroImg),
      t: "Rescate de Cabello Chicloso",
      d: "Protocolo de emergencia en 3 lavados cuando el pelo decolorado se estira como chicle al mojarse.",
      href: safeHref("/mejores-productos-capilares/mejores-tratamientos-cabello-chicloso-y-elastico/"),
      alt: "Melena rubia decolorada recibiendo tratamiento reconstructor intensivo",
    },
    {
      img: ambient("home-mascarillas-capilares", heroImg),
      t: "Mascarillas: Hidratación vs. Proteína",
      d: "Olaplex No. 8 vs. Moroccanoil vs. Elizavecca CER-100: cómo saber si a tu pelo le falta agua, lípidos o queratina.",
      href: safeHref("/mejores-productos-capilares/mejores-mascarillas-cabello-tenido-y-decolorado/"),
      alt: "Textura cremosa de mascarilla capilar nutritiva aplicada sobre cabello teñido",
    },
    {
      img: ambient("home-champu-violeta", heroImg),
      t: "Matización sin Resecar el Rubio",
      d: "Olaplex No. 4P vs. Fanola No Yellow y No Orange: tiempos exactos al minuto según tu altura de tono.",
      href: safeHref("/comparativas/fanola-no-yellow-vs-olaplex-no-4p-blonde-enhancer/"),
      alt: "Aplicación de champú violeta matizador sobre mechas rubias balayage",
    },
    {
      img: ambient("home-protector-termico", heroImg),
      t: "Protectores Térmicos (450 °F)",
      d: "Color Wow Dream Coat vs. Redken Acidic Leave-In vs. Kenra Platinum: seca y plancha sin oxidar tu tinte.",
      href: safeHref("/mejores-productos-capilares/mejores-protectores-termicos-cabello-decolorado-y-tenido/"),
      alt: "Vaporización de spray protector térmico sobre cabello brillante antes del secado",
    },
    {
      img: ambient("home-costo-aplicacion", heroImg),
      t: "Ranking por Costo por Aplicación",
      d: "Calculamos cuántos pumps y dólares cuesta cada uso real en Amazon EE. UU. para que no desperdicies ni una gota.",
      href: safeHref("/mejores-productos-capilares/mejores-tratamientos-capilares-por-costo-por-aplicacion/"),
      alt: "Dosificación precisa de tratamiento capilar en mililitros y gotas",
    },
    {
      img: ambient("home-porosidad-capilar", heroImg),
      t: "Guía para Pelo Fino o Rizado Teñido",
      d: "Fórmulas ligeras que reparan sin apelmazar el cabello fino y mascarillas que devuelven el rizo tras las mechas.",
      href: safeHref("/mejores-productos-capilares/mejores-productos-cabello-fino-y-decolorado/"),
      alt: "Comparación de texturas de cabello fino liso y rizado teñido saludable",
    },
  ];

  const calculatorOptions: HairTreatmentTier[] = [
    {
      key: "k18",
      label: "K18 Mask 50 ml (Daño Severo / 4 Min)",
      bottleMl: 50,
      priceUsd: 58,
      mlPerPump: 1.0,
      defaultPumps: 1.5,
      waitTimeMin: 4,
      img: ambient("home-k18-vs-olaplex", heroImg),
      alt: "Tratamiento molecular sin enjuague K18 Leave-In Molecular Repair Mask",
      idealFor:
        "Cabello con decoloración alta, mechas balayage rubias, pelo chicloso al mojarse o quien busca máxima reparación sin enjuague en 4 minutos.",
      howToApply: "Leave-in post-champú (SIN acondicionador)",
      reviewHref: safeHref("/resenas-tratamientos-y-productos/k18-leave-in-molecular-repair-hair-mask/"),
      productKey: "K18_MASK_50ML",
    },
    {
      key: "olaplex3",
      label: "Olaplex No. 3 100 ml (Enlaces Disulfuro)",
      bottleMl: 100,
      priceUsd: 30,
      mlPerPump: 2.5,
      defaultPumps: 2,
      waitTimeMin: 20,
      img: ambient("home-cabello-decolorado", heroImg),
      alt: "Tratamiento pre-champú Olaplex No. 3 Hair Perfector",
      idealFor:
        "Mantenimiento semanal de cabello teñido, con mechas o que usa plancha y secador, fortaleciendo puentes disulfuro antes del lavado.",
      howToApply: "Pre-champú en cabello húmedo + lavar después",
      reviewHref: safeHref("/resenas-tratamientos-y-productos/olaplex-no-3-hair-perfector/"),
      productKey: "OLAPLEX_NO_3",
    },
    {
      key: "redken",
      label: "Redken Acidic Bonding 150 ml (Sellado pH)",
      bottleMl: 150,
      priceUsd: 34,
      mlPerPump: 3.0,
      defaultPumps: 2,
      waitTimeMin: 10,
      img: ambient("home-mascarillas-capilares", heroImg),
      alt: "Tratamiento ácido Redken Acidic Bonding Concentrate",
      idealFor:
        "Cabello teñido o decolorado de alta porosidad que se siente áspero, enredado y sin brillo y necesita sellar la cutícula con ácido cítrico.",
      howToApply: "Pre-champú 5-10 min o Leave-in térmico",
      reviewHref: safeHref("/resenas-tratamientos-y-productos/redken-acidic-bonding-concentrate-intensive-treatment/"),
      productKey: "REDKEN_ACIDIC_BONDING_TREATMENT",
    },
    {
      key: "elizavecca",
      label: "Elizavecca CER-100 100 ml (Económico < $10)",
      bottleMl: 100,
      priceUsd: 9,
      mlPerPump: 3.0,
      defaultPumps: 2,
      waitTimeMin: 5,
      img: ambient("home-costo-aplicacion", heroImg),
      alt: "Mascarilla coreana de colágeno y proteínas Elizavecca CER-100",
      idealFor:
        "El menor costo por aplicación de Amazon (~$0.54/uso): rellena con colágeno hidrolizado y ceramidas el cabello poroso en 5 minutos.",
      howToApply: "Post-champú 5 a 15 min y enjuagar",
      reviewHref: safeHref("/resenas-tratamientos-y-productos/elizavecca-cer-100-collagen-coating-protein-treatment/"),
      productKey: "ELIZAVECCA_CER_100",
    },
  ];

  const POPULAR_PATHS = [
    "/comparativas/k18-vs-olaplex-no-3/",
    "/mejores-productos-capilares/mejores-tratamientos-cabello-decolorado-amazon/",
    "/resenas-tratamientos-y-productos/k18-leave-in-molecular-repair-hair-mask/",
    "/resenas-tratamientos-y-productos/olaplex-no-3-hair-perfector/",
    "/comparativas/k18-vs-olaplex-vs-redken-acidic-bonding/",
    "/mejores-productos-capilares/mejores-protectores-termicos-cabello-decolorado-y-tenido/",
  ];
  const popular: Article[] = POPULAR_PATHS.map((p) => getByPath(p)).filter(
    Boolean
  ) as Article[];
  for (const a of all) {
    if (popular.length >= 6) break;
    if (!a.isPillar && !popular.includes(a)) popular.push(a);
  }

  const homeAmazon = getContextualAmazonProducts(
    "home",
    "mejores-productos-capilares",
    "Mejores Tratamientos para Cabello Teñido y Decolorado en Amazon"
  );

  return (
    <>
      <ReadingProgress />
      <Header variant="dark" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `${SITE_URL}/#webpage`,
              url: `${SITE_URL}/`,
              name: "Guía Capilar 2026: K18, Olaplex, Mascarillas y Protectores Térmicos por Costo por Aplicación",
              inLanguage: "es",
              isPartOf: { "@id": `${SITE_URL}/#website` },
              primaryImageOfPage: `${SITE_URL}${heroImg}`,
            },
            {
              "@type": "FAQPage",
              "@id": `${SITE_URL}/#faq`,
              mainEntity: FAQ.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }}
      />
      <main>
        {/* 1–2. Hero 3D Tilt + Partículas + Buscador */}
        <Hero heroImage={heroImg} />

        {/* 3. Doble Cinta Marquee en sentido opuesto */}
        <div className="relative border-b border-[var(--line)] bg-white py-5">
          <div className="marquee">
            {[0, 1].map((k) => (
              <div
                key={k}
                className="marquee-track font-display text-lg font-bold text-fxink/80"
                aria-hidden={k === 1}
              >
                {CLAIMS.map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-3 whitespace-nowrap"
                  >
                    <span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-gradient-to-br from-fxlime to-fxblue" />
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="marquee reverse mt-3" aria-hidden>
            {[0, 1].map((k) => (
              <div
                key={k}
                className="marquee-track text-sm font-semibold uppercase tracking-[0.14em] text-prune/75"
              >
                {CLAIMS_2.map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-3 whitespace-nowrap"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-drinklight" />
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 4. ¿Cómo elegir productos para cabello teñido o decolorado? + Mosaico Spotlight (.spot) */}
        <section id="que-es" className="wrap py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Guía Técnica en Español para Compradores en Amazon EE. UU.
              </span>
              <SplitHeading
                text="Recupera tu cabello teñido o decolorado,"
                accent={{
                  text: "eligiendo por ciencia y costo por aplicación",
                  className: "text-prune",
                }}
                className="section-title mt-3"
              />
              <p className="mt-5 text-lg text-[var(--muted)]" data-reveal>
                El <strong className="text-fxink">cabello teñido o decolorado</strong>{" "}
                sufre tres cambios estructurales distintos: ruptura de{" "}
                <strong className="text-fxink">
                  cadenas de queratina y puentes disulfuro
                </strong>{" "}
                en el córtex, apertura alcalina de la{" "}
                <strong className="text-fxink">cutícula (alta porosidad)</strong>{" "}
                y pérdida de la capa lipídica protectora 18-MEA. Por eso no
                todas las mascarillas sirven para el mismo daño.
              </p>
              <div
                className="mt-6 rounded-2xl border border-amber-300/60 bg-amber-50/70 p-5"
                data-reveal
              >
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-900">
                  🧬 Qué elegir en Amazon según el estado real de tu cabello
                </p>
                <ul className="mt-2 space-y-1.5 text-[0.95rem] text-fxink">
                  <li>
                    • <strong>Decoloración alta o pelo chicloso/elástico:</strong>{" "}
                    <strong>K18 Leave-In Molecular Repair Mask</strong>{" "}
                    reconecta cadenas polipeptídicas en 4 minutos sin
                    acondicionador (~$1.50–$2.40/uso).
                  </li>
                  <li>
                    • <strong>Mantenimiento de mechas, tinte y prevención de rotura:</strong>{" "}
                    <strong>Olaplex No. 3 Hair Perfector</strong> en cabello
                    húmedo antes del champú (~$1.35–$1.90/uso).
                  </li>
                  <li>
                    • <strong>Pelo poroso, áspero y que pierde el color rápido:</strong>{" "}
                    <strong>Redken Acidic Bonding Concentrate</strong> (pH 4.5) y{" "}
                    <strong>L’Oréal Metal Detox</strong> (~$1.15/uso).
                  </li>
                  <li>
                    • <strong>Presupuesto ajustado (<span className="font-bold">&lt; $10 en Amazon</span>):</strong>{" "}
                    <strong>Elizavecca CER-100</strong> aporta colágeno y
                    ceramidas por solo <strong>~$0.55 USD por aplicación</strong>.
                  </li>
                </ul>
              </div>
              <div className="mt-7 flex flex-wrap gap-3" data-reveal>
                <Link
                  href="/comparativas/k18-vs-olaplex-no-3/"
                  className="btn btn-buy shine"
                  data-magnetic
                >
                  Comparativa: K18 vs Olaplex No. 3
                </Link>
                <Link
                  href="/mejores-productos-capilares/mejores-mascarillas-cabello-tenido-y-decolorado/"
                  className="btn btn-ghost"
                  data-magnetic
                >
                  Ver mejores mascarillas en Amazon
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div
                className="relative col-span-2 aspect-[16/8] overflow-hidden rounded-3xl shadow-[0_30px_60px_-35px_rgba(30,15,5,0.6)]"
                data-reveal
              >
                <Image
                  src={ambient("home-k18-vs-olaplex", heroImg)}
                  alt="Tratamientos reconstructores capilares, mascarillas y sérums termoprotectores sobre tocador iluminado"
                  fill
                  sizes="(max-width:1024px) 100vw, 600px"
                  className="object-cover"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-fxink">
                  Comparativas por Tipo de Cabello, Uso y $/Aplicación
                </span>
              </div>
              {[
                [
                  "🧬",
                  "Tipo de Cabello",
                  "Recomendaciones diferenciadas para pelo fino que se apelmaza, medio, grueso o rizado decolorado.",
                ],
                [
                  "⏱️",
                  "Forma de Uso Exacta",
                  "Por qué K18 exige 4 min sin acondicionador y Olaplex No. 3 necesita humedad pre-champú.",
                ],
                [
                  "💲",
                  "Costo por Aplicación",
                  "Dividimos el precio de Amazon EE. UU. entre los mililitros o pumps reales que consume tu melena.",
                ],
                [
                  "🔥",
                  "Blindaje 450 °F",
                  "Protectores térmicos verificados para que la plancha y el secador no oxiden tu rubio ni tu tinte.",
                ],
              ].map(([e, t, d], i) => (
                <div
                  key={t}
                  className="card spot p-5"
                  data-reveal
                  data-reveal-delay={String(i)}
                >
                  <p className="text-2xl" aria-hidden>
                    {e}
                  </p>
                  <p className="mt-2 font-display text-lg font-bold leading-tight">
                    {t}
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. ScrollStory: Las 4 fases del rescate capilar post-decoloración */}
        <ScrollStory />

        {/* 6. Ciencia Molecular: Péptidos vs Enlaces Disulfuro vs Sellado Ácido (MolecularBondSvg) */}
        <section className="relative isolate overflow-hidden bg-[#120d0c] py-24 text-white">
          <div className="pointer-events-none absolute -left-40 top-10 h-[30rem] w-[30rem] rounded-full bg-fxblue/25 blur-3xl" />
          <div className="pointer-events-none absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-prune/40 blur-3xl" />
          <div className="hero-grid opacity-50" />
          <div className="wrap relative grid items-center gap-14 lg:grid-cols-2">
            <div>
              <span className="eyebrow !text-fxlime" data-reveal>
                Tricología Cosmética Explicada Fácil
              </span>
              <SplitHeading
                text="Por qué un reconstructor de enlaces"
                accent={{
                  text: "no es lo mismo que una mascarilla tradicional",
                  className: "text-gradient",
                }}
                className="section-title mt-3"
              />
              <p className="mt-5 text-lg text-white/75" data-reveal>
                Una mascarilla tradicional hidrata la superficie externa
                (cutícula), pero cuando decoloras o tiñes el cabello, el
                persulfato y el amoníaco rompen las{" "}
                <strong className="text-white">
                  cadenas de queratina y los puentes disulfuro (S-S)
                </strong>{" "}
                del córtex interno. En{" "}
                <strong className="text-white">GuíaCapilar.com</strong>{" "}
                analizamos qué molécula actúa en cada capa para que no compres
                dos productos que hacen lo mismo.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3" data-reveal>
                {[
                  ["🧬", "K18Peptide 4 Min"],
                  ["🔗", "Puentes Disulfuro"],
                  ["🍋", "Ácido Cítrico pH 4.5"],
                ].map(([e, t]) => (
                  <div key={t} className="glass p-4 text-center">
                    <p className="text-2xl" aria-hidden>
                      {e}
                    </p>
                    <p className="mt-1 text-sm font-semibold">{t}</p>
                  </div>
                ))}
              </div>
              <div className="glass mt-6 p-5 text-sm text-white/75" data-reveal>
                <strong className="text-white">
                  ¿Se pueden alternar K18, Olaplex y mascarillas hidratantes?
                </strong>{" "}
                Sí, y es la forma más rentable de cuidar el cabello decolorado:
                usas K18 durante los primeros 4 a 6 lavados post-decoloración y,
                una vez recuperada la firmeza, pasas a mantenimiento cada 3 o 4
                lavados alternando con una mascarilla hidratante sin proteínas
                como Olaplex No. 8 o Moroccanoil.
              </div>
              <div className="mt-7 flex flex-wrap gap-3" data-reveal>
                <Link
                  href={safeHref(
                    "/resenas-tratamientos-y-productos/k18-leave-in-molecular-repair-hair-mask/"
                  )}
                  className="btn btn-glass"
                  data-magnetic
                >
                  Análisis molecular y uso de K18 Mask
                </Link>
                <Link
                  href={safeHref(
                    "/comparativas/olaplex-no-3-vs-olaplex-no-8/"
                  )}
                  className="btn btn-glass"
                  data-magnetic
                >
                  Diferencia entre Olaplex No. 3 y No. 8
                </Link>
              </div>
            </div>
            <div data-reveal>
              <MolecularBondSvg />
            </div>
          </div>
        </section>

        {/* 7. Órbita interactiva de los 8 pilares del cabello teñido o decolorado */}
        <section className="wrap py-24">
          <ActiveIngredientsOrbit items={orbit} center={heroImg} />
        </section>

        {/* 8. Contadores animados + Tabla comparativa oficial de Costo por Aplicación */}
        <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#211513] via-[#191311] to-[#2e1c38] py-24 text-white">
          <div className="hero-aurora opacity-40" />
          <div className="wrap relative grid items-start gap-12 lg:grid-cols-[1.15fr_1.05fr]">
            <div>
              <span className="eyebrow !text-fxlime" data-reveal>
                Rendimiento y Costo Real en Dólares
              </span>
              <SplitHeading
                text="Compara el costo por aplicación"
                accent={{ text: "antes de comprar en Amazon", className: "text-gradient" }}
                className="section-title mt-3"
              />
              <p className="mt-4 max-w-xl text-white/70" data-reveal>
                Un envase pequeño ultra-concentrado puede salir más económico
                por aplicación que un bote grande diluido. Calculamos la dosis
                en mililitros, el tiempo de acción y el costo real por sesión.
              </p>
              <div className="mt-8">
                <MetricsCounters data={metrics} />
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/comparativas/k18-vs-olaplex-no-3/"
                  className="btn btn-lime shine text-sm"
                  data-magnetic
                >
                  K18 vs Olaplex No. 3 (Costo por Uso)
                </Link>
                <Link
                  href="/comparativas/olaplex-no-3-vs-elizavecca-cer-100/"
                  className="btn btn-glass text-sm"
                  data-magnetic
                >
                  Olaplex No. 3 vs Elizavecca CER-100
                </Link>
              </div>
            </div>

            <div
              className="rounded-3xl border border-white/15 bg-white/95 p-5 sm:p-6 text-fxink shadow-2xl"
              data-reveal
            >
              <span className="inline-block rounded-full bg-fxsky px-3 py-1 text-xs font-extrabold text-fxbluedeep">
                📊 Tabla Comparativa Oficial · Costo por Aplicación Amazon US
              </span>
              <h3 className="mt-2 font-display text-xl font-extrabold">
                Top 6 Tratamientos y Protectores Cara a Cara
              </h3>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--line)] bg-fxsky text-fxink font-display">
                      <th className="p-2.5">Producto</th>
                      <th className="p-2.5">Forma de Uso</th>
                      <th className="p-2.5">Costo / Uso</th>
                      <th className="p-2.5">Ideal Para</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--line)]">
                    <tr>
                      <td className="p-2.5 font-bold">K18 Mask (50 ml)</td>
                      <td className="p-2.5">Leave-in 4 min (Sin acond.)</td>
                      <td className="p-2.5 font-bold text-[#8d3d20]">~$1.55 – $2.30</td>
                      <td className="p-2.5">Decoloración alta / Chicloso</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Olaplex No. 3 (100 ml)</td>
                      <td className="p-2.5">Pre-champú 15-30 min húmedo</td>
                      <td className="p-2.5 font-bold text-[#8d3d20]">~$1.35 – $1.85</td>
                      <td className="p-2.5">Enlaces S-S / Mechas y Calor</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Redken Acidic Bonding</td>
                      <td className="p-2.5">Pre-champú 10m / Leave-in</td>
                      <td className="p-2.5 font-bold text-[#8d3d20]">~$1.15 – $1.45</td>
                      <td className="p-2.5">Porosidad alta / Sellado pH 4.5</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Elizavecca CER-100</td>
                      <td className="p-2.5">Mascarilla 5-15 min enjuague</td>
                      <td className="p-2.5 font-bold text-emerald-700">~$0.50 – $0.65</td>
                      <td className="p-2.5">Colágeno + Ceramidas económico</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">L’Oréal Metal Detox Mask</td>
                      <td className="p-2.5">Post-champú 3-5 min</td>
                      <td className="p-2.5 font-bold text-[#8d3d20]">~$1.10 – $1.35</td>
                      <td className="p-2.5">Anti-metales agua dura / Balayage</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Olaplex No. 7 Bonding Oil</td>
                      <td className="p-2.5">2-3 gotas (Termoprot. 450 °F)</td>
                      <td className="p-2.5 font-bold text-emerald-700">~$0.25 / uso</td>
                      <td className="p-2.5">120+ usos / Puntas y Brillo</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-[11px] text-[var(--muted)]">
                Cálculo basado en melena media (dosis estándar recomendada por el
                fabricante) a precios vigentes en Amazon Estados Unidos.
              </p>
            </div>
          </div>
        </section>

        {/* 9. Comparador interactivo Antes ↔ Después (Cutícula Decolorada Porosa vs Sellada) */}
        <section className="wrap py-24">
          <div className="mb-10 grid items-end gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Transformación Estructural de la Fibra
              </span>
              <SplitHeading
                text="De una cutícula abierta y porosa,"
                accent={{
                  text: "a una hebra reconstruida y sellada a pH 4.5",
                  className: "text-prune",
                }}
                className="section-title mt-3"
              />
            </div>
            <p className="text-lg text-[var(--muted)]" data-reveal>
              Arrastra el control: observa cómo el cabello recién decolorado
              tiene las escamas levantadas (pH alcalino 8.5) por donde escapa el
              color, y cómo el combo de{" "}
              <strong className="text-fxink">reconstructor molecular (K18 / Olaplex)</strong>{" "}
              más <strong className="text-fxink">sellador ácido y termoprotector</strong>{" "}
              devuelve el brillo espejo.
            </p>
          </div>
          <div data-reveal>
            <CuticleComparisonSlider />
          </div>
        </section>

        {/* 10. MomentsCarousel 4:5 */}
        <section className="overflow-hidden bg-fxsky py-24">
          <div className="wrap">
            <div className="mb-10 max-w-2xl">
              <span className="eyebrow" data-reveal>
                Protocolos visuales paso a paso
              </span>
              <SplitHeading
                text="Domina cada producto de tu"
                accent={{
                  text: "rutina para cabello teñido o decolorado",
                  className: "text-fxbluedeep",
                }}
                className="section-title mt-3"
              />
            </div>
            <MomentsCarousel items={moments} />
          </div>
        </section>

        {/* 11. Calculadora Interactiva de Costo por Aplicación + Recomendador Amazon */}
        <section id="calculadora" className="wrap py-24">
          <div className="mb-10 grid items-end gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Simulador de Dosificación y Costo por Uso
              </span>
              <SplitHeading
                text="Calcula cuánto te cuesta cada aplicación"
                accent={{
                  text: "según el largo de tu cabello",
                  className: "text-prune",
                }}
                className="section-title mt-3"
              />
            </div>
            <ul className="grid gap-2 text-[var(--muted)] text-sm" data-reveal>
              {[
                "Compara K18 (50 ml), Olaplex No. 3 (100 ml), Redken Acidic y Elizavecca",
                "Ajusta el largo y densidad de tu cabello para ver mililitros y usos reales",
                "Enlaces directos a Amazon.com (EE. UU.) y Amazon.es (España)",
                "Asesora Capilar IA en línea (modelo mini rápido) para armar tu rutina",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-fxlime/25 text-sm text-[#8d3d20]">
                    ✓
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal>
            <CostPerApplicationCalculator options={calculatorOptions} />
          </div>

          {/* Vitrina Amazon Showcase en la Home */}
          <div className="mt-12" data-reveal>
            <AmazonAffiliateBox
              variant="showcase"
              sectionTitle={homeAmazon.sectionTitle}
              sectionSubtitle={homeAmazon.sectionSubtitle}
              products={homeAmazon.products}
              source="home"
            />
          </div>
        </section>

        {/* 12. Bento Grid de los 12 Silos + Las 6 Guías Más Consultadas */}
        <section className="bg-gradient-to-b from-white to-fxsky py-24">
          <div className="wrap">
            <div className="mb-10 max-w-2xl">
              <span className="eyebrow" data-reveal>
                Arquitectura de 12 Silos Temáticos · 600 Artículos
              </span>
              <SplitHeading
                text="Explora nuestras 600 guías capilares"
                accent={{
                  text: "sin canibalización y 100% prácticas",
                  className: "text-fxbluedeep",
                }}
                className="section-title mt-3"
              />
            </div>
            <div className="grid auto-rows-[minmax(190px,auto)] gap-5 md:grid-cols-2 lg:grid-cols-4">
              {cats.map((c, i) => {
                const count = getArticlesIn(c.slug).length;
                const big = i === 0;
                const wide = i === 1 || i === 2;
                return (
                  <Link
                    key={c.slug}
                    href={`/${c.slug}/`}
                    className={`card spot group flex flex-col p-6 sm:p-7 ${
                      big
                        ? "spot-dark border-transparent bg-gradient-to-br from-[#211513] via-[#6b468f] to-[#b85d3b] text-white md:col-span-2 lg:row-span-2"
                        : ""
                    } ${wide ? "lg:col-span-2" : ""}`}
                    data-reveal
                    data-reveal-delay={String(i % 4)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={`grid h-12 w-12 place-items-center rounded-2xl text-2xl ${
                          big ? "bg-white/15" : "bg-fxsky"
                        }`}
                        aria-hidden
                      >
                        {ICONS[c.icon] || "✨"}
                      </span>
                      <div className="flex items-center gap-2">
                        {c.isTransactional && (
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${
                              big
                                ? "bg-amber-400 text-slate-950"
                                : "bg-amber-100 text-amber-900"
                            }`}
                          >
                            🛒 Transaccional Amazon
                          </span>
                        )}
                        <span
                          className={`text-xs font-bold uppercase tracking-wider ${
                            big ? "text-fxlime" : "text-fxbluedeep"
                          }`}
                        >
                          {count} guías
                        </span>
                      </div>
                    </div>
                    <h3
                      className={`mt-5 font-display font-extrabold ${
                        big ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"
                      }`}
                    >
                      {c.name}
                    </h3>
                    <p
                      className={`mt-2 text-sm ${
                        big ? "text-white/80" : "text-[var(--muted)]"
                      }`}
                    >
                      {c.description}
                    </p>
                    {big && (
                      <ul className="mt-6 space-y-2 text-sm text-white/85">
                        {getArticlesIn(c.slug)
                          .slice(0, 6)
                          .map((a) => (
                            <li key={a.path}>→ {a.title}</li>
                          ))}
                      </ul>
                    )}
                    <span
                      className={`mt-auto pt-5 text-sm font-semibold ${
                        big ? "text-fxlime" : "text-fxbluedeep"
                      }`}
                    >
                      Explorar silo completo →
                    </span>
                  </Link>
                );
              })}
            </div>

            {popular.length > 0 && (
              <div className="mt-16">
                <h3
                  className="font-display text-2xl font-extrabold sm:text-3xl"
                  data-reveal
                >
                  Las 6 reseñas y comparativas más consultadas
                </h3>
                <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {popular.slice(0, 6).map((a) => (
                    <div key={a.path} data-reveal>
                      <ArticleCard a={a} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 13. Criterio Editorial E-E-A-T de CARLOS LINGAN BORJA */}
        <section className="wrap py-24">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Rigor Técnico & Transparencia
              </span>
              <SplitHeading
                text="Análisis capilar por ingrediente y dosis,"
                accent={{
                  text: "pensado para compradores en Amazon",
                  className: "text-prune",
                }}
                className="section-title mt-3"
              />
              <p className="mt-5 text-lg text-[var(--muted)]" data-reveal>
                Dirigido por <strong className="text-fxink">{LEGAL_OWNER}</strong>{" "}
                ({LEGAL_LOCATION} ·{" "}
                <a
                  href={`mailto:${LEGAL_EMAIL}`}
                  className="text-fxblue underline"
                >
                  {LEGAL_EMAIL}
                </a>
                ), en GuíaCapilar.com evaluamos cada mascarilla, tratamiento
                reconstructor, champú y protector térmico verificando su
                formulación INCI, su protocolo exacto en minutos y su costo real
                por aplicación en dólares.
              </p>
              <div className="mt-7 flex flex-wrap gap-3" data-reveal>
                <Link
                  href="/politica-editorial/"
                  className="btn btn-ghost"
                  data-magnetic
                >
                  Nuestra metodología editorial
                </Link>
                <Link
                  href="/sobre-nosotros/"
                  className="btn btn-ghost"
                  data-magnetic
                >
                  Sobre Carlos Lingan Borja
                </Link>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="card spot p-6" data-reveal>
                <span className="inline-flex rounded-full bg-fxlime/25 px-3 py-1 text-xs font-bold text-[#8d3d20]">
                  ✓ Lo que verificamos en cada producto
                </span>
                <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                  <li>• Activo reparador (Péptidos, Bis-Aminopropyl, AHA/Ácido Cítrico)</li>
                  <li>• Compatibilidad por grosor (fino, medio, grueso) y porosidad</li>
                  <li>• Orden de aplicación (pre-champú vs leave-in sin acondicionador)</li>
                  <li>• Costo matemático por dosis ($/uso) según mililitros o pumps</li>
                </ul>
              </div>
              <div
                className="card spot p-6"
                data-reveal
                data-reveal-delay="1"
              >
                <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">
                  🛒 Transparencia Amazon Associates
                </span>
                <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                  <li>• Enlaces directos a Amazon.com (guia-capilar-20)</li>
                  <li>• Soporte dual para Amazon.es (guia-capilar-21)</li>
                  <li>• Comparativas independientes sin patrocinios de marcas</li>
                  <li>• Nota legal: {HAIRCARE_DISCLAIMER}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 14. FAQ */}
        <section className="wrap pb-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Preguntas frecuentes
              </span>
              <SplitHeading
                text="Todo lo que debes saber antes de elegir tu tratamiento"
                className="section-title mt-3"
              />
              <p className="mt-4 text-[var(--muted)]" data-reveal>
                ¿Dudas entre K18, Olaplex No. 3, Redken Acidic Bonding o qué
                mascarilla y protector térmico usar? Nuestra Asesora Capilar IA
                te responde al instante.
              </p>
              <div className="mt-6 flex flex-wrap gap-3" data-reveal>
                <OpenChatButton
                  label="Preguntar a la Asesora Capilar IA"
                  className="btn btn-buy"
                />
                <Link href="/comparativas/" className="btn btn-ghost">
                  Ver todas las comparativas
                </Link>
              </div>
            </div>
            <div className="space-y-3">
              {FAQ.map((f) => (
                <details
                  key={f.q}
                  className="card card-static group p-5 open:shadow-lg"
                  data-reveal
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold">
                    {f.q}
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-fxsky text-fxbluedeep transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[var(--muted)]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 15. CTA Aurora Final */}
        <section className="wrap pb-6">
          <div className="relative isolate overflow-hidden rounded-[36px] bg-gradient-to-br from-[#211513] via-[#6b468f] to-[#b85d3b] px-6 py-14 text-white sm:px-14 sm:py-20">
            <Image
              src={heroImg}
              alt=""
              fill
              sizes="1200px"
              className="-z-[2] object-cover opacity-20 mix-blend-luminosity"
            />
            <div className="hero-grid opacity-60" />
            <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-drinklight/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 left-10 h-80 w-80 rounded-full bg-fxlime/25 blur-3xl" />
            <div className="relative grid items-center gap-10 lg:grid-cols-[1.35fr_1fr]">
              <div className="text-center lg:text-left">
                <SplitHeading
                  text="Devuélvele la fuerza y el brillo a tu cabello"
                  accent={{
                    text: "sin gastar de más por aplicación",
                    className: "text-fxlime",
                  }}
                  className="text-4xl font-extrabold sm:text-5xl"
                />
                <p className="mt-4 text-lg text-white/85">
                  Consulta nuestro ranking actualizado con análisis de costo por
                  dosis, precios y envío rápido en Amazon Estados Unidos (
                  <code>guia-capilar-20</code>) y Amazon España (
                  <code>guia-capilar-21</code>).
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                  <Link
                    href="/mejores-productos-capilares/mejores-tratamientos-cabello-decolorado-amazon/"
                    className="btn btn-lime shine text-base"
                    data-magnetic
                  >
                    🏆 Ver Ranking Top 9 en Amazon
                  </Link>
                  <OpenChatButton
                    label="Pedir diagnóstico a la Asesora IA"
                    className="btn btn-glass text-base"
                    magnetic
                  />
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-[340px]">
                <div className="absolute inset-[12%] rounded-full bg-white/20 blur-3xl" />
                <div className="float-y relative aspect-[4/3] overflow-hidden rounded-3xl border-2 border-white/25 shadow-2xl">
                  <Image
                    src={heroImg}
                    alt="Tratamientos recomendados para cabello teñido o decolorado en Amazon"
                    fill
                    sizes="340px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ClientEffects stickySource="home-sticky" />
    </>
  );
}
