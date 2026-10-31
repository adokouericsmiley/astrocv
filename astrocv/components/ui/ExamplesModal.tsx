"use client";
// ============================================================
// components/ui/ExamplesModal.tsx
// Exemples de CV pour tous types de métiers. Charger un exemple
// remplace le contenu du CV (le style et la photo sont conservés).
// ============================================================

import { useCallback, useEffect, useState } from "react";
import { useCVStore } from "@/lib/store";
import { EXAMPLE_PROFILES, ExampleProfile } from "@/lib/examples";
import { X, BookUser, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface ExamplesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExamplesModal({ isOpen, onClose }: ExamplesModalProps) {
  const loadContent = useCVStore((s) => s.loadContent);
  const [pending, setPending] = useState<ExampleProfile | null>(null);

  const close = useCallback(() => {
    setPending(null);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  if (!isOpen) return null;

  const confirm = () => {
    if (!pending) return;
    loadContent(pending.content, pending.sectionOrder);
    close();
  };

  return (
    <div
      className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Exemples de CV par métier"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl bg-base-100 rounded-2xl shadow-2xl border border-base-300 overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-base-200 bg-base-200/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600">
              <BookUser size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-base-content">Exemples de CV par métier</h3>
              <p className="text-xs text-base-content/60">
                Partez d&apos;un contenu réaliste proche de votre métier, puis adaptez-le.
              </p>
            </div>
          </div>
          <button onClick={close} className="btn btn-sm btn-circle btn-ghost" aria-label="Fermer">
            <X size={18} />
          </button>
        </div>

        {pending && (
          <div className="mx-6 mt-4 p-3 rounded-xl border border-warning/40 bg-warning/10 flex items-center gap-3 text-sm">
            <AlertTriangle size={18} className="text-warning shrink-0" />
            <p className="flex-1">
              Charger <b>{pending.job}</b> remplace le contenu actuel de votre CV. Pensez à l&apos;enregistrer
              dans « Mes CVs » si vous voulez le garder.
            </p>
            <button className="btn btn-xs btn-ghost" onClick={() => setPending(null)}>
              Annuler
            </button>
            <button className="btn btn-xs btn-primary" onClick={confirm}>
              Remplacer
            </button>
          </div>
        )}

        <div className="p-6 overflow-y-auto grid grid-cols-2 md:grid-cols-3 gap-3">
          {EXAMPLE_PROFILES.map((ex) => (
            <button
              key={ex.id}
              onClick={() => setPending(ex)}
              className={`text-left p-4 rounded-xl border-2 transition-all hover:border-primary/60 hover:bg-base-200/40 ${
                pending?.id === ex.id ? "border-primary bg-primary/5" : "border-base-200"
              }`}
            >
              <p className="text-sm font-bold text-base-content">{ex.job}</p>
              <p className="text-[11px] uppercase tracking-wide text-teal-600 mt-0.5">{ex.sector}</p>
              <p className="text-xs text-base-content/60 mt-2 line-clamp-3">{ex.content.personal.summary}</p>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
