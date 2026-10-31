// ============================================================
// components/templates/proStyles.ts
// Définition déclarative des modèles "Pro" : un seul moteur de rendu
// (ProTemplate) pilotable par ces réglages — ATS et mises en page variées.
// ============================================================

import { FontFamilyKey, TemplateId } from "@/lib/types";

export interface TemplateStyle {
  layout: "single" | "sidebar-left" | "sidebar-right" | "band" | "portrait";
  header: "left" | "center";
  headerRule: boolean;               // Filet sous l'en-tête
  heading: "rule" | "accent" | "bar" | "pill" | "tint" | "plain" | "block" | "dash" | "title";
  entries: "stacked" | "dateLeft" | "timeline" | "split";
  cards: boolean;                    // Entrées dans des cartes teintées
  skills: "grouped" | "dots" | "bars" | "bars2" | "chips";
  languages: "inline" | "list" | "chips" | "bars";
  sidebarTone: "light" | "accent" | "dark" | "tint";
  bandShape: "flat" | "slant" | "round";   // Forme du bas du bandeau
  nameCaps: boolean;
  icons: boolean;
  photo: "none" | "round" | "square";
  fontFamily: Exclude<FontFamilyKey, "default">;
  size: number;                      // Taille de texte de base (px)
  nameSize: number;                  // Multiple de la taille de base
  nameWeight: number;
  nameAccent: boolean;
  density: number;                   // Multiplie les espacements
}

const base: TemplateStyle = {
  layout: "single",
  header: "left",
  headerRule: false,
  heading: "accent",
  entries: "stacked",
  cards: false,
  skills: "grouped",
  languages: "inline",
  sidebarTone: "light",
  bandShape: "flat",
  nameCaps: false,
  icons: false,
  photo: "none",
  fontFamily: "arial",
  size: 10.5,
  nameSize: 2.4,
  nameWeight: 700,
  nameAccent: false,
  density: 1,
};

export const PRO_STYLES: Partial<Record<TemplateId, TemplateStyle>> = {
  // ── ATS : 1 colonne, texte pur, titres standards ──
  ats_classic: { ...base, header: "center", heading: "rule", nameSize: 2.2 },
  ats_modern: { ...base, heading: "accent", fontFamily: "calibri", nameAccent: true, size: 11 },
  ats_compact: { ...base, heading: "rule", size: 9.5, nameSize: 2.1, density: 0.75 },
  executive_serif: {
    ...base, header: "center", headerRule: true, heading: "plain",
    fontFamily: "georgia", nameSize: 2.7, nameWeight: 400, size: 10.5, density: 1.1,
  },

  // ── Mises en page avec colonnes / éléments graphiques ──
  sidebar_light: {
    ...base, layout: "sidebar-left", heading: "accent", skills: "dots", languages: "list",
    icons: true, photo: "round", fontFamily: "inter", size: 10, nameAccent: true,
  },
  sidebar_accent: {
    ...base, layout: "sidebar-left", sidebarTone: "accent", heading: "bar", skills: "bars",
    languages: "list", icons: true, photo: "round", fontFamily: "inter", size: 10, nameAccent: true,
  },
  band_header: {
    ...base, layout: "band", heading: "tint", skills: "chips", languages: "chips",
    icons: true, photo: "round", fontFamily: "inter", size: 10, nameSize: 2.6,
  },
  minimal_grid: {
    ...base, heading: "plain", entries: "dateLeft", fontFamily: "inter",
    nameSize: 3, nameWeight: 300, nameAccent: true, density: 1.15,
  },
  timeline_clean: {
    ...base, heading: "pill", entries: "timeline", skills: "chips", languages: "chips",
    icons: true, photo: "round", fontFamily: "inter", size: 10, nameAccent: true,
  },
  soft_cards: {
    ...base, layout: "sidebar-right", heading: "tint", cards: true, skills: "chips",
    languages: "chips", icons: true, photo: "round", fontFamily: "inter", size: 10,
    nameAccent: true,
  },

  // ── Modernes et créatifs ──
  dark_sidebar: {
    ...base, layout: "sidebar-left", sidebarTone: "dark", heading: "dash", skills: "bars",
    languages: "list", icons: true, photo: "round", fontFamily: "inter", size: 10, nameAccent: true,
  },
  slant_band: {
    ...base, layout: "band", bandShape: "slant", heading: "bar", skills: "dots", languages: "list",
    icons: true, photo: "round", fontFamily: "inter", size: 10, nameSize: 2.7, nameCaps: true,
  },
  round_band: {
    ...base, layout: "band", bandShape: "round", heading: "pill", skills: "chips", languages: "chips",
    icons: true, photo: "round", fontFamily: "calibri", size: 10.5, nameSize: 2.6,
  },
  bold_caps: {
    ...base, heading: "block", fontFamily: "inter", size: 10, nameSize: 3, nameWeight: 800,
    nameCaps: true, nameAccent: true, headerRule: true, icons: true, photo: "square", skills: "chips",
  },
  split_header: {
    ...base, heading: "dash", fontFamily: "inter", size: 10, nameSize: 2.8, nameWeight: 700,
    nameAccent: true, icons: true, photo: "round", skills: "bars", languages: "list",
    entries: "dateLeft", density: 1.05,
  },
  night_timeline: {
    ...base, layout: "sidebar-right", sidebarTone: "dark", heading: "dash", entries: "timeline",
    skills: "chips", languages: "chips", icons: true, photo: "round", fontFamily: "inter",
    size: 10, nameAccent: true,
  },
  pastel_cards: {
    ...base, layout: "sidebar-left", sidebarTone: "tint", heading: "pill", cards: true,
    skills: "chips", languages: "chips", icons: true, photo: "square", fontFamily: "calibri",
    size: 10.5, nameAccent: true,
  },
  studio_grid: {
    ...base, layout: "band", bandShape: "slant", heading: "block", entries: "dateLeft",
    skills: "bars", languages: "list", icons: true, photo: "square", fontFamily: "inter",
    size: 10, nameSize: 2.5, nameWeight: 800,
  },
  portrait_studio: {
    ...base, layout: "portrait", heading: "title", entries: "split", skills: "bars2",
    languages: "bars", photo: "square", fontFamily: "inter", size: 10, nameSize: 3.1,
    nameWeight: 800, density: 1.1,
  },
};
