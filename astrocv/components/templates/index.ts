// ============================================================
// components/templates/index.ts
// Registre des templates disponibles + résolution de l'accent
// ============================================================

import { TemplateId, TemplateDefinition, AccentColor } from "@/lib/types";

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: "creative",
    name: "Élégant / Haute Couture",
    description: "Design éditorial moderne avec typographie élégante, puces étoiles et badges arrondies.",
  },
  {
    id: "modern",
    name: "Modern 2 Colonnes",
    description: "Design épuré avec bande colorée latérale et mise en page à deux colonnes.",
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
