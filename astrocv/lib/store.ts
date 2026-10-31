// ============================================================
// lib/store.ts — Zustand store avec persistance localStorage
// Centralise tout l'état du CV. Utilise le middleware `persist`
// pour sauvegarder automatiquement les données en localStorage.
// ============================================================

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CVData, Experience, Education, Skill, Project, Language, SectionKey, AccentColor, TemplateId } from "./types";
import { defaultCVData } from "./defaultData";

// Génération d'ID unique sans dépendance externe
const genId = () =>
  typeof crypto !== "undefined"
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

// ── Actions du store ─────────────────────────────────────────
interface CVStore {
  cv: CVData;

  // Infos personnelles
  updatePersonal: (data: Partial<CVData["personal"]>) => void;

  // Expériences
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  reorderExperiences: (from: number, to: number) => void;
  addExperienceBullet: (id: string) => void;
  updateExperienceBullet: (expId: string, bulletIndex: number, value: string) => void;
  removeExperienceBullet: (expId: string, bulletIndex: number) => void;

  // Formations
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  reorderEducation: (from: number, to: number) => void;

  // Compétences
  addSkill: () => void;
  updateSkill: (id: string, data: Partial<Skill>) => void;
  removeSkill: (id: string) => void;

  // Langues
  addLanguage: () => void;
  updateLanguage: (id: string, data: Partial<Language>) => void;
  removeLanguage: (id: string) => void;

  // Projets
  addProject: () => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  removeProject: (id: string) => void;

  // Centres d'intérêt
  addInterest: () => void;
  updateInterest: (index: number, value: string) => void;
  removeInterest: (index: number) => void;

  // Paramètres
  updateSettings: (data: Partial<CVData["settings"]>) => void;
  loadContent: (content: Omit<CVData, "settings">, sectionOrder?: SectionKey[]) => void;
  setTemplate: (id: TemplateId) => void;
  setAccentColor: (color: AccentColor) => void;
  setDaisyTheme: (theme: string) => void;
  reorderSections: (order: SectionKey[]) => void;

  // Reset
  resetCV: () => void;
}

// ── Helpers de réorganisation ────────────────────────────────
function reorderArray<T>(arr: T[], from: number, to: number): T[] {
  const result = [...arr];
  const [removed] = result.splice(from, 1);
  result.splice(to, 0, removed);
  return result;
}

// ── Store principal ──────────────────────────────────────────
export const useCVStore = create<CVStore>()(
  persist(
    (set) => ({
      cv: defaultCVData,

      // ── Infos personnelles ──
      updatePersonal: (data) =>
        set((s) => ({ cv: { ...s.cv, personal: { ...s.cv.personal, ...data } } })),

      // ── Expériences ──
      addExperience: () =>
        set((s) => ({
          cv: {
            ...s.cv,
            experiences: [
              ...s.cv.experiences,
              {
                id: genId(),
                position: "",
                company: "",
                location: "",
                startMonth: "",
                endMonth: "",
                current: false,
                description: "",
                bullets: [],
              },
            ],
          },
        })),
      updateExperience: (id, data) =>
        set((s) => ({
          cv: {
            ...s.cv,
            experiences: s.cv.experiences.map((e) =>
              e.id === id ? { ...e, ...data } : e
            ),
          },
        })),
      removeExperience: (id) =>
        set((s) => ({
          cv: {
            ...s.cv,
            experiences: s.cv.experiences.filter((e) => e.id !== id),
          },
        })),
      reorderExperiences: (from, to) =>
        set((s) => ({
          cv: { ...s.cv, experiences: reorderArray(s.cv.experiences, from, to) },
        })),
      addExperienceBullet: (id) =>
        set((s) => ({
          cv: {
            ...s.cv,
            experiences: s.cv.experiences.map((e) =>
              e.id === id ? { ...e, bullets: [...e.bullets, ""] } : e
            ),
          },
        })),
      updateExperienceBullet: (expId, bulletIndex, value) =>
        set((s) => ({
          cv: {
            ...s.cv,
            experiences: s.cv.experiences.map((e) => {
              if (e.id !== expId) return e;
              const bullets = [...e.bullets];
              bullets[bulletIndex] = value;
              return { ...e, bullets };
            }),
          },
        })),
      removeExperienceBullet: (expId, bulletIndex) =>
        set((s) => ({
          cv: {
            ...s.cv,
            experiences: s.cv.experiences.map((e) => {
              if (e.id !== expId) return e;
              return { ...e, bullets: e.bullets.filter((_, i) => i !== bulletIndex) };
            }),
          },
        })),

      // ── Formations ──
      addEducation: () =>
        set((s) => ({
          cv: {
            ...s.cv,
            education: [
              ...s.cv.education,
              {
                id: genId(),
                degree: "",
                school: "",
                location: "",
                startMonth: "",
                endMonth: "",
                current: false,
                mention: "",
                description: "",
              },
            ],
          },
        })),
      updateEducation: (id, data) =>
        set((s) => ({
          cv: {
            ...s.cv,
            education: s.cv.education.map((e) =>
              e.id === id ? { ...e, ...data } : e
            ),
          },
        })),
      removeEducation: (id) =>
        set((s) => ({
          cv: {
            ...s.cv,
            education: s.cv.education.filter((e) => e.id !== id),
          },
        })),
      reorderEducation: (from, to) =>
        set((s) => ({
          cv: { ...s.cv, education: reorderArray(s.cv.education, from, to) },
        })),

      // ── Compétences ──
      addSkill: () =>
        set((s) => ({
          cv: {
            ...s.cv,
            skills: [
              ...s.cv.skills,
              { id: genId(), name: "", level: 3, category: "Général" },
            ],
          },
        })),
      updateSkill: (id, data) =>
        set((s) => ({
          cv: {
            ...s.cv,
            skills: s.cv.skills.map((sk) => (sk.id === id ? { ...sk, ...data } : sk)),
          },
        })),
      removeSkill: (id) =>
        set((s) => ({
          cv: { ...s.cv, skills: s.cv.skills.filter((sk) => sk.id !== id) },
        })),

      // ── Langues ──
      addLanguage: () =>
        set((s) => ({
          cv: {
            ...s.cv,
            languages: [
              ...s.cv.languages,
              { id: genId(), name: "", level: "B2" },
            ],
          },
        })),
      updateLanguage: (id, data) =>
        set((s) => ({
          cv: {
            ...s.cv,
            languages: s.cv.languages.map((l) =>
              l.id === id ? { ...l, ...data } : l
            ),
          },
        })),
      removeLanguage: (id) =>
        set((s) => ({
          cv: {
            ...s.cv,
            languages: s.cv.languages.filter((l) => l.id !== id),
          },
        })),

      // ── Projets ──
      addProject: () =>
        set((s) => ({
          cv: {
            ...s.cv,
            projects: [
              ...s.cv.projects,
              {
                id: genId(),
                title: "",
                description: "",
                technologies: [],
                link: "",
                github: "",
              },
            ],
          },
        })),
      updateProject: (id, data) =>
        set((s) => ({
          cv: {
            ...s.cv,
            projects: s.cv.projects.map((p) =>
              p.id === id ? { ...p, ...data } : p
            ),
          },
        })),
      removeProject: (id) =>
        set((s) => ({
          cv: {
            ...s.cv,
            projects: s.cv.projects.filter((p) => p.id !== id),
          },
        })),

      // ── Centres d'intérêt ──
      addInterest: () =>
        set((s) => ({ cv: { ...s.cv, interests: [...s.cv.interests, ""] } })),
      updateInterest: (index, value) =>
        set((s) => {
          const interests = [...s.cv.interests];
          interests[index] = value;
          return { cv: { ...s.cv, interests } };
        }),
      removeInterest: (index) =>
        set((s) => ({
          cv: {
            ...s.cv,
            interests: s.cv.interests.filter((_, i) => i !== index),
          },
        })),

      // ── Paramètres ──
      updateSettings: (data) =>
        set((s) => ({
          cv: { ...s.cv, settings: { ...s.cv.settings, ...data } },
        })),
      setTemplate: (id) =>
        set((s) => ({
          cv: { ...s.cv, settings: { ...s.cv.settings, templateId: id } },
        })),
      setAccentColor: (color) =>
        set((s) => ({
          cv: { ...s.cv, settings: { ...s.cv.settings, accentColor: color } },
        })),
      setDaisyTheme: (theme) =>
        set((s) => ({
          cv: { ...s.cv, settings: { ...s.cv.settings, daisyTheme: theme } },
        })),
      reorderSections: (order) =>
        set((s) => ({
          cv: { ...s.cv, settings: { ...s.cv.settings, sectionOrder: order } },
        })),

      // Remplace le contenu (exemple de métier) en gardant le style et la photo
      loadContent: (content, sectionOrder) =>
        set((s) => ({
          cv: {
            ...content,
            personal: { ...content.personal, photoUrl: s.cv.personal.photoUrl },
            settings: {
              ...s.cv.settings,
              sectionOrder: sectionOrder ?? defaultCVData.settings.sectionOrder,
              hiddenSections: [],
            },
          },
        })),

      // ── Reset ──
      resetCV: () => set({ cv: defaultCVData }),
    }),
    {
      name: "astrocv-data", // clé localStorage
      storage: createJSONStorage(() => localStorage),
      version: 2,
      // Fusionne les réglages enregistrés avec les valeurs par défaut :
      // les nouveaux réglages existent même pour un CV sauvegardé avant leur ajout.
      merge: (persisted, current) => {
        const saved = (persisted as { cv?: Partial<CVData> } | undefined)?.cv;
        if (!saved) return current;
        return {
          ...current,
          cv: {
            ...current.cv,
            ...saved,
            settings: { ...current.cv.settings, ...saved.settings },
          },
        };
      },
    }
  )
);
