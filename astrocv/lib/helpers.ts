// ============================================================
// lib/helpers.ts — Fonctions utilitaires partagées
// ============================================================

import { SkillLevel, LanguageLevel, CVData, CVSettings, FontFamilyKey } from "./types";

/**
 * Formate une période (mois/année) en chaîne lisible.
 * Ex: ("03/2022", "Présent", true) → "mars 2022 – Présent"
 */
export function formatPeriod(
  startMonth: string,
  endMonth: string,
  current: boolean
): string {
  const end = current ? "Présent" : endMonth;
  if (!startMonth && !end) return "";
  if (!startMonth) return end;
  if (!end) return formatMonth(startMonth);
  return `${formatMonth(startMonth)} – ${current ? "Présent" : formatMonth(end)}`;
}

/**
 * Formate "MM/YYYY" en "mois YYYY" en français.
 * Ex: "03/2022" → "mars 2022"
 */
export function formatMonth(monthYear: string): string {
  if (!monthYear || !monthYear.includes("/")) return monthYear;
  const [month, year] = monthYear.split("/");
  const m = parseInt(month, 10);
  const months = [
    "janv.", "févr.", "mars", "avr.", "mai", "juin",
    "juil.", "août", "sept.", "oct.", "nov.", "déc.",
  ];
  return `${months[m - 1] ?? ""} ${year}`.trim();
}

/**
 * Retourne le libellé textuel d'un niveau de compétence.
 */
export function skillLevelLabel(level: SkillLevel): string {
  const labels: Record<SkillLevel, string> = {
    1: "Débutant",
    2: "Élémentaire",
    3: "Intermédiaire",
    4: "Avancé",
    5: "Expert",
  };
  return labels[level] ?? "";
}

/**
 * Retourne la couleur CSS en fonction du niveau de langue.
 */
export function languageLevelColor(level: LanguageLevel): string {
  const colors: Record<LanguageLevel, string> = {
    Natif: "#6366f1",
    C2: "#8b5cf6",
    C1: "#3b82f6",
    B2: "#10b981",
    B1: "#f59e0b",
    A2: "#ef4444",
    A1: "#6b7280",
  };
  return colors[level] ?? "#6b7280";
}

/**
 * Groupe les compétences par catégorie.
 */
export function groupSkillsByCategory(
  skills: { id: string; name: string; level: SkillLevel; category: string }[]
) {
  return skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, typeof skills>
  );
}

/**
 * Génère le nom du fichier PDF.
 * Ex: "CV_Sophie_Martin.pdf"
 */
export function getPdfFileName(firstName: string, lastName: string): string {
  const clean = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // supprime les accents
      .replace(/[^a-zA-Z0-9]/g, "_")   // remplace caractères spéciaux
      .replace(/_+/g, "_")             // dédouble les underscores
      .trim();
  const first = clean(firstName) || "Prenom";
  const last = clean(lastName) || "Nom";
  return `CV_${last}_${first}.pdf`;
}

/**
 * Palette de couleurs accent disponibles.
 */
export const ACCENT_COLORS = {
  indigo: { label: "Indigo", hex: "#6366f1", tw: "indigo" },
  violet: { label: "Violet", hex: "#8b5cf6", tw: "violet" },
  emerald: { label: "Émeraude", hex: "#10b981", tw: "emerald" },
  rose: { label: "Rose", hex: "#f43f5e", tw: "rose" },
  amber: { label: "Ambre", hex: "#f59e0b", tw: "amber" },
  sky: { label: "Ciel", hex: "#0ea5e9", tw: "sky" },
  navy: { label: "Bleu marine", hex: "#1e3a5f", tw: "blue" },
  teal: { label: "Sarcelle", hex: "#0f766e", tw: "teal" },
  burgundy: { label: "Bordeaux", hex: "#7f1d1d", tw: "red" },
  slate: { label: "Ardoise", hex: "#475569", tw: "slate" },
  orange: { label: "Orange", hex: "#ea580c", tw: "orange" },
  black: { label: "Noir", hex: "#111827", tw: "gray" },
} as const;

/**
 * Couleur d'accent effective : couleur libre si valide, sinon la palette.
 */
export function getAccentHex(settings: Pick<CVSettings, "accentColor" | "customAccent">): string {
  if (/^#[0-9a-fA-F]{6}$/.test(settings.customAccent ?? "")) return settings.customAccent;
  return ACCENT_COLORS[settings.accentColor]?.hex ?? ACCENT_COLORS.indigo.hex;
}

/**
 * Couleur de texte lisible (blanc ou presque noir) sur un fond donné.
 */
export function readableOn(hex: string): string {
  const m = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!m) return "#ffffff";
  const n = parseInt(m[1], 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return (r * 299 + g * 587 + b * 114) / 1000 > 160 ? "#111827" : "#ffffff";
}

/**
 * Retourne une copie du CV où les sections masquées sont vides :
 * tous les modèles n'affichent que les sections non vides.
 */
export function applyHiddenSections(data: CVData): CVData {
  const hidden = data.settings.hiddenSections ?? [];
  if (hidden.length === 0) return data;
  return {
    ...data,
    experiences: hidden.includes("experiences") ? [] : data.experiences,
    education: hidden.includes("education") ? [] : data.education,
    skills: hidden.includes("skills") ? [] : data.skills,
    languages: hidden.includes("languages") ? [] : data.languages,
    projects: hidden.includes("projects") ? [] : data.projects,
    interests: hidden.includes("interests") ? [] : data.interests,
  };
}

/**
 * Polices disponibles (Google Fonts chargées par next/font + polices système sûres pour les ATS).
 */
export const FONT_OPTIONS: { id: FontFamilyKey; label: string; stack: string; group: "sans" | "serif" | "system" }[] = [
  { id: "default", label: "Selon le modèle", stack: "", group: "system" },
  { id: "inter", label: "Inter", stack: "var(--font-inter), Inter, sans-serif", group: "sans" },
  { id: "poppins", label: "Poppins", stack: "var(--font-poppins), Poppins, sans-serif", group: "sans" },
  { id: "montserrat", label: "Montserrat", stack: "var(--font-montserrat), Montserrat, sans-serif", group: "sans" },
  { id: "roboto", label: "Roboto", stack: "var(--font-roboto), Roboto, sans-serif", group: "sans" },
  { id: "lato", label: "Lato", stack: "var(--font-lato), Lato, sans-serif", group: "sans" },
  { id: "opensans", label: "Open Sans", stack: "var(--font-opensans), 'Open Sans', sans-serif", group: "sans" },
  { id: "raleway", label: "Raleway", stack: "var(--font-raleway), Raleway, sans-serif", group: "sans" },
  { id: "nunito", label: "Nunito", stack: "var(--font-nunito), Nunito, sans-serif", group: "sans" },
  { id: "sourcesans", label: "Source Sans", stack: "var(--font-sourcesans), 'Source Sans 3', sans-serif", group: "sans" },
  { id: "dmsans", label: "DM Sans", stack: "var(--font-dmsans), 'DM Sans', sans-serif", group: "sans" },
  { id: "playfair", label: "Playfair Display", stack: "var(--font-playfair), 'Playfair Display', serif", group: "serif" },
  { id: "merriweather", label: "Merriweather", stack: "var(--font-merriweather), Merriweather, serif", group: "serif" },
  { id: "lora", label: "Lora", stack: "var(--font-lora), Lora, serif", group: "serif" },
  { id: "arial", label: "Arial (sûre ATS)", stack: "Arial, Helvetica, sans-serif", group: "system" },
  { id: "calibri", label: "Calibri (sûre ATS)", stack: "Calibri, Carlito, 'Segoe UI', sans-serif", group: "system" },
  { id: "georgia", label: "Georgia", stack: "Georgia, 'Times New Roman', serif", group: "system" },
  { id: "times", label: "Times New Roman", stack: "'Times New Roman', Times, serif", group: "system" },
];

export const FONT_STACKS = Object.fromEntries(
  FONT_OPTIONS.map((f) => [f.id, f.stack])
) as Record<FontFamilyKey, string>;

/**
 * Thèmes daisyUI disponibles pour l'application.
 */
export const DAISY_THEMES = [
  { id: "light", label: "Clair" },
  { id: "dark", label: "Sombre" },
  { id: "cupcake", label: "Cupcake" },
  { id: "corporate", label: "Corporate" },
  { id: "night", label: "Nuit" },
  { id: "dracula", label: "Dracula" },
] as const;
