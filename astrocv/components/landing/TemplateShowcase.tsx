"use client";
// Galerie de modèles (rendus réels) pour la landing page.

import Link from "next/link";
import TemplateThumb from "@/components/ui/TemplateThumb";
import { TEMPLATES } from "@/components/templates";
import { demoCV } from "@/lib/landingData";
import { AccentColor, TemplateId } from "@/lib/types";

const SHOWCASE: { id: TemplateId; example: string; accent: AccentColor; avatar: string }[] = [
  { id: "dark_sidebar", example: "commercial", accent: "orange", avatar: "/avatars/a3.svg" },
  { id: "slant_band", example: "marketing", accent: "burgundy", avatar: "/avatars/a4.svg" },
  { id: "ats_classic", example: "comptable", accent: "black", avatar: "" },
  { id: "pastel_cards", example: "enseignant", accent: "violet", avatar: "/avatars/a4.svg" },
  { id: "timeline_clean", example: "etudiant", accent: "indigo", avatar: "/avatars/a1.svg" },
  { id: "sidebar_accent", example: "cuisinier", accent: "teal", avatar: "/avatars/a2.svg" },
  { id: "executive_serif", example: "juriste", accent: "navy", avatar: "" },
  { id: "studio_grid", example: "designer", accent: "rose", avatar: "/avatars/a3.svg" },
];

export default function TemplateShowcase() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
      {SHOWCASE.map((s) => {
        const meta = TEMPLATES.find((t) => t.id === s.id);
        return (
          <Link
            key={s.id}
            href="/editor"
            className="group block rounded-2xl p-2 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-slate-900/10"
          >
            <TemplateThumb id={s.id} data={demoCV(s.example, s.id, s.accent, s.avatar)} />
            <div className="px-1 pt-3 pb-1">
              <p className="text-sm font-bold text-slate-900">{meta?.name}</p>
              <p className="text-xs text-slate-500 line-clamp-1">{meta?.bestFor}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
