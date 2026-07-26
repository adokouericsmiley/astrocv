// ============================================================
// components/templates/index.ts
// Registre des templates disponibles + résolution de l'accent
// ============================================================

import { TemplateId, TemplateDefinition, AccentColor } from "@/lib/types";
import CreativeTemplate from "./CreativeTemplate";
import TealWaveTemplate from "./TealWaveTemplate";
import TimelineGreyTemplate from "./TimelineGreyTemplate";
import ModernTemplate from "./ModernTemplate";
import ExecutiveNavyTemplate from "./ExecutiveNavyTemplate";
import BannerBlackTemplate from "./BannerBlackTemplate";
import DiagonalBlueTemplate from "./DiagonalBlueTemplate";

export {
  CreativeTemplate,
  TealWaveTemplate,
  TimelineGreyTemplate,
  ModernTemplate,
  ExecutiveNavyTemplate,
  BannerBlackTemplate,
  DiagonalBlueTemplate,
};

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: "executive_navy",
    name: "Executive Navy (Thomas Garcia)",
    description: "Sidebar bleu nuit avec photo portrait, barres de soulignement d'accentuation et section compétences 2 colonnes.",
  },
  {
    id: "banner_black",
    name: "Banner Block Minimal (Nom Prénom)",
    description: "Bandeau supérieur bleu ciel, bannières de sections noires avec texte blanc et icônes.",
  },
  {
    id: "diagonal_blue",
    name: "Diagonal Sky Header (Raphaël Martin)",
    description: "Découpe géométrique diagonale d'en-tête, photo circulaire cerclée et jauges de langues en pilules.",
  },
  {
    id: "creative",
    name: "Élégant Leaf (Célia Naudin)",
    description: "Badge d'en-tête en feuille, sidebar anthracite incurvée et puces étoiles (✦).",
  },
  {
    id: "teal_wave",
    name: "Teal Geometric (Taya Miass)",
    description: "Vagues géométriques turquoises, photo cerclée, pilules de sections et jauges.",
  },
  {
    id: "timeline_grey",
    name: "Timeline Arch (Jonathan Patterson)",
    description: "Bannière anthracite majuscule, photo en arche et timeline verticale (○).",
  },
  {
    id: "modern",
    name: "Modern 2-Colonnes",
    description: "Design épuré classique avec bande colorée latérale.",
  },
];

// Correspondance AccentColor → valeur HEX
export const ACCENT_HEX: Record<AccentColor, string> = {
  indigo: "#6366f1",
  violet: "#8b5cf6",
  emerald: "#10b981",
  rose: "#f43f5e",
  amber: "#f59e0b",
  sky: "#0ea5e9",
};
