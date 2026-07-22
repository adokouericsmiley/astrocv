"use client";
// ============================================================
// components/editor/sections/LanguagesSection.tsx
// Section "Langues" — avec sélecteur de niveau CECRL
// ============================================================

import { useCVStore } from "@/lib/store";
import { Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageLevel } from "@/lib/types";

const LEVELS: LanguageLevel[] = ["Natif", "C2", "C1", "B2", "B1", "A2", "A1"];

export default function LanguagesSection() {
  const { cv, addLanguage, updateLanguage, removeLanguage } = useCVStore();

  return (
    <div>
      <AnimatePresence>
        {cv.languages.map((lang) => (
          <motion.div
            key={lang.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="entry-card mb-3"
          >
            <div className="field-group">
              <div>
                <label className="field-label">Langue</label>
                <input className="field-input" placeholder="Français, Anglais..." value={lang.name}
                  onChange={(e) => updateLanguage(lang.id, { name: e.target.value })} />
              </div>
              <div>
                <label className="field-label">Niveau</label>
                <select
                  className="field-input"
                  value={lang.level}
                  onChange={(e) => updateLanguage(lang.id, { level: e.target.value as LanguageLevel })}
                >
                  {LEVELS.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="btn-danger" onClick={() => removeLanguage(lang.id)}>
                <Trash2 size={14} /> Supprimer
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <button className="btn-add" onClick={addLanguage}>
        <Plus size={16} /> Ajouter une langue
      </button>
    </div>
  );
}
