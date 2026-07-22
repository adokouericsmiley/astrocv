"use client";
// ============================================================
// components/editor/sections/InterestsSection.tsx
// Section "Centres d'intérêt" — liste simple dynamique
// ============================================================

import { useCVStore } from "@/lib/store";
import { Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InterestsSection() {
  const { cv, addInterest, updateInterest, removeInterest } = useCVStore();

  return (
    <div>
      <p className="text-xs text-slate-500 mb-3">
        Listez vos hobbies et centres d'intérêt personnels.
      </p>
      <AnimatePresence>
        {cv.interests.map((interest, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-2 mb-2"
          >
            <span className="text-slate-400 text-xs">•</span>
            <input
              className="field-input flex-1"
              placeholder="Photographie, randonnée..."
              value={interest}
              onChange={(e) => updateInterest(index, e.target.value)}
            />
            <button className="btn-danger" onClick={() => removeInterest(index)}>
              <Trash2 size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      <button className="btn-add" onClick={addInterest}>
        <Plus size={16} /> Ajouter un centre d'intérêt
      </button>
    </div>
  );
}
