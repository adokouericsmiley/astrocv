"use client";
// ============================================================
// components/ui/ThemeSelector.tsx
// Sélecteur de modèle (template), thème daisyUI et couleur accent
// ============================================================

import { useEffect } from "react";
import { useCVStore } from "@/lib/store";
import { ACCENT_COLORS, DAISY_THEMES } from "@/lib/helpers";
import { TEMPLATES } from "@/components/templates";
import { AccentColor, TemplateId } from "@/lib/types";
import { Palette, LayoutTemplate } from "lucide-react";

export default function ThemeSelector() {
  const { cv, setDaisyTheme, setAccentColor, setTemplate } = useCVStore();
  const currentTheme = cv.settings.daisyTheme;
  const currentAccent = cv.settings.accentColor;
  const currentTemplate = cv.settings.templateId;

  // Applique le thème daisyUI sur l'élément <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  return (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="btn btn-sm btn-ghost gap-2 text-base-content/70 hover:text-base-content"
      >
        <Palette size={15} />
        <span className="text-xs font-medium">Style & Thème</span>
      </label>

      <div
        tabIndex={0}
        className="dropdown-content z-50 menu p-4 shadow-2xl bg-base-100 rounded-2xl border border-base-300 w-80 mt-2 space-y-4"
      >
        {/* Modèle de CV */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-base-content/50 mb-2 flex items-center gap-1.5">
            <LayoutTemplate size={13} /> Modèle de CV
          </p>
          <div className="space-y-1.5">
            {TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => setTemplate(tmpl.id)}
                className={`w-full text-left p-2 rounded-xl border text-xs transition-all ${
                  currentTemplate === tmpl.id
                    ? "border-primary bg-primary/10 font-semibold text-primary"
                    : "border-base-200 hover:border-base-300 text-base-content/80"
                }`}
              >
                <div className="font-bold">{tmpl.name}</div>
                <div className="text-[11px] opacity-70 font-normal">
                  {tmpl.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Couleur accent du CV */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-base-content/50 mb-2">
            Couleur accent
          </p>
          <div className="flex gap-2 flex-wrap">
            {(Object.entries(ACCENT_COLORS) as [AccentColor, typeof ACCENT_COLORS[AccentColor]][]).map(
              ([key, color]) => (
                <button
                  key={key}
                  title={color.label}
                  onClick={() => setAccentColor(key)}
                  style={{ background: color.hex }}
                  className={`w-7 h-7 rounded-full border-2 transition-all ${
                    currentAccent === key
                      ? "border-base-content scale-110 shadow-md"
                      : "border-transparent hover:scale-105"
                  }`}
                />
              )
            )}
          </div>
        </div>

        {/* Thème de l'application (daisyUI) */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-base-content/50 mb-2">
            Thème interface
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            {DAISY_THEMES.map((theme) => (
              <button
                key={theme.id}
                className={`text-xs py-1.5 px-2 rounded-lg border transition-all ${
                  currentTheme === theme.id
                    ? "border-primary bg-primary text-primary-content font-semibold"
                    : "border-base-300 hover:border-primary/50 text-base-content/70"
                }`}
                onClick={() => setDaisyTheme(theme.id)}
              >
                {theme.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
