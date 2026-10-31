"use client";
// ============================================================
// components/ui/TemplateThumb.tsx
// Miniature réelle d'un modèle : le vrai composant, réduit à la
// largeur de son conteneur (galerie, landing page).
// ============================================================

import { useCallback, useEffect, useRef, useState } from "react";
import { TEMPLATE_COMPONENTS } from "@/components/templates";
import { getAccentHex } from "@/lib/helpers";
import { CVData, TemplateId } from "@/lib/types";

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

export default function TemplateThumb({ id, data, className = "" }: { id: TemplateId; data: CVData; className?: string }) {
  const [scale, setScale] = useState(0.3);
  const observerRef = useRef<ResizeObserver | null>(null);

  const attach = useCallback((node: HTMLDivElement | null) => {
    observerRef.current?.disconnect();
    if (!node) return;
    const update = () => setScale(node.offsetWidth / A4_WIDTH);
    update();
    observerRef.current = new ResizeObserver(update);
    observerRef.current.observe(node);
  }, []);

  useEffect(() => () => observerRef.current?.disconnect(), []);

  const Template = TEMPLATE_COMPONENTS[id];
  return (
    <div
      ref={attach}
      className={`relative w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm ${className}`}
      style={{ aspectRatio: `${A4_WIDTH} / ${A4_HEIGHT}` }}
      aria-hidden
    >
      <div
        className="pointer-events-none absolute left-0 top-0 origin-top-left"
        style={{ width: A4_WIDTH, height: A4_HEIGHT, transform: `scale(${scale})`, overflow: "hidden" }}
      >
        <Template data={data} accentHex={getAccentHex(data.settings)} />
      </div>
    </div>
  );
}
