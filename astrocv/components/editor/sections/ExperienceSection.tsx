"use client";
// ============================================================
// components/editor/sections/ExperienceSection.tsx
// Section "Expériences professionnelles" — gestion dynamique
// avec ajout, suppression et bullets points par expérience
// ============================================================

import { useCVStore } from "@/lib/store";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { motion, AnimatePresence, Reorder } from "framer-motion";

export default function ExperienceSection() {
  const { cv, addExperience, updateExperience, removeExperience, reorderExperiences, addExperienceBullet, updateExperienceBullet, removeExperienceBullet } = useCVStore();

  // Dérive les items directement du store (toujours en sync)
  const items = cv.experiences.map((e) => e.id);

  // Synchronise le store quand l'ordre change via drag & drop
  const handleReorder = (newOrder: string[]) => {
    newOrder.forEach((id, toIndex) => {
      const fromIndex = cv.experiences.findIndex((e) => e.id === id);
      if (fromIndex !== -1 && fromIndex !== toIndex) {
        reorderExperiences(fromIndex, toIndex);
      }
    });
  };

  return (
    <div>
      <Reorder.Group axis="y" values={items} onReorder={handleReorder} className="space-y-3">
        <AnimatePresence>
          {cv.experiences.map((exp) => (
            <Reorder.Item
              key={exp.id}
              value={exp.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="entry-card">
                <div className="entry-card-header">
                  <div className="flex items-center gap-2">
                    <GripVertical size={16} className="text-slate-400 cursor-grab" />
                    <span className="text-sm font-medium text-slate-700 truncate max-w-[220px]">
                      {exp.position || "Nouvelle expérience"}
                    </span>
                  </div>
                  <button
                    className="btn-danger"
                    onClick={() => removeExperience(exp.id)}
                    title="Supprimer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* Poste & Entreprise */}
                <div className="field-group">
                  <div>
                    <label className="field-label">Poste</label>
                    <input className="field-input" placeholder="Intitulé du poste" value={exp.position}
                      onChange={(e) => updateExperience(exp.id, { position: e.target.value })} />
                  </div>
                  <div>
                    <label className="field-label">Entreprise</label>
                    <input className="field-input" placeholder="Nom de l'entreprise" value={exp.company}
                      onChange={(e) => updateExperience(exp.id, { company: e.target.value })} />
                  </div>
                </div>

                {/* Lieu & Période */}
                <div className="field-group">
                  <div>
                    <label className="field-label">Lieu</label>
                    <input className="field-input" placeholder="Paris, France" value={exp.location}
                      onChange={(e) => updateExperience(exp.id, { location: e.target.value })} />
                  </div>
                  <div>
                    <label className="field-label">Début (MM/AAAA)</label>
                    <input className="field-input" placeholder="01/2022" value={exp.startMonth}
                      onChange={(e) => updateExperience(exp.id, { startMonth: e.target.value })} />
                  </div>
                </div>

                {/* Date de fin + poste actuel */}
                <div className="field-group">
                  <div>
                    <label className="field-label">Fin (MM/AAAA)</label>
                    <input className="field-input" placeholder="12/2023" value={exp.endMonth}
                      disabled={exp.current}
                      onChange={(e) => updateExperience(exp.id, { endMonth: e.target.value })} />
                  </div>
                  <div className="flex items-end pb-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        checked={exp.current}
                        onChange={(e) => updateExperience(exp.id, { current: e.target.checked, endMonth: "" })}
                      />
                      <span className="text-sm text-slate-600">Poste actuel</span>
                    </label>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="field-label">Description</label>
                  <textarea className="field-input textarea" placeholder="Décrivez vos responsabilités..." value={exp.description} rows={2}
                    onChange={(e) => updateExperience(exp.id, { description: e.target.value })} />
                </div>

                {/* Bullets */}
                <div>
                  <label className="field-label">Points clés / Réalisations</label>
                  <AnimatePresence>
                    {exp.bullets.map((bullet, bi) => (
                      <motion.div
                        key={bi}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-start gap-2 mb-2"
                      >
                        <span className="mt-2 text-slate-400 text-xs">•</span>
                        <input
                          className="field-input flex-1"
                          placeholder="Réalisation ou responsabilité..."
                          value={bullet}
                          onChange={(e) => updateExperienceBullet(exp.id, bi, e.target.value)}
                        />
                        <button className="btn-danger mt-1" onClick={() => removeExperienceBullet(exp.id, bi)}>
                          <Trash2 size={12} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <button className="btn-add text-xs py-1" onClick={() => addExperienceBullet(exp.id)}>
                    <Plus size={12} /> Ajouter un point
                  </button>
                </div>
              </div>
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>

      <button className="btn-add" onClick={addExperience}>
        <Plus size={16} /> Ajouter une expérience
      </button>
    </div>
  );
}
