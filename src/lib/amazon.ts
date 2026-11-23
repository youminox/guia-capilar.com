export const AMAZON_TAG_US = "guia-capilar-20";
export const AMAZON_TAG_ES = "guia-capilar-21";

export type AmazonStoreRegion = "US" | "ES";

export type AmazonCategoryType =
  | "bond-builder"
  | "hair-mask"
  | "shampoo-toner"
  | "heat-protectant"
  | "hair-oil-serum"
  | "hair-accessory";

export interface AmazonProductRecommendation {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  features: string[];
  rating: string;
  reviewsCount: string;
  categoryType: AmazonCategoryType;
  specs?: {
    hairType: string;
    howToUse: string;
    costPerUse: string;
    yieldCount: string;
  };
  asinUS?: string;
  asinES?: string;
  queryUS: string;
  queryES: string;
  ctaLabel: string;
}

/**
 * Genera el enlace oficial de afiliado Amazon según la región:
 * - EE. UU. / Latinoamérica / Global (US - Predeterminado): amazon.com con tag=guia-capilar-20
 * - España / Europa (ES): amazon.es con tag=guia-capilar-21
 */
export function buildAmazonUrl(
  product: AmazonProductRecommendation,
  region: AmazonStoreRegion
): string {
  if (region === "ES") {
    if (product.asinES) {
      return `https://www.amazon.es/dp/${product.asinES}?tag=${AMAZON_TAG_ES}`;
    }
    const q = encodeURIComponent(product.queryES);
    return `https://www.amazon.es/s?k=${q}&tag=${AMAZON_TAG_ES}`;
  }

  if (product.asinUS) {
    return `https://www.amazon.com/dp/${product.asinUS}?tag=${AMAZON_TAG_US}`;
  }
  const q = encodeURIComponent(product.queryUS);
  return `https://www.amazon.com/s?k=${q}&tag=${AMAZON_TAG_US}`;
}

/**
 * Detecta automáticamente la región del visitante.
 * Por defecto prioriza Amazon Estados Unidos ("US") y activa "ES" si navega desde España/Europa.
 */
export function detectUserAmazonRegion(): AmazonStoreRegion {
  if (typeof window === "undefined") {
    return "US";
  }
  try {
    const saved = window.localStorage.getItem("gc_amazon_region");
    if (saved === "US" || saved === "ES") return saved;
  } catch {
    // ignore
  }
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const lang = (navigator.language || "").toLowerCase();
    if (
      tz === "Europe/Madrid" ||
      tz === "Atlantic/Canary" ||
      tz === "Europe/Ceuta" ||
      tz.startsWith("Europe/") ||
      lang === "es-es"
    ) {
      return "ES";
    }
    return "US";
  } catch {
    return "US";
  }
}

export const CATALOG: Record<string, AmazonProductRecommendation> = {
  K18_MASK_50ML: {
    id: "k18-leave-in-molecular-repair-mask",
    badge: "🏆 #1 Rescate Post-Decoloración · Péptido en 4 Min",
    title: "K18 Leave-In Molecular Repair Hair Mask (50 ml / 15 ml) — Tratamiento Bio-Péptido Sin Enjuague",
    subtitle:
      "El tratamiento biotecnológico más potente en Amazon Estados Unidos para cabello decolorado, elástico o chicloso: su péptido patentado sh-Oligopeptide-78 reconecta cadenas de queratina y puentes disulfuro en solo 4 minutos sin necesidad de enjuagar.",
    features: [
      "Modo de uso crítico: lavar solo con champú (NO usar acondicionador), secar con toalla, aplicar 1 a 3 pumps y esperar 4 minutos exactos",
      "Alta concentración: rinde entre 25 y 50 aplicaciones en el formato de 50 ml (solo se necesita 1 a 2 ml por sesión)",
      "Reconstruye de forma progresiva la elasticidad del cabello rubio platinado, con mechas balayage o procesado químicamente",
    ],
    rating: "4.6",
    reviewsCount: "24.800+",
    categoryType: "bond-builder",
    specs: {
      hairType: "Decolorado / Chicloso / Teñido",
      howToUse: "Leave-in 4 min (Sin acondicionador)",
      costPerUse: "~$1.50 – $2.40 USD / aplicación",
      yieldCount: "25 a 50 aplicaciones (50 ml)",
    },
    queryUS: "K18 Leave-In Molecular Repair Hair Mask 50ml",
    queryES: "K18 Leave-In Molecular Repair Hair Mask 50ml",
    ctaLabel: "Ver Precio y Oferta de K18 Mask en Amazon",
  },
  OLAPLEX_NO_3: {
    id: "olaplex-no-3-hair-perfector",
    badge: "🧬 Estándar de Oro en Enlaces Disulfuro · Mejor $/Uso",
    title: "Olaplex No. 3 Hair Perfector (100 ml / 250 ml) — Reconstructor Pre-Champú de Enlaces Capilares",
    subtitle:
      "El tratamiento reparador de enlaces disulfuro más vendido del mundo con Bis-Aminopropyl Diglycol Dimaleate: fortalece la estructura interna del cabello teñido o con mechas antes del lavado con un excelente costo por aplicación.",
    features: [
      "Forma de uso correcta: aplicar sobre cabello húmedo (no seco) antes del champú, dejar actuar de 10 a 30 minutos y luego lavar con champú y acondicionador",
      "Excelente rentabilidad: el envase de 100 ml rinde entre 15 y 22 aplicaciones (~$1.35 a $1.90 USD por uso)",
      "Previene la rotura mecánica por cepillado, plancha o decoloraciones sucesivas en todo tipo de cabello",
    ],
    rating: "4.6",
    reviewsCount: "118.000+",
    categoryType: "bond-builder",
    specs: {
      hairType: "Teñido / Mechas / Dañado por Calor",
      howToUse: "Pre-champú 10-30 min en húmedo",
      costPerUse: "~$1.35 – $1.90 USD / aplicación",
      yieldCount: "16 a 22 aplicaciones (100 ml)",
    },
    queryUS: "Olaplex No 3 Hair Perfector Repairing Treatment",
    queryES: "Olaplex No 3 Hair Perfector Tratamiento Reparador",
    ctaLabel: "Consultar Precio de Olaplex No. 3 en Amazon",
  },
  REDKEN_ACIDIC_BONDING_TREATMENT: {
    id: "redken-acidic-bonding-concentrate",
    badge: "🧪 Mejor Sellador de pH Ácido · 14% Bonding Complex",
    title: "Redken Acidic Bonding Concentrate Intensive Pre-Treatment & Leave-In — Reparación Ácida pH 4.5",
    subtitle:
      "Sistema profesional con ácido cítrico y complejo de cuidado de enlaces al 14% que cierra la cutícula abierta por el tinte o la decoloración desde la primera aplicación, devolviendo suavidad inmediata.",
    features: [
      "Equilibra el pH alcalino que dejan la decoloración y el agua dura, sellando la cutícula porosa al instante",
      "Reduce la rotura en un 56% y las puntas abiertas visibles en un 82% cuando se combina con su Leave-In térmico",
      "Costo por aplicación muy competitivo (~$1.10 a $1.50 USD por dosis) con rendimiento de más de 20 usos",
    ],
    rating: "4.7",
    reviewsCount: "16.400+",
    categoryType: "bond-builder",
    specs: {
      hairType: "Porosidad Alta / Teñido / Decolorado",
      howToUse: "Pre-champú 5-10 min o Leave-in",
      costPerUse: "~$1.15 – $1.50 USD / aplicación",
      yieldCount: "22 a 28 aplicaciones (150 ml)",
    },
    queryUS: "Redken Acidic Bonding Concentrate Intensive Treatment",
    queryES: "Redken Acidic Bonding Concentrate Tratamiento Intensivo",
    ctaLabel: "Ver Redken Acidic Bonding en Amazon",
  },
  OLAPLEX_NO_0: {
    id: "olaplex-no-0-intensive-bond-building",
    badge: "⚡ Multiplicador x3 con Olaplex No. 3",
    title: "Olaplex No. 0 Intensive Bond Building Hair Treatment (155 ml) — Primer Molecular Pre-No. 3",
    subtitle:
      "Prepara la fibra capilar con la mayor concentración de la molécula patentada Olaplex para triplicar la absorción y reparación cuando se aplica 10 minutos antes del Olaplex No. 3.",
    features: [
      "Boquilla aplicadora o spray que satura uniformemente las zonas más porosas sin desperdiciar líquido",
      "Paso 1: aplicar en cabello seco o ligeramente húmedo 10 min · Paso 2: aplicar Olaplex No. 3 encima otros 10-20 min",
      "Logra un 68% más de reparación y un cabello 3 veces más fuerte que usando el paso 3 en solitario",
    ],
    rating: "4.5",
    reviewsCount: "29.500+",
    categoryType: "bond-builder",
    specs: {
      hairType: "Decoloración Extrema / Poroso",
      howToUse: "10 min antes de Olaplex No. 3",
      costPerUse: "~$1.60 USD / aplicación",
      yieldCount: "15 a 20 aplicaciones (155 ml)",
    },
    queryUS: "Olaplex No 0 Intensive Bond Building Hair Treatment",
    queryES: "Olaplex No 0 Intensive Bond Building Treatment",
    ctaLabel: "Ver Olaplex No. 0 en Amazon",
  },
  ELIZAVECCA_CER_100: {
    id: "elizavecca-cer-100-collagen-coating",
    badge: "💰 Mejor Costo por Aplicación (< $0.60/Uso) · Keratina & Ceramidas",
    title: "Elizavecca CER-100 Collagen Coating Hair Protein Treatment (100 ml) — Mascarilla Coreana de Colágeno",
    subtitle:
      "El fenómeno viral de Amazon Estados Unidos por menos de $10: mascarilla reconstructora con colágeno hidrolizado, ceramida 3, proteína de soja y alantoína que rellena la hebra porosa en 5 minutos.",
    features: [
      "Costo por aplicación imbatible: menos de $0.55 USD por uso (rinde de 15 a 18 aplicaciones por tubo)",
      "Efecto desenredante y suavizante inmediato en cabello áspero o reseco tras tinte, mechas o plancha",
      "Se aplica después del champú durante 5 a 15 minutos y se enjuaga con agua tibia",
    ],
    rating: "4.4",
    reviewsCount: "48.200+",
    categoryType: "hair-mask",
    specs: {
      hairType: "Poroso / Seco / Necesitado de Proteína",
      howToUse: "Post-champú 5 a 15 min y enjuagar",
      costPerUse: "~$0.50 – $0.65 USD / aplicación",
      yieldCount: "15 a 18 aplicaciones (100 ml)",
    },
    queryUS: "Elizavecca CER-100 Collagen Coating Hair Protein Treatment",
    queryES: "Elizavecca CER-100 Collagen Coating Protein Treatment",
    ctaLabel: "Ver Oferta de Elizavecca CER-100 en Amazon",
  },
  LOREAL_METAL_DETOX_MASK: {
    id: "loreal-metal-detox-mask",
    badge: "🛡️ Anti-Metales y Agua Dura · Protege el Color",
    title: "L’Oréal Professionnel Metal Detox Mask (250 ml) — Mascarilla Quelante con Glicoamina para Pelo Teñido",
    subtitle:
      "Formulada con Glicoamina al 10%, una molécula suficientemente pequeña para penetrar dentro de la fibra y neutralizar el cobre y los metales del agua de ducha que oxidan el rubio y rompen el cabello decolorado.",
    features: [
      "Evita que el cabello rubio o con balayage cambie de tono o adquiera reflejos verdosos/anaranjados con los lavados",
      "Reduce un 87% el riesgo de rotura capilar y aporta una nutrición cremosa de salón en solo 3 a 5 minutos",
      "Envase generoso de 250 ml que rinde entre 30 y 40 aplicaciones",
    ],
    rating: "4.7",
    reviewsCount: "7.800+",
    categoryType: "hair-mask",
    specs: {
      hairType: "Teñido / Balayage / Zonas de Agua Dura",
      howToUse: "Post-champú 3-5 min con enjuague",
      costPerUse: "~$1.10 – $1.40 USD / aplicación",
      yieldCount: "30 a 40 aplicaciones (250 ml)",
    },
    queryUS: "L'Oreal Professionnel Metal Detox Mask 250ml",
    queryES: "L'Oréal Professionnel Metal Detox Mascarilla 250ml",
    ctaLabel: "Ver L’Oréal Metal Detox Mask en Amazon",
  },
  LOREAL_METAL_DETOX_SHAMPOO: {
    id: "loreal-metal-detox-shampoo",
    badge: "🚿 Mejor Champú Quelante Sin Sulfatos · Post-Color",
    title: "L’Oréal Professionnel Metal Detox Anti-Metal Cleansing Cream Shampoo (300 ml)",
    subtitle:
      "Champú profesional en crema libre de sulfatos agresivos que desintoxica el cabello de partículas de cobre, cloro y calcio acumuladas por el agua sin barrer el pigmento del tinte.",
    features: [
      "Fórmula cremosa ultra-concentrada que hace espuma rica con solo una moneda pequeña de producto",
      "Mantiene el 93% de la intensidad del color después de semanas de lavado y potencia la acción de K18 u Olaplex",
      "Rinde más de 50 lavados reales (~$0.70 USD por lavado)",
    ],
    rating: "4.7",
    reviewsCount: "9.400+",
    categoryType: "shampoo-toner",
    specs: {
      hairType: "Todo Cabello Teñido o con Mechas",
      howToUse: "Champú principal 1 a 2 veces/semana",
      costPerUse: "~$0.70 – $0.85 USD / lavado",
      yieldCount: "45 a 55 lavados (300 ml)",
    },
    queryUS: "L'Oreal Professionnel Metal Detox Shampoo 300ml",
    queryES: "L'Oréal Professionnel Metal Detox Champú 300ml",
    ctaLabel: "Ver L’Oréal Metal Detox Shampoo en Amazon",
  },
  OLAPLEX_NO_4_SHAMPOO: {
    id: "olaplex-no-4-bond-maintenance-shampoo",
    badge: "💧 Ultra-Concentrado · Rinde +60 Lavados",
    title: "Olaplex No. 4 Bond Maintenance Shampoo (250 ml) — Champú Reparador Sin Sulfatos",
    subtitle:
      "Champú altamente concentrado sin sulfatos SLS/SLES ni parabenos que limpia suavemente mientras repara enlaces y sella la humedad en cabellos teñidos o decolorados.",
    features: [
      "Textura densa: basta con una gota del tamaño de un guisante emulsionada en las manos para cubrir toda la melena",
      "Uno de los champús de gama alta con menor costo real por lavado (~$0.45 a $0.55 USD por aplicación)",
      "pH balanceado que evita el encrespamiento y protege los tonos rubios, cobrizos y castaños",
    ],
    rating: "4.6",
    reviewsCount: "64.000+",
    categoryType: "shampoo-toner",
    specs: {
      hairType: "Teñido / Decolorado / Seco",
      howToUse: "Emulsionar 1 gota en manos y lavar",
      costPerUse: "~$0.48 – $0.58 USD / lavado",
      yieldCount: "55 a 65 lavados (250 ml)",
    },
    queryUS: "Olaplex No 4 Bond Maintenance Shampoo 250ml",
    queryES: "Olaplex No 4 Bond Maintenance Champú 250ml",
    ctaLabel: "Ver Olaplex No. 4 Shampoo en Amazon",
  },
  OLAPLEX_NO_4P_TONING: {
    id: "olaplex-no-4p-blonde-enhancer-toning-shampoo",
    badge: "💜 Mejor Champú Violeta que No Reseca · Rubios & Balayage",
    title: "Olaplex No. 4P Blonde Enhancer Toning Shampoo (250 ml) — Matizador Violeta Reparador",
    subtitle:
      "Neutraliza los tonos amarillos y anaranjados no deseados en cabellos rubios, decolorados o con canas mientras reconstruye los enlaces capilares sin dejar la fibra áspera.",
    features: [
      "Tiempo de exposición personalizable: 1 a 3 minutos para refrescar el rubio, o hasta 5 minutos para platinado frío",
      "3 veces más brillo que los champús morados convencionales gracias a la tecnología reparadora Olaplex",
      "Fórmula sin sulfatos que rinde más de 45 matizaciones en casa",
    ],
    rating: "4.6",
    reviewsCount: "21.300+",
    categoryType: "shampoo-toner",
    specs: {
      hairType: "Rubio Decolorado / Mechas / Platinado",
      howToUse: "1 a 5 min sobre pelo mojado",
      costPerUse: "~$0.65 USD / matización",
      yieldCount: "45 a 55 aplicaciones (250 ml)",
    },
    queryUS: "Olaplex No 4P Blonde Enhancer Toning Purple Shampoo",
    queryES: "Olaplex No 4P Blonde Enhancer Champú Violeta Matizador",
    ctaLabel: "Ver Olaplex No. 4P Violeta en Amazon",
  },
  FANOLA_NO_YELLOW: {
    id: "fanola-no-yellow-shampoo",
    badge: "⚡ Pigmento Violeta Ultra-Potente · Anti-Amarillo",
    title: "Fanola No Yellow Shampoo (350 ml / 1000 ml) — Champú Matizador Profesional de Alta Intensidad",
    subtitle:
      "El champú violeta profesional italiano más famoso en Amazon para neutralizar en minutos el amarillo huevo o dorado intenso tras una decoloración nivel 8, 9 o 10.",
    features: [
      "Concentración máxima de pigmento violeta ácido que apaga el reflejo amarillo en 1 a 3 minutos",
      "Enorme ahorro por mililitro en sus formatos de 350 ml y 1 litro (~$0.25 a $0.35 USD por uso)",
      "Recomendado combinar siempre después con una mascarilla hidratante profunda como Olaplex No. 8 o Moroccanoil",
    ],
    rating: "4.5",
    reviewsCount: "71.500+",
    categoryType: "shampoo-toner",
    specs: {
      hairType: "Rubio Nivel 8-10 / Balayage Frío",
      howToUse: "1 a 3 min con guantes + Mascarilla",
      costPerUse: "~$0.25 – $0.38 USD / aplicación",
      yieldCount: "45 a 120 aplicaciones",
    },
    queryUS: "Fanola No Yellow Purple Shampoo 350ml",
    queryES: "Fanola No Yellow Champú Violeta Matizador 350ml",
    ctaLabel: "Ver Fanola No Yellow en Amazon",
  },
  FANOLA_NO_ORANGE: {
    id: "fanola-no-orange-shampoo",
    badge: "💙 Mejor Champú Azul Anti-Naranja · Bases Castañas",
    title: "Fanola No Orange Shampoo (350 ml) — Champú Azul Matizador contra Reflejos Naranjas y Cobrizos",
    subtitle:
      "Formulado con pigmento azul puro (opuesto al naranja en el círculo cromático) para neutralizar los tonos oxidados o cobrizos en cabellos castaños teñidos o con mechas caramelo.",
    features: [
      "Neutraliza eficazmente los subtonos naranjas y rojizos en alturas de tono 5, 6 y 7",
      "Enriquecido con aceite de coco y extracto de flor de tiaré para aportar más suavidad que el champú morado",
      "Excelente rendimiento con más de 40 aplicaciones por botella",
    ],
    rating: "4.5",
    reviewsCount: "32.100+",
    categoryType: "shampoo-toner",
    specs: {
      hairType: "Castaño Teñido / Mechas Naranjas",
      howToUse: "2 a 4 min en cabello húmedo",
      costPerUse: "~$0.30 – $0.40 USD / aplicación",
      yieldCount: "40 a 50 aplicaciones (350 ml)",
    },
    queryUS: "Fanola No Orange Blue Shampoo 350ml",
    queryES: "Fanola No Orange Champú Azul Matizador 350ml",
    ctaLabel: "Ver Fanola No Orange Azul en Amazon",
  },
  COLOR_WOW_DREAM_COAT: {
    id: "color-wow-dream-coat-supernatural-spray",
    badge: "✨ #1 Protector Térmico & Escudo Anti-Humedad 72h",
    title: "Color Wow Dream Coat Supernatural Spray (200 ml) — Sellador Térmico Efecto Espejo Anti-Frizz",
    subtitle:
      "Polímero activado por el calor del secador que envuelve cada hebra porosa o decolorada en un velo impermeable invisible, bloqueando el frizz y la humedad durante 3 a 4 lavados.",
    features: [
      "Ideal para cabello teñido o decolorado porque la decoloración vuelve la hebra hidrofílica (absorbe humedad y se esponja)",
      "Se aplica generosamente por secciones sobre cabello húmedo y se activa secando con tensión y aire caliente",
      "Como su efecto dura 3 a 4 lavados, el costo real por semana de uso es sorprendentemente bajo",
    ],
    rating: "4.5",
    reviewsCount: "88.500+",
    categoryType: "heat-protectant",
    specs: {
      hairType: "Teñido / Decolorado con Frizz / Poroso",
      howToUse: "En húmedo cada 3-4 lavados + Secador",
      costPerUse: "~$1.40 USD (Dura 3 a 4 lavados)",
      yieldCount: "18 a 22 aplicaciones completas",
    },
    queryUS: "Color Wow Dream Coat Supernatural Spray 200ml",
    queryES: "Color Wow Dream Coat Supernatural Spray Anti-Frizz 200ml",
    ctaLabel: "Ver Color Wow Dream Coat en Amazon",
  },
  REDKEN_ACIDIC_LEAVE_IN: {
    id: "redken-acidic-bonding-leave-in",
    badge: "🔥 Mejor Protector Térmico Reparador (450 °F / 230 °C)",
    title: "Redken Acidic Bonding Concentrate Leave-In Treatment (150 ml) — Termoprotector y Sellador de Puntas",
    subtitle:
      "Crema sin enjuague con ácido cítrico que protege el cabello decolorado del calor de secadores y planchas hasta 450 °F (230 °C) mientras continúa sellando la cutícula durante todo el día.",
    features: [
      "Protección térmica certificada hasta 450 °F (230 °C) que evita que el calor degrade el tinte o queme las puntas",
      "Desenreda sin esfuerzo el cabello mojado post-ducha evitando la rotura por tracción del cepillo",
      "Rinde más de 40 aplicaciones gracias a su textura concentrada (~$0.75 USD por uso)",
    ],
    rating: "4.7",
    reviewsCount: "14.200+",
    categoryType: "heat-protectant",
    specs: {
      hairType: "Decolorado / Teñido / Uso de Secador o Plancha",
      howToUse: "Aplicar en medios y puntas húmedos",
      costPerUse: "~$0.75 – $0.90 USD / aplicación",
      yieldCount: "38 a 48 aplicaciones (150 ml)",
    },
    queryUS: "Redken Acidic Bonding Concentrate Leave-In Treatment",
    queryES: "Redken Acidic Bonding Concentrate Leave-In Protector Térmico",
    ctaLabel: "Ver Redken Acidic Leave-In en Amazon",
  },
  KENRA_PLATINUM_BLOW_DRY: {
    id: "kenra-platinum-blow-dry-spray",
    badge: "⏱️ Reduce 50% el Tiempo de Secado · Termoprotector 428 °F",
    title: "Kenra Platinum Blow-Dry Spray (100 ml / 200 ml) — Protector Térmico Acelerador de Secado",
    subtitle:
      "El secreto de los estilistas en EE. UU. para cabello decolorado de alta porosidad que tarda una eternidad en secarse: reduce a la mitad el tiempo de exposición al calor del secador.",
    features: [
      "Disminuye un 50% el tiempo de secado, reduciendo drásticamente el daño térmico acumulado en el cabello rubio",
      "Escudo térmico hasta 428 °F (220 °C) con acabado sedoso y ligero que no engrasa el cabello fino",
      "Fragancia de salón de lujo y pulverizador de bruma ultra-fina de alto rendimiento",
    ],
    rating: "4.7",
    reviewsCount: "26.400+",
    categoryType: "heat-protectant",
    specs: {
      hairType: "Porosidad Alta / Fino a Medio / Decolorado",
      howToUse: "Vaporizar en húmedo antes del secador",
      costPerUse: "~$0.60 – $0.80 USD / secado",
      yieldCount: "40 a 60 aplicaciones",
    },
    queryUS: "Kenra Platinum Blow-Dry Spray Thermal Protectant",
    queryES: "Kenra Platinum Blow-Dry Spray Protector Térmico",
    ctaLabel: "Ver Kenra Platinum Blow-Dry Spray en Amazon",
  },
  OLAPLEX_NO_8_MASK: {
    id: "olaplex-no-8-bond-intense-moisture-mask",
    badge: "💦 Hidratación 4-en-1 con Dosificador Airless Exacto",
    title: "Olaplex No. 8 Bond Intense Moisture Mask (100 ml) — Mascarilla Hidratante Reparadora",
    subtitle:
      "El complemento hidratante indispensable para quienes usan Olaplex No. 3 o K18: aporta 2 veces más brillo, 4 veces más hidratación y 6 veces más suavidad con dosificador al vacío que mide cada pump.",
    features: [
      "Envase airless que aprovecha el 100% del producto: 1 pump para cabello corto/fino, 2 pumps para melena media",
      "Compensa la sequedad tras tratamientos reconstructores o champús matizadores violetas en solo 10 minutos",
      "Fórmula sin peso que mantiene el movimiento natural del cabello teñido",
    ],
    rating: "4.6",
    reviewsCount: "23.100+",
    categoryType: "hair-mask",
    specs: {
      hairType: "Decolorado Seco / Después de Olaplex No. 3",
      howToUse: "1 a 2 pumps por 10 min post-champú",
      costPerUse: "~$0.95 – $1.20 USD / aplicación",
      yieldCount: "25 a 35 aplicaciones (100 ml)",
    },
    queryUS: "Olaplex No 8 Bond Intense Moisture Mask",
    queryES: "Olaplex No 8 Bond Intense Moisture Mascarilla",
    ctaLabel: "Ver Olaplex No. 8 Mask en Amazon",
  },
  OLAPLEX_NO_7_OIL: {
    id: "olaplex-no-7-bonding-oil",
    badge: "✨ 125+ Aplicaciones por Frasco · Brillo & Calor 450 °F",
    title: "Olaplex No. 7 Bonding Oil (30 ml) — Aceite Reparador Ultra-Concentrado con Protección Térmica",
    subtitle:
      "Uno de los productos con menor costo por aplicación del mercado capilar: solo se necesitan 2 a 3 gotas para sellar puntas decoloradas, potenciar el color y proteger del calor hasta 450 °F (232 °C).",
    features: [
      "Dosificador por gotero de precisión: rinde más de 120 aplicaciones (~$0.25 USD por uso)",
      "No contiene pigmentos oscuros que alteren o amarilleen el cabello rubio platinado o ceniza",
      "Se puede mezclar con Olaplex No. 6 o aplicar en seco después del peinado para brillo espejo",
    ],
    rating: "4.7",
    reviewsCount: "52.000+",
    categoryType: "hair-oil-serum",
    specs: {
      hairType: "Todo Tipo / Rubios Platinados / Puntas Secas",
      howToUse: "2-3 gotas en húmedo o seco (Protector 450°F)",
      costPerUse: "~$0.25 USD / aplicación",
      yieldCount: "110 a 130 aplicaciones (30 ml)",
    },
    queryUS: "Olaplex No 7 Bonding Oil 30ml",
    queryES: "Olaplex No 7 Bonding Oil Aceite Capilar 30ml",
    ctaLabel: "Ver Olaplex No. 7 Bonding Oil en Amazon",
  },
  K18_DETOX_SHAMPOO: {
    id: "k18-peptide-prep-detox-shampoo",
    badge: "🧼 Paso Previo Oficial de K18 · Elimina Metales y Siliconas",
    title: "K18 Peptide Prep Detox Shampoo (250 ml) — Champú Clarificante Seguro para el Color",
    subtitle:
      "Formulado con ácido salicílico y carbón activado para eliminar el 99% de la acumulación de productos, el 95% del sebo y el 76% del cobre del agua antes de aplicar la mascarilla K18.",
    features: [
      "Despeja los poros de la cutícula para que el péptido K18 penetre al córtex sin barreras de siliconas pesadas",
      "pH optimizado (3.8–4.2) que no abre la cutícula ni deslava el tinte",
      "Se usa solo 1 vez por semana (o antes de tu sesión de K18), por lo que un envase dura de 6 a 9 meses",
    ],
    rating: "4.6",
    reviewsCount: "4.900+",
    categoryType: "shampoo-toner",
    specs: {
      hairType: "Pre-Tratamiento K18 / Acumulación / Agua Dura",
      howToUse: "1 vez por semana antes de K18 Mask",
      costPerUse: "~$0.75 USD / lavado detox",
      yieldCount: "45 a 55 lavados (250 ml)",
    },
    queryUS: "K18 Peptide Prep Detox Shampoo 250ml",
    queryES: "K18 Peptide Prep Detox Champú 250ml",
    ctaLabel: "Ver K18 Detox Shampoo en Amazon",
  },
  WELLA_ULTIMATE_REPAIR: {
    id: "wella-ultimate-repair-miracle-hair-rescue",
    badge: "⚡ Reparación en 90 Segundos · AHA + Omega-9",
    title: "Wella Professionals Ultimate Repair Miracle Hair Rescue (30 ml / 95 ml) — Spray Reconstructor",
    subtitle:
      "Tratamiento sin enjuague en spray de lujo que combina Alfa-Hidroxiácidos (AHA) para reconstruir enlaces internos y Omega-9 para rellenar la barrera lipídica externa en solo 90 segundos.",
    features: [
      "Ideal para quienes buscan la rapidez de un spray sin enjuague (actúa en 90 segundos sobre pelo húmedo)",
      "99% menos de rotura al cepillar el cabello decolorado mojado y 12 veces más suavidad",
      "Permite aplicar protector térmico o crema de peinar inmediatamente después de los 90 segundos",
    ],
    rating: "4.6",
    reviewsCount: "4.200+",
    categoryType: "bond-builder",
    specs: {
      hairType: "Decolorado / Fino a Grueso / Sin Tiempo",
      howToUse: "5-10 sprays en húmedo, esperar 90 s",
      costPerUse: "~$1.30 – $1.75 USD / aplicación",
      yieldCount: "20 a 30 aplicaciones (95 ml)",
    },
    queryUS: "Wella Professionals Ultimate Repair Miracle Hair Rescue",
    queryES: "Wella Professionals Ultimate Repair Miracle Hair Rescue",
    ctaLabel: "Ver Wella Ultimate Repair en Amazon",
  },
  MOROCCANOIL_HYDRATING_MASK: {
    id: "moroccanoil-intense-hydrating-mask",
    badge: "🥑 Mejor Nutrición Lipídica con Aceite de Argán",
    title: "Moroccanoil Intense Hydrating Mask (250 ml) — Mascarilla de Hidratación Profunda en 5 Minutos",
    subtitle:
      "Mascarilla rica y cremosa libre de proteínas pesadas, ideal para devolver elasticidad, brillo y suavidad de seda al cabello teñido o decolorado que se siente rígido y áspero.",
    features: [
      "Fórmula sin proteínas: perfecta para alternar con K18, Olaplex o Elizavecca sin causar sobrecarga proteica",
      "Rica en aceite de argán antioxidante que sella la humedad en 5 a 7 minutos sin necesitar calor",
      "Envase de 250 ml de alto rendimiento (~30 aplicaciones reales)",
    ],
    rating: "4.8",
    reviewsCount: "19.800+",
    categoryType: "hair-mask",
    specs: {
      hairType: "Medio a Grueso / Seco / Rígido por Decoloración",
      howToUse: "5 a 7 min en cabello secado con toalla",
      costPerUse: "~$1.20 – $1.45 USD / aplicación",
      yieldCount: "28 a 35 aplicaciones (250 ml)",
    },
    queryUS: "Moroccanoil Intense Hydrating Mask 250ml",
    queryES: "Moroccanoil Mascarilla Hidratante Intensa 250ml",
    ctaLabel: "Ver Moroccanoil Hydrating Mask en Amazon",
  },
  BRIOGEO_DONT_DESPAIR: {
    id: "briogeo-dont-despair-repair-mask",
    badge: "🌿 Mejor Mascarilla Clean Sin Siliconas · Balance Proteína/Humedad",
    title: "Briogeo Don’t Despair, Repair! Deep Conditioning Hair Mask (236 ml)",
    subtitle:
      "Clínicamente probada para fortalecer el cabello dañado hasta 2 veces tras tres usos: combina aceite de rosa mosqueta, vitaminas B, extracto de algas y biotina sin siliconas ni sulfatos.",
    features: [
      "Equilibrio perfecto entre lípidos vegetales y aminoácidos ligeros que no saturan la fibra",
      "Apta para el Método Curly en cabellos rizados u ondulados que han pasado por tinte o mechas",
      "97% de ingredientes de origen natural y segura para todo tipo de coloración",
    ],
    rating: "4.5",
    reviewsCount: "11.600+",
    categoryType: "hair-mask",
    specs: {
      hairType: "Rizado / Ondulado / Liso Teñido Clean",
      howToUse: "10 min post-champú 1 vez/semana",
      costPerUse: "~$1.30 USD / aplicación",
      yieldCount: "25 a 30 aplicaciones (236 ml)",
    },
    queryUS: "Briogeo Don't Despair Repair Deep Conditioning Hair Mask",
    queryES: "Briogeo Don't Despair Repair Mascarilla Capilar",
    ctaLabel: "Ver Briogeo Don’t Despair, Repair! en Amazon",
  },
  PUREOLOGY_HYDRATE_SHAMPOO: {
    id: "pureology-hydrate-shampoo",
    badge: "🌱 #1 en Salones de EE. UU. para Retención de Tinte",
    title: "Pureology Hydrate Shampoo & Conditioner (ZeroSulfate 266 ml) — Protección Antifade del Color",
    subtitle:
      "El champú vegano sin sulfatos favorito de los coloristas en Estados Unidos: su complejo patentado Antifade Complex con filtro UV y aceite de jojoba hidrata a fondo sin arrastrar el tinte.",
    features: [
      "Fórmula ZeroSulfate ultra-concentrada que rinde más de 70 lavados por botella",
      "Ideal para tintes difíciles de mantener como cobrizos, rojos, rubios beige y castaños chocolate",
      "Aroma de aromaterapia con lavanda, bergamota y menta fresca",
    ],
    rating: "4.7",
    reviewsCount: "27.400+",
    categoryType: "shampoo-toner",
    specs: {
      hairType: "Cabello Teñido Seco / Cobrizos / Rubios",
      howToUse: "Aplicar poca cantidad con abundante agua",
      costPerUse: "~$0.50 – $0.60 USD / lavado",
      yieldCount: "60 a 75 lavados (266 ml)",
    },
    queryUS: "Pureology Hydrate Shampoo ZeroSulfate Color Treated Hair",
    queryES: "Pureology Hydrate Champú Cabello Teñido Sin Sulfatos",
    ctaLabel: "Ver Pureology Hydrate en Amazon",
  },
  KERASTASE_BLOND_ABSOLU: {
    id: "kerastase-blond-absolu-cicaextreme-cicaplasme",
    badge: "💎 Lujo de Salón para Rubios · Ácido Hialurónico + Edelweiss",
    title: "Kérastase Blond Absolu Masque Ultra-Violet / Cicaextreme & Sérum Térmico Cicaplasme",
    subtitle:
      "La línea de alta costura capilar diseñada específicamente para rubios decolorados: rellena la fibra con ácido hialurónico de doble peso molecular y flor de Edelweiss antioxidante.",
    features: [
      "Cicaplasme ofrece protección térmica hasta 450 °F (230 °C) con filtro UV y pigmento lavanda iluminador",
      "Masque Cicaextreme repara un 94% la fibra sensibilizada post-mechas sin restar movimiento",
      "Perfume de alta perfumería francesa y resultados visibles desde la primera aplicación",
    ],
    rating: "4.7",
    reviewsCount: "13.900+",
    categoryType: "hair-mask",
    specs: {
      hairType: "Rubio Decolorado / Mechas Balayage Premium",
      howToUse: "Mascarilla 5 min + Sérum Cicaplasme sin enjuague",
      costPerUse: "~$1.60 – $2.10 USD / aplicación",
      yieldCount: "30 a 40 aplicaciones",
    },
    queryUS: "Kerastase Blond Absolu Masque Cicaextreme Cicaplasme",
    queryES: "Kérastase Blond Absolu Mascarilla Cicaplasme Rubio",
    ctaLabel: "Ver Línea Kérastase Blond Absolu en Amazon",
  },
  CHI_44_IRON_GUARD: {
    id: "chi-44-iron-guard-thermal-spray",
    badge: "💵 Mejor Protector Térmico para Plancha Calidad-Precio",
    title: "CHI 44 Iron Guard Thermal Protection Spray (237 ml) — Escudo Cerámico para Plancha y Tenacilla",
    subtitle:
      "Uno de los protectores térmicos más vendidos en Amazon EE. UU. con proteínas de seda y compuestos cerámicos que crean un escudo deslizante para la plancha por menos de $0.25 USD por uso.",
    features: [
      "Permite que las placas de la plancha se deslicen sin enganchar ni tirar del cabello teñido",
      "Excelente costo por aplicación: menos de $0.25 USD por sesión en un envase de 237 ml (8 oz)",
      "Fórmula sin sulfatos ni parabenos que aporta brillo y control sin dejar residuo pegajoso",
    ],
    rating: "4.6",
    reviewsCount: "61.200+",
    categoryType: "heat-protectant",
    specs: {
      hairType: "Todo Cabello Teñido que Usa Plancha o Rizador",
      howToUse: "Vaporizar por secciones antes del calor",
      costPerUse: "~$0.22 – $0.28 USD / aplicación",
      yieldCount: "65 a 80 aplicaciones (237 ml)",
    },
    queryUS: "CHI 44 Iron Guard Thermal Protection Spray 8 oz",
    queryES: "CHI 44 Iron Guard Spray Protector Térmico 237ml",
    ctaLabel: "Ver CHI 44 Iron Guard en Amazon",
  },
  LIVING_PROOF_TRIPLE_BOND: {
    id: "living-proof-triple-bond-complex",
    badge: "🔬 Reconstruye los 3 Tipos de Enlaces + Calor 450 °F",
    title: "Living Proof Triple Bond Complex (45 ml) — Reconstructor Semanal Sin Enjuague con Termoprotección",
    subtitle:
      "Desarrollado con tecnología patentada 3D Fortifying que reconstruye enlaces de hidrógeno, iónicos y covalentes (disulfuro) y además incluye protección térmica hasta 450 °F (232 °C).",
    features: [
      "Ahorra tiempo y dinero al integrar el tratamiento reconstructor semanal y el protector térmico en un solo paso",
      "Deja el cabello 8 veces más fuerte frente a la rotura por cepillado y herramientas de calor",
      "Solo requiere esperar 10 minutos antes de secar con secador para activar su red covalente",
    ],
    rating: "4.5",
    reviewsCount: "3.800+",
    categoryType: "bond-builder",
    specs: {
      hairType: "Fino a Medio Decolorado / Uso de Secador",
      howToUse: "2 pumps en húmedo, 10 min y secar con calor",
      costPerUse: "~$1.80 USD / aplicación (2-en-1)",
      yieldCount: "22 a 28 aplicaciones (45 ml)",
    },
    queryUS: "Living Proof Triple Bond Complex Hair Strengthener",
    queryES: "Living Proof Triple Bond Complex Tratamiento Capilar",
    ctaLabel: "Ver Living Proof Triple Bond en Amazon",
  },
  COLOR_WOW_MONEY_MASQUE: {
    id: "color-wow-money-masque",
    badge: "✨ Mejor Mascarilla Ligera para Cabello Fino Decolorado",
    title: "Color Wow Money Masque (215 ml) — Mascarilla Hidratante de Brillo Espejo Sin Peso",
    subtitle:
      "Creada por Chris Appleton con algas marinas del Mediterráneo y complejo fortalecedor que hidrata profundamente el cabello fino y decolorado sin aplastarlo ni quitarle volumen.",
    features: [
      "Penetra en 3 a 5 minutos sin dejar película grasa ni ceras pesadas sobre la hebra fina",
      "Protección térmica integrada y acabado de cabello brillante y suelto",
      "Rinde más de 30 aplicaciones gracias a su textura gel-crema ultra extensible",
    ],
    rating: "4.6",
    reviewsCount: "9.100+",
    categoryType: "hair-mask",
    specs: {
      hairType: "Cabello Fino Teñido o Decolorado",
      howToUse: "3 a 5 min post-champú y enjuagar",
      costPerUse: "~$1.35 USD / aplicación",
      yieldCount: "30 a 35 aplicaciones (215 ml)",
    },
    queryUS: "Color Wow Money Masque Deep Hydrating Hair Mask",
    queryES: "Color Wow Money Masque Mascarilla Hidratante",
    ctaLabel: "Ver Color Wow Money Masque en Amazon",
  },
  WET_BRUSH_MICROFIBER_KIT: {
    id: "wet-brush-shower-filter-care",
    badge: "🛡️ Kit Anti-Rotura Mecánica & Filtro de Ducha",
    title: "Cepillo Antirotura Wet Brush / Unbrush + Toalla de Microfibra para Cabello Decolorado",
    subtitle:
      "El 40% de la rotura en el cabello decolorado ocurre al desenredarlo mojado o frotarlo con toalla de algodón: este combo elimina la tracción mecánica en el momento más frágil de la fibra.",
    features: [
      "Cerdas ultra-flexibles IntelliFlex que ceden ante los nudos sin estirar ni cortar la hebra elástica mojada",
      "Toalla turbante de microfibra que absorbe el exceso de agua por presión suave antes de aplicar K18 o mascarillas",
      "Inversión única que dura años y multiplica los resultados de tus tratamientos",
    ],
    rating: "4.8",
    reviewsCount: "94.000+",
    categoryType: "hair-accessory",
    specs: {
      hairType: "Imprescindible en Todo Cabello Decolorado",
      howToUse: "En ducha con acondicionador y al salir",
      costPerUse: "< $0.05 USD / uso (Duración +2 años)",
      yieldCount: "Uso diario ilimitado",
    },
    queryUS: "Wet Brush Original Detangler Hair Brush Microfiber Hair Towel",
    queryES: "Wet Brush Cepillo Desenredante Toalla Microfibra Pelo",
    ctaLabel: "Ver Cepillos Antirotura y Microfibra en Amazon",
  },
};

/**
 * Selecciona contextualmente los 3 productos de Amazon más relevantes para cualquier página o artículo
 * de guia-capilar.com, además de un competidor directo si es una comparativa VS.
 */
export function getContextualAmazonProducts(
  slug: string,
  category: string,
  title: string
): {
  sectionTitle: string;
  sectionSubtitle: string;
  products: [
    AmazonProductRecommendation,
    AmazonProductRecommendation,
    AmazonProductRecommendation,
  ];
  vsCompetitor?: AmazonProductRecommendation;
} {
  const text = `${slug} ${category} ${title}`.toLowerCase();

  // 1. Duelos directos K18 vs Olaplex
  if (text.includes("k18") && text.includes("olaplex")) {
    return {
      sectionTitle: "K18 vs Olaplex: Los 3 Productos Clave en Amazon con Mejor Costo por Aplicación",
      sectionSubtitle:
        "Compara precios actualizados, tamaños y disponibilidad con envío rápido en Amazon Estados Unidos y España.",
      products: [
        CATALOG.K18_MASK_50ML,
        CATALOG.OLAPLEX_NO_3,
        CATALOG.OLAPLEX_NO_8_MASK,
      ],
      vsCompetitor: CATALOG.OLAPLEX_NO_3,
    };
  }

  // 2. Duelos con Redken Acidic Bonding
  if (text.includes("redken") && (text.includes("k18") || text.includes("olaplex"))) {
    const first = text.includes("k18") ? CATALOG.K18_MASK_50ML : CATALOG.OLAPLEX_NO_3;
    return {
      sectionTitle: "Comparativa de Reconstructores Capilares y Selladores de pH en Amazon",
      sectionSubtitle:
        "Elige según el nivel de decoloración, porosidad y costo real por aplicación.",
      products: [
        first,
        CATALOG.REDKEN_ACIDIC_BONDING_TREATMENT,
        CATALOG.REDKEN_ACIDIC_LEAVE_IN,
      ],
      vsCompetitor: CATALOG.REDKEN_ACIDIC_BONDING_TREATMENT,
    };
  }

  // 3. Artículos centrados en K18
  if (text.includes("k18")) {
    return {
      sectionTitle: "Rutina Oficial K18 Biomimetic Hairscience en Amazon",
      sectionSubtitle:
        "Prepara la cutícula sin acondicionador con el champú detox, repara en 4 minutos y sella con protección térmica.",
      products: [
        CATALOG.K18_MASK_50ML,
        CATALOG.K18_DETOX_SHAMPOO,
        CATALOG.REDKEN_ACIDIC_LEAVE_IN,
      ],
      vsCompetitor: CATALOG.WELLA_ULTIMATE_REPAIR,
    };
  }

  // 4. Artículos sobre Elizavecca o alternativas económicas
  if (text.includes("elizavecca") || text.includes("cer-100") || text.includes("econom") || text.includes("barat")) {
    return {
      sectionTitle: "Mejores Tratamientos por Costo por Aplicación en Amazon EE. UU.",
      sectionSubtitle:
        "Desde la mascarilla coreana de colágeno de menos de $0.60/uso hasta los reconstructores moleculares líderes.",
      products: [
        CATALOG.ELIZAVECCA_CER_100,
        CATALOG.OLAPLEX_NO_3,
        CATALOG.CHI_44_IRON_GUARD,
      ],
      vsCompetitor: CATALOG.OLAPLEX_NO_3,
    };
  }

  // 5. Champús violetas, azules, matización, rubios, naranja o balayage
  if (
    text.includes("violeta") ||
    text.includes("morado") ||
    text.includes("azul") ||
    text.includes("fanola") ||
    text.includes("4p") ||
    text.includes("matiz") ||
    text.includes("amarill") ||
    text.includes("naranja") ||
    text.includes("rubio") ||
    text.includes("platin") ||
    text.includes("balayage") ||
    category === "cabello-tenido-y-matizacion"
  ) {
    const isOrange = text.includes("naranja") || text.includes("no-orange") || text.includes("brass") || text.includes("castan");
    return {
      sectionTitle: isOrange
        ? "Mejores Champús Azules Anti-Naranja y Protectores de Color en Amazon"
        : "Mejores Champús Violetas Matizadores y Mascarillas para Rubios en Amazon",
      sectionSubtitle:
        "Neutraliza reflejos amarillos o naranjas sin resecar la fibra decolorada y mantén el brillo de salón.",
      products: isOrange
        ? [
            CATALOG.FANOLA_NO_ORANGE,
            CATALOG.LOREAL_METAL_DETOX_MASK,
            CATALOG.PUREOLOGY_HYDRATE_SHAMPOO,
          ]
        : [
            CATALOG.OLAPLEX_NO_4P_TONING,
            CATALOG.FANOLA_NO_YELLOW,
            CATALOG.KERASTASE_BLOND_ABSOLU,
          ],
      vsCompetitor: isOrange ? CATALOG.PUREOLOGY_HYDRATE_SHAMPOO : CATALOG.FANOLA_NO_YELLOW,
    };
  }

  // 6. Protectores térmicos, secador, plancha, calor, frizz
  if (
    text.includes("termic") ||
    text.includes("plancha") ||
    text.includes("secador") ||
    text.includes("calor") ||
    text.includes("dream-coat") ||
    text.includes("kenra") ||
    text.includes("chi-44") ||
    text.includes("450") ||
    category === "protectores-termicos-y-secado"
  ) {
    return {
      sectionTitle: "Mejores Protectores Térmicos (450 °F / 230 °C) para Cabello Teñido o Decolorado",
      sectionSubtitle:
        "Evita que el secador o la plancha oxiden tu color o quemen las puntas con escudos térmicos de bajo costo por uso.",
      products: [
        CATALOG.COLOR_WOW_DREAM_COAT,
        CATALOG.REDKEN_ACIDIC_LEAVE_IN,
        CATALOG.KENRA_PLATINUM_BLOW_DRY,
      ],
      vsCompetitor: CATALOG.KENRA_PLATINUM_BLOW_DRY,
    };
  }

  // 7. Champús sin sulfatos, agua dura, metal detox, quelantes
  if (
    text.includes("champu") ||
    text.includes("sulfato") ||
    text.includes("metal-detox") ||
    text.includes("quelante") ||
    text.includes("cloro") ||
    text.includes("agua-dura") ||
    text.includes("pureology") ||
    category === "champus-sulfatos-y-lavado"
  ) {
    return {
      sectionTitle: "Mejores Champús Sin Sulfatos y Quelantes Anti-Metales en Amazon",
      sectionSubtitle:
        "Limpia el cabello teñido o decolorado eliminando cobre, calcio y cloro sin arrastrar el tinte.",
      products: [
        CATALOG.LOREAL_METAL_DETOX_SHAMPOO,
        CATALOG.PUREOLOGY_HYDRATE_SHAMPOO,
        CATALOG.OLAPLEX_NO_4_SHAMPOO,
      ],
      vsCompetitor: CATALOG.PUREOLOGY_HYDRATE_SHAMPOO,
    };
  }

  // 8. Mascarillas, hidratación, proteínas, keratina, moroccanoil, briogeo
  if (
    text.includes("mascarilla") ||
    text.includes("hidrat") ||
    text.includes("protein") ||
    text.includes("queratina") ||
    text.includes("moroccanoil") ||
    text.includes("briogeo") ||
    text.includes("money-masque") ||
    category === "mascarillas-hidratacion-y-proteinas"
  ) {
    return {
      sectionTitle: "Mejores Mascarillas para Cabello Teñido y Decolorado en Amazon",
      sectionSubtitle:
        "Alterna reconstrucción proteica e hidratación lipídica profunda según la elasticidad de tu cabello.",
      products: [
        CATALOG.OLAPLEX_NO_8_MASK,
        CATALOG.MOROCCANOIL_HYDRATING_MASK,
        CATALOG.ELIZAVECCA_CER_100,
      ],
      vsCompetitor: CATALOG.MOROCCANOIL_HYDRATING_MASK,
    };
  }

  // 9. Artículos sobre Olaplex específico
  if (text.includes("olaplex")) {
    return {
      sectionTitle: "Sistema Reparador de Enlaces Olaplex en Amazon Estados Unidos",
      sectionSubtitle:
        "Combina los pasos exactos que tu cabello necesita para maximizar la reparación y reducir el costo por aplicación.",
      products: [
        CATALOG.OLAPLEX_NO_3,
        CATALOG.OLAPLEX_NO_0,
        CATALOG.OLAPLEX_NO_7_OIL,
      ],
      vsCompetitor: CATALOG.K18_MASK_50ML,
    };
  }

  // 10. Cabello fino, rizado o porosidad
  if (
    text.includes("fino") ||
    text.includes("rizado") ||
    text.includes("porosidad") ||
    category === "tipo-de-cabello-y-porosidad"
  ) {
    return {
      sectionTitle: "Tratamientos Adaptados a tu Porosidad y Grosor Capilar en Amazon",
      sectionSubtitle:
        "Fórmulas que reparan y sellan la cutícula sin apelmazar el cabello fino ni restar definición a los rizos.",
      products: [
        CATALOG.COLOR_WOW_MONEY_MASQUE,
        CATALOG.LIVING_PROOF_TRIPLE_BOND,
        CATALOG.BRIOGEO_DONT_DESPAIR,
      ],
      vsCompetitor: CATALOG.LIVING_PROOF_TRIPLE_BOND,
    };
  }

  // 11. Default / Decolorado, Costo por aplicación, Ciencia capilar y Home
  return {
    sectionTitle: "Top 3 Tratamientos para Cabello Teñido o Decolorado en Amazon EE. UU.",
    sectionSubtitle:
      "Los 3 reconstructores mejor valorados por resultados clínicos, facilidad de uso en casa y costo real por aplicación.",
    products: [
      CATALOG.K18_MASK_50ML,
      CATALOG.OLAPLEX_NO_3,
      CATALOG.REDKEN_ACIDIC_BONDING_TREATMENT,
    ],
    vsCompetitor: CATALOG.OLAPLEX_NO_3,
  };
}
