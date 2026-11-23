"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  {
    n: "01",
    t: "Limpieza Quelante o Sin Sulfatos (Cero Acondicionador)",
    d: "Lavas con un champú que retire metales de cobre y calcio del agua (como K18 Detox o L’Oréal Metal Detox). Si vas a aplicar K18, NO uses acondicionador previo para no bloquear el péptido.",
  },
  {
    n: "02",
    t: "Ventana Molecular (4 min K18 o 15-30 min Olaplex No. 3)",
    d: "Secas el exceso de agua con toalla de microfibra y aplicas de 1 a 3 pumps de K18 esperando 4 minutos exactos (o saturas con Olaplex No. 0 + No. 3 en pre-champú para reconectar puentes disulfuro).",
  },
  {
    n: "03",
    t: "Mascarilla Hidratante/Proteica y Sellado Ácido (pH 4.5)",
    d: "Cuando tu cabello necesita lípidos o elasticidad, aplicas una mascarilla como Olaplex No. 8, Moroccanoil o Redken Acidic Bonding para cerrar las escamas de la cutícula decolorada.",
  },
  {
    n: "04",
    t: "Blindaje Térmico hasta 450 °F (230 °C) y Sellado de Puntas",
    d: "Antes del secador o la plancha, sellas la fibra con Color Wow Dream Coat, Redken Acidic Leave-In o 2 gotas de Olaplex No. 7 Bonding Oil (~$0.25/uso) para brillo espejo sin rotura.",
  },
];

/** Escena fijada con GSAP ScrollTrigger clonada de prunex1.com: muestra las 4 fases de reconstrucción y sellado de una hebra decolorada. */
export default function ScrollStory() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ctx: { revert: () => void } | null = null;
    let cancelled = false;
    let io: IntersectionObserver | null = null;

    const init = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const q = gsap.utils.selector(el);
        if (reduce) {
          gsap.set(q(".step"), { opacity: 1 });
          gsap.set(q(".bar"), { scaleX: 1 });
          gsap.set(q(".phone-alert, .night, .crema-layer"), { opacity: 1 });
          return;
        }
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=2200",
            scrub: 0.7,
            pin: q(".pin")[0],
            anticipatePin: 1,
          },
        });
        tl.to(q(".step-0"), { opacity: 1, duration: 0.2 }, 0)
          .to(
            q(".step-0 .dot"),
            { backgroundColor: "#B85D3B", color: "#fff", duration: 0.2 },
            0
          )
          .fromTo(
            q(".portafilter-group"),
            { opacity: 0.4, x: -24 },
            { opacity: 1, x: 0, duration: 0.6 },
            0.1
          )
          .to(q(".step-0"), { opacity: 0.75, duration: 0.2 }, 1)
          .to(q(".step-1"), { opacity: 1, duration: 0.2 }, 1)
          .to(
            q(".step-1 .dot"),
            { backgroundColor: "#6B468F", color: "#fff", duration: 0.2 },
            1
          )
          .to(
            q(".gauge-needle"),
            { rotate: 52, svgOrigin: "200 135", duration: 0.5 },
            1.15
          )
          .to(q(".espresso-stream"), { opacity: 0.7, scaleY: 0.65, duration: 0.5 }, 1.25)
          .to(q(".step-1"), { opacity: 0.75, duration: 0.2 }, 2)
          .to(q(".step-2"), { opacity: 1, duration: 0.2 }, 2)
          .to(
            q(".step-2 .dot"),
            { backgroundColor: "#E8B86D", color: "#191311", duration: 0.2 },
            2
          )
          .to(
            q(".gauge-needle"),
            { rotate: 112, svgOrigin: "200 135", duration: 0.7 },
            2.05
          )
          .to(q(".espresso-stream"), { opacity: 1, scaleY: 1, duration: 0.5 }, 2.1)
          .to(q(".espresso-fill"), { opacity: 1, duration: 0.6 }, 2.4)
          .to(q(".crema-layer"), { opacity: 1, duration: 0.5 }, 2.65)
          .to(q(".step-2"), { opacity: 0.75, duration: 0.2 }, 3.1)
          .to(q(".step-3"), { opacity: 1, duration: 0.2 }, 3.1)
          .to(
            q(".step-3 .dot"),
            { backgroundColor: "#B85D3B", color: "#fff", duration: 0.2 },
            3.1
          )
          .to(q(".night"), { opacity: 1, duration: 0.6 }, 3.1)
          .to(q(".latte-heart"), { opacity: 1, scale: 1, duration: 0.5 }, 3.25)
          .to(q(".phone-alert"), { opacity: 1, y: 0, duration: 0.5 }, 3.3)
          .to(q(".done"), { opacity: 1, y: 0, duration: 0.4 }, 3.4)
          .to(q(".bar"), { scaleX: 1, duration: 3.8 }, 0);
      }, el);
    };

    io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io?.disconnect();
          init();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io?.disconnect();
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="protocolo-reparacion"
      ref={root}
      className="relative bg-gradient-to-b from-white via-fxsky to-white"
    >
      <div className="pin flex min-h-[100svh] items-center overflow-hidden py-10 lg:py-14">
        <div className="wrap grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <span className="eyebrow">Protocolo Clínico Paso a Paso</span>
            <h2 className="section-title mt-3">
              Cuatro fases.{" "}
              <span className="text-prune">De cabello poroso a fibra sellada.</span>
            </h2>
            <div className="mt-4 h-1.5 w-full max-w-sm overflow-hidden rounded bg-[var(--line)]">
              <div className="bar h-full origin-left scale-x-0 bg-gradient-to-r from-fxblue via-drinklight to-prune" />
            </div>
            <ol className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
              {STEPS.map((s, i) => (
                <li
                  key={s.n}
                  className={`step step-${i} flex gap-4`}
                  style={{ opacity: 0.78 }}
                >
                  <span className="dot grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white font-display font-extrabold text-fxink shadow-md">
                    {s.n}
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold sm:text-xl">
                      {s.t}
                    </p>
                    <p className="text-sm text-[#5c4b3e] sm:text-base">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p
              className="done mt-5 hidden text-sm text-[var(--muted)] sm:block"
              style={{ opacity: 0, transform: "translateY(10px)" }}
            >
              Regla de oro del ahorro: usar más de 3 pumps de K18 o media botella
              de Olaplex No. 3 no repara más rápido; satura la cutícula y duplica
              tu costo por aplicación sin beneficio adicional.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[260px] sm:max-w-[360px] lg:max-w-[420px]">
            <svg
              viewBox="0 0 400 440"
              className="relative w-full drop-shadow-[0_30px_50px_rgba(70,35,10,0.25)]"
              role="img"
              aria-label="Animación interactiva de reconstrucción molecular capilar: medidor de pH ácido 4.5, dosificación de péptidos K18/Olaplex, sellado de puentes disulfuro y blindaje térmico 450 grados"
            >
              <defs>
                <linearGradient id="ss-day" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#faf7f4" />
                  <stop offset="1" stopColor="#f2e6da" />
                </linearGradient>
                <linearGradient id="ss-night" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#191311" />
                  <stop offset="0.65" stopColor="#281822" />
                  <stop offset="1" stopColor="#3d2357" />
                </linearGradient>
                <clipPath id="ss-panel">
                  <rect x="0" y="0" width="400" height="440" rx="36" />
                </clipPath>
              </defs>
              <g clipPath="url(#ss-panel)">
                <rect width="400" height="440" fill="url(#ss-day)" />
                <rect
                  className="night"
                  width="400"
                  height="440"
                  fill="url(#ss-night)"
                  opacity="0"
                />

                {/* Marco de Laboratorio Capilar */}
                <rect
                  x="105"
                  y="72"
                  width="190"
                  height="324"
                  rx="24"
                  fill="#f4f0ec"
                  stroke="#d5c7bc"
                  strokeWidth="3"
                />
                <rect
                  x="118"
                  y="84"
                  width="164"
                  height="110"
                  rx="16"
                  fill="#211816"
                />

                {/* Medidor de pH & Integridad de Enlaces Disulfuro */}
                <circle
                  cx="200"
                  cy="135"
                  r="38"
                  fill="#fff"
                  stroke="#b85d3b"
                  strokeWidth="4"
                />
                <path
                  d="M172 145 A30 30 0 0 1 228 145"
                  fill="none"
                  stroke="#e8b86d"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <line
                  className="gauge-needle"
                  x1="200"
                  y1="135"
                  x2="174"
                  y2="145"
                  stroke="#6b468f"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="200" cy="135" r="4.5" fill="#191311" />
                <text
                  x="200"
                  y="162"
                  textAnchor="middle"
                  fontFamily="Outfit, sans-serif"
                  fontWeight="800"
                  fontSize="8.5"
                  fill="#191311"
                >
                  pH 4.5 · ENLACES 98%
                </text>

                {/* Dosificador Airless / Pipeta Molecular */}
                <g className="portafilter-group">
                  <rect
                    x="162"
                    y="196"
                    width="76"
                    height="24"
                    rx="6"
                    fill="#6b468f"
                  />
                  <rect
                    x="236"
                    y="202"
                    width="74"
                    height="12"
                    rx="6"
                    fill="#b85d3b"
                  />
                </g>

                {/* Goteo de Péptidos / Complejo Reparador */}
                <path
                  className="espresso-stream"
                  d="M192 220 L196 305 L204 305 L208 220 Z"
                  fill="#e8b86d"
                  opacity="0"
                />

                {/* Barra de Costo por Aplicación */}
                <rect
                  x="124"
                  y="355"
                  width="152"
                  height="22"
                  rx="6"
                  fill="#191311"
                  stroke="#e8b86d"
                  strokeWidth="1.5"
                />
                <text
                  x="200"
                  y="370"
                  textAnchor="middle"
                  fontFamily="Outfit, sans-serif"
                  fontWeight="800"
                  fontSize="9.8"
                  fill="#fef08a"
                >
                  2 Pumps (2 ml) · ~$1.50/Uso
                </text>

                {/* Corte transversal de la Fibra Capilar */}
                <path
                  d="M158 292 H242 L235 352 C234 354 228 355 200 355 C172 355 166 354 165 352 Z"
                  fill="#ffffff"
                  fillOpacity="0.95"
                  stroke="#d5c7bc"
                  strokeWidth="2.5"
                />
                {/* Córtex Reconstruido */}
                <path
                  className="espresso-fill"
                  d="M164 316 H236 L233 351 H167 Z"
                  fill="#b85d3b"
                  opacity="0"
                />
                {/* Cutícula Sellada */}
                <rect
                  className="crema-layer"
                  x="163"
                  y="302"
                  width="74"
                  height="15"
                  rx="4"
                  fill="#e8b86d"
                  opacity="0"
                />
                {/* Escudo Térmico y Brillo */}
                <path
                  className="latte-heart"
                  d="M200 313 C196 307 188 308 190 314 C192 318 200 322 200 322 C200 322 208 318 210 314 C212 308 204 307 200 313 Z"
                  fill="#fffdf9"
                  opacity="0"
                />

                {/* Badge Superior de Diagnóstico */}
                <g
                  className="phone-alert"
                  opacity="0"
                  transform="translate(68 18)"
                >
                  <rect
                    width="264"
                    height="44"
                    rx="14"
                    fill="#ffffff"
                    stroke="#E8B86D"
                    strokeWidth="2.5"
                  />
                  <circle cx="24" cy="22" r="12" fill="#E8B86D" />
                  <text
                    x="24"
                    y="26"
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="800"
                    fill="#191311"
                  >
                    🧬
                  </text>
                  <text
                    x="44"
                    y="19"
                    fontFamily="Outfit, sans-serif"
                    fontWeight="800"
                    fontSize="11.2"
                    fill="#191311"
                  >
                    Cutícula Sellada · Puentes S-S Activos
                  </text>
                  <text
                    x="44"
                    y="33"
                    fontFamily="Inter, sans-serif"
                    fontWeight="600"
                    fontSize="9.8"
                    fill="#8d3d20"
                  >
                    4 Min K18 · Blindaje Térmico 450 °F
                  </text>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
