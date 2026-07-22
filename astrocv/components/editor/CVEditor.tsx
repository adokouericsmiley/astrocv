"use client";
// ============================================================
// components/editor/CVEditor.tsx
// Éditeur principal — accordéon avec navigation entre sections
// Chaque section est collapsible, avec une icône et un titre
// ============================================================

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Briefcase,
  GraduationCap,
  Code,
  Languages,
  FolderGit2,
  Heart,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import PersonalInfoSection from "./sections/PersonalInfoSection";
import ExperienceSection from "./sections/ExperienceSection";
import EducationSection from "./sections/EducationSection";
import SkillsSection from "./sections/SkillsSection";
import LanguagesSection from "./sections/LanguagesSection";
import ProjectsSection from "./sections/ProjectsSection";
import InterestsSection from "./sections/InterestsSection";

// ── Définition des sections de l'accordéon ──────────────────
const SECTIONS = [
  {
    id: "personal",
    label: "Informations personnelles",
    icon: User,
    component: PersonalInfoSection,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    id: "experiences",
    label: "Expériences professionnelles",
    icon: Briefcase,
    component: ExperienceSection,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    id: "education",
    label: "Formations",
    icon: GraduationCap,
    component: EducationSection,
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
  {
    id: "skills",
    label: "Compétences",
    icon: Code,
    component: SkillsSection,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    id: "languages",
    label: "Langues",
    icon: Languages,
    component: LanguagesSection,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    id: "projects",
    label: "Projets",
    icon: FolderGit2,
    component: ProjectsSection,
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    id: "interests",
    label: "Centres d'intérêt",
    icon: Heart,
    component: InterestsSection,
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
] as const;

export default function CVEditor() {
  // La première section est ouverte par défaut
  const [openSection, setOpenSection] = useState<string>("personal");

  const toggleSection = (id: string) => {
    setOpenSection((prev) => (prev === id ? "" : id));
  };

  return (
    <div className="editor-panel no-print">
      {/* En-tête de l'éditeur */}
      <div className="px-4 py-3 border-b border-slate-200 bg-white">
        <h2 className="text-sm font-bold text-slate-800 tracking-tight">
          Éditeur de CV
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Les modifications apparaissent en temps réel →
        </p>
      </div>

      {/* Accordéon des sections */}
      <div className="editor-scroll">
        {SECTIONS.map(({ id, label, icon: Icon, component: SectionComponent, color, bg }) => {
          const isOpen = openSection === id;
          return (
            <div key={id} className="section-accordion">
              {/* Header cliquable */}
              <button
                className="section-accordion-header w-full"
                onClick={() => toggleSection(id)}
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <span className={`p-1.5 rounded-lg ${bg}`}>
                    <Icon size={15} className={color} />
                  </span>
                  <span className="text-sm font-semibold text-slate-700">{label}</span>
                </div>
                <span className="text-slate-400">
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
              </button>

              {/* Corps animé */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="section-accordion-body">
                      <SectionComponent />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
