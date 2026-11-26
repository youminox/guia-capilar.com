import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-sync-key",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") || "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY =
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const SITE = "https://guia-capilar.com";
const ALLOWED_MODELS = ["gpt-4o-mini", "gpt-4o"];
const AMAZON_TAG_US = "guia-capilar-20";
const AMAZON_TAG_ES = "guia-capilar-21";

export interface ArticleRow {
  slug: string;
  title: string;
  category: string;
  category_name: string;
  excerpt: string | null;
  featured_image: string | null;
  read_time: string | null;
  search_text: string | null;
}

export interface ArticleCard {
  slug: string;
  title: string;
  category: string;
  categoryName: string;
  url: string;
  image: string;
  readTime: string;
  excerpt: string;
}

export interface AmazonProductCard {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  rating: string;
  reviewsCount: string;
  urlUS: string;
  urlES: string;
}

const AMAZON_PRODUCTS: Record<string, AmazonProductCard> = {
  "k18-leave-in-molecular-repair-mask": {
    id: "k18-leave-in-molecular-repair-mask",
    badge: "🏆 #1 Rescate Post-Decoloración · Péptido en 4 Min",
    title: "K18 Leave-In Molecular Repair Hair Mask (50 ml / 15 ml) — Tratamiento Bio-Péptido Sin Enjuague",
    subtitle:
      "Reconecta cadenas de queratina y puentes disulfuro en 4 minutos sin acondicionador previo.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("K18 Leave-In Molecular Repair Hair Mask 50ml")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("K18 Leave-In Molecular Repair Hair Mask 50ml")}&tag=${AMAZON_TAG_ES}`,
  },
  "olaplex-no-3-hair-perfector": {
    id: "olaplex-no-3-hair-perfector",
    badge: "🧬 Estándar de Oro en Enlaces Disulfuro · ~$1.45/Uso",
    title: "Olaplex No. 3 Hair Perfector (100 ml / 250 ml) — Reconstructor Pre-Champú de Enlaces Capilares",
    subtitle:
      "Reconstruye puentes disulfuro en cabello húmedo de 15 a 30 min antes del champú.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Olaplex No 3 Hair Perfector Repairing Treatment")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Olaplex No 3 Hair Perfector Tratamiento Reparador")}&tag=${AMAZON_TAG_ES}`,
  },
  "redken-acidic-bonding-concentrate": {
    id: "redken-acidic-bonding-concentrate",
    badge: "🧪 Mejor Sellador de pH Ácido 4.5 · 14% Bonding Complex",
    title: "Redken Acidic Bonding Concentrate Intensive Pre-Treatment & Leave-In (450 °F)",
    subtitle:
      "Cierra la cutícula abierta por la decoloración o el tinte con ácido cítrico y protege del calor hasta 450 °F.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Redken Acidic Bonding Concentrate Intensive Treatment Leave In")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Redken Acidic Bonding Concentrate Tratamiento Leave In")}&tag=${AMAZON_TAG_ES}`,
  },
  "elizavecca-cer-100-collagen-coating": {
    id: "elizavecca-cer-100-collagen-coating",
    badge: "💰 Mejor Costo por Aplicación · Colágeno & Ceramidas",
    title: "Elizavecca CER-100 Collagen Coating Hair Protein Treatment (100 ml)",
    subtitle:
      "Mascarilla coreana de colágeno hidrolizado, ceramida 3 y queratina por menos de $10 USD en Amazon.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Elizavecca CER-100 Collagen Coating Hair Protein Treatment")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Elizavecca CER-100 Collagen Coating Protein Treatment")}&tag=${AMAZON_TAG_ES}`,
  },
  "loreal-metal-detox-mask": {
    id: "loreal-metal-detox-mask",
    badge: "🛡️ Anti-Metales y Agua Dura · 10% Glicoamina",
    title: "L’Oréal Professionnel Metal Detox Mask & Shampoo — Quelante de Cobre para Pelo Teñido",
    subtitle:
      "Neutraliza el cobre y metales del agua de ducha que oxidan el rubio y rompen el cabello decolorado.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("L'Oreal Professionnel Metal Detox Mask Shampoo")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("L'Oréal Professionnel Metal Detox Mascarilla Champú")}&tag=${AMAZON_TAG_ES}`,
  },
  "olaplex-no-4p-blonde-enhancer-toning-shampoo": {
    id: "olaplex-no-4p-blonde-enhancer-toning-shampoo",
    badge: "💜 Mejor Champú Violeta que No Reseca · Rubios & Balayage",
    title: "Olaplex No. 4P Blonde Enhancer Toning Shampoo (250 ml) — Matizador Violeta Reparador",
    subtitle:
      "Neutraliza tonos amarillos en 1 a 5 minutos sin sulfatos mientras repara enlaces.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Olaplex No 4P Blonde Enhancer Toning Purple Shampoo")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Olaplex No 4P Blonde Enhancer Champú Violeta Matizador")}&tag=${AMAZON_TAG_ES}`,
  },
  "fanola-no-yellow-shampoo": {
    id: "fanola-no-yellow-shampoo",
    badge: "⚡ Pigmento Violeta/Azul Ultra-Potente · ~$0.30/Uso",
    title: "Fanola No Yellow (Rubios) & Fanola No Orange (Castaños Iluminados) — Champú Matizador Profesional",
    subtitle:
      "El matizador profesional italiano más potente de Amazon para eliminar reflejos amarillos o naranjas en minutos.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Fanola No Yellow Purple Shampoo 350ml")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Fanola No Yellow Champú Violeta Matizador 350ml")}&tag=${AMAZON_TAG_ES}`,
  },
  "color-wow-dream-coat-supernatural-spray": {
    id: "color-wow-dream-coat-supernatural-spray",
    badge: "✨ #1 Protector Térmico & Escudo Anti-Humedad 72h",
    title: "Color Wow Dream Coat Supernatural Spray (200 ml) — Sellador Térmico Efecto Espejo",
    subtitle:
      "Impermeabiliza la hebra porosa o decolorada contra el frizz y la humedad durante 3 a 4 lavados.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Color Wow Dream Coat Supernatural Spray 200ml")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Color Wow Dream Coat Supernatural Spray Anti-Frizz 200ml")}&tag=${AMAZON_TAG_ES}`,
  },
  "olaplex-no-7-bonding-oil": {
    id: "olaplex-no-7-bonding-oil",
    badge: "✨ 125+ Aplicaciones · Brillo & Calor 450 °F",
    title: "Olaplex No. 7 Bonding Oil (30 ml) — Aceite Reparador con Protección Térmica 450 °F",
    subtitle:
      "Solo 2 a 3 gotas sellan puntas decoloradas y protegen de la plancha sin manchar ni amarillear el rubio.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Olaplex No 7 Bonding Oil 30ml")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Olaplex No 7 Bonding Oil Aceite Capilar 30ml")}&tag=${AMAZON_TAG_ES}`,
  },
  "moroccanoil-intense-hydrating-mask": {
    id: "moroccanoil-intense-hydrating-mask",
    badge: "🥑 Mejor Mascarilla Lipídica Sin Proteínas · Argán Puro",
    title: "Moroccanoil Intense Hydrating Mask (250 ml) / Olaplex No. 8 Moisture Mask",
    subtitle:
      "Hidratación profunda en 5 minutos libre de proteínas para devolver elasticidad y suavidad tras usar K18 u Olaplex No. 3.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Moroccanoil Intense Hydrating Mask 250ml")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Moroccanoil Mascarilla Hidratante Intensa 250ml")}&tag=${AMAZON_TAG_ES}`,
  },
};

function calculateCostUsd(
  model: string,
  promptTokens: number,
  completionTokens: number
): number {
  if (model.includes("mini")) {
    return Number(
      (promptTokens * 0.00000015 + completionTokens * 0.0000006).toFixed(6)
    );
  }
  return Number(
    (promptTokens * 0.0000025 + completionTokens * 0.00001).toFixed(6)
  );
}

const norm = (s: string) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const STOPWORDS = new Set([
  "como",
  "cual",
  "cuales",
  "que",
  "quien",
  "donde",
  "cuando",
  "por",
  "para",
  "con",
  "sin",
  "una",
  "uno",
  "los",
  "las",
  "del",
  "al",
  "hola",
  "quiero",
  "puedo",
  "recomienda",
  "mejor",
  "mejores",
  "sobre",
  "mas",
  "muy",
  "tiene",
  "tengo",
  "cabello",
  "pelo",
  "capilar",
]);

function extractTokens(text: string): string[] {
  return norm(text)
    .split(" ")
    .filter((w) => w.length >= 2 && !STOPWORDS.has(w));
}

let catalogCache: {
  at: number;
  rows: ArticleRow[];
  bySlug: Map<string, ArticleRow>;
} | null = null;

async function loadCatalog(): Promise<{
  rows: ArticleRow[];
  bySlug: Map<string, ArticleRow>;
}> {
  if (
    catalogCache &&
    Date.now() - catalogCache.at < 10 * 60 * 1000 &&
    catalogCache.rows.length > 0
  ) {
    return catalogCache;
  }
  const { data } = await supabase
    .from("guia_capilar_articles")
    .select(
      "slug, title, category, category_name, excerpt, featured_image, read_time, search_text"
    )
    .eq("active", true)
    .range(0, 999);

  const rows: ArticleRow[] = [];
  const bySlug = new Map<string, ArticleRow>();
  if (Array.isArray(data)) {
    for (const r of data as ArticleRow[]) {
      if (!bySlug.has(r.slug)) {
        bySlug.set(r.slug, r);
        rows.push(r);
      }
    }
  }
  catalogCache = { at: Date.now(), rows, bySlug };
  return catalogCache;
}

function toArticleCard(r: ArticleRow): ArticleCard {
  const img = r.featured_image || "/img/ambiente/home-hero-capilar.webp";
  const url =
    r.slug === r.category
      ? `${SITE}/${r.category}/`
      : `${SITE}/${r.category}/${r.slug}/`;
  return {
    slug: r.slug,
    title: r.title,
    category: r.category,
    categoryName: r.category_name,
    url,
    image: img.startsWith("http") ? img : `${SITE}${img}`,
    readTime: r.read_time || "7 min",
    excerpt: (r.excerpt || "").slice(0, 145),
  };
}

function searchArticles(
  rows: ArticleRow[],
  userMessage: string,
  historyText: string,
  limit = 14
): ArticleRow[] {
  const primaryTokens = extractTokens(userMessage);
  const contextTokens = extractTokens(historyText).filter(
    (t) => !primaryTokens.includes(t)
  );
  const fullPhrase = norm(userMessage);

  const starterSlugs = [
    "k18-vs-olaplex-no-3",
    "mejores-tratamientos-cabello-decolorado-amazon",
    "k18-leave-in-molecular-repair-hair-mask",
    "olaplex-no-3-hair-perfector",
    "k18-vs-olaplex-vs-redken-acidic-bonding",
    "mejores-mascarillas-cabello-tenido-y-decolorado",
    "mejores-protectores-termicos-cabello-decolorado-y-tenido",
    "mejores-tratamientos-capilares-por-costo-por-aplicacion",
  ];

  if (primaryTokens.length === 0 && contextTokens.length === 0) {
    const picked: ArticleRow[] = [];
    for (const s of starterSlugs) {
      const f = rows.find((r) => r.slug === s);
      if (f) picked.push(f);
    }
    return picked.length > 0 ? picked : rows.slice(0, 8);
  }

  const scored: Array<{ r: ArticleRow; score: number }> = [];
  for (const r of rows) {
    const titleNorm = norm(r.title);
    const catNorm = norm(`${r.category_name} ${r.category}`);
    const bodyNorm =
      r.search_text || `${titleNorm} ${catNorm} ${norm(r.excerpt || "")}`;

    let score = 0;
    if (fullPhrase.length >= 5 && titleNorm.includes(fullPhrase)) score += 45;

    let matchedPrimary = 0;
    for (const tok of primaryTokens) {
      if (titleNorm.includes(tok)) {
        score += 16;
        matchedPrimary++;
      } else if (catNorm.includes(tok)) {
        score += 9;
        matchedPrimary++;
      } else if (bodyNorm.includes(tok)) {
        score += 5;
        matchedPrimary++;
      }
    }
    if (matchedPrimary >= 2) score += matchedPrimary * 8;
    if (starterSlugs.includes(r.slug)) score += 5;

    for (const cTok of contextTokens.slice(-5)) {
      if (titleNorm.includes(cTok)) score += 3;
    }

    if (score > 0) scored.push({ r, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.r);
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const json = (b: unknown, status = 200) =>
    new Response(JSON.stringify(b), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    const body =
      req.method === "POST" ? await req.json().catch(() => ({})) : {};
    const mode = body.mode || (req.method === "GET" ? "config" : "chat");

    // 0. Seed / Sync articles endpoint
    if (mode === "seed_articles") {
      const syncKey = req.headers.get("x-sync-key") || "";
      if (syncKey !== "guia-capilar-sync-2026") {
        return json({ error: "No autorizado" }, 401);
      }
      const rows = Array.isArray(body.articles) ? body.articles : [];
      if (rows.length === 0) return json({ error: "Sin artículos" }, 400);
      const { error } = await supabase
        .from("guia_capilar_articles")
        .upsert(rows, { onConflict: "slug" });
      if (error) return json({ error: error.message }, 500);
      catalogCache = null;
      return json({ success: true, count: rows.length });
    }

    // 1. Load live config (Default: gpt-4o-mini as requested by user)
    const { data: configRow } = await supabase
      .from("guia_capilar_chat_config")
      .select("*")
      .eq("id", "default")
      .maybeSingle();

    const config = configRow || {
      is_enabled: true,
      ai_model: "gpt-4o-mini",
      temperature: 0.35,
      max_messages_per_session: 30,
      daily_budget_usd: 5.0,
      welcome_message:
        "¡Hola! ✨ Soy tu Especialista Capilar IA de GuíaCapilar.com (modelo mini rápido). Cuéntame si tu cabello es teñido o decolorado, tu tipo de hebra (fina, gruesa, rizada o porosa) y tu presupuesto en Amazon, y te recomiendo el tratamiento (K18, Olaplex, Redken, mascarilla o protector térmico) con su forma de uso y costo real por aplicación.",
      custom_instructions: "",
    };

    const activeModel = ALLOWED_MODELS.includes(config.ai_model)
      ? config.ai_model
      : "gpt-4o-mini";

    if (mode === "config" || req.method === "GET") {
      return json({
        is_enabled: config.is_enabled,
        welcome_message: config.welcome_message,
        ai_model: activeModel,
        max_messages_per_session: config.max_messages_per_session,
      });
    }

    // 2. Track click on an article or Amazon product
    if (mode === "track_click") {
      const {
        session_id,
        visitor_id,
        article_slug,
        article_title,
        category,
        target_url,
        page_url,
      } = body;
      if (target_url) {
        await supabase.from("guia_capilar_chat_clicks").insert({
          session_id: session_id || null,
          visitor_id: String(visitor_id || "anon").slice(0, 80),
          article_slug: article_slug ? String(article_slug).slice(0, 180) : null,
          article_title: article_title
            ? String(article_title).slice(0, 240)
            : null,
          category: category ? String(category).slice(0, 80) : null,
          target_url: String(target_url).slice(0, 500),
          page_url: page_url ? String(page_url).slice(0, 500) : null,
        });

        if (session_id) {
          const { data: sess } = await supabase
            .from("guia_capilar_chat_sessions")
            .select("clicks_count, clicked_urls")
            .eq("id", session_id)
            .maybeSingle();
          if (sess) {
            const urls = Array.isArray(sess.clicked_urls)
              ? sess.clicked_urls
              : [];
            if (!urls.includes(target_url)) urls.push(target_url);
            await supabase
              .from("guia_capilar_chat_sessions")
              .update({
                clicks_count: (sess.clicks_count || 0) + 1,
                clicked_urls: urls,
              })
              .eq("id", session_id);
          }
        }
      }
      return json({ success: true });
    }

    // 3. Chat Completion
    if (!config.is_enabled) {
      return json({
        reply: `En este momento la Asesora Capilar IA está en mantenimiento breve. Puedes ver nuestras comparativas en [GuíaCapilar.com](${SITE}/).`,
        recommended_articles: [],
        recommended_products: [],
        suggested_options: ["Ver Top 9 en Amazon", "K18 vs Olaplex"],
        disabled: true,
      });
    }

    const userMessage = String(body.message || "").trim().slice(0, 1000);
    if (!userMessage) return json({ error: "Mensaje vacío" }, 400);

    const visitorId = String(
      body.visitor_id || "gc-" + crypto.randomUUID().slice(0, 8)
    ).slice(0, 80);
    const region = body.region === "ES" ? "ES" : "US";
    const storeName = region === "ES" ? "Amazon.es" : "Amazon.com";
    const pageUrl = String(body.page_url || SITE + "/").slice(0, 500);
    const userAgent = String(
      body.user_agent || req.headers.get("user-agent") || ""
    ).slice(0, 300);
    const history = Array.isArray(body.history) ? body.history.slice(-8) : [];
    let sessionId: string | null = body.session_id || null;

    let existingSession: any = null;
    if (sessionId) {
      const { data: s } = await supabase
        .from("guia_capilar_chat_sessions")
        .select("*")
        .eq("id", sessionId)
        .maybeSingle();
      existingSession = s;
    }

    if (!existingSession) {
      const { data: created, error: createErr } = await supabase
        .from("guia_capilar_chat_sessions")
        .insert({
          visitor_id: visitorId,
          page_url: pageUrl,
          user_agent: userAgent,
          first_user_message: userMessage.slice(0, 250),
          last_user_message: userMessage.slice(0, 250),
          messages_count: 1,
          model_used: activeModel,
        })
        .select("*")
        .single();

      if (!createErr && created) {
        existingSession = created;
        sessionId = created.id;
      }
    }

    if (sessionId) {
      await supabase.from("guia_capilar_chat_messages").insert({
        session_id: sessionId,
        role: "user",
        content: userMessage,
      });
    }

    const catalog = await loadCatalog();
    const recentHistoryText = history
      .slice(-3)
      .map((h: any) => h?.content || "")
      .join(" ");
    const candidateRows = searchArticles(
      catalog.rows,
      userMessage,
      recentHistoryText,
      14
    );

    const candidatesPrompt =
      candidateRows.length > 0
        ? candidateRows
            .map((r) => {
              const u =
                r.slug === r.category
                  ? `${SITE}/${r.category}/`
                  : `${SITE}/${r.category}/${r.slug}/`;
              return `- SLUG: "${r.slug}" | TÍTULO: "${r.title}" | CATEGORÍA: ${r.category_name} | URL: ${u} | RESUMEN: ${(r.excerpt || "").slice(0, 140)}`;
            })
            .join("\n")
        : "No se encontraron artículos exactos con esos términos.";

    const amazonCatalogPrompt = Object.values(AMAZON_PRODUCTS)
      .map(
        (p) =>
          `- PRODUCT_ID: "${p.id}" | ${p.badge} | NOMBRE: "${p.title}" | DETALLE: ${p.subtitle} | URL_${region}: ${region === "ES" ? p.urlES : p.urlUS}`
      )
      .join("\n");

    const systemPrompt = `Eres la Especialista Capilar IA Oficial de GuíaCapilar.com (${SITE}), el portal líder en español con 600 guías para elegir tratamientos, mascarillas, champús y protectores térmicos para cabello teñido o decolorado en Amazon Estados Unidos y España (fundado por Carlos Lingan Borja, info@charlielingan.com).

Tu doble misión es:
1. RESPONDER TODAS LAS INQUIETUDES DEL USUARIO con rigor tricológico, calidez y claridad:
   - Comparar tratamientos según tipo de cabello (fino, medio, grueso, rizado, porosidad alta/baja), forma exacta de uso y COSTO POR APLICACIÓN:
     * K18 Leave-In Molecular Repair Mask: péptido sh-Oligopeptide-78 en 4 minutos SIN acondicionador previo y sin enjuague, ideal para decoloración alta o pelo chicloso.
     * Olaplex No. 3 Hair Perfector: Bis-Aminopropyl para puentes disulfuro en cabello húmedo 15-30 min ANTES del champú.
     * Redken Acidic Bonding Concentrate: ácido cítrico sellador a pH 4.5 + Leave-In termoprotector hasta 450 °F.
     * Elizavecca CER-100 Collagen Coating: mascarilla coreana de colágeno y ceramidas.
     * L’Oréal Professionnel Metal Detox: glicoamina quelante del cobre del agua dura.
     * Matizadores: Olaplex No. 4P y Fanola No Yellow (violeta para rubios) / Fanola No Orange (azul para naranjas en bases castañas).
     * Protectores térmicos y aceites: Color Wow Dream Coat (impermeable 72h), Olaplex No. 7 Bonding Oil y Moroccanoil Hydrating Mask (hidratación sin proteínas).
   - Enlazar en tu respuesta a entre 1 y 3 guías de nuestro listado inferior usando Markdown exacto: [Título](${SITE}/categoria/slug/) e incluir sus slugs en "recommended_slugs".
2. AYUDAR ACTIVAMENTE A QUE COMPREN EL PRODUCTO IDEAL EN AMAZON (${storeName}):
   - Recomienda siempre el tratamiento, mascarilla, champú o protector térmico exacto de nuestro CATÁLOGO AMAZON OFICIAL de abajo indicando su costo por aplicación.
   - Incluye en tu texto un enlace Markdown directo al producto en ${storeName} usando su URL_${region} exacta y añade entre 1 y 2 IDs en "recommended_product_ids".

CATÁLOGO AMAZON OFICIAL (${storeName}):
${amazonCatalogPrompt}

ARTÍCULOS ENCONTRADOS EN GUIACAPILAR.COM:
${candidatesPrompt}

Responde ÚNICAMENTE con un objeto JSON válido con estas 4 llaves exactas:
{
  "reply": "Tu respuesta experta en español con enlaces Markdown a nuestras guías y al producto en ${storeName}",
  "recommended_slugs": ["slug-1", "slug-2"],
  "recommended_product_ids": ["k18-leave-in-molecular-repair-mask"],
  "suggested_options": ["Opción 1", "Opción 2", "Opción 3"]
}`;

    const chatMessages: any[] = [{ role: "system", content: systemPrompt }];
    for (const h of history) {
      if (
        h &&
        (h.role === "user" || h.role === "assistant") &&
        typeof h.content === "string"
      ) {
        chatMessages.push({ role: h.role, content: h.content.slice(0, 1200) });
      }
    }
    chatMessages.push({ role: "user", content: userMessage });

    const openaiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: activeModel,
          messages: chatMessages,
          temperature: Number(config.temperature) || 0.35,
          max_tokens: 900,
          response_format: { type: "json_object" },
        }),
      }
    );

    if (!openaiRes.ok) {
      throw new Error("OpenAI status " + openaiRes.status);
    }

    const openaiData = await openaiRes.json();
    const rawContent = openaiData.choices?.[0]?.message?.content || "{}";
    let parsed: any = {};
    try {
      parsed = JSON.parse(rawContent);
    } catch {
      parsed = {
        reply: rawContent,
        recommended_slugs: candidateRows.slice(0, 2).map((r) => r.slug),
        recommended_product_ids: ["k18-leave-in-molecular-repair-mask"],
        suggested_options: [
          "¿K18 vs Olaplex No. 3?",
          "¿Mejor mascarilla hidratante?",
          "¿Protector térmico 450 °F?",
        ],
      };
    }

    const slugs: string[] = Array.isArray(parsed.recommended_slugs)
      ? parsed.recommended_slugs.slice(0, 3)
      : [];
    const recommendedArticles: ArticleCard[] = slugs
      .map((s) => catalog.bySlug.get(s))
      .filter((r): r is ArticleRow => Boolean(r))
      .map(toArticleCard);

    const productIds: string[] = Array.isArray(parsed.recommended_product_ids)
      ? parsed.recommended_product_ids.slice(0, 2)
      : ["k18-leave-in-molecular-repair-mask"];
    const recommendedProducts: AmazonProductCard[] = productIds
      .map((id) => AMAZON_PRODUCTS[id])
      .filter((p): p is AmazonProductCard => Boolean(p));

    const suggestedOptions: string[] = Array.isArray(parsed.suggested_options)
      ? parsed.suggested_options
          .slice(0, 3)
          .map((s: unknown) => String(s).slice(0, 72))
      : [];

    const replyText: string =
      parsed.reply ||
      `Te recomiendo explorar nuestro ranking en [GuíaCapilar.com](${SITE}/mejores-productos-capilares/mejores-tratamientos-cabello-decolorado-amazon/).`;

    const promptTokens = openaiData.usage?.prompt_tokens || 0;
    const completionTokens = openaiData.usage?.completion_tokens || 0;
    const totalTokens =
      openaiData.usage?.total_tokens || promptTokens + completionTokens;
    const costUsd = calculateCostUsd(
      activeModel,
      promptTokens,
      completionTokens
    );

    if (sessionId && existingSession) {
      await supabase.from("guia_capilar_chat_messages").insert({
        session_id: sessionId,
        role: "assistant",
        content: replyText,
        recommended_articles: recommendedArticles,
        suggested_options: suggestedOptions,
        model: activeModel,
        prompt_tokens: promptTokens,
        completion_tokens: completionTokens,
        total_tokens: totalTokens,
        cost_usd: costUsd,
      });

      const prevRecs: string[] = Array.isArray(
        existingSession.recommended_articles
      )
        ? existingSession.recommended_articles
        : [];
      for (const ra of recommendedArticles) {
        if (!prevRecs.includes(ra.title)) prevRecs.push(ra.title);
      }
      for (const rp of recommendedProducts) {
        const label = `[Amazon] ${rp.title}`;
        if (!prevRecs.includes(label)) prevRecs.push(label);
      }

      await supabase
        .from("guia_capilar_chat_sessions")
        .update({
          last_user_message: userMessage.slice(0, 250),
          messages_count: (existingSession.messages_count || 1) + 2,
          recommended_articles: prevRecs.slice(0, 30),
          prompt_tokens: (existingSession.prompt_tokens || 0) + promptTokens,
          completion_tokens:
            (existingSession.completion_tokens || 0) + completionTokens,
          total_tokens: (existingSession.total_tokens || 0) + totalTokens,
          estimated_cost_usd: Number(
            (Number(existingSession.estimated_cost_usd || 0) + costUsd).toFixed(
              6
            )
          ),
          model_used: activeModel,
          last_message_at: new Date().toISOString(),
        })
        .eq("id", sessionId);
    }

    await supabase.from("token_usage").insert({
      source: "guia-capilar.com",
      content_type: "ai_chat",
      model: activeModel,
      prompt_tokens: promptTokens,
      completion_tokens: completionTokens,
      total_tokens: totalTokens,
      images_generated: 0,
      estimated_cost_usd: costUsd,
      slug: sessionId || visitorId,
    });

    return json({
      session_id: sessionId,
      reply: replyText,
      recommended_articles: recommendedArticles,
      recommended_products: recommendedProducts,
      suggested_options: suggestedOptions,
      model: activeModel,
    });
  } catch (err: any) {
    return json(
      {
        error: err.message || "Error interno",
        reply: `Puedes explorar nuestras 600 guías en [GuíaCapilar.com](${SITE}/).`,
        recommended_articles: [],
        recommended_products: [],
        suggested_options: ["Intentar de nuevo"],
      },
      500
    );
  }
});
