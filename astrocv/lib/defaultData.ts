// ============================================================
// lib/defaultData.ts — Données de démonstration initiales
// Pré-remplissent le CV pour que l'utilisateur voie immédiatement
// la mise en page avant de saisir ses propres données.
// Le contenu vient d'un exemple métier générique (pas réservé aux
// développeurs) ; d'autres exemples sont proposés dans l'application.
// ============================================================

import { CVData } from "./types";
import { EXAMPLE_PROFILES } from "./examples";

const base = EXAMPLE_PROFILES.find((e) => e.id === "commercial") ?? EXAMPLE_PROFILES[0];

export const defaultCVData: CVData = {
  ...base.content,
  settings: {
    templateId: "ats_modern",
    accentColor: "navy",
    customAccent: "",
    fontFamily: "default",
    fontScale: "md",
    spacing: "normal",
    hiddenSections: [],
    pageCount: 1,
    fillPage: true,
    daisyTheme: "light",
    showPhoto: true,
    sectionOrder: [
      "experiences",
      "education",
      "skills",
      "languages",
      "projects",
      "interests",
    ],
  },
};
