"use client";
// ============================================================
// components/editor/sections/ProjectsSection.tsx
// Section "Projets" — avec technologies sous forme de tags
// ============================================================

import { useCVStore } from "@/lib/store";
import { Plus, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function ProjectsSection() {
  const { cv, addProject, updateProject, removeProject } = useCVStore();
  const [techInputs, setTechInputs] = useState<Record<string, string>>({});

  const addTech = (projectId: string) => {
    const val = (techInputs[projectId] ?? "").trim();
    if (!val) return;
    const project = cv.projects.find((p) => p.id === projectId);
    if (!project) return;
    updateProject(projectId, { technologies: [...project.technologies, val] });
    setTechInputs((prev) => ({ ...prev, [projectId]: "" }));
  };

  const removeTech = (projectId: string, techIndex: number) => {
    const project = cv.projects.find((p) => p.id === projectId);
    if (!project) return;
    updateProject(projectId, {
      technologies: project.technologies.filter((_, i) => i !== techIndex),
    });
  };

  return (
    <div>
      <AnimatePresence>
        {cv.projects.map((proj) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="entry-card mb-3"
          >
            <div className="entry-card-header">
              <span className="text-sm font-medium text-slate-700 truncate max-w-[220px]">
                {proj.title || "Nouveau projet"}
              </span>
              <button className="btn-danger" onClick={() => removeProject(proj.id)}>
                <Trash2 size={14} />
              </button>
            </div>

            <div className="field-group full mb-3">
              <div>
                <label className="field-label">Titre du projet</label>
                <input className="field-input" placeholder="Projet, réalisation ou mission" value={proj.title}
                  onChange={(e) => updateProject(proj.id, { title: e.target.value })} />
              </div>
            </div>

            <div className="mb-3">
              <label className="field-label">Description</label>
              <textarea className="field-input textarea" rows={2} placeholder="Objectif, votre rôle, résultats…"
                value={proj.description}
                onChange={(e) => updateProject(proj.id, { description: e.target.value })} />
            </div>

            <div className="field-group">
              <div>
                <label className="field-label">Lien du projet</label>
                <input className="field-input" placeholder="monprojet.com" value={proj.link}
                  onChange={(e) => updateProject(proj.id, { link: e.target.value })} />
              </div>
              <div>
                <label className="field-label">Lien complémentaire</label>
                <input className="field-input" placeholder="github.com/… ou autre lien" value={proj.github}
                  onChange={(e) => updateProject(proj.id, { github: e.target.value })} />
              </div>
            </div>

            {/* Technologies (tags) */}
            <div className="mt-3">
              <label className="field-label">Outils / compétences utilisés</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {proj.technologies.map((tech, ti) => (
                  <span
                    key={ti}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700"
                  >
                    {tech}
                    <button onClick={() => removeTech(proj.id, ti)} className="hover:text-red-500">
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  className="field-input flex-1"
                  placeholder="Outils, méthodes…"
                  value={techInputs[proj.id] ?? ""}
                  onChange={(e) => setTechInputs((prev) => ({ ...prev, [proj.id]: e.target.value }))}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTech(proj.id); } }}
                />
                <button
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-medium hover:bg-indigo-700 transition-colors"
                  onClick={() => addTech(proj.id)}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <button className="btn-add" onClick={addProject}>
        <Plus size={16} /> Ajouter un projet
      </button>
    </div>
  );
}
