"use client";
// ============================================================
// components/editor/sections/SkillsSection.tsx
// Section "Compétences" — niveau visuel avec dots cliquables
// ============================================================

import { useCVStore } from "@/lib/store";
import { Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SkillLevel } from "@/lib/types";

export default function SkillsSection() {
  const { cv, addSkill, updateSkill, removeSkill } = useCVStore();

  return (
    <div>
      <AnimatePresence>
        {cv.skills.map((skill) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="entry-card mb-3"
          >
            <div className="field-group">
              <div>
                <label className="field-label">Compétence</label>
                <input className="field-input" placeholder="React, TypeScript..." value={skill.name}
                  onChange={(e) => updateSkill(skill.id, { name: e.target.value })} />
              </div>
              <div>
                <label className="field-label">Catégorie</label>
                <input className="field-input" placeholder="Frontend, Backend..." value={skill.category}
                  onChange={(e) => updateSkill(skill.id, { category: e.target.value })} />
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <div>
                <label className="field-label mb-1">Niveau</label>
                <div className="skill-dots">
                  {([1, 2, 3, 4, 5] as SkillLevel[]).map((dot) => (
                    <button
                      key={dot}
                      className={`skill-dot ${dot <= skill.level ? "filled" : ""}`}
                      onClick={() => updateSkill(skill.id, { level: dot })}
                      title={`Niveau ${dot}`}
                    />
                  ))}
                </div>
              </div>
              <button className="btn-danger" onClick={() => removeSkill(skill.id)}>
                <Trash2 size={14} /> Supprimer
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <button className="btn-add" onClick={addSkill}>
        <Plus size={16} /> Ajouter une compétence
      </button>
    </div>
  );
}
