// ============================================================
// components/templates/index.ts
// Registre des templates disponibles + résolution de l'accent
// ============================================================

import { TemplateId, TemplateDefinition, AccentColor } from "@/lib/types";

export const TEMPLATES: TemplateDefinition[] = [
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
