"use client";
// ============================================================
// components/ui/ThemeSelector.tsx
// Sélecteur de thème daisyUI et couleur accent du CV
// (Le choix de template est géré dans la Galerie de Modèles)
// ============================================================

import { useEffect } from "react";
import { useCVStore } from "@/lib/store";
import { ACCENT_COLORS, DAISY_THEMES } from "@/lib/helpers";
import { AccentColor } from "@/lib/types";
import { Palette } from "lucide-react";

export default function ThemeSelector() {
  const { cv, setDaisyTheme, setAccentColor } = useCVStore();
  const currentTheme = cv.settings.daisyTheme;
  const currentAccent = cv.settings.accentColor;

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
        className="dropdown-content z-50 menu p-4 shadow-2xl bg-base-100 rounded-2xl border border-base-300 w-72 mt-2 space-y-4"
      >
        {/* Couleur accent du CV */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-base-content/50 mb-2">
            Couleur accent du CV
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
