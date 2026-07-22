// ============================================================
// lib/types.ts — Interfaces TypeScript strictes pour AstroCV
// ============================================================

// ── Informations personnelles ────────────────────────────────
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  title: string;         // Titre professionnel (ex: "Développeur Full-Stack")
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  linkedin: string;
  github: string;
  website: string;
  photoUrl: string;      // URL ou base64 de la photo de profil
  summary: string;       // Accroche / résumé professionnel
}

// ── Expérience professionnelle ───────────────────────────────
export interface Experience {
  id: string;
  position: string;
  company: string;
  location: string;
  startMonth: string;   // Format "MM/YYYY"
  endMonth: string;     // Format "MM/YYYY" ou "Présent"
  current: boolean;     // Poste actuel
  description: string;
  bullets: string[];    // Points clés / réalisations
}

// ── Formation ────────────────────────────────────────────────
export interface Education {
  id: string;
  degree: string;       // Intitulé du diplôme
  school: string;
  location: string;
  startMonth: string;
  endMonth: string;
  current: boolean;
  mention: string;      // Mention (ex: "Mention Très Bien")
  description: string;
}

// ── Compétence ───────────────────────────────────────────────
export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export interface Skill {
  id: string;
  name: string;
  level: SkillLevel;    // 1 (débutant) → 5 (expert)
  category: string;     // ex: "Langages", "Frameworks", "Outils"
}

// ── Langue ───────────────────────────────────────────────────
export type LanguageLevel =
  | "Natif"
  | "C2"
  | "C1"
  | "B2"
  | "B1"
  | "A2"
  | "A1";

export interface Language {
  id: string;
  name: string;
  level: LanguageLevel;
}

// ── Projet ───────────────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link: string;
  github: string;
}

// ── Paramètres du CV ────────────────────────────────────────
export type TemplateId = "modern" | "creative" | "classic" | "minimal";
export type AccentColor =
  | "indigo"
  | "violet"
  | "emerald"
  | "rose"
  | "amber"
  | "sky";

export interface CVSettings {
  templateId: TemplateId;
  accentColor: AccentColor;
  daisyTheme: string;    // Thème daisyUI global de l'app
  showPhoto: boolean;
  sectionOrder: SectionKey[]; // Ordre des sections dans le CV
}

// ── Sections du CV ───────────────────────────────────────────
export type SectionKey =
  | "experiences"
  | "education"
  | "skills"
  | "languages"
  | "projects"
  | "interests";

// ── Structure globale du CV ──────────────────────────────────
export interface CVData {
  personal: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  projects: Project[];
  interests: string[];
  settings: CVSettings;
}

// ── Définition d'un template (pour le registre de templates) ──
export interface TemplateDefinition {
  id: TemplateId;
  name: string;
  description: string;
  preview?: string; // URL de l'image de prévisualisation
}
