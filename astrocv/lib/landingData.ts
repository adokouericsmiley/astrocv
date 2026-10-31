// ============================================================
// lib/landingData.ts — CV de démonstration pour la landing page
// (les vrais modèles sont rendus avec des exemples métiers)
// ============================================================

import { AccentColor, CVData, TemplateId } from "./types";
import { defaultCVData } from "./defaultData";
import { EXAMPLE_PROFILES } from "./examples";

export function demoCV(
  exampleId: string,
  templateId: TemplateId,
  accent: AccentColor,
  avatar = ""
): CVData {
  const ex = EXAMPLE_PROFILES.find((e) => e.id === exampleId) ?? EXAMPLE_PROFILES[0];
  return {
    ...ex.content,
    personal: { ...ex.content.personal, photoUrl: avatar },
    settings: {
      ...defaultCVData.settings,
      templateId,
      accentColor: accent,
      sectionOrder: ex.sectionOrder ?? defaultCVData.settings.sectionOrder,
    },
  };
}
