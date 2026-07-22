// ============================================================
// lib/helpers.ts — Fonctions utilitaires partagées
// ============================================================

import { SkillLevel, LanguageLevel } from "./types";

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
  return `CV_${first}_${last}.pdf`;
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
} as const;

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
