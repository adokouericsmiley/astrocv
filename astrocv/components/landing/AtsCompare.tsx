"use client";
// Comparaison visuelle : modèle ATS vs modèle très graphique.

import { Check, TriangleAlert } from "lucide-react";
import TemplateThumb from "@/components/ui/TemplateThumb";
import { demoCV } from "@/lib/landingData";

const ats = demoCV("rh_assistant", "ats_modern", "navy");
const graphic = demoCV("rh_assistant", "dark_sidebar", "teal", "/avatars/a4.svg");

export default function AtsCompare() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6">
      <figure>
        <div className="relative">
          <TemplateThumb id="ats_modern" data={ats} className="ring-2 ring-emerald-500" />
          <span className="absolute -top-3 left-3 inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white shadow">
            <Check size={13} /> Lu correctement
          </span>
        </div>
        <figcaption className="mt-3 text-sm text-slate-600">Une colonne, titres standards : chaque section est reconnue.</figcaption>
      </figure>
      <figure>
        <div className="relative">
          <TemplateThumb id="dark_sidebar" data={graphic} className="opacity-90" />
          <span className="absolute -top-3 left-3 inline-flex items-center gap-1 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white shadow">
            <TriangleAlert size={13} /> Risque de mélange
          </span>
        </div>
        <figcaption className="mt-3 text-sm text-slate-600">Colonnes et graphismes : superbe pour un humain, plus fragile pour un robot.</figcaption>
      </figure>
    </div>
  );
}
