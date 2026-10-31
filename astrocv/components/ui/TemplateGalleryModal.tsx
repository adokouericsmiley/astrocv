"use client";
// ============================================================
// components/ui/TemplateGalleryModal.tsx
// Galerie des modèles de CV : miniatures réelles (le vrai modèle,
// rendu avec les données de l'utilisateur), filtres par catégorie
// et repère ATS.
// ============================================================

import { useEffect, useState } from "react";
import { useCVStore } from "@/lib/store";
import { TEMPLATES, CATEGORY_LABELS } from "@/components/templates";
import TemplateThumb from "./TemplateThumb";
import { applyHiddenSections, getAccentHex } from "@/lib/helpers";
import { TemplateCategory, TemplateId } from "@/lib/types";
import { X, Check, LayoutTemplate, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

interface TemplateGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Filter = "all" | TemplateCategory;
const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Tous" },
  { id: "ats", label: "ATS" },
  { id: "classic", label: "Classique" },
  { id: "modern", label: "Moderne" },
  { id: "creative", label: "Créatif" },
];

export default function TemplateGalleryModal({ isOpen, onClose }: TemplateGalleryModalProps) {
  const { cv, setTemplate } = useCVStore();
  const [filter, setFilter] = useState<Filter>("all");
  const currentTemplate = cv.settings.templateId;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const visible = TEMPLATES.filter((t) =>
    filter === "all" ? true : filter === "ats" ? t.ats : t.category === filter
  );

  // Les miniatures utilisent le CV courant, sans les sections masquées
  const previewData = applyHiddenSections(cv);

  const handleSelect = (id: TemplateId) => {
    setTemplate(id);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Galerie des modèles de CV"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl bg-base-100 rounded-2xl shadow-2xl border border-base-300 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* En-tête */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-base-200 bg-base-200/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
              <LayoutTemplate size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-base-content">Modèles de CV</h3>
              <p className="text-xs text-base-content/60">
                {TEMPLATES.length} modèles. Aperçu avec vos informations, couleur et police
                personnalisables.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost text-base-content/60 hover:text-base-content"
            aria-label="Fermer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Filtres */}
        <div className="px-6 pt-4 pb-2 flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`btn btn-xs rounded-full ${
                filter === f.id ? "btn-primary" : "btn-outline border-base-300 text-base-content/70"
              }`}
            >
              {f.id === "ats" && <ShieldCheck size={12} />}
              {f.label}
            </button>
          ))}
          <span className="text-[11px] text-base-content/50 ml-auto">
            <b>ATS</b> : une colonne, sans icône ni photo, lisible par les logiciels de tri de candidatures.
          </span>
        </div>

        {/* Grille */}
        <div className="p-6 pt-3 overflow-y-auto grid grid-cols-2 md:grid-cols-3 gap-5">
          {visible.map((tmpl) => {
            const isSelected = currentTemplate === tmpl.id;
            return (
              <button
                key={tmpl.id}
                onClick={() => handleSelect(tmpl.id)}
                className={`group text-left p-3 rounded-2xl border-2 transition-all flex flex-col ${
                  isSelected
                    ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                    : "border-base-200 hover:border-primary/50 hover:bg-base-200/40"
                }`}
              >
                <div className="relative mb-3">
                  <TemplateThumb id={tmpl.id} data={previewData} />
                  {tmpl.ats && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center gap-1 shadow">
                      <ShieldCheck size={11} /> ATS
                    </span>
                  )}
                  {isSelected && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-primary text-primary-content text-[10px] font-bold flex items-center gap-1 shadow">
                      <Check size={11} /> Actif
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold text-base-content group-hover:text-primary transition-colors">
                  {tmpl.name}
                  <span className="ml-2 text-[10px] font-medium text-base-content/40 uppercase">
                    {CATEGORY_LABELS[tmpl.category]}
                  </span>
                </h4>
                <p className="text-xs text-base-content/60 mt-1">{tmpl.description}</p>
                <p className="text-[11px] text-base-content/50 mt-1.5">
                  <b>Idéal pour :</b> {tmpl.bestFor}
                </p>
              </button>
            );
          })}
        </div>

        {/* Pied */}
        <div className="px-6 py-3 border-t border-base-200 bg-base-200/30 flex items-center justify-between text-xs text-base-content/60">
          <span>Vos données restent intactes lors du changement de modèle.</span>
          <button onClick={onClose} className="btn btn-sm btn-ghost">
            Fermer
          </button>
        </div>
      </motion.div>
    </div>
  );
}
