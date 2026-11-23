"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CATALOG,
  buildAmazonUrl,
  detectUserAmazonRegion,
  type AmazonStoreRegion,
  type AmazonProductRecommendation,
} from "@/lib/amazon";
import { trackClick } from "@/lib/client-constants";
import OpenChatButton from "@/components/OpenChatButton";

export type HairTreatmentTier = {
  key: string;
  label: string;
  bottleMl: number;
  priceUsd: number;
  mlPerPump: number;
  defaultPumps: number;
  waitTimeMin: number;
  img: string;
  alt: string;
  idealFor: string;
  howToApply: string;
  reviewHref: string;
  productKey: keyof typeof CATALOG;
};

/**
 * Calculadora interactiva de Costo por Aplicación y Dosificación clonada de PriceBlock.tsx de prunex1.com:
 * Permite alternar entre K18 (50 ml), Olaplex No. 3 (100 ml), Redken Acidic Bonding (150 ml) y Elizavecca CER-100 (100 ml),
 * y ajustar el largo/grosor del cabello (pumps o ml por sesión) para ver cuántas aplicaciones rinde el envase y el costo exacto por uso en USD.
 */
export default function CostPerApplicationCalculator({
  options,
}: {
  options: HairTreatmentTier[];
}) {
  const [k, setK] = useState(options[0].key);
  const [hairLengthLevel, setHairLengthLevel] = useState(2); // 1: Corto/Fino, 2: Medio, 3: Largo, 4: Extra Largo/Grueso
  const [region, setRegion] = useState<AmazonStoreRegion>("US");

  useEffect(() => {
    setRegion(detectUserAmazonRegion());
  }, []);

  const p = options.find((o) => o.key === k) || options[0];
  const amzProd: AmazonProductRecommendation =
    CATALOG[p.productKey] || CATALOG.K18_MASK_50ML;
  const amzUrl = buildAmazonUrl(amzProd, region);
  const storeName = region === "US" ? "Amazon.com" : "Amazon.es";
  const currency = region === "US" ? "$" : "€";

  // Cálculo matemático de dosis según largo y grosor
  const multiplier =
    hairLengthLevel === 1
      ? 0.7
      : hairLengthLevel === 2
      ? 1.0
      : hairLengthLevel === 3
      ? 1.4
      : 1.85;
  const mlPerUse = Number((p.defaultPumps * p.mlPerPump * multiplier).toFixed(1));
  const totalUses = Math.max(6, Math.round(p.bottleMl / mlPerUse));
  const costPerApplication = (p.priceUsd / totalUses).toFixed(2);
  const monthsDuration = Math.max(2, Math.round(totalUses / 4)); // asumiendo 1 uso semanal de mantenimiento

  const lengthLabels: Record<number, string> = {
    1: "Corto o Fino (1 pump / dosis mínima)",
    2: "Melena Media hasta Hombros (2 pumps)",
    3: "Largo hasta Media Espalda (3 pumps)",
    4: "Extra Largo o Muy Grueso/Rizado (4+ pumps)",
  };

  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_1.1fr]">
      <div className="card card-static spot relative overflow-hidden p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-drink/10 blur-3xl" />
        <div className="relative">
          <div
            className="inline-flex flex-wrap rounded-full bg-fxsky p-1 gap-1"
            role="tablist"
            aria-label="Selector de tratamiento capilar"
          >
            {options.map((o) => (
              <button
                key={o.key}
                role="tab"
                type="button"
                aria-selected={o.key === k}
                onClick={() => setK(o.key)}
                className={`rounded-full px-3.5 py-2 text-xs sm:text-sm font-bold transition cursor-pointer ${
                  o.key === k
                    ? "bg-white text-fxbluedeep shadow"
                    : "text-[var(--muted)] hover:text-fxink"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>

          <div className="mt-6 grid items-center gap-6 sm:grid-cols-[1fr_1.15fr]">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[240px] overflow-hidden rounded-2xl border border-[var(--line)] shadow-sm">
              <Image
                key={p.img}
                src={p.img}
                alt={p.alt}
                fill
                sizes="240px"
                className="object-cover"
                style={{ animation: "fadeup .45s ease both" }}
              />
            </div>
            <div>
              <span className="inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-extrabold text-amber-900">
                {amzProd.badge}
              </span>
              <p className="mt-1.5 font-display text-xl sm:text-2xl font-extrabold tracking-tight text-fxink leading-snug">
                {amzProd.title.split("—")[0].trim()}
              </p>
              <p className="mt-1 text-sm text-[var(--muted)] leading-relaxed">
                {p.idealFor}
              </p>
              <p className="mt-2 text-xs font-bold text-prune">
                Envase: {p.bottleMl} ml · Tiempo: {p.waitTimeMin} min ·{" "}
                {p.howToApply}
              </p>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={amzUrl}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              onClick={() =>
                trackClick(`calc-amazon-${p.key}`, {
                  article_slug: amzProd.id,
                  article_title: amzProd.title,
                  category: "amazon",
                  target_url: amzUrl,
                })
              }
              className="btn btn-buy shine flex-1 text-sm"
              data-magnetic
            >
              🛒 Consultar precio en {storeName} ↗
            </a>
            <Link href={p.reviewHref} className="btn btn-ghost text-sm">
              Leer guía y uso →
            </Link>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-[#211513] via-[#191311] to-[#2e1c38] p-6 text-white sm:p-8">
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-fxlime/15 blur-3xl" />
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-fxlime">
          Calculadora Matemática de Costo por Aplicación ($/Dosis)
        </p>
        <h3 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
          ¿Cuánto te cuesta realmente cada aplicación según tu cabello?
        </h3>
        <p className="mt-2 text-sm text-white/70">
          Ajusta el largo y densidad de tu melena para calcular cuántos
          mililitros consumes por sesión, cuántas aplicaciones reales rinde el
          envase de {p.bottleMl} ml y tu costo exacto por uso.
        </p>
        <label
          htmlFor="hair-length-slider"
          className="mt-6 flex flex-wrap items-center justify-between gap-2 text-sm font-semibold"
        >
          <span>Largo y grosor de tu cabello:</span>
          <span className="rounded-full bg-white/10 px-3.5 py-1 font-display text-xs sm:text-sm text-fxlime">
            {lengthLabels[hairLengthLevel]}
          </span>
        </label>
        <input
          id="hair-length-slider"
          type="range"
          min={1}
          max={4}
          step={1}
          value={hairLengthLevel}
          onChange={(e) => setHairLengthLevel(Number(e.target.value))}
          className="mt-3 w-full accent-[#E8B86D]"
        />
        <div className="mt-1 flex justify-between text-[0.7rem] text-white/45">
          <span>Corto / Fino</span>
          <span>Medio (Hombros)</span>
          <span>Largo</span>
          <span>Extra Largo / Grueso</span>
        </div>

        <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
          {[
            ["Costo / Aplicación", `${currency}${costPerApplication}`],
            ["Aplicaciones / Envase", `${totalUses} usos`],
            ["Dosis Exacta", `${mlPerUse} ml`],
          ].map(([l, val], i) => (
            <div
              key={l}
              className={`glass flex flex-col-reverse p-3 ${
                i === 0 ? "border-fxlime/50 bg-fxlime/10" : ""
              }`}
            >
              <dt className="mt-1 text-[0.7rem] leading-tight text-white/60">
                {l}
              </dt>
              <dd
                className={`font-display font-extrabold ${
                  i === 0
                    ? "text-xl text-fxlime sm:text-2xl"
                    : "text-xl sm:text-2xl"
                }`}
              >
                {val}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/10 text-xs text-white/60">
          <span>
            Usándolo 1 vez por semana tras la fase inicial, un envase te dura{" "}
            <strong>~{monthsDuration} meses</strong>.
          </span>
          <OpenChatButton
            label="Personalizar rutina con la Asesora IA"
            prompt={`Tengo el cabello ${lengthLabels[hairLengthLevel].toLowerCase()} y estoy evaluando ${p.label} (~$${costPerApplication} por aplicación). ¿Cómo debo combinarlo con mi champú, mascarilla y protector térmico en Amazon?`}
            className="text-fxlime font-bold hover:underline !bg-transparent !p-0"
          />
        </div>
      </div>
    </div>
  );
}
