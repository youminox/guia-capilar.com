"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef } from "react";
import HeroSearch from "@/components/HeroSearch";
import OpenChatButton from "@/components/OpenChatButton";

/** Partículas en canvas (micro-gotas de péptidos dorados, seda champán, cobre y amatista matizador) que el puntero repele. */
function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let running = false;
    let w = 0,
      h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = c.clientWidth;
      h = c.clientHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const COLORS = [
      "232,184,109",
      "184,93,59",
      "254,240,138",
      "168,130,215",
      "243,198,165",
      "253,224,71",
    ];
    const N = w < 700 ? 44 : 105;
    const ps = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.3 + 0.5,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -Math.random() * 0.35 - 0.05,
      c: COLORS[(Math.random() * COLORS.length) | 0],
      a: Math.random() * 0.55 + 0.25,
    }));
    let mx = -999,
      my = -999;
    const onMove = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        const dx = p.x - mx,
          dy = p.y - my,
          d2 = dx * dx + dy * dy;
        if (d2 < 16000) {
          const f = (16000 - d2) / 16000;
          p.vx += (dx / 4000) * f;
          p.vy += (dy / 4000) * f;
        }
        p.vx *= 0.975;
        p.vy = p.vy * 0.975 - 0.006;
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.c},${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    const play = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    const pause = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const io = new IntersectionObserver(([e]) =>
      e.isIntersecting ? play() : pause()
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ric = (window as any).requestIdleCallback || ((f: () => void) => setTimeout(f, 300));
    ric(() => io.observe(c));
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      pause();
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 -z-[1] h-full w-full"
      aria-hidden
    />
  );
}

export default function Hero({ heroImage }: { heroImage: string }) {
  const card = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = card.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0,
      raf = 0;
    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.transform = `rotateY(${cx}deg) rotateX(${cy}deg)`;
      if (Math.abs(tx - cx) > 0.01 || Math.abs(ty - cy) > 0.01)
        raf = requestAnimationFrame(loop);
      else raf = 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = (e.clientX / window.innerWidth - 0.5) * 22;
      ty = -(e.clientY / window.innerHeight - 0.5) * 16;
      kick();
    };
    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      tx = Math.max(-16, Math.min(16, e.gamma / 2));
      ty = Math.max(-12, Math.min(12, (e.beta - 45) / 3));
      kick();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("deviceorientation", onOrient, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("deviceorientation", onOrient);
    };
  }, []);

  const words = ["Guía", "Capilar"];
  return (
    <section className="hero min-h-[100svh] pt-[68px]">
      <div className="hero-aurora" />
      <div className="hero-grid" />
      <Particles />
      <div className="wrap grid min-h-[calc(100svh-68px)] items-center gap-8 py-12 lg:grid-cols-[1.08fr_1fr] lg:gap-10 lg:py-6">
        <div className="relative z-20">
          <span className="chip">
            <span className="h-2 w-2 animate-pulse rounded-full bg-fxlime" />{" "}
            Cabello Teñido & Decolorado · Amazon Estados Unidos & España · 600 Guías
          </span>
          <h1 className="hero-title mt-5">
            <span className="block">
              {words.map((w, i) => (
                <span key={w}>
                  <span
                    className="hw"
                    style={{
                      animationDelay: `${0.08 + i * 0.14}s, ${-i * 1.2}s`,
                    }}
                  >
                    {w}
                  </span>
                  {i < words.length - 1 ? " " : ""}
                </span>
              ))}
            </span>{" "}
            <span className="mt-4 block text-[0.38em] font-bold leading-[1.22] tracking-[-0.02em] text-white/90">
              {[
                "Elige",
                "tratamientos",
                "para",
                "cabello",
                "teñido",
                "o",
                "decolorado",
              ].map((w, i) => (
                <Fragment key={w + i}>
                  <span className="reveal-word">
                    <span style={{ animationDelay: `${0.4 + i * 0.05}s` }}>
                      {w}
                    </span>
                  </span>{" "}
                </Fragment>
              ))}
              <span className="reveal-word">
                <span
                  style={{ animationDelay: "0.85s" }}
                  className="text-[#fde68a]"
                >
                  por costo real por aplicación
                </span>
              </span>
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-white/78">
            Comparamos mascarillas, tratamientos reconstructores como{" "}
            <strong className="text-white">
              K18, Olaplex No. 3 y Redken Acidic Bonding
            </strong>
            , champús sin sulfatos o matizadores y{" "}
            <strong className="text-white">
              protectores térmicos (450 °F)
            </strong>{" "}
            según tu tipo de cabello, la forma exacta de uso y el costo por dosis
            en Amazon EE. UU.
          </p>

          <div className="mt-6">
            <HeroSearch />
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/mejores-productos-capilares/mejores-tratamientos-cabello-decolorado-amazon/"
              className="btn btn-lime shine text-sm sm:text-base"
              data-magnetic
            >
              🏆 Ver Ranking Top 9 en Amazon
            </Link>
            <OpenChatButton
              label="¿Qué necesita mi cabello hoy?"
              className="btn btn-glass text-sm sm:text-base"
              magnetic
            />
          </div>

          <ul
            className="mt-8 grid max-w-lg grid-cols-3 gap-2.5 sm:gap-3"
            aria-label="Métricas clave de GuíaCapilar.com"
          >
            {[
              ["600", "guías", "500 SEO + 100 Amazon"],
              ["4", "min", "protocolo péptido K18"],
              ["$0.50", "/uso", "desde $0.50 por aplicación"],
            ].map(([v, u, l], i) => (
              <li
                key={l}
                className="glass px-3 py-3 sm:px-4"
                style={{
                  animation: `fadeup .8s ${0.85 + i * 0.1}s cubic-bezier(.2,.8,.2,1) both`,
                }}
              >
                <p className="font-display text-xl font-extrabold text-white sm:text-2xl">
                  {v}
                  {u && (
                    <span className="ml-1 text-sm font-bold text-fxlime">
                      {u}
                    </span>
                  )}
                </p>
                <p className="text-[0.72rem] leading-tight text-white/70 sm:text-xs">
                  {l}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="tilt-stage relative z-10 mx-auto w-full max-w-[560px]">
          <div ref={card} className="tilt-card relative py-4">
            <div className="tilt-glow" />
            <div className="halo-ring" />
            <div className="relative" style={{ transform: "translateZ(50px)" }}>
              <div className="float-y relative mx-auto aspect-[16/10] w-full overflow-hidden rounded-[32px] border-2 border-white/20 shadow-[0_40px_60px_rgba(0,0,0,0.65)]">
                <Image
                  src={heroImage}
                  alt="Cabello rubio balayage saludable y brillante junto a tratamientos reconstructores de enlaces capilares y mascarillas"
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 70vw, 560px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120d0c]/95 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2 text-white">
                  <div>
                    <span className="inline-block rounded-full bg-fxblue px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">
                      Duelo Molecular Amazon US
                    </span>
                    <p className="mt-1 font-display text-lg sm:text-xl font-extrabold leading-tight">
                      K18 Mask vs Olaplex No. 3 vs Redken Acidic Bonding
                    </p>
                  </div>
                  <Link
                    href="/comparativas/k18-vs-olaplex-vs-redken-acidic-bonding/"
                    className="shrink-0 rounded-full bg-white/20 px-3 py-1.5 text-xs font-bold backdrop-blur hover:bg-white/30"
                  >
                    Ver Duelo →
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="price-badge right-0 top-0 sm:right-2 sm:top-1"
              aria-label="Costo por Aplicación y Reparación de Enlaces"
            >
              <svg viewBox="0 0 124 124" aria-hidden>
                <defs>
                  <path
                    id="pb-circle"
                    d="M62,62 m-49,0 a49,49 0 1,1 98,0 a49,49 0 1,1 -98,0"
                  />
                </defs>
                <text
                  fontSize="8.7"
                  fontWeight="700"
                  fill="#191311"
                  fontFamily="Outfit, sans-serif"
                >
                  <textPath
                    href="#pb-circle"
                    textLength="300"
                    lengthAdjust="spacing"
                  >
                    K18 & OLAPLEX · COSTO POR USO · AMAZON USA ·
                  </textPath>
                </text>
              </svg>
              <div className="relative">
                <p className="font-display text-[1.45rem] font-extrabold leading-none">
                  $/Uso
                </p>
                <p className="mt-0.5 text-[0.62rem] font-bold">
                  Calculado
                </p>
              </div>
            </div>
            <div
              className="absolute -left-1 bottom-2 hidden rounded-2xl border border-white/15 bg-[#120d0c]/90 px-4 py-3 shadow-xl backdrop-blur sm:block"
              style={{ transform: "translateZ(80px)" }}
            >
              <p className="text-[0.68rem] uppercase tracking-wider text-white/60">
                Ahorro vs Salón
              </p>
              <p className="font-display font-bold text-fxlime">
                -$1.50 USD / dosis en casa
              </p>
            </div>
            <div
              className="absolute bottom-[44%] right-[-6px] hidden rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold backdrop-blur md:block"
              style={{ transform: "translateZ(120px)" }}
            >
              🧬 Sellado pH 4.5 + Termoprotección 450 °F
            </div>
          </div>
        </div>
      </div>
      <a
        href="#que-es"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-white/50 lg:flex"
        aria-label="Bajar a cómo elegir productos para cabello teñido o decolorado"
      >
        <span className="h-10 w-6 rounded-full border border-white/30 p-1">
          <span className="block h-2 w-full animate-bounce rounded-full bg-fxlime" />
        </span>
      </a>
    </section>
  );
}
