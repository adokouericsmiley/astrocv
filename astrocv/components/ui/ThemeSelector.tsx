"use client";
// ============================================================
// components/ui/ThemeSelector.tsx
// Panneau "Personnaliser" : couleur, police, taille, espacement,
// sections (visibilité + ordre) et thème de l'interface.
// (Le choix du modèle est géré dans la Galerie de Modèles.)
// ============================================================

import { useEffect, useRef, useState } from "react";
import { useCVStore } from "@/lib/store";
import { ACCENT_COLORS, DAISY_THEMES, FONT_OPTIONS, getAccentHex } from "@/lib/helpers";
import { AccentColor, FontScale, SectionKey, Spacing } from "@/lib/types";
import { Palette, Eye, EyeOff, ChevronUp, ChevronDown } from "lucide-react";

const SECTION_LABELS: Record<SectionKey, string> = {
  experiences: "Expériences",
  education: "Formation",
  skills: "Compétences",
  languages: "Langues",
  projects: "Projets & réalisations",
  interests: "Centres d'intérêt",
};
const ALL_SECTIONS = Object.keys(SECTION_LABELS) as SectionKey[];

const SIZES: { id: FontScale; label: string }[] = [
  { id: "sm", label: "Petit" },
  { id: "md", label: "Normal" },
  { id: "lg", label: "Grand" },
];
const SPACINGS: { id: Spacing; label: string }[] = [
  { id: "compact", label: "Compact" },
  { id: "normal", label: "Normal" },
  { id: "airy", label: "Aéré" },
];

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs font-bold uppercase tracking-wider text-base-content/50 mb-2">{children}</p>
);

export default function ThemeSelector() {
  const { cv, updateSettings, setDaisyTheme, setAccentColor, reorderSections } = useCVStore();
  const s = cv.settings;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Applique le thème daisyUI sur l'élément <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", s.daisyTheme);
  }, [s.daisyTheme]);

  // Ferme le panneau au clic extérieur ou avec Échap
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const accent = getAccentHex(s);
  const hasCustom = /^#[0-9a-fA-F]{6}$/.test(s.customAccent ?? "");

  const order = [...s.sectionOrder, ...ALL_SECTIONS.filter((k) => !s.sectionOrder.includes(k))];
  const hidden = s.hiddenSections ?? [];

  const move = (index: number, delta: -1 | 1) => {
    const next = [...order];
    const target = index + delta;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    reorderSections(next);
  };
  const toggleSection = (key: SectionKey) =>
    updateSettings({
      hiddenSections: hidden.includes(key) ? hidden.filter((k) => k !== key) : [...hidden, key],
    });

  const segmented = <T extends string>(
    items: { id: T; label: string }[], value: T, onPick: (v: T) => void
  ) => (
    <div className="join w-full">
      {items.map((it) => (
        <button
          key={it.id}
          onClick={() => onPick(it.id)}
          className={`join-item btn btn-xs flex-1 ${value === it.id ? "btn-primary" : "btn-outline border-base-300"}`}
        >
          {it.label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="relative" ref={rootRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="btn btn-sm btn-ghost gap-2 text-base-content/70 hover:text-base-content"
      >
        <Palette size={15} />
        <span className="text-xs font-medium">Personnaliser</span>
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-80 max-h-[75vh] overflow-y-auto p-4 space-y-5 shadow-2xl bg-base-100 rounded-2xl border border-base-300">
          {/* Couleur */}
          <div>
            <Label>Couleur du CV</Label>
            <div className="flex gap-2 flex-wrap items-center">
              {(Object.entries(ACCENT_COLORS) as [AccentColor, (typeof ACCENT_COLORS)[AccentColor]][]).map(
                ([key, color]) => (
                  <button
                    key={key}
                    title={color.label}
                    aria-label={color.label}
                    onClick={() => {
                      updateSettings({ customAccent: "" });
                      setAccentColor(key);
                    }}
                    style={{ background: color.hex }}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${
                      !hasCustom && s.accentColor === key
                        ? "border-base-content scale-110 shadow-md"
                        : "border-transparent hover:scale-105"
                    }`}
                  />
                )
              )}
            </div>
            <label className="mt-3 flex items-center gap-2 text-xs text-base-content/70 cursor-pointer">
              <input
                type="color"
                value={accent}
                onChange={(e) => updateSettings({ customAccent: e.target.value })}
                className="w-7 h-7 rounded cursor-pointer border border-base-300 bg-transparent p-0"
              />
              Couleur personnalisée
              {hasCustom && (
                <button
                  className="ml-auto text-[11px] underline"
                  onClick={(e) => {
                    e.preventDefault();
                    updateSettings({ customAccent: "" });
                  }}
                >
                  Réinitialiser
                </button>
              )}
            </label>
          </div>

          {/* Police */}
          <div>
            <Label>Police</Label>
            <select
              className="select select-sm select-bordered w-full"
              value={s.fontFamily}
              onChange={(e) => updateSettings({ fontFamily: e.target.value as typeof s.fontFamily })}
            >
              {FONT_OPTIONS.filter((f) => f.id === "default").map((f) => (
                <option key={f.id} value={f.id}>{f.label}</option>
              ))}
              {([["sans", "Sans-serif"], ["serif", "Serif (élégantes)"], ["system", "Polices système, sûres pour les ATS"]] as const).map(
                ([group, label]) => (
                  <optgroup key={group} label={label}>
                    {FONT_OPTIONS.filter((f) => f.group === group && f.id !== "default").map((f) => (
                      <option key={f.id} value={f.id}>{f.label}</option>
                    ))}
                  </optgroup>
                )
              )}
            </select>
          </div>

          {/* Taille et espacement */}
          <div>
            <Label>Taille du texte</Label>
            {segmented(SIZES, s.fontScale, (v) => updateSettings({ fontScale: v }))}
            <div className="mt-3">
              <Label>Espacement</Label>
              {segmented(SPACINGS, s.spacing, (v) => updateSettings({ spacing: v }))}
            </div>
            <p className="text-[11px] text-base-content/50 mt-2">
              Taille et espacement s&apos;appliquent aux modèles ATS et « Pro ». La police et la couleur
              s&apos;appliquent à tous.
            </p>
          </div>

          {/* Pages */}
          <div>
            <Label>Pages</Label>
            {segmented(
              [{ id: "1", label: "1 page" }, { id: "2", label: "2 pages" }, { id: "3", label: "3 pages" }],
              String(s.pageCount ?? 1),
              (v) => updateSettings({ pageCount: Number(v) as 1 | 2 | 3 })
            )}
            <label className="mt-3 flex items-center gap-2 text-xs text-base-content/70 cursor-pointer">
              <input
                type="checkbox"
                className="checkbox checkbox-xs"
                checked={s.fillPage !== false}
                onChange={(e) => updateSettings({ fillPage: e.target.checked })}
              />
              Remplir la page (ajuste les espacements)
            </label>
            <p className="text-[11px] text-base-content/50 mt-2">
              Le CV passe automatiquement sur une 2e page si le contenu est long. Choisissez « 2 pages »
              pour en ajouter une. Disponible sur les modèles ATS et « Pro ».
            </p>
          </div>

          {/* Sections */}
          <div>
            <Label>Sections du CV</Label>
            <ul className="space-y-1">
              {order.map((key, i) => {
                const isHidden = hidden.includes(key);
                return (
                  <li
                    key={key}
                    className="flex items-center gap-1 rounded-lg border border-base-200 px-2 py-1"
                  >
                    <button
                      onClick={() => toggleSection(key)}
                      className="btn btn-ghost btn-xs btn-square"
                      title={isHidden ? "Afficher" : "Masquer"}
                      aria-label={`${isHidden ? "Afficher" : "Masquer"} ${SECTION_LABELS[key]}`}
                    >
                      {isHidden ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                    <span className={`text-xs flex-1 ${isHidden ? "line-through text-base-content/40" : ""}`}>
                      {SECTION_LABELS[key]}
                    </span>
                    <button
                      onClick={() => move(i, -1)}
                      disabled={i === 0}
                      className="btn btn-ghost btn-xs btn-square"
                      aria-label="Monter"
                    >
                      <ChevronUp size={14} />
                    </button>
                    <button
                      onClick={() => move(i, 1)}
                      disabled={i === order.length - 1}
                      className="btn btn-ghost btn-xs btn-square"
                      aria-label="Descendre"
                    >
                      <ChevronDown size={14} />
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="text-[11px] text-base-content/50 mt-2">
              L&apos;ordre s&apos;applique aux modèles ATS et « Pro ».
            </p>
          </div>

          {/* Thème de l'application (daisyUI) */}
          <div>
            <Label>Thème de l&apos;interface</Label>
            <div className="grid grid-cols-3 gap-1.5">
              {DAISY_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  className={`text-xs py-1.5 px-2 rounded-lg border transition-all ${
                    s.daisyTheme === theme.id
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
      )}
    </div>
  );
}
