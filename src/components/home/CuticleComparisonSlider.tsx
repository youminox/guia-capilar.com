"use client";

import { useCallback, useRef, useState } from "react";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/** Escena arrastrable Antes ↔ Después clonada de DayNightSlider.tsx de prunex1.com: Fibra Decolorada Porosa y Elástica (pH Alcalino 8.5) vs Cutícula Reconstruida y Sellada con K18/Olaplex + Sellador Ácido (pH 4.5). */
export default function CuticleComparisonSlider() {
  const [v, setV] = useState(25);
  const [touched, setTouched] = useState(false);
  const scene = useRef<HTMLDivElement>(null);
  const t = v / 100;
  const mid = clamp(1 - Math.abs(t - 0.5) * 2.4);
  const pro = clamp((t - 0.45) / 0.45);
  const shine = clamp((t - 0.6) / 0.35);

  const phase =
    t < 0.35
      ? "Antes · Fibra Decolorada Porosa (pH 8.5)"
      : t < 0.68
      ? "Fase 2 · Reconexión de Enlaces (K18 / Olaplex)"
      : "Después · Cutícula Sellada & Termoprotegida (pH 4.5)";

  const phReading = "pH " + (8.5 - t * 4.0).toFixed(1);

  const fromPointer = useCallback((clientX: number) => {
    const el = scene.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setV(Math.round(clamp((clientX - r.left) / r.width) * 100));
    setTouched(true);
  }, []);

  return (
    <div className="daynight bg-[#120d0c] shadow-[0_40px_80px_-40px_rgba(30,15,5,0.7)]">
      <div
        ref={scene}
        className="relative aspect-[4/5] cursor-ew-resize select-none sm:aspect-[16/9]"
        onPointerDown={(e) => {
          if (e.pointerType === "mouse") e.preventDefault();
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          fromPointer(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.buttons === 1 || e.pointerType === "touch") {
            if ((e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId))
              fromPointer(e.clientX);
          }
        }}
      >
        <svg
          viewBox="0 0 800 450"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <defs>
            <linearGradient id="dn-day" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ead9c9" />
              <stop offset="1" stopColor="#faf7f4" />
            </linearGradient>
            <linearGradient id="dn-dusk" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8d3d20" />
              <stop offset="0.55" stopColor="#b85d3b" />
              <stop offset="1" stopColor="#fde68a" />
            </linearGradient>
            <linearGradient id="dn-night" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#120d0c" />
              <stop offset="0.65" stopColor="#26172a" />
              <stop offset="1" stopColor="#3d2357" />
            </linearGradient>
            <radialGradient id="dn-lamp" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#e8b86d" stopOpacity="0.45" />
              <stop offset="1" stopColor="#b85d3b" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="800" height="450" fill="url(#dn-day)" />
          <rect width="800" height="450" fill="url(#dn-dusk)" opacity={mid} />
          <rect width="800" height="450" fill="url(#dn-night)" opacity={pro} />

          {/* Halo molecular dorado */}
          <circle cx="400" cy="240" r="220" fill="url(#dn-lamp)" opacity={pro} />

          {/* Representación macro de la Hebra Capilar (Córtex + Escamas de Cutícula) */}
          <g transform="translate(140, 175)">
            {/* Núcleo del córtex */}
            <rect
              x="0"
              y="20"
              width="520"
              height="70"
              rx="35"
              fill={pro > 0.5 ? "#d97706" : "#b45309"}
              stroke={pro > 0.5 ? "#fef08a" : "#78350f"}
              strokeWidth="4"
            />
            {/* Escamas de la cutícula: levantadas cuando t es bajo, selladas y lisas cuando t es alto */}
            {[40, 120, 200, 280, 360, 440].map((xPos, idx) => {
              const lift = (1 - t) * 26;
              return (
                <g key={idx}>
                  <path
                    d={`M ${xPos} 20 L ${xPos + 45} ${20 - lift} L ${xPos + 65} 20`}
                    fill="none"
                    stroke={pro > 0.5 ? "#fef08a" : "#78350f"}
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d={`M ${xPos} 90 L ${xPos + 45} ${90 + lift} L ${xPos + 65} 90`}
                    fill="none"
                    stroke={pro > 0.5 ? "#fef08a" : "#78350f"}
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </g>
              );
            })}
            {/* Enlaces Disulfuro S-S y Cadenas Peptídicas internas */}
            {[75, 165, 255, 345, 435].map((xPos, idx) => (
              <g key={idx}>
                {pro > 0.4 ? (
                  <line
                    x1={xPos}
                    y1="30"
                    x2={xPos}
                    y2="80"
                    stroke="#fef08a"
                    strokeWidth="4"
                    strokeDasharray="none"
                  />
                ) : (
                  <path
                    d={`M ${xPos} 30 L ${xPos - 8} 48 M ${xPos + 8} 64 L ${xPos} 80`}
                    stroke="#451a03"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                )}
              </g>
            ))}
            {/* Brillo espejo reflejado cuando la cutícula está sellada */}
            <rect
              x="24"
              y="32"
              width="472"
              height="12"
              rx="6"
              fill="#ffffff"
              opacity={shine * 0.85}
            />
          </g>

          {/* Barra inferior de estado */}
          <rect
            x="240"
            y="346"
            width="320"
            height="34"
            rx="10"
            fill="#191311"
            stroke="#e8b86d"
            strokeWidth="2"
          />
          <text
            x="400"
            y="368"
            textAnchor="middle"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="13.5"
            fill="#fef08a"
          >
            {pro > 0.5
              ? "Puentes S-S Reconectados + Escudo 450 °F"
              : "Cutícula Abierta · Fuga de Tinte y Humedad"}
          </text>
        </svg>

        <div className="pointer-events-none absolute left-4 top-4 rounded-2xl border border-white/30 bg-black/45 px-4 py-2 text-white backdrop-blur-md sm:left-6 sm:top-6">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/75">
            {phase}
          </p>
          <p className="font-display text-3xl font-extrabold tabular-nums">
            {phReading}
          </p>
        </div>
        <div className="pointer-events-none absolute right-4 top-4 max-w-[54%] rounded-2xl border border-white/30 bg-black/45 px-4 py-3 text-right text-white backdrop-blur-md sm:right-6 sm:top-6">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-fxlime">
            {pro > 0.5 ? "Reconstrucción Molecular Activa" : "Daño Químico Post-Decoloración"}
          </p>
          <p className="font-display text-sm font-bold leading-snug sm:text-lg">
            {pro > 0.5
              ? "K18 / Olaplex No. 3 + Redken Acidic Bonding = Fibra Fuerte y Brillante"
              : "Escamas levantadas: el pelo absorbe humedad, se encrespa y se rompe"}
          </p>
        </div>
        {!touched && (
          <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 animate-pulse whitespace-nowrap rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-fxink shadow-lg sm:bottom-5 sm:px-4 sm:py-2 sm:text-sm">
            ← Arrastra para comparar Cabello Decolorado Poroso vs Fibra Reparada →
          </div>
        )}
      </div>
      <div className="flex items-center gap-4 bg-[#120d0c] px-5 py-4 text-white sm:px-7">
        <span className="text-xs font-bold whitespace-nowrap">⚠️ Poroso pH 8.5</span>
        <label className="sr-only" htmlFor="dn-range">
          Nivel de reparación molecular y sellado de cutícula
        </label>
        <input
          id="dn-range"
          type="range"
          min={0}
          max={100}
          value={v}
          onChange={(e) => {
            setV(Number(e.target.value));
            setTouched(true);
          }}
          aria-valuetext={`${phase}, ${phReading}`}
        />
        <span className="text-xs font-bold whitespace-nowrap text-fxlime">🧬 Sellado pH 4.5</span>
      </div>
    </div>
  );
}
