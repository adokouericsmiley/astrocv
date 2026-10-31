// ============================================================
// components/ui/Logo.tsx
// Logo AstroCV : un "A" (CV) traversé d'une orbite avec sa planète.
// Même dessin que public/logo.svg et app/icon.svg.
// ============================================================

import { useId } from "react";

export function LogoMark({ size = 28, className }: { size?: number; className?: string }) {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <defs>
        <linearGradient id={id} x1="4" y1="2" x2="44" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4f46e5" />
          <stop offset="1" stopColor="#0d9488" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill={`url(#${id})`} />
      <path d="M15.5 35.5 24 12.5l8.5 23" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.2 28.5h9.6" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="24" cy="24" rx="18" ry="6.5" transform="rotate(-25 24 24)" stroke="#fff" strokeOpacity=".5" strokeWidth="1.8" />
      <circle cx="37.8" cy="15" r="2.8" fill="#fff" />
    </svg>
  );
}

export function LogoWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-extrabold tracking-tight ${className}`}>
      astro<span className="text-teal-500">CV</span>
    </span>
  );
}
