"use client";
// Composition de vrais modèles de CV pour l'en-tête de la landing page.

import { ShieldCheck, FileDown } from "lucide-react";
import TemplateThumb from "@/components/ui/TemplateThumb";
import { demoCV } from "@/lib/landingData";

const left = demoCV("commercial", "ats_modern", "navy");
const center = demoCV("designer", "portrait_studio", "black", "/avatars/a1.svg");
const right = demoCV("infirmiere", "round_band", "teal", "/avatars/a2.svg");

export default function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[560px] h-[420px] sm:h-[520px]">
      <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-br from-indigo-200/60 via-white to-teal-200/60 blur-2xl" />
      <div className="absolute left-0 top-10 w-[38%] -rotate-6 shadow-2xl shadow-slate-900/15 rounded-lg overflow-hidden">
        <TemplateThumb id="ats_modern" data={left} />
      </div>
      <div className="absolute right-0 top-14 w-[38%] rotate-6 shadow-2xl shadow-slate-900/15 rounded-lg overflow-hidden">
        <TemplateThumb id="round_band" data={right} />
      </div>
      <div className="absolute left-1/2 top-0 w-[48%] -translate-x-1/2 shadow-2xl shadow-slate-900/25 rounded-lg overflow-hidden ring-1 ring-slate-900/5">
        <TemplateThumb id="portrait_studio" data={center} />
      </div>

      <div className="absolute left-0 bottom-6 sm:bottom-10 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-lg ring-1 ring-slate-200">
        <ShieldCheck size={16} className="text-emerald-600" /> Compatible ATS
      </div>
      <div className="absolute right-0 bottom-0 sm:bottom-2 flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg">
        <FileDown size={16} /> Export PDF A4
      </div>
    </div>
  );
}
