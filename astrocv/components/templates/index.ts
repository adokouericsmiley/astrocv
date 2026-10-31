// ============================================================
// components/templates/index.ts
// Registre des templates disponibles + résolution de l'accent
// ============================================================

import { createElement, ComponentType } from "react";
import { TemplateId, TemplateDefinition, AccentColor, CVData } from "@/lib/types";
import { ACCENT_COLORS } from "@/lib/helpers";
import CreativeTemplate from "./CreativeTemplate";
import TealWaveTemplate from "./TealWaveTemplate";
import TimelineGreyTemplate from "./TimelineGreyTemplate";
import ModernTemplate from "./ModernTemplate";
import ExecutiveNavyTemplate from "./ExecutiveNavyTemplate";
import BannerBlackTemplate from "./BannerBlackTemplate";
import DiagonalBlueTemplate from "./DiagonalBlueTemplate";
import ProTemplate from "./ProTemplate";
import { PRO_STYLES } from "./proStyles";

export {
  CreativeTemplate,
  TealWaveTemplate,
  TimelineGreyTemplate,
  ModernTemplate,
  ExecutiveNavyTemplate,
  BannerBlackTemplate,
  DiagonalBlueTemplate,
  ProTemplate,
};

export const CATEGORY_LABELS = {
  ats: "ATS",
  classic: "Classique",
  modern: "Moderne",
  creative: "Créatif",
} as const;

export const TEMPLATES: TemplateDefinition[] = [
  // ── ATS : 1 colonne, texte pur, titres standards ──
  {
    id: "ats_classic",
    name: "ATS Classique",
    description: "Une colonne, en-tête centré, titres soulignés. Le plus sûr pour les logiciels de tri de candidatures.",
    category: "ats", ats: true,
    bestFor: "Tous métiers, grandes entreprises, candidatures en ligne",
  },
  {
    id: "ats_modern",
    name: "ATS Moderne",
    description: "Une colonne propre avec titres de couleur. Lisible par les ATS tout en restant actuel.",
    category: "ats", ats: true,
    bestFor: "Commerce, marketing, administratif, santé, services",
  },
  {
    id: "ats_compact",
    name: "ATS Compact",
    description: "Texte resserré pour faire tenir un parcours long sur une page, sans aucun élément graphique.",
    category: "ats", ats: true,
    bestFor: "Parcours de 10 ans et plus, cadres, techniciens, ingénieurs",
  },
  {
    id: "executive_serif",
    name: "Exécutif Serif",
    description: "Police à empattements, en-tête centré et double filet. Sobre, institutionnel et compatible ATS.",
    category: "classic", ats: true,
    bestFor: "Droit, finance, conseil, direction, fonction publique, enseignement",
  },
  // ── Classiques & modernes avec colonnes ──
  {
    id: "sidebar_light",
    name: "Colonne Claire",
    description: "Colonne latérale grise avec photo, contact, compétences à points et langues.",
    category: "classic", ats: false,
    bestFor: "Santé, éducation, commerce, administration, métiers de service",
  },
  {
    id: "sidebar_accent",
    name: "Colonne Couleur",
    description: "Colonne latérale pleine couleur avec barres de niveau. Se décline dans toutes les teintes.",
    category: "modern", ats: false,
    bestFor: "Vente, hôtellerie-restauration, artisanat, logistique, jeunes actifs",
  },
  {
    id: "band_header",
    name: "Bandeau Couleur",
    description: "Grand bandeau d'en-tête avec photo, contenu principal à gauche et colonne d'infos à droite.",
    category: "modern", ats: false,
    bestFor: "Marketing, communication, ressources humaines, management",
  },
  {
    id: "minimal_grid",
    name: "Minimal Chronologique",
    description: "Dates à gauche, contenu à droite, beaucoup d'air. Élégant et très lisible.",
    category: "classic", ats: false,
    bestFor: "Consultants, juristes, chercheurs, profils seniors",
  },
  {
    id: "timeline_clean",
    name: "Timeline Pro",
    description: "Frise verticale du parcours, titres en pastilles et compétences en étiquettes.",
    category: "modern", ats: false,
    bestFor: "Parcours évolutifs, reconversions, jeunes diplômés",
  },
  {
    id: "soft_cards",
    name: "Cartes Douces",
    description: "Expériences dans des cartes teintées, colonne droite pour les infos clés.",
    category: "creative", ats: false,
    bestFor: "Créatifs, commerce de détail, événementiel, petite enfance",
  },
  // ── Modernes et créatifs ──
  {
    id: "dark_sidebar",
    name: "Nuit Élégante",
    description: "Colonne latérale noire, titres à tiret de couleur et barres de niveau. Contrasté et premium.",
    category: "modern", ats: false,
    bestFor: "Cadres, commerciaux, consultants, profils seniors",
  },
  {
    id: "slant_band",
    name: "Bandeau Diagonal",
    description: "En-tête en biais, nom en capitales, compétences à points. Dynamique et assumé.",
    category: "creative", ats: false,
    bestFor: "Communication, événementiel, vente, startups",
  },
  {
    id: "round_band",
    name: "Bandeau Arrondi",
    description: "En-tête aux bords arrondis, titres en pastilles et compétences en étiquettes. Doux et moderne.",
    category: "creative", ats: false,
    bestFor: "Santé, éducation, petite enfance, services à la personne",
  },
  {
    id: "bold_caps",
    name: "Capitales Audacieuses",
    description: "Grand nom en capitales, filet de couleur et titres en blocs pleins. Fort impact en une colonne.",
    category: "modern", ats: false,
    bestFor: "Management, vente, restauration, artisanat",
  },
  {
    id: "split_header",
    name: "Chrono Moderne",
    description: "Photo en en-tête, dates à gauche et barres de compétences. Structuré et aéré.",
    category: "modern", ats: false,
    bestFor: "Marketing, RH, finance, profils polyvalents",
  },
  {
    id: "night_timeline",
    name: "Nuit Timeline",
    description: "Colonne droite noire et frise verticale du parcours. Lecture facile de l'évolution.",
    category: "creative", ats: false,
    bestFor: "Reconversions, parcours riches, tech et numérique",
  },
  {
    id: "pastel_cards",
    name: "Pastel Cartes",
    description: "Colonne teintée à la couleur choisie, cartes douces et photo carrée arrondie.",
    category: "creative", ats: false,
    bestFor: "Mode, beauté, bien-être, jeunes diplômés",
  },
  {
    id: "studio_grid",
    name: "Studio Créatif",
    description: "Bandeau en biais, titres en blocs, dates à gauche et photo carrée. Esprit agence.",
    category: "creative", ats: false,
    bestFor: "Design, marketing, audiovisuel, architecture",
  },
  {
    id: "portrait_studio",
    name: "Portrait Studio",
    description: "Grande photo en tête de colonne sombre, nom en gras, titres larges soulignés et compétences en barres.",
    category: "modern", ats: false,
    bestFor: "Design, photo, audiovisuel, commerce, tous métiers avec photo",
  },
  // ── Modèles graphiques d'origine ──
  {
    id: "executive_navy",
    name: "Executive Navy",
    description: "Sidebar bleu nuit avec grande photo portrait, barres d'accentuation et compétences en 2 colonnes.",
    category: "modern", ats: false,
    bestFor: "Cadres, commerciaux, management",
  },
  {
    id: "banner_black",
    name: "Bannières Noires",
    description: "Bandeau supérieur bleu ciel et bannières de sections noires avec icônes.",
    category: "classic", ats: false,
    bestFor: "Administratif, technique, industrie",
  },
  {
    id: "diagonal_blue",
    name: "Diagonale Ciel",
    description: "Découpe diagonale en en-tête, photo circulaire et jauges de langues en pilules.",
    category: "creative", ats: false,
    bestFor: "Communication, design, métiers relationnels",
  },
  {
    id: "creative",
    name: "Élégant Feuille",
    description: "Badge d'en-tête en feuille, sidebar anthracite incurvée et puces étoiles.",
    category: "creative", ats: false,
    bestFor: "Mode, bien-être, artisanat d'art, arts",
  },
  {
    id: "teal_wave",
    name: "Vagues Turquoise",
    description: "Vagues géométriques turquoise, photo cerclée, pilules de sections et jauges.",
    category: "creative", ats: false,
    bestFor: "Tourisme, santé, éducation, social",
  },
  {
    id: "timeline_grey",
    name: "Timeline Arche",
    description: "Bannière anthracite, photo en arche et timeline verticale.",
    category: "modern", ats: false,
    bestFor: "Profils polyvalents, services, technique",
  },
  {
    id: "modern",
    name: "Modern 2 Colonnes",
    description: "Design épuré classique avec bande colorée latérale.",
    category: "classic", ats: false,
    bestFor: "Usage général",
  },
];

type TemplateComponent = ComponentType<{ data: CVData; accentHex: string }>;

// Chaque modèle "Pro" est le moteur ProTemplate configuré par son style
const proComponent = (id: TemplateId): TemplateComponent => {
  const style = PRO_STYLES[id]!;
  const Component: TemplateComponent = ({ data, accentHex }) =>
    createElement(ProTemplate, { data, accentHex, style });
  Component.displayName = `ProTemplate(${id})`;
  return Component;
};

export const TEMPLATE_COMPONENTS: Record<TemplateId, TemplateComponent> = {
  executive_navy: ExecutiveNavyTemplate,
  banner_black: BannerBlackTemplate,
  diagonal_blue: DiagonalBlueTemplate,
  creative: CreativeTemplate,
  teal_wave: TealWaveTemplate,
  timeline_grey: TimelineGreyTemplate,
  modern: ModernTemplate,
  ats_classic: proComponent("ats_classic"),
  ats_modern: proComponent("ats_modern"),
  ats_compact: proComponent("ats_compact"),
  executive_serif: proComponent("executive_serif"),
  sidebar_light: proComponent("sidebar_light"),
  sidebar_accent: proComponent("sidebar_accent"),
  band_header: proComponent("band_header"),
  minimal_grid: proComponent("minimal_grid"),
  timeline_clean: proComponent("timeline_clean"),
  soft_cards: proComponent("soft_cards"),
  dark_sidebar: proComponent("dark_sidebar"),
  slant_band: proComponent("slant_band"),
  round_band: proComponent("round_band"),
  bold_caps: proComponent("bold_caps"),
  split_header: proComponent("split_header"),
  night_timeline: proComponent("night_timeline"),
  pastel_cards: proComponent("pastel_cards"),
  studio_grid: proComponent("studio_grid"),
  portrait_studio: proComponent("portrait_studio"),
};

// Correspondance AccentColor → valeur HEX
export const ACCENT_HEX = Object.fromEntries(
  Object.entries(ACCENT_COLORS).map(([key, value]) => [key, value.hex])
) as Record<AccentColor, string>;
