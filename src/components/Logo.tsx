import { useId } from "react";

/** Logotipo de GuíaCapilar.com: Gota de péptido dorado + estructura de doble enlace disulfuro */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#191311" />
          <stop offset="0.55" stopColor="#8D3D20" />
          <stop offset="1" stopColor="#6B468F" />
        </linearGradient>
        <linearGradient id={`${id}gold`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FEF08A" />
          <stop offset="0.5" stopColor="#E8B86D" />
          <stop offset="1" stopColor="#B85D3B" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill={`url(#${id}bg)`} />
      {/* Gota molecular de tratamiento capilar */}
      <path
        d="M32 10C32 10 18 25 18 37C18 44.732 24.268 51 32 51C39.732 51 46 44.732 46 37C46 25 32 10 32 10Z"
        stroke={`url(#${id}gold)`}
        strokeWidth="3.5"
        fill="rgba(232,184,109,0.16)"
      />
      {/* Enlace peptídico interno */}
      <path
        d="M25 34 C28 29 36 29 39 34 M25 40 C28 35 36 35 39 40"
        stroke="#FFFFFF"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="32" cy="22" r="2.5" fill="#FEF08A" />
    </svg>
  );
}

export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5 font-display text-lg font-extrabold tracking-tight">
      <LogoMark />
      <span>
        Guía<span className={dark ? "text-fxlime" : "text-fxblue"}>Capilar</span>
        <span
          className={`ml-1.5 hidden text-[10px] font-bold uppercase tracking-[0.18em] sm:inline ${
            dark ? "text-white/60" : "text-[var(--muted)]"
          }`}
        >
          .com
        </span>
      </span>
    </span>
  );
}
