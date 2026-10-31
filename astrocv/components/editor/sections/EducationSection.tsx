"use client";
// ============================================================
// components/editor/sections/EducationSection.tsx
// Section "Formations" du formulaire éditeur
// ============================================================

import { useCVStore } from "@/lib/store";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { useState } from "react";

export default function EducationSection() {
  const { cv, addEducation, updateEducation, removeEducation, reorderEducation } = useCVStore();
  const [items, setItems] = useState(() => cv.education.map((e) => e.id));

  const handleReorder = (newOrder: string[]) => {
    setItems(newOrder);
    const currentIds = cv.education.map((e) => e.id);
    newOrder.forEach((id, toIndex) => {
      const fromIndex = currentIds.indexOf(id);
      if (fromIndex !== toIndex) reorderEducation(fromIndex, toIndex);
    });
  };

  return (
    <div>
      <Reorder.Group axis="y" values={items} onReorder={handleReorder} className="space-y-3">
        <AnimatePresence>
          {cv.education.map((edu) => (
            <Reorder.Item
              key={edu.id}
              value={edu.id}
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
                      {edu.degree || "Nouvelle formation"}
                    </span>
                  </div>
                  <button className="btn-danger" onClick={() => removeEducation(edu.id)}>
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="field-group full">
                  <div>
                    <label className="field-label">Diplôme / Titre</label>
                    <input className="field-input" placeholder="Diplôme ou formation" value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, { degree: e.target.value })} />
                  </div>
                </div>

                <div className="field-group">
                  <div>
                    <label className="field-label">Établissement</label>
                    <input className="field-input" placeholder="École, université, centre de formation" value={edu.school}
                      onChange={(e) => updateEducation(edu.id, { school: e.target.value })} />
                  </div>
                  <div>
                    <label className="field-label">Lieu</label>
                    <input className="field-input" placeholder="Paris, France" value={edu.location}
                      onChange={(e) => updateEducation(edu.id, { location: e.target.value })} />
                  </div>
                </div>

                <div className="field-group">
                  <div>
                    <label className="field-label">Début (MM/AAAA)</label>
                    <input className="field-input" placeholder="09/2017" value={edu.startMonth}
                      onChange={(e) => updateEducation(edu.id, { startMonth: e.target.value })} />
                  </div>
                  <div>
                    <label className="field-label">Fin (MM/AAAA)</label>
                    <input className="field-input" placeholder="06/2019" value={edu.endMonth}
                      disabled={edu.current}
                      onChange={(e) => updateEducation(edu.id, { endMonth: e.target.value })} />
                  </div>
                </div>

                <div className="field-group">
                  <div>
                    <label className="field-label">Mention</label>
                    <input className="field-input" placeholder="Mention Très Bien" value={edu.mention}
                      onChange={(e) => updateEducation(edu.id, { mention: e.target.value })} />
                  </div>
                  <div className="flex items-end pb-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="checkbox checkbox-sm" checked={edu.current}
                        onChange={(e) => updateEducation(edu.id, { current: e.target.checked, endMonth: "" })} />
                      <span className="text-sm text-slate-600">En cours</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="field-label">Description (optionnel)</label>
                  <textarea className="field-input textarea" rows={2} placeholder="Spécialisation, projets notables..."
                    value={edu.description}
                    onChange={(e) => updateEducation(edu.id, { description: e.target.value })} />
                </div>
              </div>
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>

      <button className="btn-add" onClick={addEducation}>
        <Plus size={16} /> Ajouter une formation
      </button>
    </div>
  );
}
