"use client";
// ============================================================
// components/ui/TemplateGalleryModal.tsx
// Modal de sélection rapide de modèles (templates) de CV
// avec aperçus visuels interactifs et sélection en 1 clic.
// ============================================================

import { useCVStore } from "@/lib/store";
import { TEMPLATES } from "@/components/templates";
import { TemplateId } from "@/lib/types";
import { X, Check, LayoutTemplate, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TemplateGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TemplateGalleryModal({ isOpen, onClose }: TemplateGalleryModalProps) {
  const { cv, setTemplate } = useCVStore();
  const currentTemplate = cv.settings.templateId;

  if (!isOpen) return null;

  const handleSelect = (id: TemplateId) => {
    setTemplate(id);
    onClose();
  };

  // Miniatures SVG schématiques représentatives de chaque template
  const getThumbnail = (id: TemplateId) => {
    switch (id) {
      case "creative":
        return (
          <div className="w-full h-36 bg-slate-100 rounded-lg overflow-hidden relative border border-slate-200 flex">
            {/* Sidebar anthracite incurvée */}
            <div className="w-1/3 bg-slate-800 h-full p-2 flex flex-col items-center justify-start rounded-r-xl">
              <div className="w-8 h-10 rounded-full bg-slate-400 mb-2 border border-white" />
              <div className="w-8 h-2 bg-slate-600 rounded mb-1" />
              <div className="w-6 h-2 bg-slate-600 rounded" />
            </div>
            {/* Colonne droite */}
            <div className="flex-1 p-2 space-y-2">
              <div className="bg-slate-800 text-white px-2 py-1 rounded-r-lg w-3/4 text-[8px] font-bold">
                Célia Naudin
              </div>
              <div className="space-y-1 pl-1">
                <div className="w-full h-1.5 bg-slate-300 rounded" />
                <div className="w-4/5 h-1.5 bg-slate-300 rounded" />
                <div className="w-3/5 h-1.5 bg-slate-300 rounded" />
              </div>
            </div>
          </div>
        );

      case "teal_wave":
        return (
          <div className="w-full h-36 bg-white rounded-lg overflow-hidden relative border border-slate-200 flex flex-col">
            {/* Vague teal */}
            <div className="w-full h-8 bg-teal-500 rounded-b-xl mb-1 relative">
              <div className="absolute top-2 left-3 w-6 h-6 rounded-full bg-white border-2 border-teal-500" />
            </div>
            <div className="flex flex-1 p-2 gap-2">
              <div className="w-1/3 space-y-1.5 pt-2">
                <div className="w-full h-2 bg-slate-700 rounded" />
                <div className="w-full h-1 bg-teal-500 rounded" />
                <div className="w-full h-1 bg-slate-200 rounded" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="w-20 h-3 bg-teal-500 text-white rounded-full text-[7px] px-1 font-bold">
                  EXPÉRIENCES
                </div>
                <div className="w-full h-1.5 bg-slate-300 rounded" />
                <div className="w-4/5 h-1.5 bg-slate-300 rounded" />
              </div>
            </div>
          </div>
        );

      case "timeline_grey":
        return (
          <div className="w-full h-36 bg-white rounded-lg overflow-hidden relative border border-slate-200 flex flex-col">
            {/* En-tête gris anthracite */}
            <div className="w-full h-10 bg-slate-700 p-2 flex items-center justify-end">
              <div className="w-20 h-4 bg-white/90 rounded text-[7px] font-bold px-1 text-slate-800">
                JONATHAN PATTERSON
              </div>
            </div>
            <div className="flex flex-1 p-2 gap-2">
              <div className="w-1/3 bg-slate-200 h-full p-1 rounded">
                <div className="w-7 h-9 bg-slate-400 rounded-t-full -mt-4 border border-white mx-auto" />
                <div className="w-full h-1 bg-slate-400 rounded mt-2" />
              </div>
              <div className="flex-1 border-l-2 border-slate-400 pl-2 space-y-2">
                <div className="w-full h-1.5 bg-slate-700 rounded" />
                <div className="w-3/4 h-1.5 bg-slate-300 rounded" />
              </div>
            </div>
          </div>
        );

      case "modern":
      default:
        return (
          <div className="w-full h-36 bg-white rounded-lg overflow-hidden relative border border-slate-200 flex">
            <div className="w-1/3 bg-indigo-50 border-r-2 border-indigo-500 p-2 space-y-1.5">
              <div className="w-6 h-6 rounded-full bg-indigo-200 mb-2" />
              <div className="w-full h-1.5 bg-indigo-400 rounded" />
              <div className="w-3/4 h-1 bg-slate-300 rounded" />
            </div>
            <div className="flex-1 p-2 space-y-2">
              <div className="w-full h-2 bg-indigo-500 rounded" />
              <div className="w-full h-1.5 bg-slate-300 rounded" />
              <div className="w-4/5 h-1.5 bg-slate-300 rounded" />
            </div>
          </div>
        );
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl bg-base-100 rounded-2xl shadow-2xl border border-base-300 overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header modal */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-base-200 bg-base-200/50">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
                <LayoutTemplate size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-base-content">
                  Galerie des Modèles de CV
                </h3>
                <p className="text-xs text-base-content/60">
                  Sélectionnez un modèle pour appliquer instantanément le design à votre CV.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="btn btn-sm btn-circle btn-ghost text-base-content/60 hover:text-base-content"
            >
              <X size={18} />
            </button>
          </div>

          {/* Grille des cartes de modèles */}
          <div className="p-6 overflow-y-auto grid grid-cols-2 gap-4">
            {TEMPLATES.map((tmpl) => {
              const isSelected = currentTemplate === tmpl.id;
              return (
                <div
                  key={tmpl.id}
                  onClick={() => handleSelect(tmpl.id)}
                  className={`group cursor-pointer p-3.5 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                      : "border-base-200 hover:border-primary/50 hover:bg-base-200/40"
                  }`}
                >
                  <div>
                    {/* Miniature */}
                    <div className="mb-3 relative">
                      {getThumbnail(tmpl.id)}
                      {isSelected && (
                        <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-primary text-primary-content text-[10px] font-bold flex items-center gap-1 shadow-md">
                          <Check size={11} /> Sélectionné
                        </div>
                      )}
                    </div>

                    {/* Titre & Description */}
                    <h4 className="text-sm font-bold text-base-content group-hover:text-primary transition-colors flex items-center gap-1.5">
                      {tmpl.name}
                    </h4>
                    <p className="text-xs text-base-content/60 mt-1 line-clamp-2">
                      {tmpl.description}
                    </p>
                  </div>

                  <button
                    className={`mt-4 w-full btn btn-xs font-semibold ${
                      isSelected
                        ? "btn-primary"
                        : "btn-outline border-base-300 group-hover:btn-primary"
                    }`}
                  >
                    {isSelected ? "Modèle actif" : "Choisir ce modèle"}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Footer modal */}
          <div className="px-6 py-3 border-t border-base-200 bg-base-200/30 flex items-center justify-between text-xs text-base-content/60">
            <span className="flex items-center gap-1">
              <Sparkles size={13} className="text-indigo-500" /> Vos données restent intactes lors du changement de modèle.
            </span>
            <button onClick={onClose} className="btn btn-sm btn-ghost">
              Fermer
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
